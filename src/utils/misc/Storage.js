/* eslint-disable no-undefined */
const availability = type => {
  try {
      const storage = window[type];
      const x = '__storage_test__';

      storage.setItem(x, x);
      storage.removeItem(x);

      return true;
  } catch (e) {
      return false;
  }
};

class StorageTool {
  constructor() {
      this.canSave = availability('localStorage');
  }

  setItem = (item, value) => {
      if(this.canSave) {
          localStorage.setItem(item, JSON.stringify(value));
          return true;
      } else {
          throw new Error('Cannot save to storage.');
      }
  };

  getItem = item => {
      if(this.canSave) {
          return (localStorage[item] && JSON.parse(localStorage[item])) || undefined;
      } else {
          throw new Error('Cannot save to storage.');
      }
  };

  removeItem = item => {
      if(this.canSave) {
          localStorage.removeItem(item);
      } else {
          throw new Error('Cannot save to storage.');
      }
  };
}

const WebStorageInstance = new StorageTool();
export default WebStorageInstance;