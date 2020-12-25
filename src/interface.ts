type AsyncAction<S> = (dispatch: StoreDispatch<S>, state: S) => Promise<any>;
type StoreDispatch<S> = (action: AsyncAction<S> | Action) => Promise<any>;

type Action = {type: string | number, payload: any};

type Actions<S> = {
  [key: string]: (state: S, payload: any) => S;
};

type Getters<S, G> = {
  [key in keyof G]: (state: S) => any;
};

type StoreModule<S = {}, G = {}> = {
  name: string;
  state?: S;
  actions?: Actions<S>;
  getters?: Getters<S, G>;
};
type Reducer<S> = (prevState: S, action: Action) => S;

interface Store<S = {}> {
  state: S;
  dispatch: StoreDispatch<S>;
  getters: {};
}

export {
  AsyncAction,
  StoreDispatch,
  Reducer,
  Actions,
  StoreModule,
  Getters,
  Store,
};
