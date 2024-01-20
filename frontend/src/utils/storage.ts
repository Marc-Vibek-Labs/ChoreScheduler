const storagePrefix = 'choreScheduler_';

const storage = {
  getUsername: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}username`) as string);
  },
  setUsername: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}username`, JSON.stringify(token));
  },
  clearUsername: () => {
    window.localStorage.removeItem(`${storagePrefix}username`);
  },
};

export default storage;
