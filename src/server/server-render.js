import { h } from 'preact';

import render from 'preact-render-to-string';

import App from '../client/app';

const Page = () => (
    <html lang="hu">
        <head>
            <meta charset="utf-8" />
            <title>Title</title>
            <link rel="stylesheet" href="/static/client.css" />

            <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
            <link rel="manifest" href="/icons/manifest.json" />
            <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
            <link rel="shortcut icon" href="/icons/favicon.ico" />
            <meta name="msapplication-config" content="/icons/browserconfig.xml" />
            <meta name="theme-color" content="#ffffff" />
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