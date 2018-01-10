import { Component } from 'react';
import PropTypes from 'prop-types';
import  { noop } from '../utils';

export default class State extends Component {
  static propTypes = {
    /**
     * The initial state.
     */
    initial: PropTypes.object,
    /**
     * This function is called any time the state is changed.
     * @param {Object} changes The properties that have actually changed.
     * @param {Object} state The new state.
     */
    onStateChange: PropTypes.func,
    /* The render function.
     * @param {Object} props
     * @param {Object} props.state The current state.
     * @param {func} props.setState Function to change the state.
     */
    render: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onStateChange: noop,
  };

  state = {
    ...this.props.initial,
  };

  /**
   * A wrap around the default this.setState.
   * Each key in state might be controlled or uncontrolled. We only want to
   * update internal state for uncontrolled keys.
   * Only calls props.onStateChange if a change to state or contolled props was
   * made.  Always calls the callback functions.
   *
   * @param {Object, Func} updater The state to update, or an updater function
   * @param {Func}
   */
  _setState = (updater, cb = noop) => {
    const isUpdaterFunction = typeof updater === 'function';
    const nextState = {};
    const changes = {};
    this.setState(
      prevState => {
        prevState = this.getState(prevState);
        const stateToSet = isUpdaterFunction ? updater(prevState) : updater;
        Object.keys(stateToSet).forEach(key => {
          if (!this.isControlledProp(key)) {
            nextState[key] = stateToSet[key];
          }
          if (prevState[key] !== stateToSet[key]) {
            changes[key] = stateToSet[key];
          }
        });
        return nextState;
      },
      () => {
        if (Object.keys(changes).length > 0) {
          this.props.onStateChange(changes, this.getState());
        }
        cb();
      }
    );
  }

  /**
   * Gets the state based on internal state or props.
   * If a state value is passed via props, then that is the value given,
   * otherwise it's retrieved from this.state.
   *
   * @param {Object} stateToMerge defaults to this.state
   * @return {Object} the state
   */
  getState = (stateToMerge=this.state) => {
    return Object.keys(stateToMerge).reduce((state, key) => {
      state[key] = this.isControlledProp(key)
        ? this.props[key]
        : stateToMerge[key];
      return state;
    }, {});
  }

  /**
   * Determines if a key is a "controlled prop" meaning it is state which is
   * controlled by the outside using props rather than internally controlled
   * state. of this component rather than within this component.
   *
   * @param {String} key the key to check
   * @return {Boolean} whether it is a controlled prop
   */
  isControlledProp = (key) => {
    return this.props[key] !== undefined;
  }

  render() {
    return this.props.render({
      state: this.getState(),
      setState: this._setState,
    });
  }
}
