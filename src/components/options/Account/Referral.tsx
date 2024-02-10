import React,{useEffect,useState} from 'react';
import {Box,Card,CardContent,Typography,CardActions,Button,Grid,Avatar} from '@material-ui/core';
import './Referral.css'
const Refferal:React.FC<{}>=()=>{
  return(
<Grid container className='RefDiv' spacing={2}>
  
<Typography style={{"fontSize":"14px","fontWeight":700,"color":"black"}}>Referral</Typography>
<Typography style={{"fontSize":"14px","fontWeight":400}}>Refer friends and get 10 more free summaries per day.</Typography>
  <Grid item xs={8} className='Ref_content'>
  <Typography style={{"color":"gray" , "fontSize":"14px",marginLeft:"20px"}}>pancakei.com/user/SAW324</Typography>
  
  <button  className='Header_btn'>Copy link</button>
  
  
  </Grid>
  

  
</Grid>


  )
}
export default Refferal