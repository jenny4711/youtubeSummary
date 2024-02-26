
import api from '../utils/api'
import { userActions } from '../reducer/userReducer'
import { Dispatch } from 'redux';
import { getStoredForm ,getStoredUserInfo} from '../../utils/storage'

export const signUp=({email,firstName,lastName,picture,credit}:any)=>async(dispatch:Dispatch)=>{
try{
  const form = await getStoredForm()
  const lang = form?.lang;
  const ask=form?.ask;
  dispatch(userActions.allRequest())
  const res = await api.post('/user',{email,firstName,lastName,picture,credit,lang,promptStyle:ask});

  if(res.status !==200)throw new Error('error-signUp')
  dispatch(userActions.successGetData(res.data))
dispatch(userActions.successShowCredit(res.data.data.credit))
dispatch(userActions.successShowLang(res.data.data.lang))

}catch(error){
  console.log(error,'sigupAction-fail!')
}
}



export const subCredit=()=>async(dispatch:Dispatch)=>{
  try{
const info=await getStoredUserInfo()
const email=info.email
dispatch(userActions.allRequest())
const res = await api.post('/user/subcredit',{email})
let credit = res?.data.data
dispatch(userActions.successShowCredit(credit))


  }catch(error){
    console.log(error,'subCredit-fail')
  }
}

export const editLang=()=>async(dispatch:Dispatch)=>{
  try{
    const form = await getStoredForm()
    const userInfo= await getStoredUserInfo()
    const lang = form?.lang;
    const email=userInfo.email

   dispatch(userActions.allRequest())
  
   const res = await api.put(`/user/editLang/${email}`,{lang})
   if(res.status !==200)throw new Error('editLang is fail')
 
  
  }catch(error){
    console.log(error,'editLang-fail')
  }
}

export const editPropmtStyle=()=>async(dispatch:Dispatch)=>{
  try{
    const form = await getStoredForm()
    const userInfo= await getStoredUserInfo()
    const promptStyle= form?.ask;
    const email=userInfo?.email
    dispatch(userActions.allRequest())
    const res = await api.put(`/user/editPromptStyle/${email}`,{promptStyle})
    if(res.status !==200)throw new Error('EditPromptStyle is fail')
  }catch(error){
console.log(error,'editPromptStyle!!!!!!!!!Error!!!!!!!!')
  }
}





