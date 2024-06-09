import React from 'react';
import { useNavigate } from 'react-router-dom'
import Input from '../../components/input/style';
import { useForm } from 'react-hook-form'
import BasicButton from '../../components/button/BasicButton';
import S from './style';

// 리엑트 use-hook-form
const SignUp = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, getValues, formState: {isSubmitting, isSubmitted, errors}} = useForm({ mode: "onChange" });

    //[] 바깥 ^는 문자열 처음을 의미
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;


    return (
        <S.Form onSubmit={handleSubmit(async (data)=>{

             console.log(data)
             await fetch('http://localhost:8000/user/register', {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    email : data.email,
                    password : data.password
                })
            })
            .then(res => res.json())
            .then(res => {
                if(res.registerSuccess){
                    alert(res.message)
                }
                // 리다이렉트
                navigate('/signIn')
            })

        })}>

            <S.Label htmlFor="email">
                <S.Title>이메일</S.Title>
                {/* BasicInput으로 하면 ref 오류가 생긴다. */}
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

            <S.Label htmlFor="password">
                <S.Title>비밀번호 확인</S.Title>
                <Input size={"full"} shape={"small"} variant={"black"} color={"black"} 
                    type="password"
                    placeholder='비밀번호를 확인해주세요.'
                    {...register("passwordConfirm",{
                        required: true,
                        validate: {
                            matchPassword : (value) => {
                                const { password } = getValues();
                                console.log(value, password,  password === value)
                                return password === value;
                            }
                        }
                    })}
                />
                {errors?.passwordConfirm && (
                    <S.ConfirmMessage>비밀번호를 확인해주세요</S.ConfirmMessage>
                )}
            </S.Label>

            <BasicButton size={"full"} shape={"small"} variant={"black"} color={"white"}
             disabled={isSubmitting}>회원가입</BasicButton>
        </S.Form>
    );
};

export default SignUp;