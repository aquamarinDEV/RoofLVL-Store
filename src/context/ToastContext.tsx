import { createContext, useContext, useState, useCallback } from 'react'

interface ToastContextValue {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)

  const showToast = useCallback((text: string) => {
    setMessage(text)
    window.setTimeout(() => {
      setMessage((current) => (current === text ? null : current))
    }, 2200)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div className="toast-banner">
          <span className="toast-icon">🛒</span>
          <span>{message}</span>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return ctx
}

