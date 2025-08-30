import React from 'react'
import './Loading.css'

const Loading = React.memo(({size = '30px'}) => {
  return (
    <div  className='sub-loader flex items-center justify-center  '>
         <div style={{height : size,width : size}} className="small-loader  rounded-full"></div>
    </div>
  )
})

export default Loading
