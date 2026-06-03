package main

import (
	"fmt"
	"SPO-ratifier/database"
)

func main() {
	db, err := database.Connect()
	if err != nil {
		panic(err)
	}

	defer db.Close()

	fmt.Println("Backend started")
}