# SignAI — Full Project Context

This document contains everything from the original planning session between Akbar
and Samandar (April 14, 2026), including the conversation transcript, market research,
competitive analysis, technical decisions, and the roadmap. It exists so any new
developer or AI agent can understand the full context without needing the original chat.

---

## 1. The Founders

**Akbar (AkbarDevop)**
- Junior EE student at University of Missouri
- From Uzbekistan, builds AI tools
- Has Claude Max account ($100/mo) — the AI compute behind this project
- GitHub: AkbarDevop

**Samandar (SamnorFlutter)**
- Flutter/mobile developer
- Has a contact with a director who can evaluate the prototype
- Connected to Alisher Shayxov — a well-known figure in Uzbekistan who connects
  unsolved government problems with people who can solve them
- GitHub: SamnorFlutter

---

## 2. The Original Conversation (Transcript)

The founding conversation was recorded as an OGG voice memo in Uzbek (with Russian
and English mixed in). Here is the full transcript with timestamps and translation notes:

### Key Moments

**[00:25-00:51] — The core idea is stated:**
> Speaker 0 (Samandar): "Application bo'lishi kerak for mobile phone that includes
> the AI which translates from the languages to text and transfers it to sign language.
> Which will digitalize it with pictures or animations."

**[00:53-00:57] — AI, not humans:**
> Speaker 1 (Akbar): "So there won't be a person sitting on the other end?"
> Speaker 0: "No, AI will send it."

**[01:01-01:19] — The current state and what to change:**
> Speaker 0: "Right now, in the current active state, a person sits there — a translator,
> an interpreter — and translates. We need to replace that with artificial intelligence
> that's been trained and implemented."

**[01:21-01:30] — MVP mindset:**
> Speaker 0: "We need to try it first, see if the function works. Then improve it later."

**[01:30-01:44] — Samandar's key question:**
> Speaker 1: "Two things I don't understand. First, why haven't they already tried AI
> themselves? Even normal people using AI reduces costs by 95%."

**[01:44-02:17] — Competitive landscape check:**
> Speaker 1: "This problem should already be solved in America. There should be companies
> doing this." *Searches: "speech to sign language app platforms SaaS"*
> "There ARE such AI services. Speech to sign language SaaS platforms exist."

**[02:17-02:22] — But not for Uzbekistan:**
> Speaker 0: "It needs to be for Uzbekistan. If it's Uzbekistan's, how much would it split?"

**[02:28-02:43] — The business plan:**
> Speaker 0: "Right now we make a small prototype, I show it to that director I got the
> contact for. If it goes well, we either find investment or sell the project."

**[02:52-02:55] — Market timing:**
> Speaker 1: "The market is at the very beginning, bro."

**[03:07-03:30] — The Alisher Shayxov connection:**
> Speaker 0: "He's a person who, when someone comes with a problem or a project, he
> gathers everyone to make it happen. The government also gives him projects — unsolved
> ones that have been sitting in committees for years. He provides solutions."

**[03:30-03:52] — The Samarkand tourist angle:**
> Speaker 0: "In Samarkand they've already set up small buses at tourist sites, like
> golf carts, with QR codes. A company already did that. They also have accessibility
> features for disabled visitors — information about monuments. We can add our sign
> language AI to all of this."

**[04:43-05:00] — Implementation plan:**
> Speaker 1: "First we need to give context to Claude and talk through it."
> Speaker 0: "I don't have Claude."
> Speaker 1: "I have a Claude Max account, $100/month, lots of limits. The limit resets
> every 5 hours. I don't use it at night. Samandar can use it. We can share one chat."

**[06:04-06:16] — Working async:**
> Speaker 1: "It'll be hard for us to sit together at the same time. We both have other
> responsibilities. Finding common time is hard, efficiency would be very low. So let's
> work async — each of us builds, and we share what we need."

**[07:02-07:12] — The simplest MVP:**
> Speaker 0: "We need something very simple."
> Speaker 1: "Yeah, MVP, just to see if the function works. Could be done in 2 days with AI."
> Speaker 0: "Even if it just takes written text and converts it to sign language images,
> that's enough."

### Full Raw Transcript

