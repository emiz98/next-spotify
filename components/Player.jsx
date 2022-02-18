import {
  SwitchHorizontalIcon,
  VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline'
import {
  RewindIcon,
  PlayIcon,
  PauseIcon,
  FastForwardIcon,
  ReplyIcon,
  VolumeUpIcon,
  ChevronUpIcon,
} from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSongInfo from '../hooks/useSongInfo'

function Player() {
  const { data: session, status } = useSession()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)
  const [triggerImage, setTriggerImage] = useState(false)

  const songInfo = useSongInfo()

  const triggerAlbumImage = () => {
    setTriggerImage(!triggerImage)
  }

  return (
    <div
      className="md-px-8 grid h-24 grid-cols-2 bg-gradient-to-b
    from-black to-gray-900 px-2 text-xs text-white
    md:grid-cols-3 md:text-base"
    >
      {/* left */}
      <div className="flex items-center space-x-4">
        <img
          className="w-1h-16 h-16 object-cover"
          src={songInfo?.album.images?.[0].url}
          alt=""
        />
        {/* <div
          onClick={triggerAlbumImage}
          className="rounded-full bg-gray-800 p-1
        transition duration-200 ease-in-out hover:bg-gray-500"
        >
          <ChevronUpIcon className="footerBtn" />
        </div> */}

        <div>
          <h3>{songInfo?.name}</h3>
          <p className="text-gray-500">{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* center */}
      <div className="flex items-center justify-center space-x-5">
        <SwitchHorizontalIcon className="footerBtn hidden md:inline" />
        <RewindIcon className="footerBtn" />
        {isPlaying ? (
          <PauseIcon className="footerBtn footerMidBtn" />
        ) : (
          <PlayIcon className="footerBtn footerMidBtn" />
        )}
        <FastForwardIcon className="footerBtn" />
        <ReplyIcon className="footerBtn hidden md:inline" />
      </div>

      {/* right */}
      <div
        className="flex hidden items-center justify-end 
      space-x-3 pr-5 md:inline-flex md:space-x-4"
      >
        <VolumeDownIcon className="footerBtn" />
        <input
          onChange={(e) => setVolume(Number(e.target.value))}
          className="h-1 w-14 md:w-24"
          type="range"
          min={0}
          max={100}
        />
        <VolumeUpIcon className="footerBtn" />
      </div>
    </div>
  )
}

export default Player
