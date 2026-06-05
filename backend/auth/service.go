package auth

import (
	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	Repo *Repository
}

func (s *Service) RegisterUser(
	name string,
	email string,
	password string,
) error {

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(password),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return err
	}

	user := User{
		Name:         name,
		Email:        email,
		PasswordHash: string(hashedPassword),
		Role:         "student",
	}

	return s.Repo.CreateUser(user)

}

func (s *Service) LoginUser(
	email string,
	password string,
	) error {

	user, err := s.Repo.GetUserByEmail(email)
	if err != nil {
		return err
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.PasswordHash),
		[]byte(password),
	)

	if err != nil {
		return err
	}

	return nil
}