# 🧠 24_AI_CONTENT_PROMPTS.md (The Neural Core)

![Logic](https://img.shields.io/badge/Logic-Chain_of_Thought-red?style=flat-square)
![Context](https://img.shields.io/badge/Context-Adaptive_Conversion-blue?style=flat-square)
![Engine](https://img.shields.io/badge/Orchestrator-Deep_Neural_Chains-green?style=flat-square)

> **"Content is not static; it is a conversation between the user's panic and our server's wisdom. We use Multi-Model Reasoning to achieve visual and textual dominance."**

---

## 🏗️ 1. CHAIN-OF-THOUGHT (CoT) ORCHESTRATION

Sıradan promptlar yerine, AI'ya "Düşünme Süreçleri" (CoT) tanımlıyoruz.

### Prompt: "The Medical Empathy Chain" (GPT-4o)
**Task:** Analyze the user's search intent before writing.
```text
[Reasoning Path]
1. Identify the 'Medical Urgency Level' (1-10).
2. Is the user the patient or a relative? (Relative = Fear focused, Patient = Comfort focused).
3. Cross-reference 'Search Term' from ClickHouse logs.
4. Generate 3 variations of the Hero section:
   - Variation A: 'The Hero' (Focused on Salih's speed).
   - Variation B: 'The Expert' (Focused on machine reliability).
   - Variation C: 'The Local' (Focused on being inside {{district}}).
[Constraint]
Use 'Turkish Medical Slang' naturally (e.g., 'cihazın ses yapması', 'hava kaçırması').
🧬 2. DEEPSEEK: THE HIGH-VOLUME SEMANTIC MESH
Target: Generating 156+ District pages with "Zero Footprint" of AI.

Plaintext

Prompt: "Write an authoritative medical-technical guide for {{district}}. 
But first, simulate a 20-year respiratory technician's internal monologue: 
'I've seen many old machines fail in these apartments near {{landmark}}...'
Integrate this monologue's insights into the article.
Use the keywords 'dolum yeri', 'oksijen tüpü kaç para', 'en yakın medikal' based on our Ads report."
🧪 3. DYNAMIC CTA ENGINE: THE "FEAR-REDUCER"
Goal: Create a CTA that changes based on the Time of Day and ClickHouse Historical Data.

Plaintext

Prompt: "It is currently {{current_time}}. Historically, users in {{district}} who searched for '{{query}}' at this hour are looking for '{{predicted_need}}'.
Create a CTA button text (max 25 chars) and a sub-text (max 60 chars) that resolves this specific anxiety."
📡 4. SLACK & TELEGRAM NOTIFICATION BRAIN (The "Salih Whisperer")
Salih'e bildirim giderken AI arkada şu analizi yapar:

Plaintext

Prompt: "A new lead from {{district}}. 
Context: They came from the 'Noise' article. They spent 45 seconds on the 'Repair Prices' section.
Advice for Salih: 'Abi, bu müşteri cihazın sesinden bıkmış. Direkt yeni nesil 'Sessiz Cihaz' (Quiet-Tech) kiralama teklifiyle gir. Ümraniye şubesinde stokta 2 tane var dersen hemen kapatırsın'."
🛡️ 5. RECURSIVE SELF-HEALING (The "Ghost" Optimizer)
Eğer bir sayfanın Bounce Rate'i (Hemen Çıkma Oranı) yüksekse, AI sayfayı "Kendi kendine" analiz eder:

Plaintext

Input: [Current Page HTML] + [ClickHouse Bounce Logs]
Task: "Why are users leaving? Is the font too clinical? Is the CTA too aggressive? 
Rewrite the 'Above the Fold' (İlk ekran) content to reduce friction. 
Current Goal: Increase trust signals for {{district}} residents."
📊 6. PAGESPEED ADAPTIVE PROMPT
Logic: Eğer sayfa hızı 90'ın altındaysa (PageSpeed API), AI görsel alt taglerini ve metin yoğunluğunu optimize eder.

Plaintext

Prompt: "The page is heavy (LCP: {{lcp}}). 
Task: Synthesize the technical description of the Oxygen Machine into a more concise, bulleted list. 
Ensure the keywords are still 100% present but the DOM node count is reduced by 30%."

---

### 📂 Proje Klasör Yapısı (The Fortress Directory)

Hetzner ve Docker için bu yapıyı kuracağız:

```text
/eslamed-2.0
├── /apps
│   └── /web (Next.js 14 App Router)
├── /backend
│   ├── /api (Go Handlers)
│   ├── /ingestion (The Ghost Tracker)
│   ├── /ai-orchestrator (Prompt Chains)
│   └── /notify (Telegram & Slack)
├── /db
│   └── /clickhouse (Schema & Migrations)
├── /docker
│   ├── docker-compose.yml
│   └── /grafana (Optional: Trinity Monitor)
├── .env.local (The Master Keys)
└── master_protocol.md (Files 01-26)