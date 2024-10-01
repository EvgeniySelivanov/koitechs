import axios from 'axios';
const http = axios.create({
  baseURL: ' https://api.github.com/',
});

export const getUser = async (data) => {
  try {
    const response = await http.get(`users/${data}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserRepos = async (data) => {
  try {
    const response = await http.get(`users/${data}/repos`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getUserReposLanguages = async (repo) => {
  try {
    const response = await http.get(`${repo}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
