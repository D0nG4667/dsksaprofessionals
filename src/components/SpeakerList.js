import Speaker from "./Speaker"
import  { data } from "../../SpeakerData";
import { useState } from "react";

function SpeakerList({ showSessions }) {
  const [speakersData, setSpeakersData] = useState(data);

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