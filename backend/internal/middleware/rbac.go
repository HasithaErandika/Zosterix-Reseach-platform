package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"zosterix-backend/internal/shared"
)

func RequireRoles(roles ...string) gin.HandlerFunc {
	allow := map[string]bool{}
	for _, role := range roles {
		allow[role] = true
	}

	return func(c *gin.Context) {
		role, _ := c.Get("role")
		if !allow[role.(string)] {
			shared.Fail(c, http.StatusForbidden, "Forbidden")
			c.Abort()
			return
		}
		c.Next()
	}
}
