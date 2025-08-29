import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios';
export const statesContext = createContext();
export const useStatesContext = (() => {
    return useContext(statesContext);
})

const States = ({children}) => {
    const [statesList, setStatesList] = useState([]);

    useEffect(() => {
        const getStates = async () => {
            try {
                const response = await axios.get("/api/admin/states");

                setStatesList(response.data);
            } catch (error) {
                console.error("Error fetching states:", error.response?.data || error.message);
            }
        }
        getStates();

    }), [];

    const value = useMemo(()=> ({
        statesList,setStatesList
    }),[statesList])


    return (
        <statesContext.Provider value={value}>
            {children}
        </statesContext.Provider>
    )
}

export default States
