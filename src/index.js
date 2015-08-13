import Fluxxor from 'fluxxor';

import Store from './store';
import defaultActions from './actions';
import localStorageActions from './backends/local-storage-actions'
import VariationEnhance from './enhance';
import LabsPage from './view';

const STORE_NAME = 'variations';

export default class Axo {
  static VariationEnhance = VariationEnhance;
  static LabsPage = LabsPage;
  static localStorageActions = localStorageActions;

  constructor(availableVariations, flux = new Fluxxor.Flux(), actions = defaultActions) {
    flux.addStore(STORE_NAME, new Store({availableVariations}));
    flux.addActions({[STORE_NAME]: actions});

    this._actions = flux.actions[STORE_NAME];
    this._store = flux.store(STORE_NAME);
    this._flux = flux;

    this.listen = (cb) => this._store.on('change', cb);
    this.removeListener = (cb) => this._store.removeListener('change', cb);

    this._actions.fetchAll().then(::this._firstLoad);
  }

  _firstLoad() {
    // this runs once, this is for every variation that needs initialising at app start
    this.getAvailableVariations()
      .forEach((variation) =>
        variation.onStart(this.hasVariation(variation.name), this._flux)
      );
  }

  iKnowKungFu() {
    if (!this.isUserDev()) {
      localStorage.iknowkungfu = true;
    } else {
      delete localStorage.iknowkungfu;
    }

    this._store.emit('change');
  }

  isUserDev() {
    // TODO: move to actions to allow different methods
    return !!localStorage.iknowkungfu;
  }

  refresh() {
    this._actions.fetchAll();
  }

  enable(variation) {
    this._actions.add(variation);
  }

  disable(variation) {
    this._actions.remove(variation);
  }

  toggle(variation) {
    if (this.hasVariation(variation)) {
      this.disable(variation);
    } else {
      this.enable(variation);
    }
  }

  getAvailableVariations() {
    return this._store.getAvailableVariations();
  }

  getEnabledVaritions() {
    return this._store.getEnabledVariations();
  }

  hasVariation(name) {
    return this._store.hasVariation(name);
  }
}
