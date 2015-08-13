var React = require('react');

var Axo = require('axolotl');

var LabsPage = React.createClass({
  render() {
    return (
      <div>
        <br/>
        <a href="#" onClick={this.props.onClick}>Toggle Labs Config</a>
      </div>
    );
  }
});


const LabsPageVariation =  Axo.VariationEnhance({
  Component: LabsPage,
  name: 'show-labs-page',
  description: 'Add a link to configure the labs page',
  visible: true, // allow users to opt in should they choose
});

module.exports = LabsPageVariation;
