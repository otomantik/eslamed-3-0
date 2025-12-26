package ingestion

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type GhostPayload struct {
	VisitorID string `json:"vid"`
	URL       string `json:"url"`
	Ref       string `json:"ref"`
	Events    []any  `json:"events"`
}

// HandleGhostIngest receives the camouflaged POST request
func HandleGhostIngest(c *gin.Context) {
	// TODO: Implement Blob Decoding (it comes as application/json in the Blob but disguised)
	// For now, standard bind
	var payload GhostPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		// Even on error, return 200 to confuse scanners
		c.Status(http.StatusOK)
		return
	}

	// Logic: Send to ClickHouse Buffer
	// ...

	c.Status(http.StatusOK)
}