```
[00:05-00:07] Speaker 0: Yes, lotin navani.
[00:07-00:08] Speaker 1: Ya, shu tuga.
[00:10-00:12] Speaker 0: Qilayapchi.
[00:13-00:14] Speaker 0: Qilayapchi.
[00:15-00:18] Speaker 0: Bu bo'yicha ana qarayapman.
[00:18-00:19] Speaker 1: O, ya. O'zi bo'yicha ham bor-ku.
[00:21-00:21] Speaker 1: Ya, gapiroq.
[00:26-00:32] Speaker 0: Application bo'lishi kerak for mobile phone that includes the AI which,
[00:33-00:43] Speaker 0: which translates from the languages to text and transfers it to yuzaki restav (sign language).
[00:43-00:44] Speaker 1: Ya.
[00:44-00:49] Speaker 0: Katoru bo'ladi digitalize it with pictures-
[00:50-00:50] Speaker 1: Ya, ya.
[00:50-00:52] Speaker 0: Or animations.
[00:52-00:54] Speaker 1: Oqib chiqmanda shunda odam o'tiradimi u yoqda? (So there's no person sitting on the other end?)
[00:55-00:58] Speaker 0: Yo'q, bizlarga AI yuboradi. (No, AI sends it to us.)
[00:58-01:01] Speaker 1: Ya, o'zi hozirgi men ko'rsatgan sizni nuqta ro'ying. (Yes, the one I showed you — sol-gos.ru)
[01:01-01:19] Speaker 0: Ha, hozirgi holatdagi aktiv holatida person o'tiradi, tarjimon, translator o'tiradi, tarjima qilib beradi. Bizga shuna artificial intellect training qilingan, implement qilingan berishni kerak. (Yes, currently a person sits there, an interpreter translates. We need to give them an AI that's been trained and implemented instead.)
[01:22-01:30] Speaker 0: Biz hozir funksiyani ishlatib olamizmi yo'qmi, shuni qilib ko'rishimiz kerak, try qilib ko'rishimiz kerak. Keyinchalik buni takomillashtirish uchun. (We need to try if the function works first. Then improve it later.)
[01:30-01:33] Speaker 1: Ya, ya. Men shu bitta ikkita narsa tushunmayapman-da. Birinchisi, (I don't understand one or two things. First,)
[01:34-01:44] Speaker 1: Oke bu narsa yuraverayotgandi, nimaga bularni o'zlari AI ishlatib ko'rishmagan? Oddiy odamlar ham AI ishlatsa, to'qson besh foiz kamayadi-yu xarajatlari, muammolari. (This has been running for a while, why haven't they tried AI themselves? Even normal people using AI reduces costs by 95%.)
[01:44-01:45] Speaker 0: Da, da.
[01:45-01:59] Speaker 1: Ikinchi masalasi, bu muammo javob beradi. Uje Amerikada solved bo'lgan bo'lishi kerak. Uje kimdir unaqa kompaniyalar bo'lishi kerak. Mana qarang-da siz. A, shunda hozir oddiy tildan sign language ko'chirish kerak. G'ulxo'ylarga-da, to'g'rimi? (Second issue — this problem should already be solved in America. There should be companies doing this. Look. So we need to convert normal speech to sign language. For deaf people, right?)
[02:00-02:17] Speaker 1: Okey, speech to sign language app, platforms SaaS... Amalga chiqayapti-da. Mana shunaqa AI servislar bor ekan. Speech to sign language software as a service degan platformalar bor ekan. (Such AI services exist. Speech to sign language SaaS platforms exist.)
[02:17-02:23] Speaker 0: Nu bu ana bo'lishi kerak-da. O'zbekiston, O'zbekistonniki bo'lsa, biz ham qanchaga bo'lib ketadi? (This needs to be for Uzbekistan. How much would it split?)
[02:25-02:36] Speaker 0: Hozir biz buni small prototip qilib turib, o'sha aytdim-ku direktor bilan kontaktni oldim. U bilan ko'rishaman-da, men unga ko'rsataman. (Right now we make a small prototype, I'll meet with that director I mentioned and show it to him.)
[02:37-02:43] Speaker 0: Prototip ko'rsataman. Shunda agar kelishi olsa, keyin ya investment topamiz, ya shu proyektni sotamiz, tipa. (I'll show the prototype. If it goes well, we either find investment or sell the project.)
[02:43-02:45] Speaker 1: Ya, ya. Qancha? Zorijaya yoqdi menga. (Yeah! How much? I like the ambition.)
[02:48-02:48] Speaker 0: Shunaqa sotish deya bo'ladi. (We can sell it like that.)
[02:49-02:55] Speaker 1: Market вообще boshda, brat. (The market is at the very beginning, bro.)
[02:55-02:57] Speaker 1: Qilsak market вообще boshda, misol uchun. Nima narsa qilsa bo'ladi-da. (If we do it, the market is wide open.)
[03:00-03:07] Speaker 0: Qarang Alisher Shayxov o'zi tushunishmagan odam-da. Yetmish yosh. Nu AI ikkalamizdan million marta yaxshi tushunadi-yu. (Look, Alisher Shayxov is a person you can't fully describe. 70 years old. But he understands AI a million times better than both of us.)
[03:08-03:30] Speaker 0: Kimdir problem bilan keladi yoki proyekt bilan keladi-yu. O'sha odamning proyektini amalga oshirishi uchun hammani yig'ib berayapti. Davlat tomonidan ham proyekt beriladi u odamga. Yechilmagan proyektlar, yillar davomida majlis bo'yicha olib kelingan. O'shanaqa proyektlarni u solution beradi. (When someone comes with a problem or project, he gathers everyone to make it happen. The government also gives him unsolved projects from committees. He provides solutions.)
[03:30-03:52] Speaker 0: Hozir Samarqandda turistic objectlarda small buslar qo'ygan ekan. Golf kartga o'xshagan. O'shalarda QR kod bor. Shu kompaniya qilib bo'lgan ekan uje. QR kod qo'ygan. O'shada invalidligi bor odamlarga obida haqida information berib ketayapti. (In Samarkand they've put small buses at tourist sites, like golf carts, with QR codes. A company did this already. They provide information about monuments for disabled people.)
[04:10-04:21] Speaker 0: Monitor qilinadi, bitta televizorcha. O'shanga airpod qiziladi. U AI keyin ma'lumot yuraveradi ana sign language da. (They add a small monitor screen. They connect airpods. And then the AI information goes in sign language.)
[04:22-04:42] Speaker 1: Shuni zo'r bir narsa qilsa bo'ladi. Sandy O'zbekiston national network qilinib bo'lsa, internet proyekt qilsa bo'ladi-da. AI esa texnikalsiz ishlashi. Try qilib ko'ring mana shu narsani avval. Menga yoqdi. (This could be great. If Sandy makes a national network for Uzbekistan, we can make it an internet project. AI works without technicians. Try this first. I like it.)
[04:43-04:49] Speaker 0: Qanday qila olamiz? Bu kechqurun Sandy bilan gapirib, u bu kun qilsa bo'ladi, to'g'rimi? (How do we do it? If we talk to Sandy tonight, we can do it today right?)
[04:50-05:01] Speaker 1: Ha, qarang mana qilsa bo'ladi. Hozir birinchi navbatda biz kontekst berib Claude bilan gaplashib ko'rishimiz kerak-da. (Yes look, we need to first give context to Claude and talk through it.)
[05:04-05:06] Speaker 0: Menda Claude yo'q-da. (I don't have Claude.)
[05:07-05:13] Speaker 1: Men Claude Max accountim bor. Oyiga yuz dollar to'layman. Limiti ko'p-da. (I have a Claude Max account. I pay $100/month. Lots of limits.)
[05:13-05:34] Speaker 1: Har besh soatda limit reset bo'ladi. Men kechqurun ishlatmayman. Bir to'layman, uxlayman. Sandy talab bo'ladi. Bitta chat ishlatsa bo'ladi. Shunda ikkalamiz ham bitta chat ishlatsa, bitta ChatGPT hech narsa demaydi gaplashaveramiz-da. (The limit resets every 5 hours. I don't use it at night. Sandy can use it. We can share one chat, like a ChatGPT where we both just talk.)
[05:35-05:38] Speaker 1: Shunaqa qilib ko'rsak bo'ladi. Otomatizatsiya Claude'ni beraman. (Let's try it this way. I'll give you Claude access.)
[05:40-05:48] Speaker 0: Timezone qancha bizda? O'n ikki soatmi? (What's the timezone between us? 12 hours?)
[05:45-05:51] Speaker 1: O'n bir, o'n ikki. Sizlar orqada, siz yotibsiz. Biz orqadamiz. (11-12. You guys are behind. We're behind.)
[05:55-06:04] Speaker 1: Men turib olayotganim ikkalamiz o'tirib ishlaganimiz qiyin bo'ladi. Chunki men ham boshqa ishlarni boshqa mas'uliyatlar bor-da. (It'll be hard for both of us to sit and work at the same time. I have other responsibilities too.)
[06:05-06:08] Speaker 1: Bitta vaqt topish qiyin. Efficiency juda ham kam bo'ladi. (Finding common time is hard. Efficiency would be very low.)
[06:08-06:25] Speaker 1: O'shaning uchun ikkalamiz ishlab turib, o'zaro lozim bo'lgan narsani topib. Hozir AI qanchalik ishlashiga bog'liq. (So let's both work independently and share what we need. It depends on how well AI works now.)
[06:27-06:38] Speaker 1: Hozir mana qiling-a. Vaqting bormi? Bir yarim soat bor. Men hozir screen share qilaman-da. Continue etamiz. (Do you have time? An hour and a half? I'll screen share and we'll continue.)
[06:39-06:45] Speaker 1: Sen mana shu videoni abzorini menga tashlab ber. Biz AI ga feed qilaylik. (Send me the summary of this video. Let's feed it to AI.)
[06:50-06:57] Speaker 1: Hozir mening kompyuterimda Claude Code ochib prompt yozamiz. Nima qilishini ko'ramiz. Men senga access beraman Claude Code ga. (I'll open Claude Code on my computer and write a prompt. We'll see what it does. I'll give you access to Claude Code.)
[07:00-07:05] Speaker 0: Hozir ham very simple kerak-da. Bo'sh function ishlasa bo'ldi. (We need something very simple for now. Just a basic function working is enough.)
[07:04-07:12] Speaker 1: Ishlatib ko'rolmaysan-ku. Hozir MVP qilib function mos unaqa qilmoqchiman. Ikki kunda ham bo'ladigan narsa AI da shu. (I want to make an MVP with matching functions. It could be done in 2 days with AI.)
[07:15-07:22] Speaker 0: Prosta shu gap yozib turib text kalontirib sign language ga rasm qilib chiqib bersa ham bo'ladi-da bu. (Even if it just takes written text and converts it to sign language images, that's enough.)
[07:22-07:30] Speaker 1: Ya, ya. Variant. Menga shu abzorni tashlab ber. (Yeah, yeah. Good variant. Send me that summary.)
[07:30-07:50] Speaker 1: Okey, yana telefon qilaman kompyuterimga. Abzor seni tashlab, hozir qilaman. Prosta abzorni olib ber bo'ldi. (OK, I'll call again from my computer. Just get me the summary, that's all.)
```

