import { createContext, useContext, useReducer } from "react";

const inistialState = {
  user: null,
  isAuthantceted: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payloud, isAuthantceted: true };
    case "logout":
      return { ...state, user: null, isAuthantceted: false };
    default:
      throw new Error("Unknown action");
  }
}

const AuthContext = createContext();

const FAKE_USER = {
  name: "jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthantceted }, dispatch] = useReducer(
    reducer,
    inistialState
  );

  function login(email, pass) {
    if (email === FAKE_USER.email && pass === FAKE_USER.password)
      dispatch({ type: "login", payloud: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthantceted, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvidor");
  return context;
}

export { AuthProvider, useAuth };
