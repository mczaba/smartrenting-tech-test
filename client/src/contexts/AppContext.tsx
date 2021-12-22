import React, { createContext, useContext, useReducer } from "react";
import { ActionTypes } from "./actions";

type Actions<T> = {
  type: T;
  payload?: any;
  meta?: any;
};

interface IAppState {
  token: string | null;
  userId: number | null;
}

interface IAppContext {
  setToken: (string) => void;
  setUserId: (number) => void;
}

const initialState: IAppState = {
  token: null,
  userId: null
};

const AppContext = createContext<IAppState & IAppContext>({
  ...initialState,
  setToken: () => {},
  setUserId: () => {}
});

export const AppReducer = (state: IAppState, action: Actions<ActionTypes>) => {
  switch (action.type) {
    case ActionTypes.SET_TOKEN:
      return { ...state, token: action?.payload };
    case ActionTypes.SET_USERID:
      return { ...state, userId: action?.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setToken: (token) =>
          setImmediate(() =>
            dispatch({ type: ActionTypes.SET_TOKEN, payload: token })
          ),
        setUserId: (userId) =>
          setImmediate(() =>
            dispatch({ type: ActionTypes.SET_USERID, payload: userId })
          )
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
