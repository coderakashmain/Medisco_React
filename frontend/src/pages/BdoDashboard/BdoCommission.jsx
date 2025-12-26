import React, { useEffect } from 'react'
import { useBdoData } from '../../Context/BdoData'
import NotFound from '../NotFound';
import { getCommissionLedger } from '../../APIs/GetCommissionLedgerApi';
import { useMemory } from '../../Context/MemoryContext';

const BdoCommission = () => {

    const {bdoData} =useBdoData()
    const {commissionData,setCommission} = useMemory;

    if (!bdoData ) {
        return <NotFound />;
      }

      const fetchCommission = async()=>{
        const commission =   await getCommissionLedger(bdoData?.token);
      
        setCommission(commission.data)

      }
      useEffect(()=>{
        if(!commissionData){
          
            fetchCommission();
        }
      },[]);

  return (
    <div>
      
    </div>
  )
}

export default BdoCommission
