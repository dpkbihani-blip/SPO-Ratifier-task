package requests

import (
	"encoding/json"
	"net/http"
)

type Handler struct {
	Service *Service
}

func (h *Handler) CreateRequest(
	w http.ResponseWriter,
	r *http.Request,
) {

	var req VerificationRequest

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(
			w,
			"invalid request",
			http.StatusBadRequest,
		)
		return
	}

	err = h.Service.CreateRequest(req)
	if err != nil {
		http.Error(
			w,
			err.Error(),
			http.StatusBadRequest,
		)
		return
	}

	w.Header().Set(
		"Content-Type",
		"application/json",
	)

	json.NewEncoder(w).Encode(
		map[string]string{
			"message": "request created",
		},
	)
}