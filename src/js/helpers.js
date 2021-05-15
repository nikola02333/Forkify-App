
import { async } from 'regenerator-runtime';
import {TIMEOUT_SEC} from './config';

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const AJAX = async function(url, uploadData = undefined){
  try {

  const fetchPro = uploadData ? fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(uploadData)
  })  : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC) ]);  // ovo samo za fetch, koji vraca promis pa zato ide await 
    
    const data = await res.json();
    if(!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;

} catch (err) {
    // ovde gore se desava greska, a mi necemo ovde da je pikazemo nego u Model.js
    // zato bacamo izuzetak sa  throw 
   throw err;
}

}
/*
export const sendJson = async function(url, uploadData){
  try {

    const postMetod = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploadData)
    });

      const res = await Promise.race([postMetod, timeout(TIMEOUT_SEC) ]);  // ovo samo za fetch, koji vraca promis pa zato ide await 
      
      const data = await res.json();
      if(!res.ok) throw new Error(`${data.message} (${res.status})`);

      return data;

  } catch (err) {
      // ovde gore se desava greska, a mi necemo ovde da je pikazemo nego u Model.js
      // zato bacamo izuzetak sa  throw 
     throw err;
  }

}

export const getJson = async function(url){
  try {

      const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC) ]);  // ovo samo za fetch, koji vraca promis pa zato ide await 
      
      const data = await res.json();
      if(!res.ok) throw new Error(`${data.message} (${res.status})`);

      return data;

  } catch (err) {
      // ovde gore se desava greska, a mi necemo ovde da je pikazemo nego u Model.js
      // zato bacamo izuzetak sa  throw 
     throw err;
  }

}
*/