import React,{useEffect,useState} from 'react';
import {Box,Card,CardContent,Typography,CardActions,Button,Grid,Avatar,LinearProgress} from '@material-ui/core';
import './DailySummeries.css'

const DailySummeries:React.FC<{credit:number}>=({credit})=>{

  let value =credit
  let max=10
  const normalizedValue = (value / max) * 100;
  return(
    <Grid  container className='DailySummeries' spacing={2}>

  <Grid item xs={8} className='DailySummeries_content'>
  <Box width="100%" minWidth={35} mr={1}>
  <Typography style={{"fontSize":"14px","fontWeight":700,"color":"black"}} variant="body2" color="textSecondary">20 free daily summeries</Typography>
      <Typography style={{"fontSize":"14px"}} variant="body2" color="textSecondary">{`${value}/${max}`}</Typography>
    </Box>



 

  </Grid>
  

  <Grid item xs >
  <Box display="flex" alignItems="center">
    <Box width="100%" mr={1}>
      <LinearProgress variant="determinate"  value={normalizedValue} />
    </Box>
   
  </Box>
  </Grid>
</Grid>
  )
}

export default DailySummeries




