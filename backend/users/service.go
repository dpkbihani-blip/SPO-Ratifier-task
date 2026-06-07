package users

import "SPO-ratifier/requests"

type Service struct {
	UserRepo    *Repository
	RequestRepo *requests.Repository
}

func (s *Service) GetDashboard(
	studentID int,
) (DashboardResponse, error) {

	student, err := s.UserRepo.GetStudent(studentID)
	if err != nil {
		return DashboardResponse{}, err
	}

	reqs, err := s.RequestRepo.GetRequestsByStudent(studentID)
	if err != nil {
		return DashboardResponse{}, err
	}

	if reqs == nil {
    reqs = []requests.VerificationRequest{}
	}
	
	return DashboardResponse{
		Student: student,
		Requests: reqs,
	}, nil
}
func (s *Service) GetVerifiedCard(
	studentID int,
) (VerifiedCardResponse, error) {

	student, err := s.UserRepo.GetStudent(studentID)
	if err != nil {
		return VerifiedCardResponse{}, err
	}

	records, err := s.UserRepo.GetApprovedRequests(studentID)
	if err != nil {
		return VerifiedCardResponse{}, err
	}

	return VerifiedCardResponse{
		Student: student,
		Records: records,
	}, nil
}