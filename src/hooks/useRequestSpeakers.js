import  { data } from "../../SpeakerData";
import { useEffect, useState } from "react";

function useRequestSpeakers(delayTime = 1000) {    
    const [speakersData, setSpeakersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasErrored, setHasErrored] = useState(false);
    const [error, setError] = useState("");

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(async () => {
    try {
        await delay(delayTime);
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

    return {
        speakersData,
        isLoading,
        hasErrored,
        error,
        onFavoriteToggle,
    }
}

export default useRequestSpeakers;

