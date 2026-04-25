package shared

import (
	"github.com/gin-gonic/gin"
)

type Response struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   *APIError   `json:"error,omitempty"`
	Meta    *Meta       `json:"meta,omitempty"`
}

type APIError struct {
	Code    string            `json:"code"`             // machine-readable
	Message string            `json:"message"`          // human-readable
	Fields  map[string]string `json:"fields,omitempty"` // per-field validation errors
}

type Meta struct {
	Page    int `json:"page,omitempty"`
	PerPage int `json:"per_page,omitempty"`
	Total   int `json:"total,omitempty"`
}

func OK(c *gin.Context, data interface{}) {
	c.JSON(200, Response{Success: true, Data: data})
}

func Created(c *gin.Context, data interface{}) {
	c.JSON(201, Response{Success: true, Data: data})
}

func Err(c *gin.Context, status int, code, msg string) {
	c.JSON(status, Response{Success: false, Error: &APIError{Code: code, Message: msg}})
}

func Fail(c *gin.Context, status int, msg string) {
	c.JSON(status, Response{Success: false, Error: &APIError{Code: "error", Message: msg}})
}

func ValidationErr(c *gin.Context, fields map[string]string) {
	c.JSON(422, Response{Success: false, Error: &APIError{
		Code:    "validation_error",
		Message: "Please correct the errors below.",
		Fields:  fields,
	}})
}
