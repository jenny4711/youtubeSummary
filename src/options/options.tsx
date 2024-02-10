import React,{useEffect,useState} from 'react'
import ReactDOM from 'react-dom'
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import './options.css'
import { getStoredUserInfo,LocalStorageInfo , setStoredForm} from '../utils/storage'
import Header from '../components/options/Account/Header'
import DailySummeries from '../components/options/Account/DailySummeries'
import Refferal from '../components/options/Account/Referral'
import Package from '../components/options/Account/Package'
import SelectingTool from '../components/options/Settings/SelectingTool';
import Select, { SelectChangeEvent } from '@mui/material/Select';
const App: React.FC<{}> = () => {
  const [lang,setLang]=useState<string>("")
  const [prompt,setPrompt]=useState<string>("How old are you?")
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value, 'evt-value');
    setLang(event.target.value);
   setPrompt('explain how to do it in order in following data')
 

  };
 
  useEffect(()=>{
    console.log(lang,'testOption!')
    setStoredForm(lang,prompt)

  },[lang,prompt])
  return (
    <div className='options' >
      <div className='optionsTitle'>
        <LightbulbCircleIcon/>
        <h1>Pancake</h1>
      </div>
      <div className='optionSubTitle'>
      <h1>Account</h1>
      </div>
     <div className='optionsHeader'>
     <Header/>
     </div>
    <div className='optionsBar'>
    <DailySummeries/>
    </div>
    <div className='Refferal'>
      <Refferal/>
    </div>
    <div className='Package'>
      <Package/>
    </div>
    <div className='optionSubTitle'>
      <h1>Setting</h1>
      </div>
      <div className='SelectingTool'>
        <SelectingTool val={lang} title={'Default language'} onPress={handleChange} />
      </div>

    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
