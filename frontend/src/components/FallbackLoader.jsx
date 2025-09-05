import React from 'react'
import Loading from './Loading'

const FallbackLoader = React.memo(({size ='100vh', fixed = false}) => {
  return (
    <div style={{height : fixed ? '100vh ' : size}} className={` flex items-center justify-center w-full ${fixed ? 'fixed  top-0 left-0 z-999 bg-primary opacity-50' : ''}`}><Loading size='30px' /></div>
  )
})

export default FallbackLoader
