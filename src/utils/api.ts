import { getStoredForm } from '../utils/storage';
export interface GptData {
  data: string[];
  videoId:string;
 
}


export async function fetchBc(videoId: string): Promise<GptData> {

  try {
    const form = await getStoredForm(); // await 키워드를 사용하여 비동기 호출을 기다립니다.
    const lang = form?.lang; // 여기서 lang 값을 가져옵니다.

console.log(lang,'apiLang!!!')

    const response = await fetch('http://localhost:3001/getTranscript', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoId ,lang}),
    });
     
    if (response.status !== 200) {
      console.log(`HTTP error! status: ${response.status}`)
        throw new Error('something is wrong. Please try again');
    }

    const data: GptData = await response.json();
   
    console.log(data,'data')
    return data;
  } catch (error) {
    console.log('Error fetching the transcript:', error);
    throw 'something is wrong. Please try again'
   
  }
}
