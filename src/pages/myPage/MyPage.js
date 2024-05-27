import React from 'react';
import { useSelector } from 'react-redux';

import {  Navigate, useSearchParams } from 'react-router-dom';

const MyPage = () => {
    
    const [searchParams] = useSearchParams();

    // redux 전역상태 로그인으로 바꿔주면 된다.
    // const login = searchParams.get("login")

    // 이후에 추가
    const previousUrl = useSelector( (state) => state.user.previousUrl )
    const curruentLogin = useSelector((state) => state.user.isLogin)

    if(curruentLogin){
        return (
            <div>
                관리자 페이지
            </div>
        );
    }
    // <Navigate to={전에 보고 있던 경로, 리덕스에 저장} />
    // replace={true} 왔던 기록이 없게 만든다. history에서 사라짐
    
    // return <Navigate to={"/"} replace={true} />
    return <Navigate to={previousUrl} replace={true} />
};

export default MyPage ;