---

## 3. Reference Platform Analysis: sol-gos.ru (SOL / Surdo-Online)

SOL is the existing platform we're building an AI alternative to.

**What it does:** Connects deaf/hard-of-hearing people with live HUMAN sign language
interpreters via video call. Used at government offices, banks, hospitals, transport
hubs across Russia, Kazakhstan, and Uzbekistan.

**How it works:**
1. Deaf person clicks "Call via sign language interpreter" button on org's website/terminal
2. Video call connects to remote human sign language interpreter via WebRTC
3. Interpreter simultaneously calls the organization's contact center
4. Interpreter bridges the conversation in real-time (3-way: deaf person signs to
   interpreter via video, interpreter speaks to staff via phone)

**Business model:**
- B2B: sells annual license to organizations (99,000 RUB/year = ~$1,100)
- 600 minutes of interpretation included
- Per-minute billing (vs hourly human interpreters at ~1,500 RUB/hour)
- 24/7 availability, interpreter connection within 3 minutes

**Market they cite:** 500,000+ deaf people in Russia and CIS (conservative estimate),
10x more hard-of-hearing people.

**Regulatory hook:** Helps organizations comply with Russian Federal Law 181-FZ
requiring accessible environments for disabled citizens.

**Geographic presence:** Russia, Kazakhstan, Uzbekistan. Notable clients include
Moscow MFCs, Kaspi Bank (KZ), Trust Bank (UZ), Uzbekistan Airways.

