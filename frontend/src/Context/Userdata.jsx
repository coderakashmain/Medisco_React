import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
export const userDataContext = createContext();

export const useUserDataContext = () => {
    return useContext(userDataContext);
}
const Userdata = ({ children }) => {
    const [userdata, setUserdata] = useState();
    const [userDataloading,setUserDataLoading] = useState(false);



    useEffect(() => {
        setUserDataLoading(true);
        const locadata = localStorage.getItem('userdata');
        const data = locadata;
        if (data) {
            setUserdata(JSON.parse(data))
        }
        setUserDataLoading(false);
    }, []);

    const value = useMemo(() => ({
        userdata,
        setUserdata,
        setUserDataLoading,
        userDataloading
    }), [userdata, ,,userDataloading])




    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    )
}

export default Userdata
