# 🧪 25_CRO_EXPERIMENT_ROADMAP.md (The Conversion Lab)

![Experiment](https://img.shields.io/badge/Method-AI_Driven_AB_Testing-blueviolet?style=flat-square)
![Metric](https://img.shields.io/badge/KPI-Lead_Conversion_Rate-success?style=flat-square)
![Automation](https://img.shields.io/badge/Process-Autonomous_Optimization-orange?style=flat-square)

> **"Traffic is vanity. Conversion is sanity. We don't guess what works; we let the data from ClickHouse and the AI prove it."**

---

## 🏗️ 1. THE "NOISE-TO-SALE" EXPERIMENT (Urgency Optimization)

**Observation (from Report):** High clicks on "oksijen konsantratörü çok ses çıkarıyor".
**Hypothesis:** Users in panic need "Immediate Tech Support" rather than "Browse Products".

* **Variant A (Control):** Standard "Contact Us" button.
* **Variant B (Challenger):** Red, pulsing button: **"IS YOUR MACHINE BEEPING? CALL TECHNICIAN NOW."**
* **AI Task:** If the user landed from a "noise" related query, force Variant B and measure the Call-to-Click (CTC) ratio.

---

## 🧬 2. THE "TRUST VS. SPEED" TEST (Psychological Triggers)

**Target:** Refill pages (`/oksijen-tupu-dolumu`).

* **Experiment:**
    * **Group 1:** Focus on **Trust** (Showing Salih’s photo + "20 Years Experience").
    * **Group 2:** Focus on **Speed** (Showing a dynamic map + "Delivery in 30 Mins to {{district}}").
* **AI Decision:** If the visitor is on mobile (likely at home/hospital), show "Speed". If on Desktop (likely researching), show "Trust".

---

## 🧠 3. DYNAMIC FORM LENGTH EXPERIMENT

**Hypothesis:** High-value customers (Cihaz Satın Alma) are willing to fill 3 fields, but Emergency customers (Dolum) only want to click 1 button.

* **Variant A:** 3 fields (Name, Phone, District).
* **Variant B:** 1-Click WhatsApp Button only.
* **Orchestration:** AI tracks the "Form Abandonment Rate" in ClickHouse. If Variant B converts 20% better, it automatically becomes the default for all "Refill" intents.

---

## ⚡ 4. MICRO-INTERACTION EXPERIMENT (The "Pulse" Effect)

**Logic:** Adding subtle animations to CTA buttons to increase "Visual Gravity".

* **Experiment:** * No animation vs. **Subtle Pulse** every 3 seconds on the WhatsApp button.
* **Tracking:** Measure "Time to Click" (TTC). AI optimizes the pulse frequency for maximum attention without being annoying.

---

## 🕵️‍♂️ 5. EXIT-INTENT RECOVERY EXPERIMENT

**Trigger:** User moves mouse to close the tab.
**AI Prompt (File 24):** > "Generate a 'Wait' message for a user leaving the '/oksijen-makinesi-fiyatlari' page. Offer a 2nd-hand alternative since they might find new prices too high."

---

## 📊 6. THE "WINNER TAKES ALL" LOOP (Automation)

The Go Backend monitors the **ClickHouse `leads` table** every 24 hours.

1.  **Analyze:** Compare Variant A vs. Variant B conversion rates.
2.  **Declare Winner:** If P-value < 0.05 (Statistical significance), set the winner as the 100% traffic variant.
3.  **Log to Slack:** `[CRO_SUCCESS] Variant B (Speed Focus) increased leads by 14% in Umraniye.`

---

## 📝 7. THE CRO ROADMAP (Q1 2026)

* **Phase 1 (Week 1-2):** "Call vs. WhatsApp" button dominance test.
* **Phase 2 (Week 3-4):** "Local Landmark" vs. "General Map" trust test.
* **Phase 3 (Week 5-8):** AI-generated personalized Headlines based on Search Terms.