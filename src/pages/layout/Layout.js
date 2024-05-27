import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faSearch, faBell, faUser} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setPreviousUrl, setUser, setUserStatus } from '../../modules/user';

const Layout = () => {

    // 비로그인 회원이 My페이지 접근을 못하게 한다
    const location = useLocation();
    const dispatch = useDispatch();

    const path = location.pathname + location.search;
    console.log(path)

    // /my?login="true" 입력시 로그인할 수 있게 처리 눈으로만
    if(path !== "/my"){
        dispatch(setPreviousUrl(path))
    }

    // 앱이 실행되었을 때 로그인 상태를 확인한다.
    const [isLogin, setIsLogin] = useState(false);
    
    useEffect(()=>{
        const getLoginState = async () => {
        await fetch('http://localhost:4001/login/success', {
        method : 'GET',
        credentials: 'include'
        }).then(async (res) => {
            const user = await res.json();
            if(res.ok){
                console.log(user);
                dispatch(setUser(user));
                dispatch(setUserStatus(true));
                setIsLogin(true)
                return;
            }else{
                return;
            }
        })
        }
        getLoginState()
    }, [isLogin])

    return (
        <S.Background>
            <S.Wrapper>
                <S.Header> 
                    <Link to={"/"}>Sehwan Todo</Link>
                </S.Header>
                <S.Main>
                    <Outlet />
                </S.Main>
                <S.Nav>
                    <NavLink to={"/todo"}>
                        <FontAwesomeIcon 
                            icon={faHouse}
                            className="icon"
                        />
                        <p>피드</p>
                    </NavLink>
                    <NavLink to={"/search"}>
                        <FontAwesomeIcon icon={faSearch} className="icon"/>
                        <p>검색</p>
                    </NavLink>
                    <NavLink to={"/notice"}>
                        <FontAwesomeIcon icon={faBell} className="icon"/>
                        <p>알림</p>
                    </NavLink>
                    <NavLink to={"/my"}>
                        <FontAwesomeIcon icon={faUser} className="icon"/>
                        <p>My</p>
                    </NavLink>
                </S.Nav>
            </S.Wrapper>
        </S.Background>
    );
};

export default Layout;