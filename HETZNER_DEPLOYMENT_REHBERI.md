# 🚀 Hetzner'de ESLAMED Deployment Rehberi

Bu rehber, ESLAMED platformunu Hetzner Cloud sunucusunda production ortamına almak için adım adım talimatlar içerir.

---

## 📋 Ön Gereksinimler

1. **Hetzner Cloud Hesabı** ve aktif sunucu
2. **Domain adı** (örn: eslamed.com) ve DNS ayarları
3. **SSH erişimi** sunucuya
4. **Docker ve Docker Compose** yüklü olmalı

---

## 🔧 1. Sunucu Hazırlığı

### 1.1 Sunucuya Bağlanın

```bash
ssh root@your-server-ip
```

### 1.2 Sistem Güncellemesi

```bash
apt update && apt upgrade -y
```

### 1.3 Docker Kurulumu

```bash
# Docker kurulumu
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Docker Compose kurulumu
apt install docker-compose -y

# Docker servisini başlat
systemctl start docker
systemctl enable docker

# Kullanıcıyı docker grubuna ekle (root değilseniz)
usermod -aG docker $USER
```

### 1.4 Gerekli Paketler

```bash
apt install -y curl wget git nginx certbot python3-certbot-nginx
```

---

## 📦 2. Projeyi Sunucuya Aktarma

### 2.1 Git ile Clone (Önerilen)

```bash
cd /opt
git clone https://github.com/your-username/eslamed.git
cd eslamed
```

### 2.2 Manuel Upload (Alternatif)

Projeyi ZIP olarak indirip sunucuya yükleyebilirsiniz:

```bash
cd /opt
# Proje dosyalarını buraya yükleyin
```

---

## ⚙️ 3. Environment Variables Ayarlama

### 3.1 Production Environment Dosyası Oluşturma

```bash
cd /opt/eslamed
cp .env.production.example .env.production
nano .env.production
```

### 3.2 Gerekli Değerleri Doldurun

```bash
# Domain ve URL'ler
CLIENT_URL=https://eslamed.com
NEXT_PUBLIC_API_URL=https://api.eslamed.com

# ClickHouse Database
CLICKHOUSE_PASSWORD=guclu_sifre_buraya
CLICKHOUSE_PHONE_SECRET=buraya_cok_gizli_ve_uzun_bir_yazi_yaz_degistirin

# Diğer API key'ler (opsiyonel)
OPENAI_API_KEY=your-key-here
TELEGRAM_BOT_TOKEN=your-token-here
# ...
```

**ÖNEMLİ:** `CLICKHOUSE_PHONE_SECRET` değerini mutlaka değiştirin! Güvenlik için kritik.

---

## 🐳 4. Docker Container'ları Başlatma

### 4.1 Deployment Script'i Çalıştırma

```bash
chmod +x deploy.sh
./deploy.sh
```

### 4.2 Manuel Başlatma (Alternatif)

```bash
docker-compose -f docker-compose.production.yml up -d --build
```

### 4.3 Logları Kontrol Etme

```bash
# Tüm loglar
docker-compose -f docker-compose.production.yml logs -f

# Sadece frontend
docker-compose -f docker-compose.production.yml logs -f frontend

# Sadece backend
docker-compose -f docker-compose.production.yml logs -f backend
```

---

## 🌐 5. Nginx Reverse Proxy Kurulumu

### 5.1 Nginx Config Dosyası Oluşturma

```bash
cp nginx.conf.example /etc/nginx/sites-available/eslamed
nano /etc/nginx/sites-available/eslamed
```

**ÖNEMLİ:** `server_name` değerini kendi domain'inizle değiştirin!

### 5.2 Site'ı Aktifleştirme

```bash
ln -s /etc/nginx/sites-available/eslamed /etc/nginx/sites-enabled/
nginx -t  # Config testi
systemctl restart nginx
```

---

## 🔒 6. SSL Sertifikası (Let's Encrypt)

### 6.1 SSL Sertifikası Alma

```bash
certbot --nginx -d eslamed.com -d www.eslamed.com
```

Certbot otomatik olarak:
- SSL sertifikası alacak
- Nginx config'ini güncelleyecek
- Otomatik yenileme ayarlayacak

### 6.2 SSL Yenileme Testi

```bash
certbot renew --dry-run
```

---

## ✅ 7. Deployment Kontrolü

### 7.1 Servislerin Çalıştığını Kontrol Edin

```bash
# Docker container'ları
docker-compose -f docker-compose.production.yml ps

# Nginx durumu
systemctl status nginx

# Port kontrolü
netstat -tulpn | grep -E '3000|8080|8123'
```

