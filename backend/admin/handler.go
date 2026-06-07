package admin

import (
	"encoding/json"
	"net/http"
	"strconv"
)

type Handler struct {
	Service *Service
}
func (h *Handler) AssignDomainAdmin(
	w http.ResponseWriter,
	r *http.Request,
) {

	var req DomainAdmin

	err := json.NewDecoder(
		r.Body,
	).Decode(&req)

	if err != nil {

		http.Error(
			w,
			"invalid body",
			http.StatusBadRequest,
		)

		return
	}

	err = h.Service.AssignDomainAdmin(
		req.UserID,
		req.DomainID,
	)

	if err != nil {

		http.Error(
			w,
			err.Error(),
			http.StatusBadRequest,
		)

		return
	}

	json.NewEncoder(w).Encode(
		map[string]string{
			"message": "assigned",
		},
	)
}
func (h *Handler) GetDomainRequests(
	w http.ResponseWriter,
	r *http.Request,
) {

	adminIDStr :=
		r.URL.Query().Get(
			"admin_id",
		)

	adminID, _ :=
		strconv.Atoi(
			adminIDStr,
		)

	requests, err :=
		h.Service.GetDomainRequests(
			adminID,
		)

	if err != nil {

		http.Error(
			w,
			err.Error(),
			http.StatusInternalServerError,
		)

		return
	}

	json.NewEncoder(w).Encode(
		requests,
	)
}
func (h *Handler) UpdateRequest(
	w http.ResponseWriter,
	r *http.Request,
) {

	var req RequestUpdate

	err := json.NewDecoder(
		r.Body,
	).Decode(&req)

	if err != nil {

		http.Error(
			w,
			"invalid body",
			http.StatusBadRequest,
		)

		return
	}

	err = h.Service.UpdateRequest(
		req.RequestID,
		req.Status,
		req.Remarks,
	)

	if err != nil {

		http.Error(
			w,
			err.Error(),
			http.StatusBadRequest,
		)

		return
	}

	json.NewEncoder(w).Encode(
		map[string]string{
			"message": "updated",
		},
	)
}
func (h *Handler) GetStudents(
	w http.ResponseWriter,
	r *http.Request,
) {

	students, err :=
		h.Service.GetAllStudents()

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

	json.NewEncoder(w).Encode(
		students,
	)
}
func (h *Handler) AssignAdmin(
	w http.ResponseWriter,
	r *http.Request,
) {

	var req AssignAdminRequest

	err := json.NewDecoder(
		r.Body,
	).Decode(&req)

	if err != nil {

		http.Error(
			w,
			"invalid request body",
			http.StatusBadRequest,
		)

		return
	}

	err = h.Service.AssignDomainAdmin(
		req.UserID,
		req.DomainID,
	)

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
			"message":
				"domain admin assigned",
		},
	)
}
func (h *Handler) GetAllRequests(
	w http.ResponseWriter,
	r *http.Request,
) {

	requests, err :=
		h.Service.GetAllRequests()

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

	json.NewEncoder(w).Encode(
		requests,
	)
}