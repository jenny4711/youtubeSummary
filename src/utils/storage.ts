export interface LocalStorageInfo{
  email?:string
  family_name:string
  given_name:string
  picture:string
}

export interface LocalStorageData{
  data:string
}

export interface LocalStorageForm{
  ask:string
  lang:string

}

export interface LocalStorageCredit{
  credit:number
}


export type LocalStorageCreditScore = keyof LocalStorageCredit
export function setStorageCredit(credit:number):Promise<void>{
  const vals:LocalStorageCredit={
    credit
  }
  return new Promise((resolve)=>{
    chrome.storage.local.set(vals,()=>{
      resolve()
    })
  })
}


export type LocalStorageUserInfo=keyof LocalStorageInfo
export function setStoredUserInfo(email:string,family_name:string,given_name:string,picture:string):Promise<void>{
  const vals:LocalStorageInfo={
    email,
    family_name,
    given_name,
    picture
  }
  return new Promise((resolve)=>{
    chrome.storage.local.set(vals,()=>{
      resolve()
    })
  })
}

export type LocalStoragedFormData=keyof LocalStorageForm
export function setStoredForm(lang:string,ask:string):Promise<void>{
  const vals:LocalStorageForm={
    ask,
    lang,
   

    
  }
  return new Promise((resolve)=>{
    chrome.storage.local.set({"resultForm":vals},()=>{
      resolve()
    })
  })
}




export type LocalStorageResultData=keyof LocalStorageData
export function setStoredDataResult(data:string):Promise<void>{
const val:LocalStorageData={
  data
}
return new Promise((resolve)=>{
  chrome.storage.local.set({"resultData":val},()=>{
    resolve()
  })
})
}



export function getStoredCredit(): Promise<LocalStorageCredit> {
  return new Promise<LocalStorageCredit>((resolve, reject) => {
    chrome.storage.local.get("credit", (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result as LocalStorageCredit);
      }
    });
  });
}



export function getStoredUserInfo():Promise<LocalStorageInfo>{
  return new Promise((resolve,reject)=>{
    chrome.storage.local.get(null,(result)=>{
      if(chrome.runtime.lastError){
        reject(chrome.runtime.lastError);
      }else{
        resolve(result as LocalStorageInfo)
      }
    })
  })
}

export function getStoredForm():Promise<LocalStorageForm>{
  return new Promise((resolve, reject)=>{
    chrome.storage.local.get("resultForm", (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        // result.resultForm로부터 값을 추출
        resolve(result.resultForm as LocalStorageForm);
      }
    });
  });
}
