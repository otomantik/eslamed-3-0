package main

import (
	"log"
	"os"

	"eslamed/backend/internal/ingestion"
	"eslamed/backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	// Set Release Mode for High Performance
	gin.SetMode(gin.ReleaseMode)

	r := gin.New()
	r.Use(gin.Recovery())

	// Apply Ghost Protocol Middleware globally
	r.Use(middleware.GhostRewrite())

	// Define Routes
	v1 := r.Group("/api/v1")
	{
		system := v1.Group("/system")
		{
			system.POST("/heartbeat", ingestion.HandleHeartbeat)
		}
	}

	// Default fallback for unknown routes
	r.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"status": "ghost_404"})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Eslamed Logic Engine (Ghost Protocol Active) listening on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Critical Server Failure: %v", err)
	}
}






