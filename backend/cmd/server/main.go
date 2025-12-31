package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"eslamed/backend/internal/clickhouse"
	"eslamed/backend/internal/ingestion"
)

func main() {
	// Initialize Gin
	gin.SetMode(gin.ReleaseMode)
	router := gin.New()
	router.Use(gin.Recovery())

	// Initialize ClickHouse client + ingestion handler
	chClient, err := clickhouse.NewClientFromEnv()
	if err != nil {
		log.Fatalf("Failed to initialize ClickHouse client: %v", err)
	}
	defer func() {
		_ = chClient.Close()
	}()

	ingestHandler := ingestion.NewHandler(chClient)

	// 👻 GHOST PROTOCOL ENTRY POINT
	// Listening for the camouflaged request directly
	router.POST("/api/track/style.css", ingestHandler.HandleGhostIngest)

	// Health Check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "alive"})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Eslamed 3.0 Backend listening on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Server Failed: %v", err)
	}
}
