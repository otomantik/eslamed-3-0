# Multi-stage build for Go Backend
FROM golang:alpine AS builder

# Set Go Env
ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64

WORKDIR /app

# Dependency Caching
COPY go.mod go.sum ./
RUN go mod download

# Build
COPY . .
RUN go build -o server ./cmd/server/main.go

# Production Image
FROM alpine:latest
RUN apk --no-cache add ca-certificates

WORKDIR /root/
COPY --from=builder /app/server .

EXPOSE 8080
CMD ["./server"]
