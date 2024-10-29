import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [docID, setDocID] = useState("");
    const [preloader, setPreloader] = useState(false);
    const [userInfo, setUserInfo] = useState({ image: null, firstname: "John", lastname: "Wick", email: "john@gmail.com" });

    return (
        <AppContext.Provider value={{
            docID, setDocID,
            userInfo, setUserInfo,
            preloader, setPreloader,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }