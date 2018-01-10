import React, { Component } from 'react';
import PropTypes from 'prop-types';

import State from './State';
import { noop } from '../utils';

export default class Filter extends Component {
  static propTypes = {
    /**
     * The default query. Default: ''.
     */
    defaultQuery: PropTypes.any,
    /**
     * A function to filter the items. (Should return all items for a null or
     * undefined query).
     * @param {arrray} items
     * @param {any} query
     */
    filterFunc: PropTypes.func.isRequired,
    /**
     * The items to filter.
    */
    items: PropTypes.array,
    /**
     * Control prop. [Optional]
     */
    query: PropTypes.any,
    /**
     * This function is called when the query is changed.
     * @param {*} newQuery The new query.
     */
    onQueryChange: PropTypes.func,
    /**
     * The render function
     * @param {object} props
     * @param {array} props.filteredItems The filtered items.
     * @param {*}  props.query The current query.
     * @param {func} props.refine This function takes a new query and updates
     *    the filteredItems.
     */
    render: PropTypes.func.isRequired,
  }

  static defaultProps = {
    items: [],
    defaultQuery: '',
    onQueryChange: noop,
  }

  handleStateChange = changes => {
    if (changes.hasOwnProperty('query')) {
      this.props.onQueryChange(changes.query);
    }
  };

  renderFunc = ({state, setState}) => {
    const { render, filterFunc, items } = this.props;
    const filteredItems = filterFunc(items, state.query);
    const refine = query => setState({ query });
    return render({ filteredItems, refine, query: state.query });
  }

  render() {
    const { defaultQuery, query } = this.props;
    return (
      <State
        initial={{ query: defaultQuery }}
        onStateChange={this.handleStateChange}
        query={query}
        render={this.renderFunc}
      />
    );
  }
}
