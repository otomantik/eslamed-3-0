#!/bin/bash
# ESLAMED Network Fix Script
# Bu script yanlış label'a sahip network'ü siler ve yeniden oluşturur

echo "🔍 Mevcut network'leri kontrol ediliyor..."
docker network ls | grep eslamed

echo ""
echo "🛑 Container'ları durduruluyor..."
docker-compose -f docker-compose.production.yml down

echo ""
echo "🗑️  Eski network siliniyor..."
docker network rm eslamed-network 2>/dev/null || echo "Network zaten yok veya kullanılıyor"

echo ""
echo "⏳ Kısa bir bekleme (network'ün tamamen temizlenmesi için)..."
sleep 2

echo ""
echo "🔧 Container'ları yeniden başlatılıyor (network otomatik oluşturulacak)..."
docker-compose -f docker-compose.production.yml up -d

echo ""
echo "✅ Network durumu:"
docker network ls | grep eslamed

echo ""
echo "📊 Container durumları:"
docker-compose -f docker-compose.production.yml ps

