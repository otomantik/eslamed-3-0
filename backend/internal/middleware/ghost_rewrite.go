package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// GhostRewrite is a lightweight rewrite layer.
// It preserves real API routes, and can optionally normalize common "website-ish" requests.
//
// Note: This middleware intentionally does NOT attempt to "fix" directory names.
// The user's original error came from Go tooling rejecting folders starting with '-'.
func GhostRewrite() gin.HandlerFunc {
	return func(c *gin.Context) {
		p := c.Request.URL.Path

		// Always allow API paths through unchanged.
		if strings.HasPrefix(p, "/api/") {
			c.Next()
			return
		}

		// Normalize multiple slashes (cheap hygiene).
		if strings.Contains(p, "//") {
			for strings.Contains(p, "//") {
				p = strings.ReplaceAll(p, "//", "/")
			}
			c.Request.URL.Path = p
		}

		// Example: treat HEAD/GET to root as an "ok" probe (non-invasive).
		if p == "/" && (c.Request.Method == http.MethodGet || c.Request.Method == http.MethodHead) {
			c.Status(http.StatusNoContent)
			c.Abort()
			return
		}

		c.Next()
	}
}




