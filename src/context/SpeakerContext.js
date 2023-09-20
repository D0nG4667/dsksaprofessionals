import { createContext } from "react";

const SpeakerContext = createContext();

function SpeakerProvider({children, speaker, insertRecord, updateRecord, deleteRecord}) {
    return (
        <SpeakerContext.Provider value={{speaker, insertRecord, updateRecord, deleteRecord}}>
            {children}
        </SpeakerContext.Provider>
    )   
}

export { SpeakerContext, SpeakerProvider }