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
  option5:string
  option6:string

  onPress:(event:SelectChangeEvent)=>void


}
export interface HistoryState{
  summary:string,
  loading:boolean,
  error:string,
  data:any,
}
export interface UserState {
data:any,
  loading:boolean,
  error:string,
  lang:string,
  summary:string,
  credit:number,
  user:any,
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  picture:string;
  status:string;
  lang:string;
  credit:number;

}

export interface History{
  videoId:string,
  lang:string,
  
}


export interface Credit{
  credit:number,
}