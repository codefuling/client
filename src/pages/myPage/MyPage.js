import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {  Navigate, useSearchParams } from 'react-router-dom';
import { setUser, setUserStatus } from '../../modules/user';

const MyPage = () => {
    
    const [searchParams] = useSearchParams();

    // redux 전역상태 로그인으로 바꿔주면 된다.
    // const login = searchParams.get("login")

    // 이후에 추가
    const previousUrl = useSelector((state) => state.user.previousUrl )
    const curruentUser = useSelector((state) => state.user.curruentUser);
    const userStatus = useSelector((state) => state.user.isLogin);

    const dispatch = useDispatch()
    useEffect(() => {

        if(!curruentUser?.email){
            const getProfile = async () => {
                const response = await fetch('http://localhost:8000/auth/profile', {
                    method: 'GET',
                    credentials: 'include'  // 쿠키를 포함한 요청
                })
                if(!response.ok) return;
                const datas = response.json()
                return datas;
            }
    
            // Express 서버로부터 사용자 프로필 정보 요청
            getProfile()
                .then((res) => {
                    dispatch(setUser(res.user))
                    dispatch(setUserStatus(true))
                    console.log(res)
                })
                .catch(console.error)
        }

    }, [curruentUser, dispatch]);

    if(userStatus){
        return (
            <div>
                관리자 페이지
            </div>
        );
    }
    // <Navigate to={전에 보고 있던 경로, 리덕스에 저장} />
    // replace={true} 왔던 기록이 없게 만든다. history에서 사라짐
    
    // return <Navigate to={"/"} replace={true} />
    return <Navigate to={previousUrl ? previousUrl : "/"} replace={true} />
};

export default MyPage ;