# Advanced GEO optimization research and portfolio plan

_Research date: 2026-08-12. Scope: Generative Engine Optimization (GEO), also called AI-search or answer-engine visibility. Sources are limited to vendor documentation, open standards, and the primary KDD 2024 GEO paper._

## Executive conclusion

GEO is best understood as a retrieval-and-citation layer built on top of sound technical SEO, not as a replacement for SEO. A page must first be discoverable, renderable, indexable, canonical, and eligible for a snippet; then it must offer passages that an answer system can retrieve, understand, corroborate, and safely cite. Google explicitly says there are no extra technical requirements, special schema types, or AI-specific files required for AI Overviews or AI Mode.[1]

For a portfolio, the highest-confidence strategy is therefore to build a small, coherent public knowledge base around one clearly identified person and their work: a strong profile page, individual case-study pages, explicit claims with evidence, stable URLs, real HTML text, consistent entity names, meaningful internal links, truthful structured data, and reliable crawling controls. Measurement should combine Google Search Console, Bing's AI Performance report, referral analytics, server logs, and a controlled prompt panel rather than rely on a single “AI visibility score.”[1][7][10]

## 1. How generative visibility works

### 1.1 The practical pipeline

The public documentation supports this working model:

1. **Discovery and crawl:** a crawler learns that a URL exists through links, a sitemap, a search index, or a change-notification system.
2. **Rendering and extraction:** the system obtains the main text, links, metadata, images, and structured data. Important facts that exist only after fragile client-side interaction are less dependable than semantic server-rendered HTML.
3. **Indexing and canonicalization:** the engine selects a representative URL and associates its content and signals with that canonical page. Google recommends redirects and `rel="canonical"` to consolidate duplicates, with sitemap inclusion as a weaker canonical signal.[4]
4. **Query decomposition and retrieval:** for complex questions, Google says AI features may issue multiple related searches across subtopics and data sources (“query fan-out”).[1] A portfolio page can consequently be retrieved for a narrow sub-question even when it is not the classic top result for the user's entire prompt.
5. **Grounding and synthesis:** selected sources are used to support an answer. A citation is not equivalent to a conventional rank: Bing's reporting explicitly warns that citation count does not communicate placement, authority, or the role a page played in an answer.[7]
6. **Presentation and click:** the engine may show a citation, link, title, snippet, or generated summary. Preview controls can limit what is used or displayed.

This model explains why “write for LLMs” is too vague. The actionable unit is usually a **self-contained, accurate passage on an eligible canonical page**, connected to a well-defined entity and supported by inspectable evidence.

### 1.2 What “visibility” means

Traditional rank is one ordered position. Generative visibility is multidimensional: whether a source is retrieved, cited, quoted, mentioned, linked, and how prominently or accurately it influences an answer. The original GEO paper formalized multiple visibility metrics and evaluated black-box content transformations across a 10,000-query benchmark.[12]

The paper reported gains of up to 40% under its experimental setup and found that effectiveness varied by domain.[12] This is evidence that presentation and evidence-bearing content can change inclusion in a controlled generative-search pipeline; it is **not** evidence that any tactic guarantees a 40% lift in current ChatGPT, Claude, Bing, or Google products. Models, retrieval indexes, prompts, interfaces, and citation rules change, and the paper's visibility metrics are not business outcomes.

### 1.3 Evidence tiers

| Tier | Claim | Planning implication |
|---|---|---|
| Confirmed by product owners | Google AI features use normal Search eligibility, can fan out into subqueries, and require no special AI schema or file.[1] OpenAI uses `OAI-SearchBot` for search inclusion and separates it from `GPTBot` training controls.[10] Anthropic separates `Claude-SearchBot`, `Claude-User`, and training-oriented `ClaudeBot`.[11] | Treat crawl/index health and explicit per-bot policy as prerequisites. |
| Confirmed but not guaranteed | Structured data can help systems understand a page, but must match visible content and does not guarantee a rich result.[5] Sitemaps and IndexNow improve discovery/freshness but do not guarantee indexing or citation.[3][8] | Implement clean machine-readable signals, but never score the work as complete merely because markup validates. |
| Primary experimental evidence | Source presentation, evidence, and content transformations can alter generative-engine visibility; effects vary by domain.[12] | Test passage design and cited evidence, page by page. Do not universalize benchmark lift figures. |
| Plausible inference, not vendor-confirmed ranking factor | Concise definitions, question-shaped headings, comparison tables, and explicit claim/evidence blocks may improve passage retrievability and citation fidelity. | Use because these formats also help humans, then validate through measured citations and prompt tests. |
| Unsupported folklore | `llms.txt` is required; adding “AI keywords” creates authority; schema alone causes LLM citations; bot access guarantees model training or an answer citation. | Do not make these core deliverables or success criteria. Google explicitly says no new AI text file is needed for its AI features.[1] |

