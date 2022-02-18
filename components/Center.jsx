import { ChevronDownIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, selectedPlaylist } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from '../components/Songs'

function Center() {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(selectedPlaylist)

  useEffect(() => {}, [playlistId])
  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((err) => console.log(err))
  }, [spotifyApi, playlistId])

  return (
    <div className="flex-1">
      <header className="absolute top-5 right-8 text-white">
        <div
          onClick={() => signOut()}
          className="flex cursor-pointer items-center space-x-3 rounded-full
        bg-black p-1 pr-2 opacity-90 hover:opacity-80"
        >
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex h-80 items-end space-x-7 
        bg-gradient-to-b from-green-500 to-black p-8 text-white`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          className="h-44 w-44 object-cover shadow-2xl"
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div className="h-[75vh] overflow-y-scroll scrollbar-hide">
        <Songs />
      </div>
    </div>
  )
}

export default Center
