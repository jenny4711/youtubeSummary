import React,{useEffect,useState} from 'react';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import {Stack,Typography,Grid,Box}from '@mui/material/';
import './Package.css'

const Package:React.FC<{}>=()=>{
  return (
    <Stack direction="column"  spacing={2} className='Package_Div'>
<Grid className='Package_titleDiv' >
  <Grid  className='Package_title'>
    <RocketLaunchOutlinedIcon/>
    <Typography variant='body1' className='pk_title'>Package Pro</Typography>
  </Grid>

  <Typography variant='body1'>$5/month</Typography>
 
</Grid>



  <Box className='list'>
    <ExpandCircleDownIcon/>
    <Typography variant='body1' className='pk_text'>Unlimited summaries</Typography>
  </Box>

  <Box className='list'>
    <ExpandCircleDownIcon/>
    <Typography variant='body1' className='pk_text'>GPT-4 access</Typography>
  </Box>

  <Box className='list'>
    <ExpandCircleDownIcon/>
    <Typography variant='body1' className='pk_text'>Ask questions</Typography>
  </Box>

  <button className='package_btn'>Upgrade</button>
</Stack>
  )
}

export default Package