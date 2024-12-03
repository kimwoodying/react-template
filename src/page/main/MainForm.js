import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // 현재 URL에서 JWT 추출
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            // JWT를 로컬 스토리지에 저장
            localStorage.setItem('token', token);
            console.log('JWT 저장 완료:', token);

            // URL에서 token 파라미터 제거 (사용자에게 보여지지 않게)
            navigate('/main', { replace: true });
        } else {
            console.error('JWT가 URL에 존재하지 않습니다.');
        }
    }, [navigate]);

    return (
        <div>
            <h1>메인 페이지</h1>
            <p>환영합니다! 로그인 성공!</p>
        </div>
    );
}

export default MainPage;