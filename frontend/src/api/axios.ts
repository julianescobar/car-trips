import axios from "axios";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

export const api = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;


    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
  
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = "Bearer " + newToken;
            resolve(api(originalRequest));
          });
        });
      }

  
      isRefreshing = true;

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/refresh/`, {
          refresh,
        });

        const newAccess = data.access;

        localStorage.setItem("access", newAccess);

        api.defaults.headers.common.Authorization = "Bearer " + newAccess;

        isRefreshing = false;
        onRefreshed(newAccess);

        originalRequest.headers.Authorization = "Bearer " + newAccess;

        return api(originalRequest);
      } catch (err) {
        isRefreshing = false;
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
