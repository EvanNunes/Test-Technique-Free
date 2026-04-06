import AntennaList from './components/AntennaList'
import type { Antenna } from './components/AntennaList'



export default async function Home() {

    const res = await fetch('http://web_back/api/antennas')
    if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`)
    }
    const antennas: Antenna[] = await res.json()

    return <AntennaList antennas={antennas}/>


}
