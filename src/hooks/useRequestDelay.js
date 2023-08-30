import { useEffect, useState } from "react";

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure",
};

function useRequestDelay(delayTime = 1000, initialData=[]) {    
    const [data, setData] = useState(initialData);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(async () => {
    try {
        await delay(delayTime);
        // throw "api failed to send data";
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        setData(data);      
    } catch (error) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
        setError(error);      
    }
    
    }, []);
 
    function updateRecord(recordUpdated, doneCallback) {
        const newRecords = data.map(function (rec) {
            return rec.id === recordUpdated.id ? recordUpdated : rec;
        });

        (async () => {
            try {
                await delay(delayTime);
                if (doneCallback) {
                    doneCallback();
                }
                setData(newRecords);
            } catch (error) {
                console.log("error thrown inside delayFunction, error");
            }            
        })();
    }

    return {
        data,
        requestStatus,
        error,
        updateRecord,
    }
}

export default useRequestDelay;

