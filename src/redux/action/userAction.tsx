
import api from '../utils/api'
import { userActions } from '../reducer/userReducer'
import { User } from '../../utils/interface'
import { Dispatch } from 'redux';
import { getStoredForm ,getStoredUserInfo} from '../../utils/storage'

export const signUp=({email,firstName,lastName,picture,credit}:any)=>async(dispatch:Dispatch)=>{
try{
  const form = await getStoredForm()
  const lang = form?.lang;
  const ask=form?.ask;
  console.log(form,'form-action')
  dispatch(userActions.allRequest())
  const res = await api.post('/user',{email,firstName,lastName,picture,credit,lang,promptStyle:ask});

  if(res.status !==200)throw new Error('error-signUp')
  dispatch(userActions.successGetData(res.data))
dispatch(userActions.successShowCredit(res.data.data.credit))
dispatch(userActions.successShowLang(res.data.data.lang))
  console.log(res.data.data.lang,'signUpAction!!!')


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
console.log(res.data.data,'creditAction')
dispatch(userActions.successShowCredit(res.data.data))


  }catch(error){
    console.log(error,'subCredit-fail')
  }
}







export const editLang=(id:string)=>async(dispatch:Dispatch)=>{
  try{
    const form = await getStoredForm()
    const lang = form?.lang;
   dispatch(userActions.allRequest())
   const res = await api.put(`/editLang/${id}`,{lang})
   if(res.status !==200)throw new Error('editlang is fail')
  //  dispatch(userActions.successShowLang(re))
   console.log(res,'editlang-res')
   console.log(id,'editLangAction')
   console.log(lang,'editLang-Lang')
  
  }catch(error){
    console.log(error,'editLang-fail')
  }
}





