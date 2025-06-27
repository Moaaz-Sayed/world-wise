import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();
const inistialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payloud,
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payloud };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payloud],
        currentCity: action.payloud,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payloud),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payloud };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvidor({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    inistialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payloud: data });
      } catch {
        dispatch({
          type: "rejected",
          payloud: "There was an error loading cities...",
        });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payloud: data });
      } catch {
        dispatch({
          type: "rejected",
          payloud: "There was an error loading city...",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payloud: data });
    } catch {
      dispatch({
        type: "rejected",
        payloud: "There was an error creating city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payloud: id });
    } catch {
      dispatch({
        type: "rejected",
        payloud: "There was an error deleting city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvidor");
  return context;
}

export { CitiesProvidor, useCities };
