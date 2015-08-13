var React = require('react');

var Axo = require('axolotl');

var ROFL = React.createClass({
  render() {
    return (
      <div>
        <img style={{width: 40}} src={`http://lorempixel.com/40/40/cats?${Math.random()}`}/>
      </div>
    );
  }
});


const ROFLVariation =  Axo.VariationEnhance({
  Component: ROFL,
  name: 'rofl',
  description: 'Put a cat on it',
  visible: true, // allow users to opt in should they choose
});

module.exports = ROFLVariation;
