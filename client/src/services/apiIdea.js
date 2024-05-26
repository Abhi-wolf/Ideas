import axios from "axios";
const apiURL = import.meta.env.VITE_BASE_URL;

export async function getIdeas() {
  let ideas = [];
  try {
    const res = await axios.get(`${apiURL}/ideas/latestIdeas`);
    ideas = res.data?.data;
  } catch (err) {
    console.log(err.message);
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }

  return ideas;
}

export async function likeIdea({ id }) {
  let user = {};

  try {
    const res = await axios.put(
      `${apiURL}/ideas/like`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    user = res.data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }

  return user;
}

export async function getIdea({ id }) {
  let idea = {};
  try {
    const res = await axios.get(`${apiURL}/ideas/${id}`);
    idea = res.data?.data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }

  return idea;
}

export async function comment({ data }) {
  let user = {};

  try {
    const res = await axios.post(`${apiURL}/idea/comment`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    user = res.data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }

  return user;
}

export async function addIdea({ data }) {
  let idea = {};
  console.log("data = ", data);

  try {
    const res = await axios.post(`${apiURL}/ideas/newIdea`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    idea = res.data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }

  return idea;
}

export async function bookMarkIdea({ id }) {
  let idea = {};

  try {
    const res = await axios.put(
      `${apiURL}/ideas/bookmark`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    idea = res.data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }

  return idea;
}

export async function getBookMarks({ userName }) {
  let bookmarks = [];

  if (!userName) return bookmarks;

  try {
    const res = await axios.get(`${apiURL}/user/getbookmarks`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    bookmarks = res.data?.data;
  } catch (err) {
    console.log(err.message);
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }

  return bookmarks;
}
