package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"zosterix-backend/internal/shared"
)

func Recovery() gin.HandlerFunc {
	return gin.CustomRecovery(func(c *gin.Context, recovered interface{}) {
		shared.Fail(c, http.StatusInternalServerError, "Internal Server Error")
		c.Abort()
	})
}