### 7.2 Health Check Endpoint'leri

```bash
# Frontend
curl http://localhost:3000

# Backend (eğer health endpoint varsa)
curl http://localhost:8080/api/health

# ClickHouse
curl http://localhost:8123/ping
```

### 7.3 Domain Üzerinden Test

Tarayıcınızda `https://eslamed.com` adresini açın ve siteyi kontrol edin.

---

## 🔄 8. Güncelleme ve Bakım

### 8.1 Kod Güncellemesi

```bash
cd /opt/eslamed
git pull  # Eğer Git kullanıyorsanız
./deploy.sh  # Yeniden deploy
```

### 8.2 Container'ları Yeniden Başlatma

```bash
docker-compose -f docker-compose.production.yml restart
```

### 8.3 Logları Temizleme

```bash
# Eski logları temizle
docker-compose -f docker-compose.production.yml logs --tail=100 > logs_backup.txt
docker system prune -f
```

### 8.4 Disk Kullanımı Kontrolü

```bash
# Docker disk kullanımı
docker system df

# ClickHouse veri boyutu
docker exec eslamed-clickhouse-1 du -sh /var/lib/clickhouse
```

---

## 🚨 9. Sorun Giderme

### 9.1 Container Başlamıyorsa

```bash
# Logları kontrol edin
docker-compose -f docker-compose.production.yml logs

# Container'ı yeniden build edin
docker-compose -f docker-compose.production.yml build --no-cache
docker-compose -f docker-compose.production.yml up -d
```

### 9.2 Port Çakışması

```bash
# Hangi process port kullanıyor?
lsof -i :3000
lsof -i :8080

# Process'i durdurun
kill -9 <PID>
```

### 9.3 Nginx 502 Hatası

```bash
# Nginx error loglarını kontrol edin
tail -f /var/log/nginx/error.log

# Frontend container'ının çalıştığını kontrol edin
docker-compose -f docker-compose.production.yml ps frontend
```

### 9.4 SSL Sertifikası Sorunları

```bash
# Sertifika durumunu kontrol edin
certbot certificates

# Manuel yenileme
certbot renew --force-renewal
systemctl reload nginx
```

---

## 📊 10. Monitoring ve Backup

### 10.1 Log Monitoring

```bash
# Real-time log takibi
docker-compose -f docker-compose.production.yml logs -f --tail=50
```

### 10.2 ClickHouse Backup

```bash
# ClickHouse verilerini yedekleme
docker exec eslamed-clickhouse-1 clickhouse-client --query "BACKUP DATABASE eslamed TO Disk('backups', 'backup_$(date +%Y%m%d).zip')"
```

### 10.3 Docker Volume Backup

```bash
# Volume'ları yedekleme
docker run --rm -v eslamed_clickhouse_data:/data -v $(pwd):/backup alpine tar czf /backup/clickhouse_backup_$(date +%Y%m%d).tar.gz /data
```

---

## 🔐 11. Güvenlik Önerileri

1. **Firewall Kurulumu:**
   ```bash
   ufw allow 22/tcp    # SSH
   ufw allow 80/tcp    # HTTP
   ufw allow 443/tcp   # HTTPS
   ufw enable
   ```

2. **SSH Key Authentication:** Password yerine SSH key kullanın

3. **Fail2Ban Kurulumu:** Brute force saldırılarına karşı koruma
   ```bash
   apt install fail2ban -y
   systemctl enable fail2ban
   ```

4. **Düzenli Güncellemeler:**
   ```bash
   apt update && apt upgrade -y
   ```

---

## 📞 Destek

Sorun yaşarsanız:

1. Logları kontrol edin: `docker-compose -f docker-compose.production.yml logs`
2. Health check'leri çalıştırın
3. Nginx error loglarını inceleyin: `/var/log/nginx/error.log`

---

## ✅ Deployment Checklist

- [ ] Sunucu hazırlandı (Docker, Nginx kurulu)
- [ ] Proje sunucuya aktarıldı
- [ ] `.env.production` dosyası oluşturuldu ve dolduruldu
- [ ] Docker container'ları başlatıldı ve çalışıyor
- [ ] Nginx reverse proxy yapılandırıldı
- [ ] SSL sertifikası alındı ve aktif
- [ ] Domain DNS ayarları yapıldı
- [ ] Site https://eslamed.com üzerinden erişilebilir
- [ ] Health check'ler başarılı
- [ ] Loglar temiz görünüyor

---

**Başarılar! 🎉**



