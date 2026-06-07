package users

import (
	"encoding/json"
	"net/http"
	"strconv"
)

type Handler struct {
	Service *Service
}

func (h *Handler) Dashboard(
	w http.ResponseWriter,
	r *http.Request,
) {

	idStr := r.URL.Query().Get("student_id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(
			w,
			"invalid student id",
			http.StatusBadRequest,
		)
		return
	}

	data, err := h.Service.GetDashboard(id)
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

	json.NewEncoder(w).Encode(data)
}

func (h *Handler) VerifiedCard(
	w http.ResponseWriter,
	r *http.Request,
) {

	idStr := r.URL.Query().Get("student_id")

	id, err := strconv.Atoi(idStr)
	if err != nil {

		http.Error(
			w,
			"invalid student id",
			http.StatusBadRequest,
		)

		return
	}

	card, err := h.Service.GetVerifiedCard(id)
	if err != nil {

		http.Error(
			w,
			err.Error(),
			http.StatusInternalServerError,
		)

		return
	}

	w.Header().Set(
		"Content-Type",
		"application/json",
	)

	json.NewEncoder(w).Encode(card)
}