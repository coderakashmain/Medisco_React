import React from 'react'
import MuiAvatar  from '@mui/material/Avatar';
const Avatar = React.memo(({size=26,profile_pic,username}) => {
  return (
    <>
      <MuiAvatar  alt={username} src={profile_pic}  sx={{ width: size, height: size }}/>
    </>
  )
})

export default Avatar
