import React from 'react';

const ELSE_COMPONENT = true;
const IF_COMPONENT = false;

export default function(name, componentType) {
  return (
    class Variation extends React.Component {

      static contextTypes = {
        axo: React.PropTypes.object.isRequired,
      };

      componentDidMount() {
        this.boundUpdate = ::this.forceUpdate;
        this.context.axo.listen(this.boundUpdate);
      }

      componentWillUnmount() {
        this.context.axo.removeListener(this.boundUpdate);
      }

      render() {
        const hasVariation = this.context.axo.hasVariation(name);

        if (componentType === ELSE_COMPONENT) {
          if (!hasVariation) {
            return this.props.children;
          }
        }

        if (componentType === IF_COMPONENT) {
          if (hasVariation) {
            return this.props.children;
          }
        }

        return null;
      }
    }
  );
}
