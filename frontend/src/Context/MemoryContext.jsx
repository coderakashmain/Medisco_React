import React, { createContext, useContext, useState } from "react";

export const MemoryContext = createContext(null);

export const useMemory = () => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error("useMemory must be used inside MemoryProvider");
  }
  return context;
};


 const MemoryProvider = ({ children }) => {
  const [commissionData, setCommissionData] = useState([]);
  const [memberList,setMemberList] = useState([]);

  const setCommission = (data) => {
    setCommissionData(data);
  };

  const getCommission = () => {
    return commissionData;
  };

  return (
    <MemoryContext.Provider
      value={{
        commissionData,
        setCommission,
        getCommission,
        setMemberList,
        memberList
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
};

export default MemoryProvider;

