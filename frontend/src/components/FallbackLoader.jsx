import React from 'react'
import Loading from './Loading'

const FallbackLoader = () => {
  return (
    <div className='h-screen flex align-center justify-center'><Loading size='30px' /></div>
  )
}

export default FallbackLoader
