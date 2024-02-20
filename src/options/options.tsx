import React,{useEffect,useState} from 'react'
import ReactDOM from 'react-dom'
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import './options.css'
import { getStoredUserInfo,LocalStorageInfo , setStoredForm,getStoredForm,getStoredCredit} from '../utils/storage'
import Header from '../components/options/Account/Header'
import DailySummeries from '../components/options/Account/DailySummeries'
import Refferal from '../components/options/Account/Referral'
import Package from '../components/options/Account/Package'
import SelectingTool from '../components/options/Settings/SelectingTool';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { Credit } from '../utils/interface';

const App: React.FC<{}> = () => {
  const [lang,setLang]=useState<string>("")
  const [ask,setAsk]=useState<string>("Summarize following in a narrative format, capturing the key events, characters, and plot points in a concise and engaging way.")
  const [credit,setCredit]=useState<number>(0)
    


  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value, 'evt-value');
    setLang(event.target.value);
  
 

  };
  const handleChangAsk=(event:SelectChangeEvent)=>{
    console.log(event.target.value,'evt-valueAsk')
    setAsk(event.target.value)
  }

  useEffect(() => {
    getStoredCredit().then((sc) => {
      if (sc && typeof sc === 'object' && 'credit' in sc && typeof sc.credit === 'number') {
        setCredit(sc.credit);
      }
    });
  }, []);
  
 
  useEffect(()=>{
    console.log(lang,'testOption!')
    console.log(ask,'ask')
    setStoredForm(lang,ask)

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
    <DailySummeries credit={credit}/>
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
        <SelectingTool val={lang} title={'Default language'} option1={'Korean'} option2={'English'} option3={'Chinese'} option4={'Spanish'} option5={'Japanese'} option6={'Russian'} onPress={handleChange} />
        <SelectingTool 
        val={ask} 
        title={'Default Prompt'} 
        option1={'Summarize the following into two sentences at the 12th grade level:'} 
        option2={'Summeraize following in a step-by-step format,providing clear instructions on how to complete a task or achieve a goal.'}
         option3={'Summarize following in a narrative format, capturing the key events, characters, and plot points in a concise and engaging way.'} 
         option4={'Summarize following in a timely and relevant manner, highlighting the most important takeaways and insights that are applicable to current events or trends.'} 
         option5={''} 
         option6={''} 
         onPress={handleChangAsk} 
         />
      </div>

    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
