# react-controllable-renderless
Inspired by [react-powerplug][react-powerplug], a set of 'pluggable' renderless components that provide logic for your 'dumb' components.

Unlike [react-powerplug][react-powerplug] the state of these renderless components can also be optionally controlled.

**Also:**
* A [Filter](#filter) component.
* The [Focus](#focus) component provides a `focus` function to focus on the target (using refs).

## Quick example
```jsx
import { State } from 'react-controllable-renderless';
import { Pagination } from './components';

// State works exactly like react-powerplug
const StateExample = props =>
  <State
    { ...props }
    initial={{ offset: 0, limit: 10, totalCount: 200 }}
    render={ ({state, setState}) =>
      <Pagination {...state} onChange={offset => setState({ offset })} />
    }
  />

// But we can also control parts of its state, e.g. limit, by adding props
const ControlledExample = props =>
  <StateExample
    limit={props.limit}
    onStateChange={props.onStateChange}
  />
```

## Renderless components
See [react-powerplug][react-powerplug] for an introduction to using renderless components.
> **Note:** You must use a `render` prop not the `children` prop.

## Install
```
yarn add react-controllable-renderless
```
```
npm i react-controllable-renderless
```

## Examples
See the [storybook][storybook].

## Components
* [State](#state)
* [Filter](#filter)
* [Focus](#focus)
* [Toogle](#toggle)

### State
#### Props
prop | type | default | description
--- | --- | --- | ---
`initial` | `object` | `undefined` | The initial state.
`onStateChange` | `function(changes: object, state: object)` | `noop` | This function is called any time the state is changed.
`render` | `function(renderProps: object)` | **required** | The render function. See below.
> In addition any part of the state can be controlled by passing a prop with the same name. E.g. to control `state.age`, pass in an `age` prop, `<State age={} ... />`, and use `onStateChange` to detect when `age` is trying to be changed.

#### Render props
prop | type | description
--- | --- | ---
`state` | `object` | The current state.
`setState` | `function` | State setter, same as `setState` from `React.Component`.

### Filter
Filters an array of `items` using a `filterFunc` that takes a `query` and `items` as arguments and return the `filteredItems`.

The `query` is updated by passing a new query to the `refine` render prop function.

In addition, `query` can be optionally controlled by passing a `query` prop and using `onQueryChange` to detect internal changes to the `query`.

#### Props
prop | type | default | description
--- | --- | --- | ---
`defaultQuery` | `any` | `''` | The default query.
`filterFunc` | `function(items: array, query: any)` | **required** | A function to filter the items.
`items` | `array(any)` | `[]` | The items to filter.
`query` | `any` | `undefined` | **optional control prop**
`onQueryChange` | `function(newQuery: any)` | `noop` | This function is called when the query is changed.
`render` | `function(renderProps: object)` | **required** | The render function. See below.

#### Render props
prop | type | description
--- | --- | ---
`filteredItems` | `array(any)` | The filtered items.
`query` | `any` | `The current query`.
`refine` | `function(newQuery: any)` | This function takes a new query and updates the `filteredItems`.

### Focus
Like [react-powerplug][react-powerplug]'s `Focus` but also has `focus` and `blur` methods that use `refs` internally to allow a target element's focus to be controlled.

#### Props
prop | type | default | description
--- | --- | --- | ---
`onBlur` | `function(event: SyntheticEvent)` | `noop` | This function is called when the target is blurred.
`onFocus` | `function(event: SyntheticEvent)` | `noop` | This function is called when the target is focused.
`render` | `function(renderProps: object)` | **required** | The render function. See below.
`targetRef` | `function(element)` | `noop` | An optional property to pass a ref callback to the target. Useful for chaining `Focus` components.

#### Render props
prop | type | description
--- | --- | ---
`blur` | `function` | This function blurs the target.
`focus` | `function` | This function will cause the target element to gain focus.
`focused` | `boolean` | The current focus state of the target.
`getTargetProps` | `function(additionalProps={})` | A function that returns the props for the target (the element we wish to focus). Takes an optional `object` argument of extra props to be merge in.<br/>Example: `<input { ...getTargetProps({onFocus: <handleFocus>}) } />`<br>See [this blog post][prop getters] on 'prop getters'.

### Toggle
#### Props
prop | type | default | description
--- | --- | --- | ---
`initial` | `boolean` | `false` | The initial/default state of the toggle.
`on` | `bool` | `undefined` | **optional control prop**
`onToggle` | `function(newState: bool)` | This function is called when a toggle occurs.
`render` | `function(renderProps: object)` | **required** | The render function. See below.

#### Render props
prop | type | description
--- | --- | ---
`on` | `bool` | The current state of the toggle.
`toggle` | `function` | Function that toggles the state.

## TODO
- [ ] Tests
- [ ] Add children prop functionality
- [ ] Add `compose` functionality
- [ ] Add other react-powerplug components

## Credits
I initially learnt about the power of renderless components and the 'render prop' pattern from [downshift](downshift) as well as the 'prop getter' pattern used in `getTargetProps` prop of the `Focus` component.

I also learnt more about these patterns from [articles][use a render prop article] and [courses][reacttraining] by [Michael Jackson][michael jackson] and [Ryan Florence][ryan florence].

And, of course, [react-powerplug][react-powerplug].

Thank you.

[react-powerplug]: https://github.com/renatorib/react-powerplug
[downshift]: https://github.com/paypal/downshift
[storybook]: https://jf248.github.io/react-controllable-renderless
[reacttraining]: https://courses.reacttraining.com
[ryan florence]: https://github.com/ryanflorence
[use a render prop article]: https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce
[michael jackson]: https://github.com/mjackson
[prop getters]: https://blog.kentcdodds.com/how-to-give-rendering-control-to-users-with-prop-getters-549eaef76acf
