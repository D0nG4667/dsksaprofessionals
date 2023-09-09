import SpeakersToolbar from "./SpeakersToolbar";
import SpeakerList from "./SpeakerList";
import { SpeakerFilterProvider } from "../context/SpeakerFilterContext";



function Speakers() {
  
  return (    
      <SpeakerFilterProvider startingShowSessions={false}>
          <SpeakersToolbar />
          <SpeakerList /> 
      </SpeakerFilterProvider>          
  )
}

export default Speakers;