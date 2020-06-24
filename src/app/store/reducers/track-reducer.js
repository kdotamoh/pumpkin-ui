import { TrackKeys } from '../actions/action-constants';
import { message } from 'antd';

export const initialTrackState = {
  available: [],
  current: null,
};

/**
 * Manages the Application Tracks
 * @param {*} state state of the tracks
 * @param {*} action Redux action to perform on the state
 */
export const trackReducer = (state = initialTrackState, action) => {
  switch (action.type) {
    case TrackKeys.SET_TRACKS: {
      return {
        ...state,
        available: action.tracks,
      };
    }
    case TrackKeys.DELETE_TRACK: {
      const trackToDelete = state.available.find(
        (track) => track.code === action.code
      );
      if (trackToDelete) {
        const updatedAvailable = state.available.filter(
          (track) => track.code !== trackToDelete.code
        );
        return {
          ...state,
          available: updatedAvailable,
        };
      } else {
        message.error('Cannot find track to be deleted');
      }
      break;
    }
    case TrackKeys.SET_CURRENT_TRACK: {
      return {
        ...state,
        current: action.record,
      };
    }
    default:
      return state;
  }
};
