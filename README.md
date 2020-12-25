# react-store-module

> Centralized State Management with hooks for React Applications.

## Install

```sh
npm i react-store-module
```

## Example

This example shows how to change global theme color by use `react-store-module`

### Create a StoreModule

```jsx
// store/theme.js
const storeModule = {
  name: 'theme',
  state: { // initial states
    color: '#fff'
  },
  actions: {
    CHANGE_COLOR(state, payload) {
      return {
        ...state,
        addLabel: payload,
      };
    },
  },
};

export default storeModule;

```

### Import StoreProvider Component

Add `StoreProvider Component` at the root of React Nodes, and pass your storeModule list.

```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

import StoreProvider from 'react-store-module';
import ThemeStoreModule from '@/store/theme';

import HeaderBar from '@/components/header-bar';
import Home from '@/views/home';

ReactDOM.render(
  <StoreProvider storeModules={[ThemeStoreModule]}>
    <HeaderBar>
    <Home/>
  </StoreProvider>,
  document.getElementById('app'),
);
```

This step will create the global store context.

### `useStore` to get states and dispatch actions

When called `useStore` by passing module name, it will return `{ state, dispatch }` of the store.

```jsx
// views/home.js
import { useStore } from 'react-store-module';
function Home() {
  const { state } = useStore('theme');
  return <div style={{ backgroundColor: state.color }}><div/>
}
export default Home
```

Now, we can `Dispatch` our actions to change the States, like change the theme color.

```jsx
// components/header-bar.js
import { useStore } from 'react-store-module';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function HeaderBar() {
  const { dispatch } = useStore('theme');
  return <header>
    <button onClick={() => {
      dispatch('CHANGE_COLOR', getRandomColor())
    } }></button>
  </header>
}
export default HeaderBar
```

The changed state.color will trigger component to rerender.

## TODO
