const storagePrefix = "choreSchedulerToken";

export const storage = {
  getToken: () => {
    const jwtToken = window.localStorage.getItem(`${storagePrefix}`);
    return jwtToken ? jwtToken : null;
  },
  setToken: (token) => {
    window.localStorage.setItem(`${storagePrefix}`, token);
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}`);
  },
};
