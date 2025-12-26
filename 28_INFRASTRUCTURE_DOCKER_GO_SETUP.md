# 28_INFRASTRUCTURE_DOCKER_GO_SETUP.md
## HYBRID BUILD ARCHITECTURE
**Constraint:** Local machine is Windows/386 (32-bit).
**Strategy:** REMOTE BUILD.
1. **Code:** Written locally in VS Code.
2. **Push:** Synced to Hetzner (Ubuntu 64-bit).
3. **Build:** Docker images built ON Hetzner.
**Server IP:** 46.224.152.92
**DB:** ClickHouse (Running on Hetzner Docker).