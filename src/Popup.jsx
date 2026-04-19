import { useState } from 'react'
import { queryGemini } from './geminiService'

export default function Popup() {
  const [screenshot, setScreenshot] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function capture() {
    setError('')
    setAnswer('')
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.tabs.captureVisibleTab(tab.windowId, { format: 'png' }, (dataUrl) => {
      if (chrome.runtime.lastError) {
        setError(chrome.runtime.lastError.message)
        return
      }
      // strip the data:image/png;base64, prefix
      setScreenshot(dataUrl.split(',')[1])
    })
  }

  async function ask() {
    if (!screenshot || !prompt.trim()) return
    setLoading(true)
    setError('')
    setAnswer('')
    try {
      const { apiKey } = await chrome.storage.local.get('apiKey')
      if (!apiKey) {
        setError('No API key found. Open Settings to add one.')
        return
      }
      const result = await queryGemini(apiKey, screenshot, prompt)
      setAnswer(result)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-[400px] min-h-[300px] p-4 flex flex-col gap-3 bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          ScreenQuery AI
        </h1>
        <button
          onClick={() => chrome.runtime.openOptionsPage()}
          className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
        >
          ⚙ Settings
        </button>
      </div>

      {/* Capture button */}
      <button
        onClick={capture}
        className="glass rounded-xl py-2 px-4 text-sm font-medium text-violet-300 hover:text-white hover:border-violet-500 transition-all"
      >
        📸 Capture Screen
      </button>

      {/* Preview */}
      {screenshot && (
        <div className="glass rounded-xl overflow-hidden">
          <img
            src={`data:image/png;base64,${screenshot}`}
            alt="Screenshot preview"
            className="w-full max-h-40 object-contain"
          />
        </div>
      )}

      {/* Prompt input */}
      {screenshot && (
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && ask()}
            placeholder="Ask something about this screen…"
            className="flex-1 glass rounded-xl px-3 py-2 text-sm bg-transparent outline-none placeholder-gray-500 focus:border-violet-500 transition-colors"
          />
          <button
            onClick={ask}
            disabled={loading}
            className="glass rounded-xl px-4 py-2 text-sm font-medium text-cyan-300 hover:text-white disabled:opacity-40 transition-all"
          >
            {loading ? '…' : '→'}
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-xs text-red-400 glass rounded-xl px-3 py-2">{error}</p>
      )}

      {/* Answer */}
      {answer && (
        <div className="glass rounded-xl px-3 py-2 text-sm text-gray-200 whitespace-pre-wrap max-h-48 overflow-y-auto">
          {answer}
        </div>
      )}
    </div>
  )
}