## 2. Crawler, indexing, and usage controls

### 2.1 Controls are purpose-specific

Robots rules control crawling, not every downstream use, and the Robots Exclusion Protocol is a crawler instruction protocol rather than access control.[15] A `Disallow` also does not reliably remove a known URL from search: a crawler may be unable to read a page-level `noindex` because the page itself is blocked. Google and OpenAI both document this distinction.[2][10]

Recommended policy for a public portfolio that wants AI-search visibility but prefers not to volunteer content for model training:

```text
User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: ClaudeBot
Disallow: /

Sitemap: https://YOUR-DOMAIN.example/sitemap.xml
```

This is a policy choice, not a universal prescription. OpenAI says blocking `OAI-SearchBot` prevents content from being included in ChatGPT summaries/snippets, while `GPTBot` is the control for potential training.[10] Anthropic documents analogous separation between search (`Claude-SearchBot`), user-directed retrieval (`Claude-User`), and potential training (`ClaudeBot`).[11] Each subdomain needs its own robots file for Anthropic preferences.[11]

For Google Search AI features, Googlebot is the applicable crawler control; Google-Extended applies to some other Google AI training and grounding uses, not eligibility in Google AI Overviews or AI Mode.[1] Before deployment, make the training policy an explicit owner decision and verify current bot documentation because names and uses can change.

### 2.2 Snippet controls

For pages intended to earn citations, default to allowing useful snippets. Google's `nosnippet` prevents content from being used as a direct input to AI Overviews and AI Mode; `max-snippet` limits the amount available, and `data-nosnippet` excludes selected HTML regions.[2] Bing also documents `data-nosnippet` as excluding marked sections from search snippets and AI-generated answers while leaving the rest of the page discoverable.[9]

Use these controls only for genuinely sensitive or non-reusable sections. Do not place them around the case-study summary, outcomes, technical explanation, or evidence that should be cited.

### 2.3 Technical minimum

- Return `200` for canonical public pages; use real `301` redirects for moved URLs.
- Provide one self-referencing canonical per indexable page, one stable HTTPS hostname, and no duplicate route variants.[4]
- Generate an XML sitemap containing only canonical, indexable URLs and truthful `lastmod` dates. Google notes that a sitemap is a discovery/canonicalization signal, not an indexing guarantee.[3] Bing says `changefreq` and `priority` are ignored, while accurate `lastmod` helps recrawl decisions.[8]
- Ensure public content and navigation are present in rendered HTML, not gated behind hover, canvas, authentication, or user interaction.
- Make links standard crawlable anchors with descriptive text.
- Keep robots, CDN/WAF, security headers, and deployment previews from accidentally blocking the intended crawlers.
- Serve a genuine `404`/`410` for removed work and update the sitemap; notify IndexNow where implemented.[8]

## 3. Entity clarity and structured data

### 3.1 Build one unambiguous person entity

The portfolio should state the same canonical name, role, location (at an appropriate privacy level), specialty, portrait, bio, and canonical URL across the home/about page, metadata, resume, case studies, and external profiles. Link verified identity profiles using `sameAs`, and connect each project to the same person `@id`. Schema.org defines `Person` properties such as `name`, `url`, `sameAs`, `jobTitle`, `knowsAbout`, and affiliations.[13]

The goal is not keyword repetition. It is referential consistency: every surface should make it easy to answer “who built this, what do they do, and which external identities are the same person?” Do not claim clients, awards, employers, metrics, or expertise that cannot be verified.

### 3.2 Recommended JSON-LD graph

Use JSON-LD because Google recommends it, while ensuring every material value is visible and true on the page.[5]

