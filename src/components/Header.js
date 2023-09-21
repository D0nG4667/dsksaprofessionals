import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import withAuth from "./withAuth";

function Header({ loggedInUser, setLoggedInUser }) {
  const { theme } = useContext(ThemeContext);

  const src = `/images/dsksa-logo${( theme==="dark") ? "-dark" : "" }.png`;

  const textTheme = `${(theme === "light") ? "text-dark" : "text-info"}`;

  function LoggedIn({ loggedInUser, setLoggedInUser }) {
    return (
      <div>
        <span>Logged in as {loggedInUser} </span>
        <button className="btn btn-secondary"
          onClick={() => {
            setLoggedInUser("");
          }}
        >
          Logout
        </button>
      </div>
    ) 
  }

  function NotLoggedIn({ setLoggedInUser }) {
    return (
      <button className="btn-secondary"
        onClick={(e) => {
          e.preventDefault();
          const username = window.prompt("Enter Login Name:", "");
          setLoggedInUser(username);
        }}
      >
        Login
      </button>
    )
    
  }
  
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
            {
              (loggedInUser && loggedInUser.length > 0) ?
                <LoggedIn loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
              :
                <NotLoggedIn setLoggedInUser={setLoggedInUser} />          
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default withAuth(Header);