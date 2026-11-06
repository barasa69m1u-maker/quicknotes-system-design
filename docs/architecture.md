
---

### File 6: `docs/architecture.md`
*Location: `docs/architecture.md`*

```markdown
# QuickNotes System Architecture & Scaling Plan

## 1. Requirements

* **Functional Requirements:**
  * Users can authenticate, create, list, edit, and delete notes.
  * Notes can be tagged and searched efficiently.
* **Non-Functional Requirements:**
  * **High Availability:** 99.9% uptime for 1 million registered users.
  * **Low Latency:** Note reads load under 100ms.
  * **Scalability:** System handles traffic spikes without degradation.

---

## 2. Load Estimates (1 Million Users)

* **Assumptions:** 1,000,000 registered users; 10% active daily (100,000 DAU).
* **Reads per Second:** 100,000 users × 10 note reads/day = 1,000,000 reads/day ≈ **11.57 reads/sec** (Peak 5×: ~58 reads/sec).
* **Writes per Second:** 100,000 users × 2 writes/day = 200,000 writes/day ≈ **2.31 writes/sec** (Peak 5×: ~12 writes/sec).
* **Storage per Year:** 200,000 notes/day × 2 KB = 400 MB/day ≈ **146 GB/year**.

---

## 3. Architecture Diagram

```text
 [ Client (Web/Mobile) ]
           │
           ▼
       [  DNS  ]
           │
           ▼
   [ Load Balancer ] ──────────────────────┐
           │                               │
           ▼                               ▼
    [ App Servers ]                [  CDN Edge  ]
   ┌───────┴───────┐             (Static Assets)
   │               │
[ Cache ]   [ Message Queue ] ──> [ Worker ] ──> [ Email API ]
(Redis)       (RabbitMQ)
   │
   ▼
[ Primary DB ] <── (Replication) ── [ Read Replica ]