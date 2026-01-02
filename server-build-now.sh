#!/bin/bash
# ESLAMED Server Build Script - Domain Migration
# Bu script domain migration değişikliklerini build eder

set -e  # Hata durumunda dur

echo "🚀 ESLAMED Domain Migration Build Başlatılıyor..."
echo ""

# 1. Proje dizinine git
cd /opt/eslamed || { echo "❌ /opt/eslamed dizini bulunamadı!"; exit 1; }

# 2. Git pull (yeni kodları çek)
echo "📥 Git pull yapılıyor..."
git pull origin main || { echo "❌ Git pull başarısız!"; exit 1; }
echo "✅ Git pull tamamlandı"
echo ""

# 3. Eski container'ları durdur
echo "🛑 Frontend container'ı durduruluyor..."
docker-compose -f docker-compose.production.yml stop frontend || true
echo "✅ Container durduruldu"
echo ""

# 4. Frontend'i cache olmadan rebuild et
echo "🔨 Frontend rebuild başlatılıyor (cache olmadan)..."
echo "⏳ Bu işlem 2-5 dakika sürebilir..."
docker-compose -f docker-compose.production.yml build --no-cache frontend || { 
    echo "❌ Build başarısız!"; 
    exit 1; 
}
echo "✅ Frontend build tamamlandı"
echo ""

# 5. Container'ı başlat
echo "🚀 Frontend container'ı başlatılıyor..."
docker-compose -f docker-compose.production.yml up -d frontend || { 
    echo "❌ Container başlatılamadı!"; 
    exit 1; 
}
echo "✅ Container başlatıldı"
echo ""

# 6. Durumu kontrol et
echo "📊 Container durumu:"
docker-compose -f docker-compose.production.yml ps frontend
echo ""

# 7. Logları göster (ilk 20 satır)
echo "📋 Son loglar (ilk 20 satır):"
docker-compose -f docker-compose.production.yml logs --tail=20 frontend
echo ""

# 8. Health check
echo "🏥 Health check yapılıyor..."
sleep 5
if curl -f -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend sağlıklı (http://localhost:3000)"
else
    echo "⚠️  Frontend henüz hazır değil, logları kontrol edin:"
    echo "   docker-compose -f docker-compose.production.yml logs -f frontend"
fi
echo ""

echo "🎉 Build işlemi tamamlandı!"
echo ""
echo "📝 Sonraki adımlar:"
echo "   1. Logları izle: docker-compose -f docker-compose.production.yml logs -f frontend"
echo "   2. Siteyi test et: curl -I http://localhost:3000"
echo "   3. IP üzerinden test: http://46.224.152.92"

