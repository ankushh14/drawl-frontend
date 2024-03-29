import { createContext, useCallback, useMemo, useReducer } from "react";
import STATUS from "../utils/status";
import PropTypes from "prop-types";

const initialState = {
  user: {},
  token: null,
  authenticated: false,
  status: STATUS.IDLE,
  expiresAt: null,
  forgotPassword: false
};

const AuthContext = createContext({
  ...initialState,
  login: () => {},
  logout: () => {},
  updateStatus: () => {},
  updateForgotPasswordStatus: ()=>{}
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "login": {
      return {
        user: action.payload.authenticatedUser,
        authenticated: true,
        token: action.payload.token,
        status: STATUS.SUCCESS,
        expiresAt: action.payload.expiresAt,
      };
    }
    case "logout": {
      return {
        ...initialState,
      };
    }
    case "updateStatus": {
      return {
        ...state,
        status: action.payload.status,
      };
    }
    case "updateForgotPasswordStatus":{
      return{
        ...state,
        forgotPassword: action.payload.value
      }
    }
    default:
      throw new Error("unhandled action");
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback((userObj) => {
    dispatch({
      type: "login",
      payload: {
        ...userObj,
      },
    });
  }, []);

  const logout = useCallback(() => {
    dispatch({
      type: "logout",
    });
  }, []);

  const updateStatus = useCallback((status) => {
    dispatch({
      type: "updateStatus",
      payload: {
        status,
      },
    });
  }, []);

  const updateForgotPasswordStatus = useCallback((value)=>{
    dispatch({
      type: "updateForgotPasswordStatus",
      payload : {
        value
      }
    })
  },[])

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      updateStatus,
      updateForgotPasswordStatus
    }),
    [login, logout, state, updateStatus,updateForgotPasswordStatus]
  );


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { AuthProvider, AuthContext };
