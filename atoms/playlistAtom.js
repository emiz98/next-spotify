import { atom } from 'recoil'

export const selectedPlaylist = atom({
  key: 'selectedPlaylistState',
  default: null,
})

export const playlistIdState = atom({
  key: 'playlistIdState',
  default: '5ENCB3d60EK8XCHhL2fsDB',
})
