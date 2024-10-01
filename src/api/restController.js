import axios from 'axios';
const http = axios.create({
  baseURL: ' https://api.github.com/',
});



export const getUser = async (data) => {
  console.log('getUser', data);
  try {
    const response = await http.get(`users/${data}`, {
      headers: {
        'Content-Type': 'application/json',
      
      },
    });
    console.log('getUser', response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserRepos = async (data) => {
  console.log('getUserRepos', data);
  try {
    const response = await http.get(`users/${data}/repos`, {
      headers: {
        'Content-Type': 'application/json',
      
      },
    });
    console.log('getUserRepos', response);
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
    console.log('getUserReposLanguages', response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