- Site-wide: `WebSite` with canonical URL and name.
- Primary bio/about page: `ProfilePage` whose `mainEntity` is a stable `Person` node such as `https://domain.example/#person`. Google says `ProfilePage` is for pages where a person or organization shares first-hand perspectives.[6]
- Project/case-study pages: the most specific truthful `CreativeWork` subtype available; otherwise `CreativeWork`, with `name`, `description`, `url`, `image`, `dateCreated`/`datePublished`, `creator` or `author` pointing to the Person `@id`, and relevant `about` entities.[14]
- Navigation context: `BreadcrumbList` when the visible hierarchy supports it.
- Articles/notes, if present: `Article` or `BlogPosting`, with dates and author tied to the same Person node.

Structured data is an explicit description, not a secret ranking channel. Google requires it to represent visible page content, warns that markup does not guarantee presentation, and can penalize misleading markup.[5] Avoid FAQ markup unless the page genuinely presents user-visible questions and answers; do not invent ratings, reviews, organizations, or `sameAs` links.

## 4. Content design for retrieval and citation

### 4.1 Portfolio information architecture

Create a canonical page for each distinct user intent:

- `/` — concise identity, specialties, selected proof, and links to deeper pages.
- `/about` — first-person bio, capabilities, experience timeline, principles, and contact context.
- `/work` — index of projects with a one-sentence problem/outcome for each.
- `/work/{project}` — substantive, independently useful case study.
- `/services` or `/capabilities` — only if services are actually offered; define scope, fit, process, and evidence.
- `/notes/{topic}` — optional expert writing that answers questions the target audience asks and connects back to relevant projects.
- `/contact` — clear canonical contact path.

Avoid one giant animated homepage as the only source of truth. A portfolio needs stable, linkable pages because query fan-out can retrieve different pages for different subquestions.[1]

### 4.2 Case-study template

Each project page should make its core facts available without requiring interpretation:

1. **One-sentence answer:** what was built, for whom or what context, and why it mattered.
2. **Fact panel:** role, scope, collaborators, dates, constraints, stack, links, and status.
3. **Problem:** a specific initial condition, not generic industry setup.
4. **Decision and rationale:** what alternatives existed and why this approach was chosen.
5. **Implementation:** concrete architecture/design details and the author's exact contribution.
6. **Evidence and outcome:** measured result with unit, period, baseline, method, and source; or explicitly label qualitative observations.
7. **Limitations and lessons:** what did not work, remaining tradeoffs, and what changed afterward.
8. **References/artifacts:** live product, repository, screenshots, demo, design files, public client confirmation, or cited primary documentation where allowed.
9. **Last reviewed date:** meaningful content-review date, not an automatically refreshed timestamp.

Good citation candidates are atomic and attributable: “I implemented X, under constraint Y, producing measured outcome Z over period T.” Keep surrounding definitions and units in the same paragraph or table cell so an extracted passage remains accurate.

### 4.3 Writing principles

- Lead sections with direct answers, then supply rationale and proof.
- Use descriptive headings that name the problem or decision; cover real adjacent subquestions rather than generating keyword variants.
- Define ambiguous terms and acronyms on first use.
- Prefer concrete nouns, named technologies, quantified constraints, dates, and provenance over adjectives such as “innovative” or “world-class.”
- Attribute external facts to primary sources and distinguish personal observation from measured outcome.
- Put critical information in text even when a screenshot or video communicates it visually; add useful image alt text and captions.
- Preserve authentic first-hand detail. Google's guidance emphasizes helpful, reliable, people-first content, and Bing advises depth, evidence, clear structure, freshness, and consistency across media for AI citations.[1][7]
- Do not mass-produce shallow question pages. Consolidate overlapping content into the strongest canonical page.

## 5. Measurement framework

### 5.1 Instrumentation

| Layer | Metric | Source | Caveat |
|---|---|---|---|
| Crawl | Requests and status by verified crawler; robots/CDN blocks | Server/CDN logs | User-agent strings can be spoofed; verify IPs where vendor documentation supports it. |
| Index | Canonical/index status and sitemap coverage | Google Search Console, Bing Webmaster Tools | Eligibility is not citation. |
| Google AI discovery | Search impressions, clicks, CTR, landing pages and conversions | Search Console “Web” plus analytics | Google folds AI-feature traffic into Web reporting rather than exposing a clean AI-only segment.[1] |
| ChatGPT | Sessions and conversions from `utm_source=chatgpt.com` | Analytics | Measures clicks, not unclicked mentions; OpenAI documents this UTM behavior.[10] |
| Microsoft AI citations | Total citations, cited pages, trends, grounding-query samples | Bing Webmaster Tools AI Performance | Counts do not reveal citation placement or page authority.[7] |
| Prompt panel | Mention, citation URL, factual accuracy, stance, competitors, answer stability | Controlled recurring tests | Personalization, geography, model/version, and nondeterminism make this directional. |
| Business outcome | Qualified contacts, interview requests, project inquiries, downloads | Analytics/CRM | Low volume requires longer windows and qualitative review. |

