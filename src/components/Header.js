import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

function Header() {
  const { theme } = useContext(ThemeContext);

  const src = `/images/dsksa-logo${( theme==="dark") ? "-dark" : "" }.png`;

  const textTheme = `${(theme === "light") ? "text-dark" : "text-info"}`;
  
  return (
    <div className="padT4 padB4">
      <div className="container mobilecontainer">
        <div className="d-flex justify-content-between">
          <div>
            <img 
              src={src} 
              alt="Data Scientists KSA Home Page" 
              width="70px"
            />
          </div>
          <div className={textTheme}>
            <h4 className="header-title">
              Data Scientists in KSA
            </h4>
          </div>
          <div className={textTheme}
          >
            Hello, Mr. Abdalla &nbsp;&nbsp;
            <span>
              <a href="#">sign-out</a>
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Header;