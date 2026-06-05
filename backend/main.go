package main

import (
	"fmt"
	"net/http"

	"SPO-ratifier/auth"
	"SPO-ratifier/database"
)

func main() {
	db, err := database.Connect()
	if err != nil {
		panic(err)
	}
	err = database.InitSchema(db)
	if err != nil {
		panic(err)
	}
	err = database.SeedDomains(db)
	if err != nil {
		panic(err)
	}
	repo := auth.Repository{
		DB: db,
	}
	service := auth.Service{
		Repo: &repo,
	}
	handler := auth.Handler{
		Service: &service,	
	}

	fmt.Println("Server listening on :8080")
	fmt.Println("Backend started")

	
	http.HandleFunc("/signup", func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		handler.Signup(w, r)
	})
	
	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	handler.Login(w, r)
})
	if err != nil {
		panic(err)
	}
	err = http.ListenAndServe(":8080", nil)
	defer db.Close()

	
}