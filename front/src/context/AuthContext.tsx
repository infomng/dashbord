// We use the AuthContext to keep track of the the state of the user after or before the connexion completes




import { createContext, useEffect, useReducer } from "react";




interface User {
  user: string;
  loading: boolean;
  error: any;
  dispatch:React.Dispatch<any>

}

const storedUser = localStorage.getItem("user");
;
// Context initial State
const INITIAL_STATE:User = {
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
   dispatch: ()=>{}, 


};





// Create the context authContext
export const AuthContext = createContext(INITIAL_STATE);

// Create a reducer function
export const AuthReducer = (state:any, action:any) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
      case "LOGIN_SUCCESS":
        return{
          user:action.payload,
          loading: false,
          error:null
        };
           case 'LOGIN_FAILURE':
            return{
                user:null,
                loading: false,
                error:action.payload,
            };
        case 'LOGOUT':
            return{
                user:null,
                loading: false,
                error:null,
            };
        default:
            return state
        }

  }


// create a context provider function
export const AuthContextProvider = ({children}:any) => {
  
  const [state,dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(
    () => {localStorage.setItem('user', JSON.stringify(state.user))}, [state.user]
    );
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
