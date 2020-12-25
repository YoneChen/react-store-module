import {
  ReactNode, useReducer, useMemo, createContext, useContext, createElement,
} from 'react';
import {
  Actions, Getters, Reducer, StoreModule, StoreDispatch, Store, AsyncAction,
} from './interface';

type StoreProviderProps = {
  storeModules: StoreModule[];
  children: ReactNode[]
};

// 计算属性通过useMemo实现
const gettersToMemoizedStates = <S, G extends {
  [k: string]: any;
}>(state: S, getters: Getters<S, G>) => Object
    .fromEntries(Object.entries(getters ?? {})
      .map(([k, v]) => [k, useMemo(() => v(state), [state])])) as G;

// actions结构转为reducer方法
const actionsToReducer = <S>(actions: Actions<S>)
  : Reducer<S> => (preState, action) => actions[action.type](preState, action.payload);

const moduleToStore = <S>({
  name, actions, state: initState, getters,
}: StoreModule<S>): [string, Store] => {
  const reducer = actionsToReducer(actions);
  const [state, dispatch] = useReducer<Reducer<S>>(reducer, initState);
  const memoizedStates = gettersToMemoizedStates(state, getters);
  const newDispatch: StoreDispatch<S> = async (action) => {
    if (action instanceof Function) {
      return action(newDispatch, state);
    }
    return Promise.resolve(dispatch(action));
  };

  return [name, {
    state, dispatch: newDispatch, getters: memoizedStates,
  }];
};

const useStoreModulesToStoresObj = (storeModules: StoreModule[]) => Object.fromEntries(storeModules
  .map(moduleToStore));

const context = createContext<{
  [k: string]: Store<{}>;
}>(null);

const { Provider } = context;

const StoreProvider = ({ storeModules, children }: StoreProviderProps) => {
  const stores = useStoreModulesToStoresObj(storeModules);
  return createElement(Provider, { value: stores }, children);
};

const useStore = <S>(storeName: string) => {
  const stores = useContext(context);
  return stores[storeName] as Store<S>;
};

export default StoreProvider;
export {
  useStore,
  Actions, Getters, Reducer, StoreModule, StoreDispatch, Store, AsyncAction,
};