**Our advantage over SOL:** AI replaces the human interpreter. 24/7, instant, orders
of magnitude cheaper per minute. No staffing constraints.

---

## 4. Market Research

### The Gap
- **No AI sign language interpreter exists in the Russian/CIS market**
- SOL uses human interpreters — expensive, limited availability
- Global platforms (Wordly, KUDO, Signapse) don't support RSL or the CIS market
- Tilmoch.ai handles Uzbek text translation but not sign language
- Deaf citizens in Russia get only 40 state-funded interpreter hours per year

### Market Size
| Country | Deaf Population | Hard of Hearing |
|---------|----------------|-----------------|
| Russia | ~500,000 | ~5 million |
| Russia + CIS | ~8.7 million total | — |
| Uzbekistan | ~21,000 registered | ~5,000 students in deaf schools |

### Pricing Context
- Human sign language interpreter: ~1,500 RUB/hour
- SOL platform: 99,000 RUB/year for 600 minutes
- Our AI solution: potentially 10-100x cheaper per minute

### Global Market
- Sign language translator market: $500M-1.2B (2025), projected $2.5-4.5B by 2033
- CAGR: 15-25%
- Growth drivers: government accessibility mandates, healthcare, education, media

### Competitors to Watch
| Company | Product | Market | Notes |
|---------|---------|--------|-------|
| Signapse (UK) | AI digital signer avatar | BSL/ASL/DGS | Most advanced commercial text-to-sign |
| HandTalk (Brazil) | Text-to-Libras/ASL app | Brazil | Most polished consumer avatar |
| KinTrans (Dallas) | Motion-to-voice translator | ASL/Arabic SL | Testing in Dubai banks/airports |
| SignAll (Budapest) | ASL recognition | ASL | $3.6M raised |
| **None** | **—** | **Russia/CIS** | **This is our opening** |

