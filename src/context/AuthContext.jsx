import React, { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return { ...state, user: action.payload.user, token: action.payload.token, isAuthenticated: true };
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { user: null, token: null, isAuthenticated: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = async (url, options = {}) => {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (state.token) {
      defaultHeaders['Authorization'] = `Bearer ${state.token}`;
    }

    const response = await fetch(url, { ...options, headers: defaultHeaders });

    if (response.status === 401) {
      dispatch({ type: 'LOGOUT' });
    }

    return response;
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);