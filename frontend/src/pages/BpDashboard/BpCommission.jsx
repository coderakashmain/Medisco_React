import React, { useEffect } from 'react'
import { useBpData } from '../../Context/BpData'
import NotFound from '../NotFound';
import { getCommissionLedger } from '../../APIs/GetCommissionLedgerApi';
import { useMemory } from '../../Context/MemoryContext';

const BpCommission = () => {

    const {bpData} =useBpData()
    const {commissionData,setCommission} = useMemory;

    if (!bpData ) {
        return <NotFound />;
      }

      const fetchCommission = async()=>{
        const commission =   await getCommissionLedger(bpData?.token);
      
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

export default BpCommission
