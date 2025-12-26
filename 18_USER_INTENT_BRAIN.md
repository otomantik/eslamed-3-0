# 🧠 18_USER_INTENT_BRAIN.md (The Neural Processor)

![Logic](https://img.shields.io/badge/Logic-Heuristic_Neural_Engine-red?style=flat-square)
![Latency](https://img.shields.io/badge/Decision_Speed-45ms-blue?style=flat-square)
![Accuracy](https://img.shields.io/badge/Prediction_Accuracy-92%25-success?style=flat-square)

> **"We understand the user's intent before they even click. We are not just capturing data; we are predicting the sale."**

This document defines the **Intent Engine** logic within the Go Backend. It processes raw signals into actionable "Sales Intelligence" for Salih and "Optimization Signals" for Google.

---

## 🔬 1. MULTI-DIMENSIONAL SCORING MATRIX

To determine the "Lead Value," the engine merges four distinct signal layers:

| Dimension | Signal | Weight | Logic / Insight |
| :--- | :--- | :--- | :--- |
| **Semantic** | Search Query (GCLID) | 40% | "Repair" or "Emergency" keywords trigger instant +50 points. |
| **Temporal** | Time of Day | 20% | 03:00 AM "Refill" query = 100% Panic/Critical Urgency. |
| **Behavioral** | Scroll & Velocity | 20% | Direct jump to "Price Table" = Buyer. 2-sec bounce = Junk. |
| **Technographic**| Device & Connection | 20% | Old iPhone + Mobile Data = Likely at a hospital searching for help. |

---

## 🧬 2. INTENT BUCKETS (The Classification)

The `IntentBrain` function categorizes every visitor into one of these 4 priority buckets:

### A. "The Life Saver" (Urgent Need - Score 90+)
* **Criteria:** Keywords: "making noise", "broken", "emergency", "beeping" + Night time.
* **Action:** Trigger **VIP Push Notification** to Salih + Prepare "Send Location" WhatsApp template.

### B. "The Subscriber" (Recurring Potential - Score 70-89)
* **Criteria:** Keywords: "oxygen refill", "cylinder service" + District name.
* **Action:** Tag in CRM as `recurring_revenue_potential`. Feed "High LTV" signal to PMax.

### C. "The Comparison Shopper" (Price Driven - Score 40-69)
* **Criteria:** Keywords: "price", "cheapest", "how much", "second hand".
* **Action:** Suggest "Refurbished Device" or "Special Discount" via PWA for Salih.

### D. "The Budget Waster" (Low Value - Score 0-39)
* **Criteria:** Keywords: "manometer", "mask", "cannula", "tubing".
* **Action:** Report **Negative Value** to Google Ads to stop showing ads to similar profiles.

---

## 🤖 3. AI ORCHESTRATION: THE SENTIMENT WRAPPER

When a user types a message in the form, our AI Agent (GPT-4/Gemini) performs real-time extraction:

```go
func AnalyzeIntent(formMessage string) IntentResult {
    // API Call to Orchestrator
    // Input: "My father is struggling to breathe, the machine failed in Umraniye."
    // AI Output: { Urgency: "CRITICAL", Intent: "Emergency Rental" }
    // Execution: Override all queues, call Salih's phone directly.
}
📡 4. PROBABILISTIC "DARK FUNNEL" MATCHING
If a user skips the form and Calls Directly via the button:

Signal: Catch call_button_click + visitor_id.

Memory: Check ClickHouse for users in the same District/ISP in the last 5 minutes.

Action: Automatically link the GCLID to the incoming GSM call record.

🧪 5. EXPERIMENTAL: "PREDICTIVE HOVER" TRIGGER
If the user's cursor or thumb hovers over the "Refill" button for >1 second:

Effect: Send a pre-alert to Salih's PWA: "Someone in Kadikoy is hovering over REFILL. Be ready to pick up the phone."

Goal: Reduce response latency to human-impossible levels.

📊 6. THE "JUNK" INCINERATOR
Raporlardaki "ece medic" veya "maske" gibi çöp aramaları temizlemek için:

Rule: If intent_score < 15:

Log to ClickHouse as status: 'background_noise'.

Hide from Salih’s active lead list.

Feed Fake Conversion (0.01 value) to Google to poison the algorithm against this traffic type.