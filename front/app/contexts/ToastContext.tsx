'use client'

import { createContext, useContext, useEffect, useState } from "react"

interface ToastContextType {
    showToast: (message: string, type: 'success' | 'error') => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [message, setMessage] = useState('')
    const [type, setType] = useState<'success' | 'error'>('success')
    const [visible, setVisible] = useState(false)


    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => setVisible(false), 3000)
            return () => clearTimeout(timer)
        }
    }, [visible])

    const showToast = (message: string, type: 'success' | 'error') => {
        setMessage(message)
        setType(type)
        setVisible(true)
    }

    return (
        <ToastContext value={{ showToast }}>
            {children}
            {visible && (
                <div
                    className="fixed top-20 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium"
                    style={{ backgroundColor: type === 'success' ? '#16a34a' : '#cd1619' }}
                >
                    {type === 'success' ? '✓' : '✕'} {message}
                </div>
            )}
        </ToastContext>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) throw new Error('useToast doit être utilisé dans un ToastProvider')
    return context
}
