import { useState } from "react";

function SpeakersToolbar({ theme, setTheme}) {

    const [showSessions, setShowSessions] = useState(true);


    function handleChange(e) {        
        ([e.target.name] == "sessions") ?
        (
            setShowSessions(e.target.checked)
        ) : ([e.target.name] == "theme") ?
        (
            setTheme(e.target.value)
        ) : (
            null
        )
        
    }


  return (
    <section className="toolbar dark-theme-header">
        <div className="container">
            <div className="justify-content-between">
                <ul className="toolrow d-flex flex-column flex-lg-row">
                    <li className="d-flex flex-column flex-md-row">
                        <b>Show Sessions&nbsp;&nbsp;</b>
                        <label className="fav">
                            <input 
                                type="checkbox"
                                checked={showSessions} 
                                name="sessions"
                                onChange={(e) => handleChange(e)}   
                            />
                            <span className="switch"></span>
                        </label>
                    </li>
                    <li className="d-flex flex-column flex-md-row ml-sm-5 ml-0">
                        <strong>Theme</strong>
                        <label className="dropdown">
                            <select 
                                className="form-control theme"
                                value={theme}
                                name="theme"
                                onChange={(e) => handleChange(e)}   
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </label>
                    </li>
                </ul>
            </div>
        </div>

    </section>
  )
}

export default SpeakersToolbar;