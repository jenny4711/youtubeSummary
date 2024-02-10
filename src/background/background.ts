// google clientId: 569916602742-euf8b4pgltop5a5vv01q04hhi2v2j947.apps.googleusercontent.com
import { setStoredUserInfo , setStoredForm } from '../utils/storage';
// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    // Use the token.
    let init = {
      method: 'GET',
      async: true,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      'contentType': 'json'
    };
    fetch('https://www.googleapis.com/oauth2/v2/userinfo', init)
      .then((response) => response.json())
      .then(function(data) {
        console.log(data);
        const email=data.email
        const family_name=data.family_name
        const given_name=data.given_name
        const picture=data.picture
      setStoredUserInfo(email,family_name,given_name,picture)
      });
  });


})
