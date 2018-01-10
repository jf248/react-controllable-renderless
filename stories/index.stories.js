import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import { Filter, Focus, State, Toggle } from  '../src';

const StateExample = ({ happy, onStateChange }) =>
  <State
    happy={happy}
    initial={{happy: false}}
    onStateChange={onStateChange}
    render={
      ({state, setState}) =>
        <div style={{borderStyle: 'solid'}}>
          <div>Current state is: {state.happy ? 'happy' : 'not happy'}</div>
          <button
            onClick={() => {setState({happy: !state.happy})}}
          >
            Click to change state
          </button>
        </div>
    }
  />


storiesOf('State', module)
  .add('uncontrolled', () =>
    <StateExample />
  )
  .add('controlled', () =>
    <State
      initial={{happy: true}}
      render={
        ({state, setState}) =>
          <div style={{borderStyle: 'solid', borderColor: 'red'}}>
            <button
              onClick={() => {setState({happy: !state.happy})}}
            >
              Click to change the controlled state
            </button>
            <StateExample
              happy={state.happy}
              onStateChange={changes => setState(changes)}
            />
          </div>
      }
    />
  )

const ToggleExample = ({on, onToggle}) =>
  <Toggle
    initial={false}
    on={on}
    onToggle={onToggle}
    render={
      ({ on, toggle }) =>
        <div style={{borderStyle: 'solid'}}>
          <input type="checkbox" checked={on} onClick={toggle}/>
          <button onClick={toggle}>Click to toggle</button>
        </div>
    }
  />

storiesOf('Toggle', module)
  .add('uncontrolled', () =>
    <ToggleExample />
  )
  .add('controlled', () =>
    <Toggle
      initial={true}
      render={
        ({ on, toggle }) =>
          <div style={{borderStyle: 'solid', borderColor: 'red'}}>
            <button onClick={toggle}>Click to control the Toggle</button>
            <ToggleExample
              on={on}
              onToggle={toggle}
            />
          </div>
      }
    />
  )

const DATA = [
  {group: "fruits", key: 1, text: "orange"},
  {group: "fruits", key: 2, text: "apple"},
  {group: "vegtables", key: 3, text: "onion"},
  {group: "vegtables", key: 5, text: "carrot"},
  {key: 4, text:"chocolate"},
]

const filterFunc = (items, query) =>
  items.filter(
    item => (!query || item.text.toLowerCase().includes(query.toLowerCase()))
  )


const FilterExample = ({query, onQueryChange}) =>
    <Filter
      query={query}
      onQueryChange={onQueryChange}
      items={DATA}
      filterFunc={filterFunc}
      render={
        ({filteredItems, refine, query}) =>
          <div style={{borderStyle: 'solid'}}>
            <input
              type="text"
              placeholder="Type here to filter..."
              onChange={event => refine(event.target.value)}
              value={query}
            />
            <ul>
              {filteredItems.map(item => <li key={item.key}>{item.text}</li>)}
            </ul>
          </div>
      }
    />

storiesOf('Filter', module)
  .add('uncontrolled', () =>
    <FilterExample/>
  )
  .add('controlled', () =>
    <State
      initial={{query: ''}}
      render={
        ({ state, setState }) =>
          <div style={{borderStyle: 'solid', borderColor: 'red'}}>
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
  )

const FocusExample = ({ targetProps: targetProps = {} }) =>
  <Focus
    onFocus={action('focused')}
    { ...targetProps }
    render={
      ({  getTargetProps, focus, focused, }) =>
        <div style={{borderStyle: 'solid'}}>
          <div>
            You are {focused ? 'focused' : 'not focused'} on the input.
          </div>
          <div>
            <button onClick={focus}>Click to focus on the input</button>
          </div>
          <input { ...getTargetProps({placeholder: 'Focus on me...'}) }/>
        </div>
    }
  />

storiesOf('Focus', module)
  .add('uncontrolled', () =>
    <FocusExample/>
  )
  .add('controlled', () =>
    <Focus
      onFocus={action('conroller onFoucs')}
      render={
        ({  getTargetProps, focus, focused }) =>
          <div style={{borderStyle: 'solid', borderColor: 'red'}}>
            <div>
              You are {focused ? 'focused' : 'not focused'} on the controlled Focus element.
            </div>
            <button onClick={focus}>Click to focus on the contolled Focus element</button>
            <FocusExample
              targetProps={getTargetProps({onFocus: action('controlled onFocus')})}
            />
          </div>
      }
    />
  )
