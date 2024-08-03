export const WorkSession = {
  get: () => {
    const filename = sessionStorage.getItem("file_name");
    try {
      const fields = localStorage.getItem(filename);
      let parsedData = [];
      if (fields) {
        parsedData = JSON.parse(fields);
      }
      return parsedData;
    } catch (e) {
      console.error(e.message);
      return [];
    }
  },
  set: (array) => {
    try {
      const filename = sessionStorage.getItem("file_name");
      localStorage.setItem(filename, JSON.stringify(array));
      window.dispatchEvent(new Event("setlocal"));
    } catch (e) {
      return console.error(e.message);
    }
  },
  remove: () => {
    const filename = sessionStorage.getItem("file_name");
    localStorage.removeItem(filename);
  },
};

export const LocalData = {
  get: (key) => {
    const value = localStorage.getItem(key);
    try {
      const parsedData = JSON.parse(value);
      return parsedData;
    } catch (e) {
      console.error(e.message);
      return;
    }
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    return;
  },
  remove: (key) => {
    localStorage.removeItem(key);
    return;
  },
};

export const SessionData = {
  get: (key) => {
    const value = sessionStorage.getItem(key);
    try {
      const parsedData = JSON.parse(value);
      return parsedData;
    } catch (e) {
      console.error(e.message);
      return;
    }
  },
  set: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
    return;
  },
  remove: (key) => {
    sessionStorage.removeItem(key);
  },
};

export default { WorkSession, LocalData, SessionData };
