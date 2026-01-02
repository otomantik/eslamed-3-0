# 🚀 ESLAMED Sunucu Deployment Komutları

## 📋 Hızlı Başlangıç

### 1. Sunucuya Bağlanma
```bash
ssh root@your-server-ip
# veya
ssh root@eslamed.com
```

---

## 🔄 Git Pull & Deployment

### Seçenek 1: Otomatik Deployment Script (Önerilen)
```bash
# Proje dizinine git
cd /path/to/eslamed

# Git pull yap
git pull origin main

# Deployment script'ini çalıştır
chmod +x deploy.sh
./deploy.sh
```

### Seçenek 2: Manuel Docker Compose
```bash
# Proje dizinine git
cd /path/to/eslamed

# Git pull
git pull origin main

# Eski container'ları durdur
docker-compose -f docker-compose.production.yml down

# Yeni image'ları build et (cache olmadan)
docker-compose -f docker-compose.production.yml build --no-cache

# Container'ları başlat
docker-compose -f docker-compose.production.yml up -d

# Logları kontrol et
docker-compose -f docker-compose.production.yml logs -f
```

---

## 🐳 Docker Komutları

### Container Yönetimi
```bash
# Tüm container'ları durdur
docker-compose -f docker-compose.production.yml down

# Container'ları başlat
docker-compose -f docker-compose.production.yml up -d

# Container'ları yeniden başlat
docker-compose -f docker-compose.production.yml restart

# Belirli bir service'i yeniden başlat (örn: frontend)
docker-compose -f docker-compose.production.yml restart frontend

# Container'ları durdur (data silmeden)
docker-compose -f docker-compose.production.yml stop

# Container'ları başlat (durmuş olanları)
docker-compose -f docker-compose.production.yml start
```

### Loglar
```bash
# Tüm logları görüntüle (follow mode)
docker-compose -f docker-compose.production.yml logs -f

# Sadece frontend logları
docker-compose -f docker-compose.production.yml logs -f frontend

# Sadece backend logları
docker-compose -f docker-compose.production.yml logs -f backend

# Son 100 satır
docker-compose -f docker-compose.production.yml logs --tail=100

# Belirli bir service'in son logları
docker-compose -f docker-compose.production.yml logs --tail=50 frontend
```

### Container Durumu
```bash
# Çalışan container'ları listele
docker-compose -f docker-compose.production.yml ps

# Tüm container'ları listele (durmuş olanlar dahil)
docker ps -a

# Container resource kullanımı
docker stats
```

---

## 🏥 Health Check Komutları

### Servis Kontrolleri
```bash
# Frontend kontrolü (port 3000)
curl -f http://localhost:3000

# Backend health check (port 8080)
curl -f http://localhost:8080/api/health

# ClickHouse ping (port 8123)
curl -f http://localhost:8123/ping
```

### Docker Health Check
```bash
# Container health status
docker-compose -f docker-compose.production.yml ps

# Belirli bir container'ın health durumu
docker inspect --format='{{.State.Health.Status}}' eslamed-frontend-1
```

---

## 🧹 Temizlik Komutları

### Docker Temizliği
```bash
# Kullanılmayan image'ları sil
docker image prune -a

# Kullanılmayan container'ları sil
docker container prune

# Kullanılmayan volume'ları sil (DİKKAT: Data kaybı olabilir)
docker volume prune

# Tüm kullanılmayan kaynakları temizle
docker system prune -a

# Disk kullanımını göster
docker system df
```

### Log Temizliği
```bash
# Container loglarını temizle (sadece görüntüleme, log dosyaları silinmez)
# Log dosyaları için:
find /var/lib/docker/containers/ -name "*.log" -type f -delete

# Docker Compose log limit (docker-compose.yml'de ayarlanmalı)
# logging:
#   driver: "json-file"
#   options:
#     max-size: "10m"
#     max-file: "3"
```

---

## 🔍 Debug Komutları

### Container İçine Girme
```bash
# Frontend container'ına gir
docker-compose -f docker-compose.production.yml exec frontend sh

# Backend container'ına gir
docker-compose -f docker-compose.production.yml exec backend sh

# ClickHouse container'ına gir
docker-compose -f docker-compose.production.yml exec clickhouse bash
```

### Container Çalıştırma (Test İçin)
```bash
# Yeni bir container'ı interaktif modda çalıştır
docker-compose -f docker-compose.production.yml run --rm frontend sh

# Environment variable'ları görüntüle
docker-compose -f docker-compose.production.yml config
```

### Log Analizi
```bash
# Hata içeren logları filtrele
docker-compose -f docker-compose.production.yml logs | grep -i error

# Son 1 saatteki loglar
docker-compose -f docker-compose.production.yml logs --since 1h

# Belirli bir tarihten itibaren
docker-compose -f docker-compose.production.yml logs --since "2025-01-01T00:00:00"
```

---

## 🔐 Environment Variables

### .env.production Dosyası
```bash
# .env.production dosyasını düzenle
nano .env.production
# veya
vi .env.production

# Environment variable'ları kontrol et
cat .env.production | grep -v "^#" | grep -v "^$"
```

