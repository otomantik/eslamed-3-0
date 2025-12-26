# 04_CUSTOM_TRACKING_LIB.md
## GHOST TRACKER (Client Side)
**Strategy:** Masquerade as a CSS file request to bypass ad blockers.
**Target Endpoint:** POST https://eslamed.com/api/track/style.css
**Payload:** JSON disguised as binary stream.
**Logic:**
1. Collect user data (Mouse, Device, Referrer).
2. Send to /api/track/style.css asynchronously.
3. Handle 200 OK silent response.