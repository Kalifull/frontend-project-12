import i18next from 'i18next';
import { Provider } from 'react-redux';
import LanguageDetector from 'i18next-browser-languagedetector';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import store from './store/index.js';
import App from './components/App.jsx';
import getLogger from './lib/logger.js';
import { ApiProvider, AuthProvider } from './contexts/index.js';
import { addMessage } from './store/slices/messagesSlice.js';
import {
  addChannel,
  renameChannel,
  removeChannel,
  setCurrentChannel,
} from './store/slices/channelsSlice.js';
import resources from './locales/index.js';

const init = async (socket) => {
  const defaultLanguage = 'ru';
  const i18n = i18next.createInstance();
  const logSocket = getLogger('socket');

  await i18n.use(LanguageDetector).use(initReactI18next).init({
    resources,
    fallbackLng: defaultLanguage,
    debug: false,
  });

  socket.on('newMessage', (message) => {
    logSocket('newMessage', message);
    store.dispatch(addMessage({ message }));
  });

  socket.on('newChannel', (channel) => {
    logSocket('newChannel', channel);
    store.dispatch(addChannel({ channel }));
    store.dispatch(setCurrentChannel({ channelId: channel.id }));
  });

  socket.on('renameChannel', (channel) => {
    logSocket('renameChannel', channel);
    store.dispatch(renameChannel({ channelId: channel.id, channelName: channel.name }));
  });

  socket.on('removeChannel', (channel) => {
    logSocket('removeChannel', channel);
    store.dispatch(removeChannel({ channelId: channel.id }));
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ApiProvider socket={socket}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ApiProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
