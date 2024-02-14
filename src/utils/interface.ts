import { SelectChangeEvent } from '@mui/material/Select';

export interface HeaderTypes{
  email?:string
  family_name:string
  given_name:string
  picture:string
}
export interface SelectingTypes{
  val:string
  title:string
  option1:string
  option2:string
  option3:string
  option4:string
  value1:string
  value2:string
  value3:string
  value4:string
  onPress:(event:SelectChangeEvent)=>void


}