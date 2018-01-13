import React, { Component } from 'react';
import PropTypes from 'prop-types';

import State from './State';
import { noop, composeEventHandlers } from '../utils';

export default class Focus extends Component {
  static propTypes = {
    /**
     * This function is called when the target is blurred.
     * @param {Object} event
     */
    onBlur: PropTypes.func,
    /**
     * This function is called when the target is focused.
     * @param {Object} event
     */
    onFocus: PropTypes.func,
    /**
     * The render function.
     * @param {Object} props
     * @param {func} props.blur This function blurs the target.
     * @param {func} props.focus This function will cause the target element to
     *     be focused.
     * @param {bool} props.focused The current focus state of the target.
     * @param {Object} props.getTargetProps A function that returns the props
     *     for the target (the DOM element we are focusing).
     *     Takes an optional parameter of extra props to merge
     *     in.
     *     Example: <input { ...getTargetProps({onFocus: <handleFocus>}) } />
     */
    render: PropTypes.func.isRequired,
    /**
     * An optional property to pass a ref callback to the target.
     */
    targetRef: PropTypes.func,
  }

  static defaultProps = {
    onFocus: noop,
    onBlur: noop,
    targetRef: noop,
  }

  focus = () => {
    this.target.focus();
  }

  blur = () => {
    this.target.blur();
  }

  targetRef = target => {
    this.target = target;
    this.props.targetRef(target);
  };

  renderFunc = ({ state, setState }) => {
    const { onFocus, onBlur } = this.props;
    const handleFocus = (event) => {
      setState({ focused: true });
      onFocus(event);
    };
    const handleBlur = (event) => {
      setState( { focused: false });
      onBlur(event);
    };
    const getTargetProps = (props={}, isNativeEl=true) => {
      const refType = isNativeEl ? 'ref' : 'targetRef';
      return ({
        ...props,
        [refType]: this.targetRef,
        onFocus: composeEventHandlers( props.onFocus, handleFocus),
        onBlur: composeEventHandlers( props.onBlur, handleBlur),
      });
    };

    return this.props.render({
      getTargetProps,
      blur: this.blur,
      focus: this.focus,
      focused: state.focused,
    });
  }

  render() {
    return (
      <State
        initial={{focused: false}}
        render={this.renderFunc}
      />
    );
  }
}
