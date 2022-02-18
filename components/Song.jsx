import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { millisToMinutesAndSeconds } from '../lib/time'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'

function Song({ order, track }) {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    setCurrentTrackId(track.track.id)
    setIsPlaying(true)
    // spotifyApi.play({
    //   uris: [track.track.uri],
    // })
  }

  return (
    <div
      onClick={playSong}
      className="grid cursor-pointer grid-cols-2 rounded-lg py-3
    px-3 text-gray-500 hover:bg-gray-900"
    >
      <div className="flex items-center space-x-4">
        <p className="mr-4">{order + 1}</p>
        <Image
          src={
            track.track.album.images.length > 0
              ? track.track.album.images[0].url
              : '/assets/spotify_404.png'
          }
          height={40}
          width={40}
        />
        <div>
          <p className="w-36 truncate text-white lg:w-64">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden w-40 md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song
