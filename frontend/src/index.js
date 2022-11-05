import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';

import './styles/index.js';
import init from './init.jsx';

const app = async () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  const vdom = await init(socket);
  root.render(vdom);
};

app();
