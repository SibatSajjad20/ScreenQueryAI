import { useEffect, useState } from 'react'

export default function Settings() {
  const [apiKey, setApiKey] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    chrome.storage.local.get('apiKey', ({ apiKey }) => {
      if (apiKey) setApiKey(apiKey)
    })
  }, [])

  function save() {
    chrome.storage.local.set({ apiKey }, () => {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-8">
      <div className="glass rounded-2xl p-8 w-full max-w-md flex flex-col gap-5">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          ScreenQuery AI — Settings
        </h1>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Gemini API Key</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIza…"
            className="glass rounded-xl px-4 py-2 text-sm bg-transparent outline-none placeholder-gray-600 focus:border-violet-500 transition-colors"
          />
          <p className="text-xs text-gray-500">
            Get your key at{' '}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-violet-400 hover:underline"
            >
              aistudio.google.com
            </a>
          </p>
        </div>
        <button
          onClick={save}
          className="glass rounded-xl py-2 text-sm font-medium text-cyan-300 hover:text-white hover:border-cyan-500 transition-all"
        >
          {saved ? '✓ Saved!' : 'Save Key'}
        </button>
      </div>
    </div>
  )
}
