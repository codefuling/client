import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';
import { setUser, setUserStatus } from '../../modules/user';
import S from './style';

const MyPage = () => {
    
    const [searchParams] = useSearchParams();

    const previousUrl = useSelector((state) => state.user.previousUrl );
    const curruentUser = useSelector((state) => state.user.curruentUser);
    const userStatus = useSelector((state) => state.user.isLogin);

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(!curruentUser?.email){
            const getProfile = async () => {
                const response = await fetch('http://localhost:8000/auth/profile', {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok) return;
                const datas = await response.json();
                return datas;
            }
    
            getProfile()
                .then((res) => {
                    if (res && res.user) {
                        dispatch(setUser(res.user));
                        dispatch(setUserStatus(true));
                    }
                })
                .catch(console.error);
        }

    }, [curruentUser, dispatch]);
    

    // 로그아웃
    const handleLogout = async () => {
        try {
          const response = await fetch('http://localhost:8000/auth/logout', {
            method: 'GET',
            credentials: 'include', // 세션 쿠키를 전송
          });
      
          if (response.ok) {
            // 로그아웃 성공 시 로컬 스토리지 비우고 페이지 리디렉션
            localStorage.removeItem('accessToken');
            window.location.href = '/'; // 홈 페이지로 리디렉션
          } else {
            console.error('로그아웃 실패');
          }
        } catch (error) {
          console.error('로그아웃 에러:', error);
        }
      };


    // 프로필
    const pictureRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null); // 선택된 파일 저장
    const [picturePath, setPicturePath] = useState("http://localhost:8000/uploads/profiles/member.jpg");
    
    // 파일이 선택되었을 때 처리하는 함수 (서버로는 요청하지 않음)
    const handleFileChange = (event) => {
      const file = event.target.files[0]; // 선택한 파일
  
      if (file) {
        setSelectedFile(file); // 선택된 파일 저장
        const fileURL = URL.createObjectURL(file); // 브라우저에서 미리 보기용 URL 생성
        setPicturePath(fileURL); // 리액트에서 미리 보기 이미지 경로 업데이트
      }
    };

    const savePicture = async (e) => {
        const formData = new FormData();
        formData.append('picture', pictureRef.current.files[0]);
        console.log(pictureRef.current.files[0])

        const config = {
            method : "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: formData
        };

        await fetch("http://localhost:8000/user/picture", config)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                const newPicturePath = res.filePath
                setPicturePath(`http://localhost:8000${newPicturePath}`)
            })
            .catch(console.error);
    }

    // 로그인이 안된 상태에서 MyPage 접근 방지
    if (!userStatus) {
        return <Navigate to={previousUrl ? previousUrl : "/"} replace={true} />
    }

    
    // 로그인이 되어있다면 페이지를 렌더링
    return (
        <div>
            관리자 페이지
            <S.Wrapper>
                <S.Label htmlFor="profile">
                    <S.Profile src={picturePath} alt="프로필 이미지" />
                </S.Label>
                <input 
                    id="profile" style={{display : "none"}} 
                    ref={pictureRef} type="file" name="picture"
                    onChange={handleFileChange}
                />
                <S.Button onClick={savePicture} >프로필 이미지 변경</S.Button>
            </S.Wrapper>
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
};

export default MyPage;
