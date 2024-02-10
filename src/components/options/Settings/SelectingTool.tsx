import React,{useState,useEffect}from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import './Select.css'
const SelectingTool:React.FC<{val:string,title:string,onPress:(event:SelectChangeEvent)=>void}>=({val,title,onPress})=>{
 
  return (
    <div className='SelectingForm'>
      
      <FormControl  variant="filled" sx={{ m: 1, minWidth: 550 }}>
        <InputLabel id="demo-simple-select-filled-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={val}
          onChange={onPress}
        >
          <MenuItem value={val}>
            <em>{val}</em>
          </MenuItem>
          <MenuItem value={'Korean'}>Korean</MenuItem>
          <MenuItem value={'English'}>USA</MenuItem>
          <MenuItem value={'Chinese'}>Chinese</MenuItem>
          <MenuItem value={'Spanish'}>Spanish</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectingTool