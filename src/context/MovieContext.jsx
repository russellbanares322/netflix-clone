import React, { createContext, useEffect, useState } from "react";

const MovieContext = createContext();
export const MovieProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  },[])
  return <MovieContext.Provider value={{isLoading}}>{children}</MovieContext.Provider>
};

export default MovieContext;
