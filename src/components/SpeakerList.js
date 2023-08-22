import Speaker from "./Speaker"
import  { data } from "../../SpeakerData";
import { useEffect, useState } from "react";

function SpeakerList({ showSessions }) {
  const [speakersData, setSpeakersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);
  const [error, setError] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(async () => {
    try {
      await delay(2000);
      // throw "api failed to send data";
      setIsLoading(false);
      setSpeakersData(data);      
    } catch (error) {
      setIsLoading(false);
      setHasErrored(true);
      setError(error);      
    }
    
  }, []);

  function onFavoriteToggle(id) {
    const speakersRecPrevious = speakersData.find(function (rec) {
      return rec.id === id;
    });
    const speakersRecUpdated = {
    ...speakersRecPrevious, 
    favorite: !speakersRecPrevious.favorite
    };
    const speakerDataNew = speakersData.map(function (rec) {
      return rec.id === id ? speakersRecUpdated : rec;
    })

    setSpeakersData(speakerDataNew);
  }

  if (hasErrored) {
    return (
      <div className="text-danger">
        ERROR: <b>loading Speaker Data Failed {error}</b>
      </div>
    )
  }
  
  if (isLoading) return <div>...Loading</div>

  return (
    <div className="container speaker-list">
        <div className="row">
            {speakersData.map(function (speaker) {
                return (
                <Speaker 
                  key={speaker.id} 
                  speaker={speaker}
                  showSessions={showSessions}
                  onFavoriteToggle={() => onFavoriteToggle (speaker.id)}
                />            
                )
            })}
        </div>
    </div>
  )
}

export default SpeakerList;