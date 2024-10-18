import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';

import GlobalStyle from './global/global';
import { ThemeProvider } from 'styled-components';
import theme from './global/theme';

import { useEffect } from 'react';
import { setUser, setUserStatus } from './modules/user';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  // 값 두개를 확인
  // console.log('store.getState', store.getState());
  // 최초 한 번 인가 로그인 확인 후 자동 로그인, 
  // 인증 만료 401 코드 인경우 함수 종료
  const curruentUser = useSelector((state) => state.user.curruentUser);
  const userStatus = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch()

  
    useEffect(() => {
      if(localStorage.getItem('accessToken')){

        const isAuthenticate = async () => {
          const response = await fetch('http://localhost:8000/auth/jwt', {
            method : 'POST',
            headers : {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
          })
          if(!response.ok) {
            return
          }
          const getAuthenticate = await response.json()
          return getAuthenticate;
        }
    
        isAuthenticate()
          .then((res) => {
            console.log('마운트', res)
            let {message, user} = res;
            dispatch(setUser(user))
            dispatch(setUserStatus(true))
          })
          .catch(console.error)

        }
    }, [])
  
  return (
    <>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
          <GlobalStyle />
        </ThemeProvider>
    </>
  );
}

export default App;
