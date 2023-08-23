import Speaker from "./Speaker"
import ReactPlaceHolder from 'react-placeholder';
import useRequestSpeakers from "../hooks/useRequestSpeakers";

function SpeakerList({ showSessions }) {

  const {
    speakersData,
    isLoading,
    hasErrored,
    error,
    onFavoriteToggle,
  } = useRequestSpeakers(1000)

  
  if (hasErrored) {
    return (
      <div className="text-danger">
        ERROR: <b>loading Speaker Data Failed {error}</b>
      </div>
    )
  }
  
  // if (isLoading) return <div>...Loading</div>

  return (
    <div className="container speaker-list">
      <ReactPlaceHolder
        type="media"
        rows={15}
        className="speakerlist-placeholder"
        ready={!isLoading}
      >
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
      </ReactPlaceHolder>
    </div>
  )
}

export default SpeakerList;