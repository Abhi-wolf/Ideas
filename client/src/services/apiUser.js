import axios from "axios";
const apiURL = import.meta.env.VITE_BASE_URL;

export async function updateUserDetail({ data, id }) {
  console.log("data = ", data);
  console.log("id = ", id);
  let user = {};

  try {
    const res = await axios.put(`${apiURL}/user/update/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    user = res?.data?.data;
    console.log("user= ", user);
  } catch (err) {
    console.log(err);
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }

    throw new Error(err.message);
  }
  return user;
}

export async function getUserDetails({ id }) {
  let user = {};

  if (!id) return user;

  try {
    const res = await axios.get(`${apiURL}/user/getuser/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    user = res.data?.data;
  } catch (err) {
    console.log(err);
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }

    throw new Error(err.message);
  }

  return user;
}
