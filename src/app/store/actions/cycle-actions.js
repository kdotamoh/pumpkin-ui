import { CycleKeys } from './action-constants';

export const getCycles = (currentPage = 0) => ({
  type: CycleKeys.GET_CYCLES,
  currentPage
});

export const setCycles = (cycles) => ({
  type: CycleKeys.SET_CYCLES,
  cycles,
});

export const setCyclesCount = (total) => ({
  type: CycleKeys.SET_CYCLES_COUNT,
  total,
});

export const updateCycle = (name, code) => ({
  type: CycleKeys.UPDATE_CYCLE,
  name,
  code,
});

export const createCycle = (name) => ({
  type: CycleKeys.CREATE_CYCLE,
  name,
});

export const deleteCycle = (code) => ({
  type: CycleKeys.DELETE_CYCLE,
  code,
});

export const reactivateCycle = (code) => ({
  type: CycleKeys.REACTIVATE_CYCLE,
  code,
});

export const deactivateCycle = (code) => ({
  type: CycleKeys.DEACTIVATE_CYCLE,
  code,
});

export const setCurrentCycle = (record) => ({
  type: CycleKeys.SET_CURRENT_CYCLE,
  record,
});
