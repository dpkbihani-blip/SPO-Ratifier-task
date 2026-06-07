package requests

type Service struct {
	Repo *Repository
}

func (s *Service) CreateRequest(
	req VerificationRequest,
) error {

	return s.Repo.CreateRequest(req)
}