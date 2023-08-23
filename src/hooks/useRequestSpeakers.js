import  { data } from "../../SpeakerData";
import { useEffect, useState } from "react";

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure",
};

function useRequestSpeakers(delayTime = 1000) {    
    const [speakersData, setSpeakersData] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(async () => {
    try {
        await delay(delayTime);
        // throw "api failed to send data";
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        setSpeakersData(data);      
    } catch (error) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
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

    return {
        speakersData,
        requestStatus,
        error,
        onFavoriteToggle,
    }
}

export default useRequestSpeakers;

