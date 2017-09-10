import { h } from 'preact';

import './app.scss';

const App = ({ side }) => (
    <div id="app-content">
        Test from side: {side}
    </div>
);

export default App;