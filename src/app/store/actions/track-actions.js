import { TrackKeys } from './action-constants';

export const getTracks = () => ({
  type: TrackKeys.GET_TRACKS,
});

export const setTracks = (tracks) => ({
  type: TrackKeys.SET_TRACKS,
  tracks,
});

export const updateTrack = (name, code) => ({
  type: TrackKeys.UPDATE_TRACK,
  name,
  code,
});

export const createTrack = (name) => ({
  type: TrackKeys.CREATE_TRACK,
  name,
});

export const deleteTrack = (code) => ({
  type: TrackKeys.DELETE_TRACK,
  code,
});

export const setCurrentTrack = (record) => ({
  type: TrackKeys.SET_CURRENT_TRACK,
  record,
});