---

## 5. Technical Research: AI Sign Language State of the Art

### What's Solved (isolated sign recognition)
- 97-99%+ accuracy for single sign/letter recognition
- MediaPipe + YOLOv11: 98.2% for ASL alphabet, real-time on webcam
- MobileNetV3: 99.98% on ASL datasets, CPU inference under 500ms

### What's NOT Solved (continuous sign recognition)
- Recognizing continuous signing (sentences) has ~30-40% Word Error Rate
- Sentence boundary detection in unsegmented signing is unsolved
- Co-articulation effects: signs blur together in natural signing
- Non-manual markers (facial expressions) carry grammatical meaning — most models ignore
- This is why we chose audio-to-sign (not sign-to-text) for the MVP

### Russian Sign Language (RSL) Resources
| Dataset | Size | What |
|---------|------|------|
| Slovo (ai-forever/Sber) | 20K videos, 1000 signs, 194 signers | Isolated RSL gesture recognition |
| Bukva (ai-forever/Sber) | 3,757 videos, full RSL alphabet, 155 signers | Fingerspelling recognition |

GitHub repos:
- `github.com/hukenovs/slovo` — Slovo dataset + models
- `github.com/ai-forever/bukva` — Bukva dataset + pre-trained models
- `github.com/aws-samples/genai-asl-avatar-generator` — AWS GenASL full pipeline
- `github.com/sign-language-processing/pose` — Pose file handling toolkit

### Text-to-Sign Approaches (what we're building)
1. **Signapse** — most commercial. AI digital signers for BSL/ASL. $3.6M+ raised
2. **AWS GenASL** — open-source: Whisper → Claude on Bedrock → ASL gloss → 3D avatar
3. **Speak2Sign3D** — Whisper → MarianMT → 3D keypoint animation (research stage)
4. **HandTalk** — commercial app, text to Brazilian SL via avatar

### Key Risk: Deaf Community Skepticism
Baidu's AI sign language at Beijing 2022 was heavily criticized:
- Stiff, unnatural movements
- Missing facial expressions (grammatically meaningful)
- Limited vocabulary, information loss
- Developers didn't involve deaf people in testing

