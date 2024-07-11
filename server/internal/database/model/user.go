package model

type User struct {
	ID       int    `json:"id,omitempty" binding:"required"`
	Name     string `json:"name,omitempty" binding:"required"`
	Email    string `json:"email,omitempty" binding:"required"`
	Phone    string `json:"phone,omitempty" binding:"required"`
	Password string `json:"password,omitempty" binding:"required"`
	Role     string `json:"role,omitempty" binding:"required"`
}
