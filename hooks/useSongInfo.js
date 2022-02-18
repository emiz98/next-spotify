import useSpotify from './useSpotify'
import { currentTrackIdState } from '../atoms/songAtom'
import { useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'

function useSongInfo() {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [songInfo, setSongInfo] = useState(null)

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        spotifyApi
          .getTrack(currentTrackId)
          .then((data) => {
            setSongInfo(data.body)
          })
          .catch((err) => console.log(err))
      }
    }
    fetchSongInfo()
  }, [currentTrackId, spotifyApi])

  return songInfo
}

export default useSongInfo
