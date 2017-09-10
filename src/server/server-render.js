import { h } from 'preact';

import render from 'preact-render-to-string';

import App from '../client/app';

const Page = () => (
    <html lang="hu">
        <head>
            <meta charset="utf-8" />
            <title>Title</title>
            <link rel="stylesheet" href="/static/client.css" />
        </head>
        <body>
            <div id="app"><App side={'server'} /></div>
            <script src="/static/client.js"></script>
        </body>
    </html>
);

export default () => {
    return Promise.resolve(render(<Page />));
};
