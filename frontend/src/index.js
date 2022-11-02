import ReactDOM from 'react-dom/client';
import './styles/index.js';

import init from './init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  const vdom = await init();
  root.render(vdom);
};

app();
