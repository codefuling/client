import React, { useState } from 'react';
import Input from '../../components/input/style';
import { useForm } from 'react-hook-form'
import BasicButton from '../../components/button/BasicButton';
import { Link } from 'react-router-dom'
import S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserStatus } from '../../modules/user';

// 리엑트 use-hook-form
const SignIn = () => {

    const { register, handleSubmit, getValues, formState: {isSubmiitng, isSubmitted, errors}} = useForm({ mode: "onChange" });

    //[] 바깥 ^는 문자열 처음을 의미
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

    // 로그인 이후에 보여줘야할 때
    const curruentUser = useSelector((state) => state.user.curruentUser);
    const userStatus = useSelector((state) => state.user.isLogin);
    const dispatch = useDispatch()
    console.log(curruentUser, userStatus)
    
    // 로그인에 성공해서 리랜더링 시켜줘야한다.
    if(userStatus){
        return (
            <div>{curruentUser.email}님 환영합니다.</div>
        )
    }

    return (
        <S.Form onSubmit={handleSubmit(async (data) => {
            
            // 로그인 로직 
            console.log(data)
            await fetch('http://localhost:8000/auth/local', {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    email : data.email,
                    password : data.password
                })
            })
            .then(res => {
                if (!res.ok) {
                    // 응답이 정상적이지 않은 경우 에러 메시지를 처리
                    throw new Error(res.message || '로그인에 실패했습니다.');
                }
                return res.json()
            })
            .then((res) => {
                // 성공적인 경우
                const { accessToken, user } = res;
                dispatch(setUser(user));
                dispatch(setUserStatus(true));
                localStorage.setItem("accessToken", accessToken);
            })
            .catch(console.error)

            })}>

            <S.Label htmlFor="email">
                <S.Title>이메일</S.Title>
                <Input size={"full"} shape={"small"} variant={"black"} color={"black"}
                    id="email" 
                    type="text"
                    placeholder='아이디를 입력하세요.'
                    {...register("email",{
                        required: true,
                        pattern: {
                            value : emailRegex,
                        }
                    })}
                />
                {errors?.email?.type === 'required' && (
                    <S.ConfirmMessage>이메일을 입력해주세요</S.ConfirmMessage>
                )}
                {errors?.email?.type === 'pattern' && (
                    <S.ConfirmMessage>이메일 양식에 맞게 입력해주세요</S.ConfirmMessage>
                )}
            </S.Label>

            <S.Label htmlFor="password">
                <S.Title>비밀번호</S.Title>
                <Input size={"full"} shape={"small"} variant={"black"} color={"black"} 
                    id="password" 
                    type="password"
                    placeholder='비밀번호를 입력하세요.'
                    {...register("password",{
                        required: true,
                        pattern: {
                            value : passwordRegex,
                        }
                    })}
                />
                {errors?.password?.type === 'required' && (
                    <S.ConfirmMessage>비밀번호를 입력해주세요</S.ConfirmMessage>
                )}
                {errors?.password?.type === 'pattern' && (
                    <S.ConfirmMessage>
                        소문자, 숫자, 특수문자를 각 하나 포함한 8자리 이상이여야 합니다.
                    </S.ConfirmMessage>
                )}
            </S.Label>
            <BasicButton size={"full"} shape={"small"} variant={"black"} color={"white"}
             disabled={isSubmiitng}>로그인</BasicButton>
            <Link to="/signUp"><S.SubTitle>투두 페이지가 처음이신가요?</S.SubTitle></Link>
            <div>
                <a href="http://localhost:8000/auth/google">구글 로그인</a>
            </div>
            <div>
                <a href="http://localhost:8000/auth/kakao">카카오 로그인</a>
            </div>
            <div>
                <a href="http://localhost:8000/auth/naver">네이버 로그인</a>
            </div>
        </S.Form>
    );
};

export default SignIn;