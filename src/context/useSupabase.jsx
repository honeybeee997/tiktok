import { createContext, useContext } from "react";

const SupbaseContext = createContext();

const useSupabase = () => {
  return useContext(SupbaseContext);
};

export { SupbaseContext, useSupabase };
