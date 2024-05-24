import axios from "axios";
const apiURL = import.meta.env.VITE_BASE_URL;

export async function login({ data }) {
  let user = {};

  try {
    const res = await axios.post(`${apiURL}/user/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    user = res?.data?.data;
  } catch (err) {
    console.log(err);
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }

    throw new Error(err.message);
  }

  return user;
}

export async function signUp({ data }) {
  let user = {};

  try {
    const res = await axios.post(`${apiURL}/user/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    user = res?.data?.data;
  } catch (err) {
    console.log(err);
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }

    throw new Error(err.message);
  }

  return user;
}

export async function logout({ data }) {
  let user = {};

  try {
    const res = await axios.post(`${apiURL}/user/logout`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    user = res?.data?.data;
    console.log(res);
  } catch (err) {
    console.log(err);
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }

    throw new Error(err.message);
  }

  return user;
}
