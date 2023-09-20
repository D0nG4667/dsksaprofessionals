import Speaker from "./Speaker"
import ReactPlaceHolder from 'react-placeholder';
import useRequestDelay, {REQUEST_STATUS} from "../hooks/useRequestDelay";
import { data } from '../../SpeakerData';
import { SpeakerFilterContext } from "../context/SpeakerFilterContext";
import { useContext } from "react";

function SpeakerList() {

  const {
    data: speakersData,
    requestStatus,
    error,
    insertRecord,
    updateRecord,
    deleteRecord,
  } = useRequestDelay(1500, data);

  const { searchQuery, eventYear } = useContext(SpeakerFilterContext);

  
  if (requestStatus === REQUEST_STATUS.FAILURE) {
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
        ready={requestStatus === REQUEST_STATUS.SUCCESS}
      >
        <div className="row">
            {speakersData
              .filter(function (speaker) {
                return (
                  speaker.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  speaker.last.toLowerCase().includes(searchQuery.toLowerCase())
                );
              })
              .filter(function (speaker) {
                return speaker.sessions.find((session) => {
                  return (
                    session.eventYear === eventYear
                  )
                })
              })
              .map(function (speaker) {
                return (
                <Speaker 
                  key={speaker.id} 
                  speaker={speaker}                  
                  inserRecord={insertRecord}
                  updateRecord={updateRecord}
                  deleteRecord={deleteRecord}
                  />            
                )
            })}
        </div>
      </ReactPlaceHolder>
    </div>
  )
}

export default SpeakerList;