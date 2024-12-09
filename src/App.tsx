import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUpForm from './page/signUp/SignUpForm';
import LoginForm from './page/login/LoginFrom';
import MainPage from './page/main/MainForm';
import KakaoCallback from './page/callback/KakaoCallback';
import Layout from './_common/Layout';
import Category from './page/category/category';
import PlaceList from './page/placelist/PlaceList';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // JWT 기반 로그인 상태 확인
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // JWT가 있으면 로그인 상태로 설정
    }, []); // 빈 배열로 설정하여 마운트 시 한 번만 실행

    return (
        <Router>
            <Routes>
                {/* 로그인 여부에 따라 화면 변경 */}
                
                <Route path="/signup" element={<SignUpForm setIsLoggedIn={setIsLoggedIn}/>} />
                {/* 보호된 라우트: 로그인하지 않은 사용자는 로그인 화면으로 리다이렉트 */}
                <Route path="/callback/KakaoCallback" element={<KakaoCallback setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path='/category' element={ <Category/>} />
                    <Route path='/placelist' element={<PlaceList/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
