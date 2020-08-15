import { createElement } from 'lwc';
import MyApp from 'my/app';
import MyStory from 'my/stories';

const app = createElement('my-app', { is: MyApp });
const str = createElement('my-stories', { is: MyStory });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
document.querySelector('#main').appendChild(str);
