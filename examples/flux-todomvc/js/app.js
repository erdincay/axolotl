/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');

var TodoApp = require('./components/TodoApp.react');

// Stuff from Axolotl example :D

// hack to show the labs page before its enabled...
// normally you would have a route to this page :D
if (!localStorage.axoVariations) localStorage.axoVariations = '{show-labs-page: true}';

var Axo = require('axolotl');

var variationRequire = require.context('./variations', true, /\.js$/);
var availableVariations = variationRequire.keys().map((v) => variationRequire(v).variation);

var Axo = require('axolotl');
var axo = new Axo(availableVariations, undefined, Axo.localStorageActions);

var LabsPage = Axo.LabsPage;
var LabsVariation = require('./variations/labs.js');

var AxoContext = React.createClass({
  childContextTypes: {
    axo: React.PropTypes.object.isRequired,
  },

  getChildContext() {
    return {
      axo: axo,
    };
  },

  getInitialState() {
    return {
      showLabs: false,
    };
  },

  render() {
    return (
      <div>
        <LabsVariation onClick={() => this.setState({showLabs: !this.state.showLabs})}/>
        { this.state.showLabs ?
          <LabsPage/>
          :
          <TodoApp/>
        }
      </div>
    );
  }
});

// :D

React.render(
  <AxoContext/>,
  document.getElementById('todoapp')
);
