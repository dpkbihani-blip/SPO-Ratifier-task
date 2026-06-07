package main

import (
"fmt"
"net/http"
"os"

"SPO-ratifier/admin"
"SPO-ratifier/auth"
"SPO-ratifier/database"
"SPO-ratifier/middleware"
"SPO-ratifier/requests"
"SPO-ratifier/users"

)

func health(
w http.ResponseWriter,
r *http.Request,
) {
w.Write([]byte("OK"))
}

func main() {
db, err := database.Connect()
if err != nil {
	panic(err)
}
defer db.Close()

err = database.InitSchema(db)
if err != nil {
	panic(err)
}

err = database.SeedDomains(db)
if err != nil {
	panic(err)
}

// =========================
// Auth
// =========================

authRepo := auth.Repository{
	DB: db,
}

authService := auth.Service{
	Repo: &authRepo,
}

authHandler := auth.Handler{
	Service: &authService,
}

// =========================
// Requests
// =========================

requestRepo := requests.Repository{
	DB: db,
}

requestService := requests.Service{
	Repo: &requestRepo,
}

requestHandler := requests.Handler{
	Service: &requestService,
}

// =========================
// Users
// =========================

userRepo := users.Repository{
	DB: db,
}

userService := users.Service{
	UserRepo:    &userRepo,
	RequestRepo: &requestRepo,
}

userHandler := users.Handler{
	Service: &userService,
}

// =========================
// Admin
// =========================

adminRepo := admin.Repository{
	DB: db,
}

adminService := admin.Service{
	Repo: &adminRepo,
}

adminHandler := admin.Handler{
	Service: &adminService,
}

// =========================
// Routes
// =========================

http.HandleFunc(
	"/health",
	middleware.WithCORS(
		health,
		"GET",
	),
)

http.HandleFunc(
	"/signup",
	middleware.WithCORS(
		authHandler.Signup,
		"POST",
	),
)

http.HandleFunc(
	"/login",
	middleware.WithCORS(
		authHandler.Login,
		"POST",
	),
)

http.HandleFunc(
	"/requests",
	middleware.WithCORS(
		requestHandler.CreateRequest,
		"POST",
	),
)

http.HandleFunc(
	"/student/dashboard",
	middleware.WithCORS(
		userHandler.Dashboard,
		"GET",
	),
)

http.HandleFunc(
	"/student/verified-card",
	middleware.WithCORS(
		userHandler.VerifiedCard,
		"GET",
	),
)

http.HandleFunc(
	"/admin/domain-admin",
	middleware.WithCORS(
		adminHandler.AssignDomainAdmin,
		"POST",
	),
)

http.HandleFunc(
	"/admin/requests",
	middleware.WithCORS(
		adminHandler.GetDomainRequests,
		"GET",
	),
)

http.HandleFunc(
	"/admin/request",
	middleware.WithCORS(
		adminHandler.UpdateRequest,
		"PATCH",
	),
)

port := os.Getenv("PORT")
if port == "" {
	port = "8080"
}

addr := ":" + port

fmt.Println("Backend started")
fmt.Println("Server listening on", addr)

err = http.ListenAndServe(
	addr,
	nil,
)

if err != nil {
	panic(err)
}
}
