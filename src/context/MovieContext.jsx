import React, { createContext } from "react";

const MovieContext = createContext();
export const MovieProvider = ({ children }) => {


  
  return <MovieContext.Provider>{children}</MovieContext.Provider>
};

export default MovieContext;
