# Calma market fit: evidence and validation plan

**Prepared:** 16 October 2026
**Decision:** Continue to validate a narrow restaurant feedback-to-action product. Product-market fit is **not established**. Treat the voice assistant as an experiment; build QR as low-risk feedback capture, not as a review-growth hack.

## Executive read

India has a large and growing food-service market, and established platforms already sell review management, guest feedback, sentiment analysis, and operational workflows. Indian vendors also package QR feedback with restaurant software at low monthly prices. This supports category existence and competitive urgency. It does **not** prove Calma can acquire restaurants, retain them, or charge enough to support the product.
Best initial hypothesis: independent restaurants and small regional chains in one city that already depend on Google discovery, have enough dine-in volume to produce repeated feedback, and lack a reliable owner for complaint follow-up. Sell the measurable service-recovery workflow: capture guest issue → route to outlet owner → track response and fix → show whether the issue repeats. Do not start by replacing POS, building a broad voice agent, or promising rating growth.

Evidence strength: **medium** for category and workflow existence; **low** for India-specific willingness to pay for Calma's exact product; **very low** for demand for a restaurant-manager voice assistant. Conduct operator interviews and paid pilots before scaling scope.

## What evidence supports demand?

The India food-services industry is large. A SEBI-hosted company filing quoting NRAI/Frost & Sullivan analysis estimates FY24 food-service value at ₹7.58 lakh crore, with an organized segment of ₹3.71 lakh crore and projected growth through FY28. These are industry-revenue figures, **not** Calma's addressable software market. Restaurant count, reachable ICP count, and SaaS adoption rate are not established by this figure. [SEBI-hosted filing, market exhibit](https://www.sebi.gov.in/sebi_data/attachdocs/jul-2025/1751455806758_838.pdf)

