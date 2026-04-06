'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation'

export interface Antenna {
    id: number;
    name: string;
    city: string;
    lastIntervention: Intervention | null;
}

export interface Intervention {
    id: number;
    antenna_id: number;
    description: string;
    created_at: string;
    ended_at: string | null;
}

export default function AntennaList({ antennas }: { antennas: Antenna[] }) {
    const [search, setSearch] = useState('')
    const filtered = antennas.filter(antenna =>
        antenna.city.toLowerCase().includes(search.toLowerCase())
    )
    const router = useRouter()
    const handleClose = async (interventionId: number) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/intervention/${interventionId}`, {
            method: 'PATCH',
        })
        router.refresh()
    }

    return (
            <div className="min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
            <header style={{ backgroundColor: '#cd1619' }} className="px-8 py-4 flex items-center gap-3 shadow-md">
                <span className="text-white text-3xl font-black tracking-tight">free</span>
                <span className="text-white/60 text-sm mt-1">| Pilotage réseau mobile</span>
            </header>
            <div className="max-w-5xl mx-auto">


                <div className="mb-4 mt-10">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher par ville..."
                        className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                </div>

                <div className="bg-white rounded-xl shadow overflow-auto">
                    <table className="w-full text-sm text-left table-fixed">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs sticky top-0">
                            <tr>
                                <th className="px-6 py-3 w-12">Id</th>
                                <th className="px-6 py-3 w-48">Nom</th>
                                <th className="px-6 py-3 w-36">Ville</th>
                                <th className="px-6 py-3 w-64">Dernière intervention</th>
                                <th className="px-6 py-3 w-28">Statut</th>
                                <th className="px-6 py-3 w-60">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                                        Aucune antenne trouvée pour cette ville
                                    </td>
                                </tr>
                            ) : filtered.map(antenna => (
                                <tr key={antenna.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-3 text-gray-400">{antenna.id}</td>
                                    <td className="px-6 py-3 font-medium text-gray-800">{antenna.name}</td>
                                    <td className="px-6 py-3 text-gray-600">{antenna.city}</td>
                                    <td className="px-6 py-3 text-gray-600 max-w-xs truncate">
                                        {antenna.lastIntervention?.description ?? (
                                            <span className="text-gray-400 italic">Aucune</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {antenna.lastIntervention ? (
                                            antenna.lastIntervention.ended_at ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 whitespace-nowrap">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                    Terminée
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 whitespace-nowrap">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                                    En cours
                                                </span>
                                            )
                                        ) : (
                                            <span className="text-gray-400 italic text-xs">—</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            {antenna.lastIntervention && antenna.lastIntervention.ended_at  ? (

                                                <button
                                                className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                + Intervention
                                            </button> ) : (
                                                <button
                                                    onClick={() => handleClose(antenna.lastIntervention!.id)}
                                                    className="px-3 py-1.5 text-xs font-medium bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                                >
                                                    Clôturer
                                                </button>
                                            ) }
                                        </div>
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
