import ReactDOM from 'react-dom/client';

import './assets/application.scss';
import init from './init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await init();
  root.render(vdom);
};

app();