### Önemli Environment Variables
```bash
# ClickHouse
CLICKHOUSE_PASSWORD=your_password
CLICKHOUSE_PHONE_SECRET=your_secret_key

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8080
CLIENT_URL=https://eslamed.com

# Backend API Keys
OPENAI_API_KEY=your_key
DEEPSEEK_API_KEY=your_key
GEMINI_API_KEY=your_key

# Telegram (opsiyonel)
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_SALIH_CHAT_ID=your_chat_id

# Grafana (opsiyonel)
GRAFANA_USER=admin
GRAFANA_PASSWORD=your_password
```

---

## 📊 Monitoring Komutları

### Resource Kullanımı
```bash
# CPU ve Memory kullanımı
docker stats --no-stream

# Disk kullanımı
df -h
du -sh /var/lib/docker

# Network kullanımı
docker network ls
docker network inspect eslamed-network
```

### Process Monitoring
```bash
# Çalışan process'leri göster
ps aux | grep docker

# Container process'leri
docker top eslamed-frontend-1
docker top eslamed-backend-1
```

---

## 🚨 Acil Durum Komutları

### Servis Yeniden Başlatma
```bash
# Tüm servisleri hızlıca yeniden başlat
docker-compose -f docker-compose.production.yml restart

# Sadece frontend'i yeniden başlat (en sık yapılan)
docker-compose -f docker-compose.production.yml restart frontend

# Container'ı tamamen yeniden oluştur
docker-compose -f docker-compose.production.yml up -d --force-recreate frontend
```

### Rollback (Önceki Versiyona Dönme)
```bash
# Önceki commit'e dön
cd /path/to/eslamed
git log --oneline  # Commit hash'lerini gör
git checkout <previous-commit-hash>

# Deployment script'ini çalıştır
./deploy.sh

# Veya manuel olarak
docker-compose -f docker-compose.production.yml down
docker-compose -f docker-compose.production.yml build --no-cache
docker-compose -f docker-compose.production.yml up -d
```

### Database Backup (ClickHouse)
```bash
# ClickHouse container'ına gir
docker-compose -f docker-compose.production.yml exec clickhouse bash

# Backup al
clickhouse-client --query "BACKUP DATABASE eslamed TO Disk('backups', 'backup_$(date +%Y%m%d_%H%M%S).zip')"

# Backup'ı dışarı kopyala
docker cp eslamed-clickhouse-1:/var/lib/clickhouse/backups/backup_*.zip /backup/path/
```

---

## 🔄 Git İşlemleri (Sunucuda)

```bash
# Proje dizinine git
cd /path/to/eslamed

# Değişiklikleri kontrol et
git status

# Son commit'leri gör
git log --oneline -10

# Yeni değişiklikleri çek
git pull origin main

# Conflict varsa
git stash
git pull origin main
git stash pop
```

---

## 🌐 Nginx Reverse Proxy (Eğer Kullanılıyorsa)

```bash
# Nginx config'i düzenle
sudo nano /etc/nginx/sites-available/eslamed

# Nginx'i test et
sudo nginx -t

# Nginx'i yeniden yükle
sudo systemctl reload nginx

# Nginx logları
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 📝 Örnek Deployment Workflow

```bash
# 1. Sunucuya bağlan
ssh root@your-server-ip

# 2. Proje dizinine git
cd /root/eslamed  # veya proje dizininiz neredeyse

# 3. Git pull
git pull origin main

# 4. Deployment (otomatik script)
./deploy.sh

# VEYA manuel:
# 5a. Container'ları durdur
docker-compose -f docker-compose.production.yml down

# 5b. Build et
docker-compose -f docker-compose.production.yml build --no-cache

# 5c. Başlat
docker-compose -f docker-compose.production.yml up -d

# 6. Logları kontrol et
docker-compose -f docker-compose.production.yml logs -f frontend

# 7. Health check
curl -f http://localhost:3000
```

---

## ⚡ Hızlı Komut Referansı

| İşlem | Komut |
|-------|-------|
| **Deploy** | `./deploy.sh` |
| **Pull & Deploy** | `git pull && ./deploy.sh` |
| **Restart Frontend** | `docker-compose -f docker-compose.production.yml restart frontend` |
| **View Logs** | `docker-compose -f docker-compose.production.yml logs -f` |
| **Check Status** | `docker-compose -f docker-compose.production.yml ps` |
| **Health Check** | `curl -f http://localhost:3000` |
| **Clean Up** | `docker system prune -a` |

---

## 🎯 Önerilen Deployment Stratejisi

1. **Test Ortamında Dene** (eğer varsa)
2. **Production'a Git Pull Yap**
3. **Deploy Script Çalıştır** (`./deploy.sh`)
4. **Logları İzle** (ilk 2-3 dakika)
5. **Health Check Yap**
6. **Canlı Siteyi Test Et**

---

**Not:** Tüm komutlar production environment için hazırlanmıştır. Development ortamında `docker-compose.yml` (production olmayan) kullanılabilir.