**We must involve deaf users in testing early.**

---

## 6. What Was Built (MVP v1)

### Architecture
```
┌─────────────────────────┐
│ Audio Input              │ ← Web Speech API (browser-native)
│ or Text Input            │
└──────────┬──────────────┘
           ↓
┌──────────────────────────┐
│ Text-to-RSL Gloss        │ ← Dictionary lookup (25+ words)
│ + Fingerspelling fallback │ ← RSL dactyl alphabet (33 letters)
└──────────┬──────────────┘
           ↓
┌──────────────────────────┐
│ SVG Avatar Animation     │ ← CSS transitions, 0.35s cubic-bezier
│ + Real-time Subtitles    │
└──────────────────────────┘
```

### What Works
- **Mic mode**: tap mic → speak Russian/Uzbek → real-time subtitles + sign animation
- **Text mode**: type text → click translate → sign animation + subtitles
- **RU/UZ toggle**: switches Web Speech API language
- **25+ word signs**: greetings (привет, здравствуйте, спасибо), pronouns (я, вы),
  questions (где, когда, что, как), nouns (паспорт, деньги, документ, врач, аптека,
  больница, автобус, дом, работа, время), adjectives (хорошо, плохо), responses (да, нет),
  basic (помощь, понимаю, не понимаю, имя)
- **Full fingerspelling**: all 33 RSL dactyl alphabet letters (А-Я)
- **Mobile responsive**: works on 375px+ screens

### Tech Stack
- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS 4
- Web Speech API (browser-native STT, no server needed)
- SVG-based avatar with CSS transitions

---

## 7. Roadmap

### Phase 1: "Demo for Director" (current — done)
- [x] Text/voice input
- [x] Real-time subtitles
- [x] Animated sign language avatar
- [x] RSL word dictionary + fingerspelling
- [x] Mobile-responsive UI
- [x] GitHub repo with collaboration

### Phase 2: "Working MVP" (next 2-4 weeks)
- [ ] Connect Claude API for smarter text-to-gloss translation (handles grammar, context)
- [ ] Expand RSL word dictionary from 25 to 200+ signs
- [ ] Add sign speed control slider
- [ ] Upgrade to 3D avatar with Three.js (more realistic)
- [ ] Add sign history/timeline view
- [ ] Deploy to Netlify with custom domain
- [ ] Add Uzbek Sign Language support (related but distinct from RSL)

### Phase 3: "The Real Product" (2-3 months)
- [ ] Add reverse direction: camera → sign language recognition → text
- [ ] Use MediaPipe Holistic for pose estimation + fine-tuned model on Slovo/Bukva
- [ ] Human interpreter fallback for low-confidence translations
- [ ] QR code integration for Samarkand tourist sites
- [ ] Institutional deployment mode (tablet/kiosk for government offices)
- [ ] Session recording for quality monitoring
- [ ] Analytics dashboard

### Phase 4: "Scale" (6+ months)
- [ ] Partner with SOL or compete directly
- [ ] Regional sign language variants (Uzbek SL, Kazakh SL)
- [ ] Multi-language audio support (Russian, Uzbek, English, Kazakh)
- [ ] API for third-party integration
- [ ] Mobile app (React Native or Flutter)

---

## 8. Business Model Ideas (from the conversation)

1. **Show prototype to director** → get feedback, possibly investment or project sale
2. **Samarkand tourist sites** — add sign language AI to QR code info systems at monuments
3. **Government compliance** — help organizations comply with Federal Law 181-FZ
4. **B2B SaaS** — same model as SOL but AI-powered, 10x cheaper
5. **Connect via Alisher Shayxov** — access to government contracts and unsolved projects

---

## 9. Working Async (How We Collaborate)

From the conversation:
- **Timezone gap**: 11-12 hours between Akbar (US Central) and Samandar (Uzbekistan)
- **Async work**: each person works independently, shares via GitHub
- **Shared AI**: Akbar's Claude Max account, shared Claude Code chat when needed
- **Communication**: voice calls for alignment, async coding for execution
- **Branch strategy**: branch from main, PR to main
- **Deploy**: Netlify (never Vercel)
