import { useSession } from 'next-auth/react'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import Player from '../components/Player'

function HomePage() {
  const { data: session, status } = useSession()
  return (
    <div className="h-screen overflow-hidden bg-black">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}

export default HomePage
