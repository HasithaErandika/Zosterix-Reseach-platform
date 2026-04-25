package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"zosterix-backend/internal/shared"
)

func CSRFMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == http.MethodGet || c.Request.Method == http.MethodHead || c.Request.Method == http.MethodOptions {
			c.Next()
			return
		}

		token := c.GetHeader("X-CSRF-Token")
		if strings.TrimSpace(token) == "" {
			shared.Fail(c, http.StatusForbidden, "CSRF token required")
			c.Abort()
			return
		}
		c.Next()
	}
}
