import React,{useState,useEffect}from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SelectingTypes } from '../../../utils/interface';
import './Select.css'

const SelectingTool:React.FC<SelectingTypes>=({val,title,option1,option2,option3,option4,value1,value2,value3,value4,onPress})=>{
 
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
          <MenuItem value={value1}>{option1}</MenuItem>
          <MenuItem value={value2}>{option2}</MenuItem>
          <MenuItem value={value3}>{option3}</MenuItem>
          <MenuItem value={value4}>{option4}</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectingTool