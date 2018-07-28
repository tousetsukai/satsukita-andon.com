import { createActions } from "redux-actions";
import axios from "axios";

// TODO: development と production で切り替える
const api = axios.create({
  baseURL: "https://api.satsukita-andon.com/dev"
});

// TODO: 一つに詰め込みたくない
export default createActions({
  APP: {
    USER: {
      FETCH: async token => {
        const res = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return res.data;
      }
    }
  },
  HOWTO: {
    ARTICLES: {
      FETCH: async params => {
        const res = await api.get("/articles", { params });
        return res.data;
      }
    },
    ARTICLE: {
      FETCH: async id => {
        const res = await api.get(`/articles/${id}`);
        return res.data;
      }
    }
  },
  CONTENTS: {
    FETCH_NEWS: async () => {
      const res = await api.get("/contents/news");
      return res.data;
    },
    FETCH_ABOUT: async () => {
      const res = await api.get("/contents/about");
      return res.data;
    },
    FETCH_CONTACT: async () => {
      const res = await api.get("/contents/contact");
      return res.data;
    }
  }
});