The category is real and crowded. Birdeye markets a multi-location review inbox, AI responses, alerts, assignments, and insights. Podium combines reviews, customer messaging, invitations, and reporting in a shared inbox. Hospitality products TrustYou and MARA combine reviews with surveys, property-level analytics, response assistance, and—in some cases—PMS or task-system links. These show product patterns customers can buy today; vendor feature claims are not independent proof of outcomes. [Birdeye](https://www.birdeye.com/product/reviews), [Podium](https://www.podium.com/product/reviews), [TrustYou CXP](https://www.trustyou.com/products/customer_experience_platform/), [MARA](https://www.mara-solutions.com/hotel-software/reputation-management)

Indian substitutes make QR and basic review collection easy to buy. Eresto lists a QR menu with feedback at ₹799/month. ClariFlow lists QR collection/reporting at ₹499/month and a private-feedback/alert tier at ₹699/month. Royal Table lists a wider restaurant suite starting at ₹1,999/month. These are vendors' posted prices, can change, and are **price anchors only**; they do not prove sales volume or willingness to pay for Calma. [eresto pricing](https://eresto.in/pricing), [ClariFlow pricing](https://clariflow.in/pricing), [Royal Table pricing](https://royaltable.store/pricing)

Some India-focused websites position products around restaurant feedback intelligence and outlet-level insights, including Ziksta and SpotBay. Treat their product descriptions as supplier self-reports; independently confirm active customers, integrations, coverage, and quality in discovery calls. [Ziksta](https://www.ziksta.com/), [SpotBay](https://www.spotbay.in/product/feedback-reviews)

Additional India evidence sharpens the validation plan. YouGov's 2023 survey reported that 45% of surveyed urban Indian consumers regularly use restaurant/bar reviews; it is consumer behavior evidence, not restaurant software purchase intent. NRAI's public headline cites 500,000+ restaurants and ₹5.69 lakh crore industry value, but this is an industry ceiling and does not establish Calma's reachable software market. [YouGov survey](https://yougov.com/articles/48618-should-restaurants-and-bars-concern-themselves-with-online-consumer-reviews), [NRAI](https://nrai.org/)

The closest India product overlap found is Ziksta's restaurant feedback/reputation positioning. Revmetry publishes ₹499/outlet/month and ₹799/month multi-location pricing, reinforcing that basic monitoring and review operations face low-cost anchors. SpotBay also sells restaurant feedback/review workflows and WhatsApp API services. Posted prices and feature pages remain vendor claims; verify active deployments, actual billing, and outcomes directly. [Ziksta](https://www.ziksta.com/), [Revmetry pricing](https://revmetry.app/pricing), [SpotBay feedback](https://spotbay.in/product/feedback-reviews), [SpotBay WhatsApp pricing](https://spotbay.in/whatsapp-api-pricing)

There is no strong public evidence found in this research that restaurant managers specifically want a **voice** assistant for feedback analysis, or that voice improves usage over a fast mobile inbox and WhatsApp alert. Voice is a usability hypothesis: managers may be hands-busy during service, but noisy kitchens, shared devices, accents, privacy, and the need to inspect source comments may reduce value. Restaurant voice ordering deployments show that voice systems can be operationally deployed in the category, but ordering automation does not validate a manager-facing feedback assistant. [Deepgram restaurant voice AI discussion](https://deepgram.com/learn/enterprise-restaurant-brands-deserve-frontier-voice-ai-models), [Olo P.F. Chang's ordering case](https://www.olo.com/case-studies/p-f-changs-order)

## Competitive shape and Calma's opening

| Product group | Common strength | Calma implication |
|---|---|---|
| Reputation suites (Birdeye, Podium) | Multi-location reviews, replies, alerts, inbox, AI and reporting | Feature parity alone weak differentiator; large suites may be too broad or costly for smaller Indian operators, but validate this with buyers. |
| Hospitality feedback platforms (TrustYou, MARA) | Surveys plus review analytics, property/portfolio insights, integrations and operational context | Borrow feedback-to-operations loop; focus on restaurant themes and lower-friction outlet deployment. |
| India restaurant platforms | QR, POS, menu, feedback and local workflows at low posted prices | QR is table stakes. Avoid competing as QR generator; pair table context with issue ownership and repeated-issue evidence. |
| Existing manual stack | Google Business Profile, POS reports, WhatsApp groups, spreadsheets, agency | Strong substitute because already paid for or familiar. Calma must reduce handoffs and make a recurring operational problem visible. |

Potential Calma wedge: connect public Google reviews and private table feedback in the same outlet-level issue workflow, then show a verifiable trail from issue to action. This is a **positioning hypothesis**, not a confirmed moat. Advantage depends on accurate source attribution, low staff friction, and showing that managers close the loop more reliably than their existing WhatsApp group.

## QR and policy boundary

Use table QR codes to invite **private feedback to the restaurant**. Do not route only happy guests to Google, hide the public-review link from unhappy guests, reward reviews, pressure guests for an on-premises Google review, or ask staff to hit a review quota. Google's Maps policy expressly prohibits discouraging negative reviews or selectively soliciting positive ones; it also says merchants must not require or pressure users to rate/review while on premises. [Google Maps policy](https://support.google.com/contributionpolicy/answer/7400114?hl=en)

Calma's table form therefore records private feedback and does not ask guests to publish a Google review. This keeps the QR useful for operational learning and avoids a review-gating funnel. Revisit public-review solicitation only as a separately designed, policy-checked flow; consult applicable Indian standards and counsel before marketing compliance claims. India's BIS IS 19000:2022 concerns collection, moderation, and publication of online consumer reviews; applicability to a restaurant's private service-recovery survey depends on the exact use and should not be assumed from the available official summary. [Consumer Affairs annual report](https://consumeraffairs.nic.in/sites/default/files/file-uploads/annualreports/1682683889_AR_2022-23.pdf)

Google integration is feasible but gated by product access and operating setup: GBP supports listing and replying to reviews, and Pub/Sub supports review notifications. Apps need OAuth/API access and must handle quotas, retries, and sync correctness. This is infrastructure work, not instant plug-and-play. [Review API](https://developers.google.com/my-business/content/review-data), [Notifications](https://developers.google.com/my-business/content/notification-setup), [Quota and sync guidance](https://developers.google.com/my-business/content/limits)

## Customer and buyer hypotheses

- **Primary buyer hypothesis:** restaurant owner/operator for roughly 2–20 outlets; for larger chains, central operations or guest-experience lead. Prioritize buyers with enough locations to value cross-outlet issue visibility but short enough procurement to pilot quickly. Validate outlet-count fit in interviews.
- **Daily user:** outlet manager or shift lead; staff may need only a fast issue handoff, not another dashboard.
- **Likely initial fit:** dine-in restaurant/café with active Google reviews, repeated service issues, an owner who checks WhatsApp, and no formal feedback-resolution workflow.
- **Weak initial fit:** low-volume takeaway-only outlet, business with no control over its Google profile, POS vendor already solving the problem well, or owner unwilling to ask staff to close actions.
- **Job to be done:** “Tell me quickly what guests keep flagging, who is fixing it, and whether the same issue keeps happening across shifts/outlets.”
- **Price hypothesis to test:** ₹499–₹1,999 per outlet/month is a visible adjacent-product range, not a recommended final price. Charge more only if pilots demonstrate reduced manager follow-up time or faster issue closure.

## 30-day validation experiment

These are proposed decision thresholds, not published market benchmarks.

1. Interview 30 operators in Indore: a mix of owners and outlet managers, with a deliberate focus on small chains around 2–20 outlets plus single-outlet comparisons. Ask about the **last actual complaint**, its path, time to resolution, current tools, and what was missed. Do not pitch until their current workflow is understood.
2. Observe 5 service shifts with permission. Measure whether table QR gets scanned, whether staff can route an issue, who acts, and whether voice input works in real noise.
3. Pilot with 3–5 outlets for 2–4 weeks. Offer table QR capture plus existing Google review import (where approved), WhatsApp alerts, assignment, and action log. Keep voice behind an opt-in pilot toggle.
4. Ask for money before the pilot ends. Test one transparent paid plan and one higher multi-outlet plan; distinguish “sounds useful” from signed paid commitments.
5. **Continue this wedge** if at least 18/30 operators describe a recurring feedback handoff problem, 3+ operators agree to paid pilots, managers use the workflow repeatedly without founder prompting, and at least one outlet makes a documented operational change from recurring feedback. **Revise or stop** if most feedback is already handled adequately in existing tools, QR use is too low, or nobody will pay after a real pilot.

### Interview questions

1. Tell me about the last guest complaint you remember. What happened next?
2. Where did feedback arrive: Google, delivery app, phone, staff, QR, or elsewhere?
3. How did the right person find out? How long did that take?
4. What happened to the guest and to the underlying service issue?
5. How do you know if same issue repeats at another shift or outlet?
6. What do you currently pay for POS, CRM, review, marketing, or guest-feedback tools?
7. Which workflow do staff already use during a busy shift? What do they refuse to use?
8. Do table QR codes exist now? How many guests scan them in a typical week, if measured?
9. What guest details do you need for follow-up, and what should never be captured?
10. What would make an alert useful rather than another notification?
11. Would voice be usable in your dining room/kitchen? Show me a real shift moment when you'd use it.
12. Which person can approve a monthly software purchase? What proof would they require?
13. If this solved the issue described, would you pay for a pilot this month? Which budget would it come from?
14. What would make you stop using it after four weeks?

## Product decision for current build

- **Build QR now:** bulk-create numbered tables, print unique codes, route to short private feedback, map feedback to outlet/table, escalate low ratings. Do not add a public-review gate.
- **Build voice as an experiment for managers:** one question-at-a-time browser voice input/output, with a typed fallback, location scope, and answers grounded in stored review/action records. Start read-only. Measure weekly use and time saved during shifts before investing in a full realtime voice agent; require at least half of pilot managers to use it weekly and evidence of 5+ minutes saved per shift or better action completion.
- **Keep service recovery central:** assign owner, timestamp, outcome, repeat issue, and alert delivery state. This is stronger value evidence than the AI label.
- **Do not yet build:** POS replacement, broad guest CRM, autonomous public replies, or complex agent orchestration before paid-pilot evidence.

## Source quality and caveats

Google API and policy pages are primary sources for platform constraints. The SEBI-hosted filing is a regulatory filing, but its market estimates attribute underlying analysis to NRAI/Frost & Sullivan and are not a software TAM. Competitor sites and pricing pages are primary for what vendors claim/list, not independent proof of performance, retention, or actual transaction prices. No representative Indian restaurant-operator willingness-to-pay study was found in the sources reviewed. The next decisive evidence must come from observed workflows and paid Calma pilots.
