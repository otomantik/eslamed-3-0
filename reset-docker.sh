#!/bin/bash

# ESLAMED Docker Reset Script
# Tüm container'ları durdurur, temizler ve yeniden kurar

set -e  # Hata durumunda durdur

echo "🔄 ESLAMED Docker Reset Başlatılıyor..."

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. Docker container'larını durdur
echo -e "${YELLOW}📦 Docker container'ları durduruluyor...${NC}"
docker-compose -f docker-compose.production.yml down 2>/dev/null || true
docker-compose down 2>/dev/null || true

# 2. Eski image'ları temizle (opsiyonel - disk alanı açmak için)
read -p "Eski Docker image'ları silmek istiyor musunuz? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🗑️  Eski image'lar temizleniyor...${NC}"
    docker system prune -a -f --volumes
else
    echo -e "${BLUE}⏭️  Image temizliği atlandı${NC}"
fi

# 3. Nginx config dosyasını düzelt
echo -e "${YELLOW}⚙️  Nginx config dosyası düzeltiliyor...${NC}"
NGINX_CONFIG="/etc/nginx/sites-available/eslamed"

# HTTP-only config'i kopyala
if [ -f "nginx.conf.example.http-only" ]; then
    sudo cp nginx.conf.example.http-only "$NGINX_CONFIG"
    echo -e "${GREEN}✅ Nginx config dosyası oluşturuldu: $NGINX_CONFIG${NC}"
else
    echo -e "${RED}❌ nginx.conf.example.http-only dosyası bulunamadı!${NC}"
    exit 1
fi

# Nginx sites-enabled linkini kontrol et
NGINX_ENABLED="/etc/nginx/sites-enabled/eslamed"
if [ ! -L "$NGINX_ENABLED" ]; then
    echo -e "${YELLOW}🔗 Nginx symlink oluşturuluyor...${NC}"
    sudo ln -s "$NGINX_CONFIG" "$NGINX_ENABLED"
fi

# Nginx config test
echo -e "${YELLOW}🧪 Nginx config test ediliyor...${NC}"
if sudo nginx -t; then
    echo -e "${GREEN}✅ Nginx config geçerli${NC}"
else
    echo -e "${RED}❌ Nginx config hatası! Lütfen kontrol edin.${NC}"
    exit 1
fi

# Nginx'i yeniden başlat
echo -e "${YELLOW}🔄 Nginx yeniden başlatılıyor...${NC}"
sudo systemctl restart nginx
sudo systemctl status nginx --no-pager | head -5

# 4. Docker image'ları build et
echo -e "${YELLOW}🔨 Docker image'ları build ediliyor...${NC}"
docker-compose -f docker-compose.production.yml build --no-cache

# 5. Container'ları başlat
echo -e "${YELLOW}🚀 Container'lar başlatılıyor...${NC}"
docker-compose -f docker-compose.production.yml up -d

# 6. Logları göster ve bekle
echo -e "${YELLOW}⏳ Container'ların başlaması bekleniyor (15 saniye)...${NC}"
sleep 15

# 7. Health check
echo -e "${YELLOW}🏥 Health check yapılıyor...${NC}"

# Frontend kontrolü
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend çalışıyor (http://localhost:3000)${NC}"
else
    echo -e "${YELLOW}⚠️  Frontend henüz hazır değil (build sürebilir)${NC}"
fi

# Backend kontrolü
if curl -f http://localhost:8080/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend çalışıyor (http://localhost:8080)${NC}"
else
    echo -e "${YELLOW}⚠️  Backend health endpoint'i yanıt vermiyor (normal olabilir)${NC}"
fi

# ClickHouse kontrolü
if curl -f http://localhost:8123/ping > /dev/null 2>&1; then
    echo -e "${GREEN}✅ ClickHouse çalışıyor (http://localhost:8123)${NC}"
else
    echo -e "${RED}❌ ClickHouse yanıt vermiyor${NC}"
fi

# 8. Container durumları
echo -e "${BLUE}📊 Container durumları:${NC}"
docker-compose -f docker-compose.production.yml ps

# 9. Son loglar
echo -e "${YELLOW}📋 Son 10 log satırı:${NC}"
docker-compose -f docker-compose.production.yml logs --tail=10

echo ""
echo -e "${GREEN}✅ Reset tamamlandı!${NC}"
echo ""
echo "Kullanışlı komutlar:"
echo "  Logları görüntüle: docker-compose -f docker-compose.production.yml logs -f"
echo "  Container'ları durdur: docker-compose -f docker-compose.production.yml down"
echo "  Container'ları yeniden başlat: docker-compose -f docker-compose.production.yml restart"
echo "  Nginx logları: sudo tail -f /var/log/nginx/error.log"
echo "  Nginx durumu: sudo systemctl status nginx"
echo "  Disk kullanımı: docker system df"

