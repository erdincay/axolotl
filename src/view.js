import React from 'react';

export default class AxoView extends React.Component {
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
    const {axo} = this.context;

    const features = axo.getAvailableVariations()
      // filter out invisible variations unless they are already enabled or a power user
      .filter((variation) => axo.hasVariation(variation.name) || axo.isUserDev() || variation.visible)
      .map((variation) => {
        const enabled = axo.hasVariation(variation.name);
        const friendlyName = variation.name
          .split(/[ -]+/)
          .map(e => e[0].toUpperCase() + e.substr(1))
          .join(' ');

        return (
          <div key={variation.name}>
            <label>
              <input
                type="checkbox"
                checked={enabled}
                onChange={()=> axo.toggle(variation.name)}
              />

              <span>
                <b>{friendlyName}</b>{` - ${variation.description}`}
              </span>
            </label>
          </div>
        );
      }
    );

    return (
      <div>
        <p>
          These features are't production ready, so they could still introduce bugs.<br/>
          These settings are <b>account</b> wide! Your colleges may get mad if you play with them!
        </p>
        <div>
          {features}
        </div>
      </div>
    );
  }
}
