package ingestion

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// HandleHeartbeat is a lightweight liveness endpoint for the qicn command.
// Keep it dependency-free so it can be used without ClickHouse wiring.
func HandleHeartbeat(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":    "ok",
		"service":   "qicn",
		"timestamp": time.Now().UTC().Format(time.RFC3339Nano),
	})
}




