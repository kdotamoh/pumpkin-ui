import {ApplicationReviewerKeys} from './action-constants';

export const getApplicationReviewers = (cycleReference) => ({
    type: ApplicationReviewerKeys.GET_APPLICATION_REVIEWERS,
    cycleReference,
});

export const setApplicationReviewers = (applicationReviewers) => ({
    type: ApplicationReviewerKeys.SET_APPLICATION_REVIEWERS,
    applicationReviewers,
});

export const setCycleReference = (cycleReference) => ({
    type: ApplicationReviewerKeys.SET_CYCLE_REFERENCE,
    cycleReference
});

export const setCyclesHaveBeenLoaded = (cyclesHaveBeenLoaded) => {
    return {
        type: ApplicationReviewerKeys.SET_CYCLES_HAS_BEEN_LOADED,
        cyclesHaveBeenLoaded
    }
}

export const searchApplicationReviewers = (cycleReference, searchKey) => ({
    type: ApplicationReviewerKeys.SEARCH_APPLICATION_REVIEWERS,
    cycleReference,
    searchKey
});

export const setCurrentApplicationReviewer = (record) => ({
    type: ApplicationReviewerKeys.SET_CURRENT_APPLICATION_REVIEWER,
    record,
});