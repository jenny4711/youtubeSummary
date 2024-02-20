import api from '../utils/api'
import { Dispatch } from 'redux'
import { historyActions } from '../reducer/historyReducer'
import { userActions } from '../reducer/userReducer'
import { History } from '../../utils/interface'
import { getStoredForm } from '../../utils/storage'
import { subCredit } from './userAction'
export const createHistory=(videoId:string,subCredit:()=>any)=>async(dispatch:Dispatch)=>{
  try{
    const form = await getStoredForm()
    const lang = form?.lang;
    const ask = form?.ask
    console.log(form,'form-action')
    dispatch(historyActions.allRequest())

    const res = await api.post('/history',{videoId,lang,ask})
    console.log(res,'historyAction')
    if(res.status !==200) throw new Error('error-createHistory')
    dispatch(subCredit())
    dispatch(historyActions.successGetData(res.data.data))

  

  }catch(error){
   dispatch(historyActions.getErrorMSG(error.message))
    console.log(error,'historyAction-createHistory')
  }
}


export const findVideo=(videoId:string)=>async(dispatch:Dispatch)=>{
try{
  const form = await getStoredForm()
  const lang = form?.lang;
  console.log(form,'form-action')
  dispatch(historyActions.allRequest())
  const res = await api.get(`/history/findSummary/${videoId}/${lang}`)
console.log(res.data,'findVideo!!!!!!!')
}catch(error){

  console.log(error,'findVideo Error!!!')
}
}