// DarkModeContext.js

import React, { createContext, useState } from 'react';

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkTheme((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkTheme, setIsDarkTheme, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
