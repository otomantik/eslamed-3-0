# ClickHouse Migration Fix Script
# Bu script'i PowerShell'de çalıştırın

Write-Host "🔍 Mevcut tablo yapısını kontrol ediliyor..." -ForegroundColor Yellow

# 1. Mevcut tablo yapısını göster
docker exec -it eslamed-clickhouse-1 clickhouse-client -q "DESCRIBE TABLE eslamed.stream_events"

Write-Host "`n📝 Eksik kolonları ekleniyor..." -ForegroundColor Yellow

# 2. Organization kolonunu ekle
docker exec -it eslamed-clickhouse-1 clickhouse-client -q "ALTER TABLE eslamed.stream_events ADD COLUMN IF NOT EXISTS organization LowCardinality(String) AFTER isp"

# 3. Scroll depth kolonunu ekle
docker exec -it eslamed-clickhouse-1 clickhouse-client -q "ALTER TABLE eslamed.stream_events ADD COLUMN IF NOT EXISTS scroll_depth UInt8 DEFAULT 0 AFTER intent_verdict"

# 4. Element ID kolonunu ekle
docker exec -it eslamed-clickhouse-1 clickhouse-client -q "ALTER TABLE eslamed.stream_events ADD COLUMN IF NOT EXISTS element_id String DEFAULT '' AFTER scroll_depth"

Write-Host "`n✅ Kolonlar eklendi! Kontrol ediliyor..." -ForegroundColor Green

# 5. Güncellenmiş tablo yapısını göster
docker exec -it eslamed-clickhouse-1 clickhouse-client -q "DESCRIBE TABLE eslamed.stream_events"

Write-Host "`n🎉 Migration tamamlandı!" -ForegroundColor Green











