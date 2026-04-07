'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Antenna } from "@/app/components/AntennaList";
import {useToast} from "@/app/contexts/ToastContext";

export default function NewInterventionModal({ antenna, onClose }: { antenna: Antenna, onClose: () => void }) {
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { showToast } = useToast()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/intervention`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ antenna_id: antenna.id, description }),
        })

        setLoading(false)

        if (!res.ok) {
            const data = await res.json()
            showToast(data.error, 'error')

            return
        }

        showToast('Intervention crée avec succèss', 'success')
        router.refresh()
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">

                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-base font-bold text-gray-800">Nouvelle intervention</h2>
                        <p className="text-xs text-gray-400 mt-0.5">{antenna.name} - {antenna.city}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Décrivez l'intervention..."
                        rows={4}
                        required
                        maxLength={255}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none resize-none"
                    />
                    <p className="text-xs text-gray-400 text-right mt-1">{description.length}/255</p>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50"
                            style={{ backgroundColor: '#cd1619' }}
                        >
                            {loading ? 'Création...' : 'Créer'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}
