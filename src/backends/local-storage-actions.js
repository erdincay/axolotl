import constants from '../constants';

function serialize(variations) {
  localStorage.axoVariations = JSON.stringify(variations);
}

function deserialize() {
  try {
    return JSON.parse(localStorage.axoVariations || '{}');
  } catch(e) {
    return {};
  }
}

export default {

  fetchAll() {
    return new Promise((resolve) => {
      this.dispatch(constants.VARIATIONS_FETCH_ALL, deserialize());
      resolve();
    });
  },

  add(variationName) {
    return new Promise((resolve) => {
      const variations = deserialize();
      variations[variationName] = true;
      serialize(variations);

      this.dispatch(constants.VARIATIONS_ADD, variationName);
      resolve();
    });
  },

  remove(variationName) {
    return new Promise((resolve) => {
      const variations = deserialize();
      delete variations[variationName];
      serialize(variations);

      this.dispatch(constants.VARIATIONS_REMOVE, variationName);
      resolve();
    });
  },
};
