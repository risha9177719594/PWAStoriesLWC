import { LightningElement } from 'lwc';

const CONTACTS_URL = 'api/contacts';


export default class App extends LightningElement {

    contacts = [];
	selectedTransaction;

    connectedCallback() {
        fetch(CONTACTS_URL).then(response => {
            return response.json();
        }).then( contacts => {
            this.contacts = contacts;
        });
    }
	handleTransactionSelect(event) {
        this.selectedTransaction = event.target.contact;
    }

}