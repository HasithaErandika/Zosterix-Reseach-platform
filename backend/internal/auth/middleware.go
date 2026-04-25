package auth

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"zosterix-backend/internal/shared"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

func RequireAuth(jwtSecret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			shared.Err(c, http.StatusUnauthorized, "missing_token", "Authentication required")
			c.Abort()
			return
		}

		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
		claims, err := ValidateAccessToken(tokenStr, jwtSecret)
		if err != nil {
			shared.Err(c, http.StatusUnauthorized, "invalid_token", "Invalid or expired token")
			c.Abort()
			return
		}

		c.Set("user_id", claims.UserID)
		c.Set("user_email", claims.Email)
		c.Set("user_role", claims.Role)
		c.Set("supervisor_status", claims.SupervisorStatus)
		c.Next()
	}
}

func RequireRole(roles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		userRole := c.GetString("user_role")
		for _, r := range roles {
			if userRole == r {
				c.Next()
				return
			}
		}
		shared.Err(c, http.StatusForbidden, "forbidden", "You do not have permission to perform this action")
		c.Abort()
	}
}

func RateLimit(rdb *redis.Client, namespace string, limit int, window time.Duration) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Key by IP for now, could be by user_id if authenticated
		key := fmt.Sprintf("zosterix:ratelimit:%s:%s", namespace, c.ClientIP())
		
		ctx := c.Request.Context()
		count, err := rdb.Incr(ctx, key).Result()
		if err != nil {
			c.Next()
			return
		}

		if count == 1 {
			rdb.Expire(ctx, key, window)
		}

		if count > int64(limit) {
			ttl, _ := rdb.TTL(ctx, key).Result()
			c.Header("Retry-After", fmt.Sprintf("%.0f", ttl.Seconds()))
			shared.Err(c, http.StatusTooManyRequests, "rate_limit_exceeded", "Too many requests. Please try again later.")
			c.Abort()
			return
		}

		c.Header("X-RateLimit-Remaining", fmt.Sprintf("%d", int64(limit)-count))
		c.Next()
	}
}
