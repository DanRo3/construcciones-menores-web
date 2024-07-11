package auth

type Session struct {
	UserId int    `json:"user_id,omitempty"`
	Role   string `json:"role,omitempty" binding:"requiered"`
	Token  string `json:"token,omitempty" binding:"requiered"`
}
