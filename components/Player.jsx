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

  const songInfo = useSongInfo()

  // console.log(volume)

  return (
    <div
      className="md-px-8 grid h-24 grid-cols-3 
    bg-gradient-to-b from-black to-gray-900 px-2 text-xs
    text-white md:text-base"
    >
      {/* left */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden h-10 w-10 object-cover md:inline"
          src={songInfo?.album.images?.[0].url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p className="text-gray-500">{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="footerBtn" />
        <RewindIcon className="footerBtn" />
        {isPlaying ? (
          <PauseIcon className="footerBtn footerMidBtn" />
        ) : (
          <PlayIcon className="footerBtn footerMidBtn" />
        )}
        <FastForwardIcon className="footerBtn" />
        <ReplyIcon className="footerBtn" />
      </div>

      {/* right */}
      <div
        className="flex items-center justify-end space-x-3 
      pr-5 md:space-x-4"
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
