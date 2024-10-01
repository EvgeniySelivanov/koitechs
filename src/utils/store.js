
export const pendingReducer = state => {
  state.isFetching = true;
  state.error = null;
};

export const rejectedReducer = (state, { payload }) => {
  state.isFetching = false;
  state.error = payload;
};

