

import React, { useEffect } from 'react'
import { useBpData } from '../../Context/BpData'
import NotFound from '../NotFound';
import { useMemory } from '../../Context/MemoryContext';
import { getCustomerList } from '../../APIs/GetCustomerListApi';

const BpCustomerList = () => {

    const {bpData} =useBpData()
    const {setMemberList,memberList} = useMemory;

    if (!bpData ) {
        return <NotFound />;
      }

      const fetchMemberList = async()=>{
        const memberlist =   await getCustomerList(bpData?.token);
      
        setMemberList(memberlist.data)

      }
      useEffect(()=>{
        if(!memberList){
            fetchMemberList();
        }
      },[]);


      
  return (
    <div>
      
    </div>
  )
}

export default BpCustomerList

