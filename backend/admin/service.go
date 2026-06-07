package admin

type Service struct {
	Repo *Repository
}
func (s *Service) AssignDomainAdmin(
	userID int,
	domainID int,
) error {

	return s.Repo.AssignDomainAdmin(
		userID,
		domainID,
	)
}
func (s *Service) GetDomainRequests(
	adminID int,
) ([]DomainRequest, error) {

	domainID, err :=
		s.Repo.GetAdminDomain(
			adminID,
		)

	if err != nil {
		return nil, err
	}

	return s.Repo.GetRequestsByDomain(
		domainID,
	)
}
func (s *Service) UpdateRequest(
	requestID int,
	status string,
	remarks string,
) error {

	return s.Repo.UpdateRequestStatus(
		requestID,
		status,
		remarks,
	)
}

func (s *Service) GetAllStudents() (
	[]Student,
	error,
) {

	return s.Repo.GetAllStudents()
}
func (s *Service) GetAllRequests() (
	[]DomainRequest,
	error,
) {

	return s.Repo.GetAllRequests()
}