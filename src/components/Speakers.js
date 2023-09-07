import SpeakersToolbar from "./SpeakersToolbar";
import SpeakerList from "./SpeakerList";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";



function Speakers() {
  const { theme, setTheme } = useContext(ThemeContext);

  const [showSessions, setShowSessions] = useState(true);

  return (
    <>
        <SpeakersToolbar 
            theme={theme} 
            setTheme={setTheme} 
            showSessions={showSessions}
            setShowSessions={setShowSessions}
        />
        <SpeakerList showSessions={showSessions}/> 
    </>
  )
}

export default Speakers;