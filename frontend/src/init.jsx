import i18next from 'i18next';
import { Provider } from 'react-redux';
import LanguageDetector from 'i18next-browser-languagedetector';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import AuthProvider from './contexts/AuthContext/AuthContext.jsx';
import App from './components/App.jsx';
import store from './store/index.js';
import resources from './locales/index.js';

const init = async () => {
  const i18n = i18next.createInstance();

  const defaultLanguage = 'ru';

  await i18n.use(LanguageDetector).use(initReactI18next).init({
    resources,
    fallbackLng: defaultLanguage,
    debug: false,
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