### 5.2 Baseline and experiment design

Before changing content, save a four-week baseline where data exists. Define 20–40 prompts across branded identity, capabilities, project-specific problems, comparison/selection, and proof questions. Run the same prompts from clean sessions, recording engine, model/mode, date, locale, exact response, cited URLs, and whether claims are correct.

Evaluate at the page and query-cluster level:

- citation rate = eligible runs containing a portfolio URL / eligible runs;
- correct-mention rate = runs with a materially correct description / runs mentioning the person or project;
- owned-source share = portfolio citations / all citations for the tracked cluster;
- assisted conversion rate from AI referrals;
- citation freshness lag after a documented page update.

Change one content cluster at a time where practical, annotate releases, and compare at least monthly. Treat a citation as a leading indicator and a qualified contact as the outcome.

## 6. Prioritized implementation plan for the portfolio

### Phase 0 — Baseline and policy (day 0–2)

1. Inventory every public URL, status code, canonical, index directive, title, description, H1, word count, structured-data type, and internal-link count.
2. Verify ownership in Google Search Console and Bing Webmaster Tools; record current index coverage and search performance.
3. Establish analytics for ChatGPT UTM referrals, AI-referrer groupings, case-study engagement, resume/download events, contact submissions, and outbound proof links.[10]
4. Decide separately whether to allow search/retrieval bots and training bots; document the choice.
5. Capture the initial prompt-panel results and known factual errors.

**Exit criterion:** a versioned URL inventory, crawler policy, and baseline dashboard exist.

### Phase 1 — Eligibility and canonical hygiene (day 2–5)

1. Fix non-200 public pages, redirect chains, canonical conflicts, accidental `noindex`, robots blocks, CDN bot challenges, and client-rendering gaps.
2. Deploy a robots file implementing the chosen Google/OpenAI/Anthropic policy and pointing to the sitemap.
3. Generate an XML sitemap containing only canonical public pages with truthful `lastmod`; submit it to Google and Bing.[3][8]
4. Add IndexNow notification on publish/update/delete if the hosting stack supports it safely.[8]
5. Ensure every important page is reachable through descriptive HTML links within two or three navigation steps.

**Exit criterion:** every target page is fetchable, renders substantive HTML, declares one canonical, appears in the sitemap, and passes URL inspection.

### Phase 2 — Entity and metadata graph (day 4–7)

1. Normalize the person's name, role description, canonical bio, image, social/profile links, and topical specialties.
2. Add unique page titles, descriptions, canonical URLs, Open Graph/Twitter metadata, and useful share images.
3. Implement a JSON-LD graph with `WebSite`, `ProfilePage` + `Person`, page-appropriate `CreativeWork`/`Article`, and visible breadcrumbs.[5][6][14]
4. Reuse the same Schema.org Person identity throughout the graph.[13]
5. Validate syntax, then manually compare every structured-data claim with visible content.

**Exit criterion:** validators pass and all pages resolve to one stable Person `@id` without unsupported claims.

### Phase 3 — Case-study reconstruction (week 2)

1. Give every major project its own canonical page.
2. Apply the case-study template above, prioritizing the three projects most aligned with desired work.
3. Replace vague claims with attributable facts; add methodologies and denominators for metrics.
4. Add real artifacts and captions, plus a “my contribution” section that distinguishes individual work from team work.
5. Cross-link technologies, capabilities, related projects, and any substantive notes using natural anchor text.

**Exit criterion:** each priority project answers who/what/why/how/result/limitations from visible text and exposes at least two verifiable proof artifacts where available.

### Phase 4 — Topical depth (weeks 3–4)

1. Derive a small topic map from actual expertise and desired opportunities, not search volume alone.
2. Publish or upgrade 3–6 first-hand notes that answer high-value questions and connect to project evidence.
3. Create comparison or decision pages only where the author has genuine experience and can state evaluation criteria.
4. Add primary-source references for external technical claims and update dates only after substantive review.

