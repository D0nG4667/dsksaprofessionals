import Header from "./Header";
import Speakers from "./Speakers";

import { createContext, useState } from "react";

export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={
      {setTheme, theme,}
    }>
      <div className={
        theme === "light" ? 
          "container-fluid light"
          :
          "container-fluid dark"}
      >
          <Header />
          <Speakers />   
      </div>
    </ThemeContext.Provider>
  )
}

export default App;