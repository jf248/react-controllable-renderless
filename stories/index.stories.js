/* eslint react/prop-types:0 */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Filter, Focus, State, Toggle } from  '../src';
import { composeEventHandlers } from '../src/utils';

import './index.css';

const styles = {
  uncontrolled: {
    borderStyle: 'solid',
    padding: '5px',
    margin: '5px',
  },
  controlled: {
    borderStyle: 'solid',
    borderColor: 'red',
    padding: '5px',
    margin: '5px',
  },
};

const StateExample = ({ text, onStateChange }) =>
  <State
    text={text}
    initial={{text: ''}}
    onStateChange={onStateChange}
    render={
      ({state, setState}) =>
        <div style={styles.uncontrolled}>
          <div>Current state is: {state.text}</div>
          <input
            placeholder="Type away..."
            value={state.text}
            onChange={event => {setState({text: event.target.value});}}
          />
        </div>
    }
  />;


storiesOf('State', module)
  .add('uncontrolled', () =>
    <StateExample />
  )
  .add('controlled', () =>
    <State
      initial={{text: ''}}
      render={
        ({state, setState}) =>
          <div style={styles.controlled}>
            <div>You can control the state from out here too</div>
            <input
              placeholder="Type here..."
              value={state.text}
              onChange={event => {setState({text: event.target.value});}}
            />
            <StateExample
              text={state.text}
              onStateChange={changes => setState(changes)}
            />
          </div>
      }
    />
  );

const ToggleExample = ({on, onToggle}) =>
  <Toggle
    initial={false}
    on={on}
    onToggle={onToggle}
    render={
      ({ on, toggle }) =>
        <div style={styles.uncontrolled}>
          <input type="checkbox" checked={on} onClick={toggle}/>
          <button onClick={toggle}>Click to toggle</button>
        </div>
    }
  />;

storiesOf('Toggle', module)
  .add('uncontrolled', () =>
    <ToggleExample />
  )
  .add('controlled', () =>
    <Toggle
      initial={true}
      render={
        ({ on, toggle }) =>
          <div style={styles.controlled}>
            <button onClick={toggle}>Click to control the Toggle</button>
            <ToggleExample
              on={on}
              onToggle={toggle}
            />
          </div>
      }
    />
  );

const DATA = ['orange', 'apple', 'onion', 'carrot', 'chocolate'];

const filterFunc = (items, query) =>
  items.filter(
    item => (!query || item.toLowerCase().includes(query.toLowerCase()))
  );


const FilterExample = ({query, onQueryChange}) =>
  <Filter
    query={query}
    onQueryChange={onQueryChange}
    items={DATA}
    filterFunc={filterFunc}
    render={
      ({filteredItems, refine, query}) =>
        <div style={styles.uncontrolled}>
          <input
            type="text"
            placeholder="Type here to filter..."
            onChange={event => refine(event.target.value)}
            value={query}
          />
          <ul>
            {filteredItems.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
    }
  />;

storiesOf('Filter', module)
  .add('uncontrolled', () =>
    <FilterExample/>
  )
  .add('controlled', () =>
    <State
      initial={{query: ''}}
      render={
        ({ state, setState }) =>
          <div style={styles.controlled}>
            <button
              onClick={() => setState({query: 'choc'})}
            >
              Control filter to &apos;choc&apos;
            </button>
            <FilterExample
              query={state.query}
              onQueryChange={newQuery => setState({query: newQuery})}
            />
          </div>
      }
    />
  );

const FocusExample = ({ targetRef, onFocus, onBlur }) =>
  <Focus
    targetRef={targetRef}
    onFocus={composeEventHandlers(onFocus, action('onFocus'))}
    onBlur={onBlur}
    render={
      ({  getTargetProps, focus, focused, }) =>
        <div style={styles.uncontrolled}>
          <div>
            You are {focused ? '' : 'not'} focused on the input.
          </div>
          <div>
            <button onClick={focus}>Click to focus on the input</button>
          </div>
          <input { ...getTargetProps({placeholder: 'Focus on me...'}) }/>
        </div>
    }
  />;

storiesOf('Focus', module)
  .add('uncontrolled', () =>
    <FocusExample/>
  )
  .add('controlled', () =>
    <Focus
      onFocus={action('controller onFocus')}
      render={
        ({  getTargetProps, focus, focused }) =>
          <div style={styles.controlled}>
            <div>
              You are {focused ? '' : 'not'} focused on the controlled Focus
              element.
            </div>
            <button onClick={focus}>
              Click to focus on the contolled Focus element
            </button>
            <FocusExample
              { ...getTargetProps({}, false) }
            />
          </div>
      }
    />
  );
