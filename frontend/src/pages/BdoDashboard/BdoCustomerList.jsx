

import React, { useEffect } from 'react'
import { useBdoData } from '../../Context/BdoData'
import NotFound from '../NotFound';
import { useMemory } from '../../Context/MemoryContext';
import { getCustomerList } from '../../APIs/GetCustomerListApi';

const BdoCustomerList = () => {

    const {bdoData} =useBdoData()
    const {setMemberList,memberList} = useMemory;

    if (!bdoData ) {
        return <NotFound />;
      }

      const fetchMemberList = async()=>{
        const memberlist =   await getCustomerList(bdoData?.token);
      
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

export default BdoCustomerList

