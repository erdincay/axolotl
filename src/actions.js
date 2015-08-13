import constants from './constants';

export default {

  fetchAll() {
    return new Promise((resolve) => {
      this.dispatch(constants.VARIATIONS_FETCH_ALL, {});
      resolve();
    });
  },

  add(variationName) {
    return new Promise((resolve) => {
      this.dispatch(constants.VARIATIONS_ADD, variationName);
      resolve();
    });
  },

  remove(variationName) {
    return new Promise((resolve) => {
      this.dispatch(constants.VARIATIONS_REMOVE, variationName);
      resolve();
    });
  },
};