**Exit criterion:** every target capability has a hub page, a proof-bearing case study, and at least one useful explanatory passage or note.

### Phase 5 — Observe and iterate (monthly)

1. Review crawl/index errors, cited pages, grounding-query samples, referrals, conversions, and prompt-panel accuracy.[7]
2. Fix wrong or ambiguous descriptions before chasing more mentions.
3. Expand passages around questions where the site is indexed but not cited; improve evidence on pages cited inaccurately.
4. Consolidate cannibalizing pages and redirect retired URLs.
5. Revalidate structured data and crawler access after framework, CDN, or deployment changes.
6. Keep a change log mapping each release to citation and conversion trends.

**Exit criterion:** monthly reporting separates crawl, index, citation, click, and business-outcome metrics and produces a short next-experiment queue.

## 7. Risks and anti-patterns

- **Optimization theater:** validating JSON-LD or adding `llms.txt` is not proof of retrieval or citation. Google explicitly disclaims special AI markup requirements.[1]
- **Training/search confusion:** allowing or blocking a training crawler is not the same as allowing search grounding. Use vendor-specific bots deliberately.[10][11]
- **Robots/noindex confusion:** blocking crawl can prevent a crawler from seeing `noindex`; use the correct control for the desired outcome.[2][10]
- **Schema spam:** hidden, misleading, irrelevant, or fabricated properties can remove rich-result eligibility or trigger manual action.[5]
- **Synthetic authority:** mass-generated articles, unsupported awards, fake reviews, and unattributed statistics create factual and reputational risk.
- **Metric laundering:** “up to 40%” from a research benchmark must not become a forecast for this portfolio.[12]
- **Over-fragmentation:** many near-identical pages dilute canonical and intent signals; prefer one strong page per distinct purpose.[4]
- **Citation without conversion:** an answer can cite the portfolio while satisfying the user without a click. Optimize landing-page usefulness and measure qualified outcomes.
- **Stale facts:** old roles, availability, metrics, and broken demos can be repeated by answer systems. Maintain visible review dates and truthful sitemap timestamps.[7][8]
- **Privacy leakage:** do not expose private client details, personal addresses, email addresses intended to remain private, or confidential metrics merely to make content machine-readable.

## 8. Definition of done

The portfolio is materially GEO-ready when:

- all priority URLs are canonical, indexable, in the sitemap, and return substantive rendered HTML;
- explicit bot policies distinguish search/user retrieval from training where vendors support that distinction;
- the home/about page defines one consistent Person entity and projects reference it;
- every priority case study contains a direct summary, contribution, decisions, evidence, outcome, limitations, and current status;
- structured data is valid, specific, visible, and truthful;
- AI referrals, Bing citations, classic search performance, prompt-panel results, and qualified conversions are tracked separately;
- monthly updates are driven by observed retrieval/citation gaps rather than unverified GEO checklists.

## Sources

[1] https://developers.google.com/search/docs/appearance/ai-features — AI features and your website — Google Search Central
[2] https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag — Robots meta tags specifications — Google Search Central
[3] https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap — Build and submit a sitemap — Google Search Central
[4] https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls — Canonicalization — Google Search Central
[5] https://developers.google.com/search/docs/appearance/structured-data/sd-policies — Structured data guidelines — Google Search Central
[6] https://developers.google.com/search/docs/appearance/structured-data/profile-page — ProfilePage structured data — Google Search Central
[7] https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview — AI Performance in Bing Webmaster Tools — Microsoft Bing
[8] https://blogs.bing.com/webmaster/July-2025/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search — Sitemaps in AI-powered search — Microsoft Bing
[9] https://blogs.bing.com/webmaster/October-2025/Bing-Introduces-Support-for-the-data-nosnippet-HTML-Attribute — Bing data-nosnippet support — Microsoft Bing
[10] https://help.openai.com/en/articles/12627856-publishers-and-developers-faq — Publishers and Developers FAQ — OpenAI
[11] https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler — Anthropic web crawler controls — Anthropic
[12] https://arxiv.org/abs/2311.09735 — GEO: Generative Engine Optimization — Aggarwal et al.
[13] https://schema.org/Person — Person — Schema.org
[14] https://schema.org/CreativeWork — CreativeWork — Schema.org
[15] https://www.rfc-editor.org/rfc/rfc9309 — RFC 9309 Robots Exclusion Protocol
