'use client'

import { useEffect, useState } from "react";
import { Antenna, AntennaId } from "@/app/components/AntennaList";
import { useToast } from "@/app/contexts/ToastContext";

export default function AntennaHistory({ antenna, onClose }: { antenna: Antenna, onClose: () => void }) {
    const [history, setHistory] = useState<AntennaId>()
    const { showToast } = useToast()

    useEffect(() => {
        const fetchHistory = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/antennas/${antenna.id}`)
            if (!res.ok) {
                const data = await res.json()
                showToast(data.error, 'error')
                return
            }
            const data = await res.json()
            setHistory(data)
        }
        fetchHistory()
    }, [])

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">

                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-base font-bold text-gray-800">Historique des interventions</h2>
                        <p className="text-xs text-gray-400 mt-0.5">{antenna.name} — {antenna.city}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
                </div>

                <div className="overflow-auto max-h-96">
                    <table className="w-full text-sm text-left">
                        <thead className="text-white uppercase text-xs sticky top-0" style={{ backgroundColor: '#cd1619' }}>
                            <tr>
                                <th className="px-4 py-3 w-12">id</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3 w-40">Début</th>
                                <th className="px-4 py-3 w-40">Fin</th>
                                <th className="px-4 py-3 w-28">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {!history ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-gray-400">Chargement...</td>
                                </tr>
                            ) : history.interventions?.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-gray-400 italic">Aucune intervention</td>
                                </tr>
                            ) : history.interventions?.map(intervention => (
                                <tr key={intervention.id} className="hover:bg-red-50 transition-colors">
                                    <td className="px-4 py-3 text-gray-400">{intervention.id}</td>
                                    <td className="px-4 py-3 text-gray-800">{intervention.description}</td>
                                    <td className="px-4 py-3 text-gray-600">{formatDate(intervention.created_at)}</td>
                                    <td className="px-4 py-3 text-gray-600">{intervention.ended_at ? formatDate(intervention.ended_at) : '-'}</td>
                                    <td className="px-4 py-3">
                                        {intervention.ended_at ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 whitespace-nowrap">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                Terminée
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 whitespace-nowrap">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                                En cours
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
