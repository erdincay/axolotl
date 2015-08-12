# Axolotl

A little bit of stuff to control split variation testing.

More docs to come.

# Example Usage

``` javascript
import React from 'react';
import Axo from 'axolotl';
const axo = new Axo();

class ROFL extends React.Component {
  render() {
    return (
      <div>
        ROFL
        <img style={{width: 40}} src={`http://lorempixel.com/40/40/cats?${Math.random()}`}/>;
      </div>
    );
  }
}

const ROFLVariation =  Axo.VariationEnhance({
  Component: ROFL,
  name: 'rofl',
  description: 'Instead of just saying lol, say rofl.. and a cat',
  visible: true, // allow users to opt in should they choose
});

export default class App extends React.Component {
  static childContextTypes = {
    axo: React.PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      axo: axo,
    };
  }

  render() {
    <TheRestOfYourApp>
      {/* this could be deep in the component tree*/}
      <ROFLVariation.Else>LOL</ROFLVariation.Else>
      <ROFLVariation>ROFL</ROFLVariation>
    </TheRestOfYourApp>
  }
}
```

