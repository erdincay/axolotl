import React from 'react';

import variation from './component';

/*
 * weight: chance of joining bucket, where 0 means no one will never get added and 100 means always
 * visible: does it show up to non developers on the labs page
 * description: what it says on the labs page
 * name: event in analytics when user joins bucket
 * onStart: a way for variations to hook flux or do other things on start
 */

const defaults = {
  Component: undefined,
  name: undefined,
  description: undefined,
  weight: 0,
  visible: false,
  onStart: () => {},
};

export default function VariationEnhance(details) {
  const {Component, name, description, weight, visible, onStart} = Object.assign(defaults, details);
  console.assert(Component, name, description);

  const IfVariation = variation(name, false);
  const ElseVariation = variation(name, true);

  const EnhancedComponent = class EnhancedVariation extends React.Component {
    render() {
      return (
        <IfVariation>
          <Component {... this.props}>
            {this.props.children}
          </Component>
        </IfVariation>
      );
    }
  };

  EnhancedComponent.variation = {name, description, weight, visible, onStart};
  EnhancedComponent.OriginalComponent = Component;
  EnhancedComponent.Else = ElseVariation;
  EnhancedComponent.If = IfVariation;

  return EnhancedComponent;
}
