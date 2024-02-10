import React,{useEffect,useState} from 'react';
import {Box,Card,CardContent,Typography,CardActions,Button,Grid,Avatar} from '@material-ui/core';

import { getStoredUserInfo,LocalStorageInfo } from '../../../utils/storage';
import './Header.css'
const Header:React.FC<{}>=()=>{
  const [userInfo,setUserInfo]=useState<LocalStorageInfo| null>(null)
  useEffect(()=>{
    getStoredUserInfo().then((info)=>setUserInfo(info))
  },[])
  console.log(userInfo?.email,'userInfo')
  return(
   
<Grid container spacing={3}>
  <Grid item xs>
  <Avatar 
alt="UserPic" 
src={userInfo?.picture}   
className='Header_Avata'
 />
  </Grid>
  <Grid item xs={8} className='Header_content'>
  <Typography>{userInfo?.given_name} {userInfo?.family_name}</Typography>
  <Typography>{userInfo?.email}</Typography>

  </Grid>
  

  <Grid item xs >
  <button  className='Header_btn'>LogOut</button>
  </Grid>
</Grid>

  )
}

export default Header