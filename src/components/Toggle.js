import React, { Component } from 'react';
import PropTypes from 'prop-types';

import State from './State';
import { noop } from '../utils';

export default class Toggle extends Component {
  static propTypes = {
    /**
     * The initial state of the toggle. Default: false.
     */
    initial: PropTypes.bool,
    /**
     * Control prop. [optional]
     */
    on: PropTypes.bool,
    /**
     * This function is called when a toggle occurs.
     * @param {bool} on The new state of the Toggle.
     */
    onToggle: PropTypes.func,
    /**
     * The render function.
     * @param {Object} props
     * @param {bool} props.on The current state of the Toggle.
     * @param {func} props.toggle Function that toggles the state.
     */
    render: PropTypes.func.isRequired,
  };

  static defaultProps = {
    initial: false,
    onToggle: noop,
  };

  handleStateChange = changes => {
    if (changes.hasOwnProperty('on')) {
      this.props.onToggle(changes.on);
    }
  }

  renderFunc = ({ state, setState }) => {
    const toggle = () => {
      setState(prevState => ({on: !prevState.on}));
    };
    return this.props.render({ toggle, on: state.on, });
  };

  render() {
    const { initial, on } = this.props;
    return (
      <State
        on={on}
        initial={{on: initial}}
        onStateChange={this.handleStateChange}
        render={this.renderFunc}
      />
    );
  }
}
