import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setUser, setUserStatus } from '../../modules/user';
import S from './style';

const MyPage = () => {
    const [searchParams] = useSearchParams();
    const { curruentUser, userStatus, picture, picturePath } = useSelector((state) => state.user.curruentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            navigate('/my', { replace: true });
        }

        const localToken = localStorage.getItem('accessToken');
        if (!localToken) {
            navigate('/signIn');
        }
    }, [searchParams, navigate]);

    // 썸네일 이미지 상태
    const [imageSrc, setImageSrc] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);  // 선택한 파일을 저장할 상태

    // 파일 선택 시 실행되는 함수
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };

            reader.readAsDataURL(file);
            setThumbnail(file);  // 🔹 선택한 파일을 상태에 저장
        }
    };

    // 파일 업로드 함수
    const handleThumbnailUpload = async () => {
        if (!thumbnail) {
            alert("파일을 선택해주세요!");
            return;
        }

        const formData = new FormData();
        formData.append('images', thumbnail);  // 🔹 선택한 파일 추가
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/images/thumbnail', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('이미지 업로드 성공:', data);
            } else {
                console.error('이미지 업로드 실패');
            }
        } catch (error) {
            console.error('업로드 중 오류 발생:', error);
        }
    };

    return (
        <div>
            관리자 페이지
            <S.Wrapper>
                <S.Label htmlFor="profile">
                    {imageSrc ? (
                        <S.Profile alt="프로필 이미지" src={imageSrc} />
                    ) : (
                        <S.Profile alt="프로필 이미지" src={process.env.REACT_APP_BACKEND_URL + `/${picturePath}/${picture}`} />
                    )}
                </S.Label>
                <input 
                    id="profile"
                    style={{ display: "none" }}
                    type="file"
                    onChange={handleImageChange}
                />
                <S.Button onClick={handleThumbnailUpload}>프로필 이미지 변경</S.Button>
            </S.Wrapper>
            <button onClick={() => { 
                localStorage.removeItem("accessToken");
                navigate("/");
                dispatch(setUser(null));
                dispatch(setUserStatus(false));
            }}>로그아웃</button>
        </div>
    );
};

export default MyPage;
