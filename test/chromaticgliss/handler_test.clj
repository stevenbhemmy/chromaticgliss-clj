(ns chromaticgliss.handler-test
  (:use clojure.test
        chromaticgliss.test-core
        ring.mock.request
        chromaticgliss.handler)
  (:require [cheshire.core :as json]
            [chromaticgliss.models.users :as u]
            [chromaticgliss.models.lists :as l]
            [chromaticgliss.models.products :as p]
            [chromaticgliss.auth :as auth]))

(def ^{:dynamic true} *session-id* nil)

(defn with-session [t]
  (let [user (u/create {:name "Some admin"
                        :email "theadmin@example.com"
                        :password "sup3rs3cr3t"
                        :level :restful-clojure.aut/admin})
        session-id (auth/make-token! (:id user))]
    (with-bindings {#'*session-id* session-id}
      (t))
    (u/delete-user user)))

(use-fixtures :each with-rollback)
(use-fixtures :once with-session)

(defn with-auth-header [req]
  (header req "Authorization" (str "Token " *session-id*)))

(deftest main-routes
  (testing "list users"
    (let [response (app (with-auth-header (request :get "/users")))]
      (is (= (:status response) 200))
      (is (= (get-in response [:headers "Content-Type"]) "application/json; charset=utf-8"))))

  (testing "lists endpoint"
    (let [response (app (with-auth-header (request :get "/lists")))]
      (is (= (:status response) 200))
      (is (= (get-in response [:headers "Content-Type"]) "application/json; charset=utf-8"))))

  (testing "prodcuts endpoint"
    (let [response (app (with-auth-header (request :get "/products")))]
      (is (= (:status response) 200))
      (is (= (get-in response [:headers "Content-Type"]) "application/json; charset=utf-8"))))

  (testing "not-found route"
    (let [response (app (request :get "/bogus-route"))]
      (is (= (:status response) 404)))))

(deftest creating-user
  (testing "POST /users"
    (let [user-count (u/count-users)
          response (app (-> (request :post "/users")
                            with-auth-header
                            (body (json/generate-string {:name "Joe Test"
                                                         :email "joe@example.com"
                                                         :password "s3cr3t"}))
                            (content-type "application/json")
                            (header "Accept" "application/json")))]
      (is (= (:status response) 201))
      (is (substring? "/users/" (get-in response [:headers "Location"])))
      (is (= (inc user-count) (u/count-users))))))

(deftest retrieve-user-stuff
  (let [user (u/create {:name "John Doe" :email "j.doe@mytest.com" :password "s3cr3t"})
        initial-count (u/count-users)]
    (testing "GET /users"
      (doseq [i (range 4)]
        (u/create {:name "Person" :email (str "person" i "@example.com") :password "s3cr3t"}))
      (let [response (app (with-auth-header (request :get "/users")))
            resp-data (json/parse-string (:body response))]
        (is (= (:status response 200)))
        (is (substring? "person3@example.com" (:body response)))
        (is (= (+ initial-count 4) (count (get resp-data "results" []))))
        (is (= (+ initial-count 4) (get resp-data "count" [])))))
    (testing "GET /users/:id"
      (let [response (app (with-auth-header (request :get (str "/users/" (:id user)))))]
        (is (= (dissoc (json/parse-string (:body response) true) :created_at :updated_at :level) (dissoc user :created_at :updated_at :level)))))
    (testing "GET /users/:id/lists"
      (let [my-list (l/create {:user_id (:id user) :title "Wonderful Stuffs"})
            response (app (with-auth-header (request :get (str "/users/" (:id user) "/lists"))))]
        (is (= (:body response) (json/generate-string [(dissoc my-list :user_id)])))))))

(deftest deleting-user
  (let [user (u/create {:name "John Doe" :email "j.doe@mytest.com" :password "s3cr3t"})]
    (testing "DELETE /users/:id"
      (let [response (app (with-auth-header (request :delete (str "/users/" (:id user)))))]
        (is (= (:status response) 204))
        (is (= "/users" (get-in response [:headers "Location"])))
        (is (nil? (u/find-by-id (:id user))))))))

(deftest creating-list
  (testing "POST /lists"
    (let [list-count (l/count-lists)
          user (u/create {:name "John Doe" :email "j.doe@mytest.com" :password "s3cr3t"})
          response (app(-> (request :post "/lists")
                           with-auth-header
                           (body (str "{\"user_id\":" (:id user) ",\"title\":\"Amazing Accoutrements\"}"))
                           (content-type "application/json")
                           (header "Accept" "application/json")))]
      (is (= (:status response) 201))
      (is (substring? "/users/" (get-in response [:headers "Location"])))
      (is (= (inc list-count) (l/count-lists))))))

(deftest retrieving-list
  (let [user (u/create {:name "John Doe" :email "j.doe@mytest.com" :password "s3cr3t"})
        listdata (l/create {:user_id (:id user) :title "Root Beers of Iowa"})]
    (testing "GET /lists"
      (doseq [i (range 4)]
        (l/create {:user_id (:id user) :title (str "List " i)}))
      (let [response (app (with-auth-header (request :get "/lists")))
            resp-data (json/parse-string (:body response))]
        (is (= (:status response 200)))
        (is (substring? "List 3" (:body response)))
        (is (= 5 (count (get resp-data "results" []))))
        (is (= 5 (get resp-data "count" [])))))
    (testing "GET /lists/:id"
      (let [response (app (with-auth-header (request :get (str "/lists/" (:id listdata)))))]
        (is (= (dissoc (json/parse-string (:body response) true) :created_at :updated_at) (dissoc listdata :created_at :updated_at)))))))

(deftest deleting-list
  (let [user (u/create {:name "John Doe" :email "j.doe@mytest.com" :password "s3cr3t"})
        listdata (l/create {:user_id (:id user) :title "Root Beers of Iowa"})]
    (testing "DELETE /lists/:id"
      (let [response (app (with-auth-header (request :delete (str "/lists/" (:id listdata)))))]
        (is (= (:status response) 204))
        (is (= "/lists" (get-in response [:headers "Location"])))
        (is nil? (l/find-by-id (:id listdata)))))))

(deftest creating-product
  (testing "POST /products"
    (let [prod-count (p/count-products)
          response (app (-> (request :post "/products")
                            with-auth-header
                            (body (str "{\"title\":\"Granny Smith\",\"description\":\"Howdya like them apples?\"}"))
                            (content-type "application/json")
                            (header "Accept" "application/json")))]
      (is (= (:status response) 201))
      (is (substring? "/products/" (get-in response [:headers "Location"])))
      (is (= (inc prod-count) (p/count-products))))))

(deftest retrieving-product
  (testing "GET /products"
    (doseq [i (range 5)]
      (p/create {:title (str "Product " i)}))
    (let [response (app (with-auth-header (request :get "/products")))
          resp-data (json/parse-string (:body response))]
      (is (= (:status response 200)))
      (is (substring? "Product 4" (:body response)))
      (is (= 5 (count (get resp-data "results" []))))
      (is (= 5 (get resp-data "count" []))))))