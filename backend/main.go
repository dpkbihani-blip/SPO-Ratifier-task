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
	http.HandleFunc("/signup", handler.Signup)

	fmt.Println("Server listening on :8080")
	fmt.Println("Backend started")

	err = http.ListenAndServe(":8080", nil)
	http.HandleFunc("/signup", handler.Signup)
	http.HandleFunc("/login", handler.Login)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	
}