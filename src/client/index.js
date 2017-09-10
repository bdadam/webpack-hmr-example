if (process.env.NODE_ENV !== 'production') {
    require('webpack-hot-middleware/client');
}

import { h, render } from 'preact';
import App from './app';

console.log('1');

const appDiv = document.createElement('div');
const serverAppDiv = document.querySelector('#app');
const appContent = serverAppDiv.querySelector('#app-content');

render(<App side={'client'} />, serverAppDiv, serverAppDiv.lastChild);

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept();
    // module.hot.dispose(() => {
    //     document.querySelector('#app').innerHTML = '';
    // });
}