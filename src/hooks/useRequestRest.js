import { useEffect, useState } from "react";
import axios from 'axios';

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure",
};

const restUrl = "api/speakers";

function useRequestRest() {    
    const [data, setData] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");

    useEffect(async () => {
        try {
            const result = await axios.get(restUrl);
            // throw "api failed to send data";
            setRequestStatus(REQUEST_STATUS.SUCCESS);
            setData(result.data);      
        } catch (error) {
            setRequestStatus(REQUEST_STATUS.FAILURE);
            setError(error);      
        }
    
    }, []);

    // Create/Insert
    function insertRecord(record, doneCallback) {
        const originalRecords = [...data];
        const newRecords = [record, ...data];
        (async () => {
            try {
                setData(newRecords);
                const res = await axios.post(`${restUrl}/99999`, record);
                if (doneCallback) {
                    doneCallback();                    
                }
                const newRecordsDb = [res.data, ...data];
                setData(newRecordsDb);
            } catch (error) {
                console.log("error thrown inside delayFunction, error");
                if (doneCallback) {
                    doneCallback();
                }
                setData(originalRecords);
            }            
        })();
    }

    // Update
    function updateRecord(record, doneCallback) {
        const originalRecords = [...data];
        const newRecords = data.map(function (rec) {
            return rec.id === record.id ? record : rec;
        });

        (async () => {
            try {
                setData(newRecords);
                await axios.put(`${restUrl}/${record.id}`, record);
                if (doneCallback) {
                    doneCallback();
                }
            } catch (error) {
                console.log("error thrown inside delayFunction, error");
                if (doneCallback) {
                    doneCallback();
                }
                setData(originalRecords);
            }            
        })();
    }

    // Delete
    function deleteRecord(record, doneCallback) {
        const originalRecords = [...data];
        const newRecords = data.filter(function(rec) {
            return rec.id != record.id; 
        });
        (async () => {
            try {
                setData(newRecords);
                await axios.delete(`${restUrl}/${record.id}`, record);
                if (doneCallback) {
                    doneCallback();
                }
            } catch (error) {
                console.log("error thrown inside delayFunction, error");
                if (doneCallback) {
                    doneCallback();
                }
                setData(originalRecords);
            }            
        })();
    }

    return {
        data,
        requestStatus,
        error,
        insertRecord,
        updateRecord,
        deleteRecord,
    }
}

export default useRequestRest;

