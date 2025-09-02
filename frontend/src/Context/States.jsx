import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios';
export const statesContext = createContext();
export const useStatesContext = (() => {
    return useContext(statesContext);
})

const States = ({children}) => {
    const [statesList, setStatesList] = useState([]);
    const [stateLoading,setStateLoading] = useState(false);
    const host = import.meta.env.VITE_HOST;



useEffect(() => {
    const getStates = async () => {
        setStateLoading(true);
        try {
            const response = await axios.get(`${host}/admin/states`);
            setStatesList(response.data);
        } catch (error) {
            console.error("Error fetching states:", error.response?.data || error.message);
        } finally {
            setStateLoading(false);
        }
    };

    getStates();
}, []); 



    const value = useMemo(()=> ({
        statesList,setStatesList,stateLoading
    }),[statesList,setStatesList,stateLoading])


    return (
        <statesContext.Provider value={value}>
            {children}
        </statesContext.Provider>
    )
}

export default States
