import Fluxxor from 'fluxxor';

import constants from './constants';

export default Fluxxor.createStore({
  initialize(options) {
    this.enabledVariations = options.enabledVariations || {};
    this.availableVariations = options.availableVariations || [];

    this.bindActions(
      constants.VARIATIONS_FETCH_ALL, this.handleVariationFetch,
      constants.VARIATIONS_ADD, this.handleVariationAdd,
      constants.VARIATIONS_REMOVE, this.handleVariationRemove
    );
  },

  handleVariationAdd(variation) {
    if (!this.hasVariation(variation)) {
      this.enabledVariations[variation] = variation;

      this.emit('change');
    }
  },

  handleVariationRemove(variation) {
    if (this.hasVariation(variation)) {
      this.enabledVariations[variation] = undefined;
      delete this.enabledVariations[variation];

      this.emit('change');
    }
  },

  handleVariationFetch(variations) {
    this.enabledVariations = variations;

    this.emit('change');
  },

  hasVariation(variation) {
    return !!this.enabledVariations[variation];
  },

  getEnabledVariations() {
    return this.enabledVariations;
  },

  getAvailableVariations() {
    return this.availableVariations;
  },

});
