# 🔧 504 Gateway Timeout Hatası Çözüm Rehberi

## Hızlı Çözüm Adımları

### 1. Container Durumlarını Kontrol Edin

```bash
docker-compose -f docker-compose.production.yml ps
```

**Beklenen Durum:** Tüm container'lar `Up` ve `healthy` olmalı.

### 2. Frontend Loglarını İnceleyin

```bash
docker-compose -f docker-compose.production.yml logs -f frontend
```

**Kontrol Edilecekler:**
- Container başladı mı?
- "Ready" mesajı var mı?
- Hata mesajı var mı?

### 3. Frontend'in Çalıştığını Test Edin

```bash
curl http://localhost:3000
```

**Beklenen:** HTML içeriği dönmeli.

### 4. Nginx Error Loglarını Kontrol Edin

```bash
tail -f /var/log/nginx/error.log
```

**Olası Hatalar:**
- `upstream timed out` → Timeout ayarları çok kısa
- `connection refused` → Frontend çalışmıyor
- `no live upstreams` → Frontend container'ı down

---

## 🔄 Hızlı Düzeltmeler

### Çözüm 1: Frontend Container'ı Yeniden Başlatın

```bash
docker-compose -f docker-compose.production.yml restart frontend
sleep 10
curl http://localhost:3000
```

### Çözüm 2: Tüm Container'ları Yeniden Başlatın

```bash
docker-compose -f docker-compose.production.yml restart
sleep 15
systemctl restart nginx
```

### Çözüm 3: Frontend'i Yeniden Build Edin

```bash
docker-compose -f docker-compose.production.yml build --no-cache frontend
docker-compose -f docker-compose.production.yml up -d frontend
sleep 30
curl http://localhost:3000
```

### Çözüm 4: Nginx Timeout'larını Artırın

Nginx config dosyanızı düzenleyin (`/etc/nginx/sites-available/eslamed`):

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    # ... diğer ayarlar ...
    
    # Timeout'ları artırın
    proxy_connect_timeout 300s;
    proxy_send_timeout 300s;
    proxy_read_timeout 300s;
    
    proxy_buffering off;
    proxy_request_buffering off;
}
```

Sonra Nginx'i yeniden yükleyin:

```bash
nginx -t
systemctl reload nginx
```

---

## 🔍 Detaylı Diagnostik

### Otomatik Diagnostik Script'i Çalıştırın

```bash
chmod +x troubleshoot-504.sh
./troubleshoot-504.sh
```

Bu script şunları kontrol eder:
- ✅ Container durumları
- ✅ Frontend logları
- ✅ Port erişilebilirliği
- ✅ Nginx durumu
- ✅ Network bağlantıları

---

## 🐛 Yaygın Sorunlar ve Çözümleri

### Sorun 1: Frontend Container Başlamıyor

**Belirtiler:**
- Container durumu `Restarting` veya `Exited`
- Log'larda hata mesajları

**Çözüm:**
```bash
# Logları kontrol edin
docker-compose -f docker-compose.production.yml logs frontend

# Container'ı yeniden build edin
docker-compose -f docker-compose.production.yml build --no-cache frontend
docker-compose -f docker-compose.production.yml up -d frontend
```

### Sorun 2: Frontend Çok Yavaş Başlıyor

**Belirtiler:**
- Container `Up` ama `healthy` değil
- İlk istekler timeout oluyor

**Çözüm:**
- `docker-compose.production.yml` dosyasında `start_period: 120s` ayarlandı
- Health check retry sayısı artırıldı
- Frontend'in backend'e bağımlılığı kaldırıldı

### Sorun 3: Nginx Frontend'e Bağlanamıyor

**Belirtiler:**
- Nginx error log'da `connection refused`
- `curl localhost:3000` çalışıyor ama site çalışmıyor

**Çözüm:**
```bash
# Nginx config'i kontrol edin
nginx -t

# Nginx'i yeniden başlatın
systemctl restart nginx

# Port binding'i kontrol edin
netstat -tulpn | grep 3000
```

### Sorun 4: Memory/CPU Yetersiz

**Belirtiler:**
- Container'lar sürekli restart oluyor
- OOM (Out of Memory) hataları

**Çözüm:**
```bash
# Kaynak kullanımını kontrol edin
docker stats

# Eğer yetersizse, sunucu kaynaklarını artırın veya
# container limit'lerini ayarlayın
```

---

## ✅ Başarı Kontrolü

Tüm düzeltmelerden sonra şunları kontrol edin:

```bash
# 1. Container'lar çalışıyor mu?
docker-compose -f docker-compose.production.yml ps

# 2. Frontend erişilebilir mi?
curl -I http://localhost:3000

# 3. Nginx çalışıyor mu?
systemctl status nginx

# 4. Site açılıyor mu?
curl -I https://eslamed.com
```

**Beklenen Sonuçlar:**
- ✅ Tüm container'lar `Up` ve `healthy`
- ✅ `curl localhost:3000` HTML döndürüyor
- ✅ Nginx `active (running)`
- ✅ `curl https://eslamed.com` 200 OK döndürüyor

---

## 📞 Hala Çalışmıyorsa

1. **Tüm logları toplayın:**
   ```bash
   docker-compose -f docker-compose.production.yml logs > all_logs.txt
   tail -100 /var/log/nginx/error.log > nginx_errors.txt
   ```

2. **Sistem bilgilerini kontrol edin:**
   ```bash
   free -h
   df -h
   docker system df
   ```

3. **Container'ları tamamen yeniden başlatın:**
   ```bash
   docker-compose -f docker-compose.production.yml down
   docker-compose -f docker-compose.production.yml up -d
   ```

---

**Not:** `docker-compose.production.yml` dosyası güncellendi. Frontend artık backend'e bağımlı değil ve daha uzun timeout'larla başlıyor.




