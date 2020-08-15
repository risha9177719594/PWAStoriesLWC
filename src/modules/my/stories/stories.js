import { LightningElement } from 'lwc';

const CONTACTS_URL = 'api/contacts';

export default class Stories extends LightningElement {

    contacts = [];

    connectedCallback() {
        fetch(CONTACTS_URL).then(response => {
            alert('test again 112233');
            return response.json();
        }).then( contacts => {
            this.contacts = contacts;
        });
        //fetch('https://myrisha1.herokuapp.com/people/restExampleString/rest').then(response => response.json()).then(data => alert(data));
    }

}
