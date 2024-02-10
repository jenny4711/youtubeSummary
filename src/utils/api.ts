
export interface GptData {
  data: string[];
 
}


export async function fetchBc(videoId: string,lang:string): Promise<GptData> {
  try {
    const response = await fetch('http://localhost:3001/getTranscript', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoId ,lang}),
    });
     
    if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GptData = await response.json();
    console.log(data,'data')
    return data;
  } catch (error) {
    console.log('Error fetching the transcript:', error);
   
  }
}
