import { LightningElement } from 'lwc';

const CONTACTS_URL = 'api/contacts';
const STORIES_URL = 'api/stories';

export default class App extends LightningElement {

    contacts = [];
    stories = [];

    connectedCallback() {
        fetch(CONTACTS_URL).then(response => {
            return response.json();
        }).then( contacts => {
            this.contacts = contacts;
        });
        fetch(STORIES_URL).then(response => {
            return response.json();
        }).then( stories => {
            this.stories = stories;
        });
    }

}