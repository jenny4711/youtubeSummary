import React,{useEffect,useState} from 'react';
import {Button,Typography } from '@material-ui/core'
import './Buttons.css'
const Buttons:React.FC<{title:string}>=({title})=>{
  return(
    <>
<Button className="Buttons">
<Typography className='weatherCard-body'>{title}</Typography>
</Button>
    </>
  )
}

export default Buttons