import { createContext, useState } from "react";
import { baseURL } from "../config";
import { Alert } from "react-native";
import { errorHandler } from "../Framework/Components/HandleErrors";
import axios from "axios";

const AppContext = createContext();

function AppProvider({ children }) {
    const [doc, setDoc] = useState("");
    const [pin, setPin] = useState("");
    const [docID, setDocID] = useState("");
    const [mode, setMode] = useState('light');
    const [allAssts, setAllAssts] = useState([]);
    const [realties, setRealties] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [preloader, setPreloader] = useState(false);
    const [personalAssts, setPersonalAssts] = useState([]);
    const [token, setToken] = useState({ access: "", refresh: "" });
    const [userInfo, setUserInfo] = useState({ image: null, first_name: "John", last_name: "Wick", email: "john@gmail.com" });


    function getUserInfo() {
        setPreloader(true)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.access}`
            },
            redirect: 'follow'
        };
        fetch(`${baseURL}/accounts/current-user/`, requestOptions)
            .then(response => response.json())
            .then(response => {
                const { errors, status, message } = response;
                setPreloader(false)
                if (errors) {
                    errorHandler(errors)
                } else {
                    setUserInfo(response)
                }
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
                if (error.message == "JSON Parse error: Unexpected character: <") Alert.alert("Error!", "Network error, please try again");
                else Alert.alert("Error!", error.message)
            });
    }

    function GetRefreshToken(newfunction) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.access}`
            },
            redirect: 'follow'
        };
        fetch(baseURL + "/api/user/refresh_token" + token, requestOptions)
            .then(response => response.json())
            .then(response => {
                const { status, new_token, msg } = response;
                setPreloader(false)
                if (status) {
                    setToken(new_token)
                    newfunction()
                }
                else Alert.alert('Sorry!', msg, [{ text: 'Try again' }]);
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
                Alert.alert("Error!", error.message)
            });
    }

    function getRealties() {
        setPreloader(true);
        axios.get(`${baseURL}/firm/realties/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.access}`,
            },
        })
            .then(response => {
                const { status, data, } = response;
                setPreloader(false);
                if (status >= 200 && status < 300) {
                    setRealties(data)
                }
            })
            .catch(error => {
                setPreloader(false);
                const { data: { errors } } = error.response
                if (errors) {
                    errorHandler(errors);
                }
                // Alert.alert("Error!", "An error occurred. Please try again.");
            });
    }

    function getAPIAssets() {
        setPreloader(true);

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow'
        };
        fetch(baseURL + "/firm/assets/", requestOptions)
            .then(response => response.json())
            .then(response => {
                // console.log(response);
                setPreloader(false);
                setAllAssts(response)
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
                Alert.alert("Error!", error.message)
            });
    }

    function getPersonalAssets() {
        setPreloader(true);
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.access}`,
                'Content-Type': 'application/json',
            },
            redirect: 'follow'
        };
        fetch(baseURL + "/firm/my/shareholding/", requestOptions)
            .then(response => response.json())
            .then(response => {
                const { errors, } = response;
                // console.log(response);
                setPreloader(false);
                if (errors) {
                    errorHandler(errors)
                }
                else {
                    setPersonalAssts(response);
                }
            })
            .catch(error => {
                setPreloader(false)
                console.log('error', error)
                Alert.alert("Error!", error.message)
            });
    }

    function getMyCompanies() {
        setPreloader(true);
        axios.get(baseURL + "/accounts/my-companies/", {
            headers: {
                'Authorization': `Bearer ${token.access}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                const { status, data } = response;
                // console.log(data);
                setPreloader(false);
                if (status >= 200 && status < 300) {
                    setCompanies(data)
                }
            })
            .catch(error => {
                setPreloader(false);
                console.log('error', error);
                Alert.alert("Error!", error.message);
            });
    }


    return (
        <AppContext.Provider value={{
            doc, setDoc,
            pin, setPin,
            mode, setMode,
            docID, setDocID,
            token, setToken,
            token, setToken,
            allAssts, setAllAssts,
            realties, setRealties,
            userInfo, setUserInfo,
            preloader, setPreloader,
            companies, setCompanies,
            personalAssts, setPersonalAssts,

            // Funtions
            GetRefreshToken,
            getAPIAssets,
            getUserInfo,
            getRealties,
            getPersonalAssets,
            getMyCompanies,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }