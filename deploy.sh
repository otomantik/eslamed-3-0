#!/bin/bash

# ESLAMED Production Deployment Script
# Hetzner Server için deployment scripti

set -e  # Hata durumunda durdur

echo "🚀 ESLAMED Production Deployment Başlatılıyor..."

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Kontroller
if [ ! -f ".env.production" ]; then
    echo -e "${RED}❌ .env.production dosyası bulunamadı!${NC}"
    echo "Lütfen .env.production.example dosyasını kopyalayıp .env.production olarak kaydedin ve değerleri doldurun."
    exit 1
fi

# Docker kontrolü
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker yüklü değil!${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose yüklü değil!${NC}"
    exit 1
fi

# Eski container'ları durdur
echo -e "${YELLOW}📦 Eski container'lar durduruluyor...${NC}"
docker-compose -f docker-compose.production.yml down || true

# Yeni image'ları build et
echo -e "${YELLOW}🔨 Docker image'ları build ediliyor...${NC}"
docker-compose -f docker-compose.production.yml build --no-cache

# Container'ları başlat
echo -e "${YELLOW}🚀 Container'lar başlatılıyor...${NC}"
docker-compose -f docker-compose.production.yml up -d

# Health check
echo -e "${YELLOW}🏥 Health check yapılıyor...${NC}"
sleep 10

# Frontend kontrolü
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend çalışıyor${NC}"
else
    echo -e "${RED}❌ Frontend yanıt vermiyor${NC}"
fi

# Backend kontrolü
if curl -f http://localhost:8080/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend çalışıyor${NC}"
else
    echo -e "${YELLOW}⚠️  Backend health endpoint'i yanıt vermiyor (normal olabilir)${NC}"
fi

# ClickHouse kontrolü
if curl -f http://localhost:8123/ping > /dev/null 2>&1; then
    echo -e "${GREEN}✅ ClickHouse çalışıyor${NC}"
else
    echo -e "${RED}❌ ClickHouse yanıt vermiyor${NC}"
fi

# Logları göster
echo -e "${YELLOW}📋 Son 20 log satırı:${NC}"
docker-compose -f docker-compose.production.yml logs --tail=20

echo ""
echo -e "${GREEN}✅ Deployment tamamlandı!${NC}"
echo ""
echo "Kullanışlı komutlar:"
echo "  Logları görüntüle: docker-compose -f docker-compose.production.yml logs -f"
echo "  Container'ları durdur: docker-compose -f docker-compose.production.yml down"
echo "  Container'ları yeniden başlat: docker-compose -f docker-compose.production.yml restart"
echo "  Disk kullanımı: docker system df"




