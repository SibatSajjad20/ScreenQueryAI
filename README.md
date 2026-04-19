<div align="center">

# ScreenQuery AI

### Ask your screen anything. Powered by Gemini.

![Version](https://img.shields.io/badge/version-1.0.0-6366f1?style=for-the-badge)
![Manifest](https://img.shields.io/badge/Manifest-V3-4f46e5?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-818cf8?style=for-the-badge)
![Built With](https://img.shields.io/badge/built%20with-React%20%2B%20Vite-c084fc?style=for-the-badge)

<br/>

> A Chrome Extension that lets you capture any tab and ask Google's Gemini AI questions about it — instantly, without leaving your browser.

<br/>

[🚀 Live Landing Page](#) · [📦 Download Extension](#) · [🐛 Report Bug](../../issues) · [✨ Request Feature](../../issues)

</div>

---

## What is ScreenQuery AI?

Stop copy-pasting screenshots into ChatGPT. ScreenQuery AI brings vision AI directly into your browser workflow.

Click the extension icon, hit **Capture**, type your question, and get an instant AI-powered answer about whatever is on your screen — code, charts, error messages, UI layouts, anything.

---

## Features

- **One-Click Capture** — Screenshots the entire visible tab instantly via `chrome.tabs.captureVisibleTab`
- **Ask Anything** — Explain errors, summarize articles, translate UI, debug code
- **Gemini Vision AI** — Powered by `gemini-2.5-flash-lite`, Google's fastest multimodal model
- **Privacy First** — Your API key never leaves your browser (`chrome.storage.local`). Screenshots are never stored
- **Your Own Key** — Uses your personal Gemini API key. Free tier available
- **Sleek Dark UI** — Glassmorphism design with a deep indigo/violet aesthetic

---

## Preview

| Popup | Settings |
|-------|----------|
| Capture screen → ask a question → get an answer | Save your Gemini API key securely |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| AI SDK | `@google/genai` |
| AI Model | Gemini 2.5 Flash Lite |
| Extension Standard | Chrome Manifest V3 |
| Landing Page Animations | Framer Motion |
| Landing Page Icons | Lucide React |

---

## Getting Started

### Prerequisites

- Google Chrome browser
- A free Gemini API key from [aistudio.google.com](https://aistudio.google.com/app/apikey)
- Node.js 18+ (for building from source)

---

### Option 1 — Download ZIP (Easiest)

1. Download the latest release ZIP from the [landing page](#) or [releases](../../releases)
2. Unzip the file
3. Open Chrome and go to `chrome://extensions`
4. Enable **Developer Mode** (top right toggle)
5. Click **Load unpacked** and select the unzipped `dist/` folder
6. The ScreenQuery AI icon appears in your toolbar

---

### Option 2 — Build from Source

```bash
# Clone the repo
git clone https://github.com/sibatsajjad20/screenquery-ai.git
cd screenquery-ai

# Install dependencies
npm install

# Build the extension
npm run build
```

Then load the `dist/` folder as an unpacked extension (same steps as above).

---

### Add Your API Key

1. Click the ScreenQuery AI icon in Chrome
2. Click **⚙ Settings** in the top right
3. Paste your Gemini API key and hit **Save**
4. Get a free key at [aistudio.google.com](https://aistudio.google.com/app/apikey)

---

### Use It

1. Navigate to any tab
2. Click the ScreenQuery AI extension icon
3. Hit **📸 Capture Screen**
4. Type your question (e.g. *"Explain this error"* or *"Summarize this chart"*)
5. Press **Enter** or **→** and get your answer

---

## Project Structure

```
screenquery-ai/
├── src/
│   ├── Popup.jsx          # Main extension UI
│   ├── Settings.jsx       # API key settings page
│   ├── geminiService.js   # Gemini API integration
│   ├── popup-main.jsx     # Popup entry point
│   ├── settings-main.jsx  # Settings entry point
│   └── index.css          # Global styles + glassmorphism
├── landing/               # Landing page (React + Framer Motion)
│   ├── src/
│   │   ├── App.jsx        # Full landing page
│   │   ├── main.jsx
│   │   └── index.css
│   └── public/
│       └── screenquery-ai.zip  # Extension download
├── manifest.json          # Chrome Extension manifest (MV3)
├── popup.html
├── settings.html
├── vite.config.js
└── package.json
```

---

## Permissions

| Permission | Why It's Needed |
|-----------|----------------|
| `activeTab` | Capture the current tab's visible content |
| `tabs` | Access tab window ID for screenshot |
| `storage` | Save your Gemini API key locally in Chrome |

No data is ever sent to any server other than the Google Gemini API using **your own key**.

---

## API Key & Quota

| Tier | Requests/Day | Requests/Min |
|------|-------------|-------------|
| Free | 500 | 10 |
| Paid | Unlimited | 1,000 |

A single screenshot + question uses roughly **500–2,000 tokens**. The free tier comfortably covers everyday use.

Get your key → [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
Monitor usage → [ai.dev/rate-limit](https://ai.dev/rate-limit)

---

## Landing Page Development

```bash
cd landing
npm install
npm run dev     # http://localhost:5173
npm run build   # outputs to landing/dist/
```

---

## Contributing

Pull requests are welcome.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

Built with ❤️ using React, Vite, Tailwind CSS, and the Google Gemini API

⭐ Star this repo if you find it useful!

</div>
