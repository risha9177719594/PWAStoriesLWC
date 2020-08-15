import { LightningElement } from 'lwc';

const CONTACTS_URL = 'api/contacts';

export default class App extends LightningElement {

    contacts = [];

    connectedCallback() {
        fetch(CONTACTS_URL).then(response => {
            return response.json();
        }).then( contacts => {
            this.contacts = contacts;
        });
        fetch('https://myrisha1.herokuapp.com/people/restExampleString/rest').then(response => response.json()).then(data => alert(data));
    }
postData(url = '') {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({}) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
postData('https://myrisha1.herokuapp.com/people/restExampleString/rest')
  .then(data => {
    alert(data); // JSON data parsed by `data.json()` call
  });

}
