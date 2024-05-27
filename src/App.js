import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';

import GlobalStyle from './global/global';
import { ThemeProvider } from 'styled-components';
import theme from './global/theme';

import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from '@redux-devtools/extension';
import rootReducer from './modules';
const store = createStore(rootReducer, devToolsEnhancer())

// 값 두개를 확인
// console.log('store.getState', store.getState());

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
          <GlobalStyle />
        </ThemeProvider>
      </Provider>
   </>
  );
}

export default App;
