# 🚀 ESLAMED Server Build Komutları

## 📍 Sunucu Bilgileri
- **Server IP:** 46.224.152.92
- **Proje Dizini:** `/opt/eslamed`
- **Docker Compose:** `docker-compose.production.yml`

---

## 🔄 Tam Rebuild (Önerilen - Yeni Kodlar İçin)

```bash
# 1. Proje dizinine git
cd /opt/eslamed

# 2. Git pull (yeni kodları çek)
git pull origin main

# 3. Eski container'ları durdur
docker-compose -f docker-compose.production.yml down

# 4. Frontend'i cache olmadan rebuild et
docker-compose -f docker-compose.production.yml build --no-cache frontend

# 5. Tüm container'ları başlat
docker-compose -f docker-compose.production.yml up -d

# 6. Durumu kontrol et
docker-compose -f docker-compose.production.yml ps

# 7. Logları izle (Ctrl+C ile çık)
docker-compose -f docker-compose.production.yml logs -f frontend
```

---

## ⚡ Hızlı Rebuild (Sadece Frontend)

```bash
cd /opt/eslamed
git pull origin main
docker-compose -f docker-compose.production.yml up -d --build frontend
docker-compose -f docker-compose.production.yml logs -f frontend
```

---

## 🔧 Sadece Backend Rebuild

```bash
cd /opt/eslamed
git pull origin main
docker-compose -f docker-compose.production.yml build --no-cache backend
docker-compose -f docker-compose.production.yml up -d backend
docker-compose -f docker-compose.production.yml logs -f backend
```

---

## 🧹 Temiz Rebuild (Tüm Image'ları Sil ve Yeniden Build)

```bash
cd /opt/eslamed

# Eski container'ları durdur
docker-compose -f docker-compose.production.yml down

# Eski image'ları sil
docker-compose -f docker-compose.production.yml down --rmi all

# Git pull
git pull origin main

# Tüm servisleri cache olmadan rebuild et
docker-compose -f docker-compose.production.yml build --no-cache

# Container'ları başlat
docker-compose -f docker-compose.production.yml up -d

# Durum kontrolü
docker-compose -f docker-compose.production.yml ps
```

---

## 📊 Durum Kontrol Komutları

```bash
# Container durumları
docker-compose -f docker-compose.production.yml ps

# Tüm loglar
docker-compose -f docker-compose.production.yml logs

# Sadece frontend logları
docker-compose -f docker-compose.production.yml logs frontend

# Canlı log takibi
docker-compose -f docker-compose.production.yml logs -f

# Disk kullanımı
df -h

# Docker disk kullanımı
docker system df

# Container resource kullanımı
docker stats
```

---

## 🧪 Test Komutları

```bash
# Frontend'i test et (localhost)
curl -I http://localhost:3000

# Nginx üzerinden test et
curl -I http://localhost

# Backend health check
curl http://localhost:8080/api/health

# ClickHouse ping
curl http://localhost:8123/ping
```

---

## 🚨 Sorun Giderme

### Container başlamıyorsa:
```bash
# Logları kontrol et
docker-compose -f docker-compose.production.yml logs frontend

# Container'ı yeniden başlat
docker-compose -f docker-compose.production.yml restart frontend

# Container'ı sil ve yeniden oluştur
docker-compose -f docker-compose.production.yml up -d --force-recreate frontend
```

### Disk doluysa:
```bash
# Docker temizliği
docker system prune -a --volumes

# Eski image'ları temizle
docker image prune -a
```

### Port çakışması varsa:
```bash
# Port kullanımını kontrol et
netstat -tulpn | grep :3000
netstat -tulpn | grep :8080

# Nginx'i yeniden başlat
systemctl restart nginx
```

---

## 📝 Tek Satırlık Hızlı Deploy

```bash
cd /opt/eslamed && git pull origin main && docker-compose -f docker-compose.production.yml down && docker-compose -f docker-compose.production.yml build --no-cache frontend && docker-compose -f docker-compose.production.yml up -d && docker-compose -f docker-compose.production.yml logs -f frontend
```

---

## 🔐 Environment Variables (Eğer .env dosyası varsa)

```bash
# .env dosyasını kontrol et
cat .env

# .env dosyasını düzenle
nano .env

# Değişikliklerden sonra container'ları yeniden başlat
docker-compose -f docker-compose.production.yml up -d
```

