package middleware

import "net/http"

func WithCORS(
	handler http.HandlerFunc,
	methods string,
) http.HandlerFunc {

	return func(
		w http.ResponseWriter,
		r *http.Request,
	) {

		w.Header().Set(
			"Access-Control-Allow-Origin",
			"*",
		)

		w.Header().Set(
			"Access-Control-Allow-Headers",
			"Content-Type",
		)

		w.Header().Set(
			"Access-Control-Allow-Methods",
			methods+", OPTIONS",
		)

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		handler(w, r)
	}
}
func Health(
	w http.ResponseWriter,
	r *http.Request,
) {

	w.Write([]byte("OK"))
}