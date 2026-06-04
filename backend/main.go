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
	err = database.InitSchema(db)
	if err != nil {
		panic(err)
	}
	err = database.SeedDomains(db)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	fmt.Println("Backend started")
}