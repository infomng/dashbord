import { createContext, useEffect, useReducer } from "react";
import { ReactNode } from "react";
interface UserState {
  user: string | null;
  loading: boolean;
  error: Error;
  dispatch: React.Dispatch<AuthAction>;
}

// Action types
type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: string }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "LOGIN_ERROR"; payload: Error};

const storedUser = localStorage.getItem("user");

const INITIAL_STATE: UserState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: new Error,
  dispatch: () => {},
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state: UserState, action: AuthAction): UserState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        loading: true,
     
   
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
   
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        loading: false,
        error: new Error,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
      
        
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }:{children:ReactNode}  ) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
