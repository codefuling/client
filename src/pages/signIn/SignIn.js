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
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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
            await fetch('http://localhost:8000/user/login', {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    email : data.email,
                    password : data.password
                })
            })
            .then(res => res.json())
            .then((res) => {
                let {token, user} = res;
                dispatch(setUser(user))
                dispatch(setUserStatus(true))
                localStorage.setItem("token", res.token);
            })
            .catch(console.error)

            // 로그인 후 접속하는 페이지들은 토큰을 심어서 접근
            // await fetch('http://localhost:8000/user/auth', {
            //     method : 'POST',
            //     headers : {
            //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
            //     }
            // })
            // .then((res) => res.json())
            // .then(console.log)
            // .catch()

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
        </S.Form>
    );
};

export default SignIn;