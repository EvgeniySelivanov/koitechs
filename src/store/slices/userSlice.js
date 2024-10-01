import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/restController';
import { pendingReducer, rejectedReducer } from '../../utils/store';

const USER_SLICE_NAME = 'user';
const initialState = {
  user: [],
  languages: [],
  sortedRepos:[],
  userNotFound: false,
};

export const getUser = createAsyncThunk(
  `${USER_SLICE_NAME}/getUser`,
  async (payload, thunkAPI) => {
    try {
      const { data, status } = await restController.getUser(payload);
      const result = { data, status };
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error);
    }
  }
);

export const userReposLanguages = createAsyncThunk(
  'github/userReposLanguages',
  async (username, thunkAPI) => {
    try {
      const reposResponse = await restController.getUserRepos(username);
      console.log(reposResponse);
      const repos = reposResponse.data;
      const sortedRepos = repos
          .filter(repo => repo.private === false) 
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
       
      const languagePromises = repos.map((repo) =>
        restController.getUserReposLanguages( repo.languages_url)
      );
      const languagesData = await Promise.all(languagePromises);
console.log(languagesData);

      const totalLanguages = {};
      languagesData.forEach((languages) => {
        for (let [language, bytes] of Object.entries(languages.data)) {
          if (!totalLanguages[language]) {
            totalLanguages[language] = 0;
          }
          totalLanguages[language] += bytes;
        }
      });
      const totalBytes = Object.values(totalLanguages).reduce(
        (a, b) => a + b,
        0
      );
      const languagePercentages = Object.entries(totalLanguages).map(
        ([language, bytes]) => {
          const percentage = ((bytes / totalBytes) * 100).toFixed(2);
          return { language, percentage };
        }
      );

      return {languagePercentages,sortedRepos};
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error);
    }
  }
);

const extraReducers = (builder) => {
  builder.addCase(getUser.pending, pendingReducer);
  builder.addCase(getUser.fulfilled, (state, action) => {
    if (action.payload.status === 200) {
      state.user = action.payload.data;
    } else if (action.payload.status !== 200) {
      state.userNotFound = true;
    }
  });
  builder.addCase(getUser.rejected, rejectedReducer);

  builder
    .addCase(userReposLanguages.pending, pendingReducer)
    .addCase(userReposLanguages.fulfilled, (state, action) => {
      console.log(action.payload);
      
      state.languages = action.payload.languagePercentages;
      state.sortedRepos = action.payload.sortedRepos;
    })
    .addCase(userReposLanguages.rejected, rejectedReducer);
};

const usersSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers,
});

export default usersSlice.reducer;
