import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./SignUpForm.css";

function SignUpForm({setIsLoggedIn}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        nickname: "",
        mbti: "",
        favorite: {
            activities: [],
            healing: [],
            food: [],
            hobbies: [],
        },
        dob: "",
        gender: "",
    });

    const [nicknameAvailable, setNicknameAvailable] = useState(null); // 닉네임 중복 확인 결과
    const [isNicknameConfirmed, setIsNicknameConfirmed] = useState(false); // 닉네임 확정 여부

    const minDate = "1950-01-01";
    const maxDate = "2024-12-31";

    const handleChange = (e) => {
        const { name, value, type, checked, dataset } = e.target;

        if (name === "dob") {
            if (value < minDate || value > maxDate) {
                alert("올바른 날짜를 입력해주세요 (1950-01-01 ~ 2024-12-31)");
                return;
            }
        }

        if (dataset.group) {
            const group = dataset.group;
            setFormData((prevData) => ({
                ...prevData,
                favorite: {
                    ...prevData.favorite,
                    [group]: checked
                        ? [...(prevData.favorite[group] || []), value]
                        : (prevData.favorite[group] || []).filter((item) => item !== value),
                },
            }));
        } else if (type === "checkbox") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const checkNickname = async () => {
        if (!formData.nickname.trim()) {
            alert("닉네임을 입력해주세요.");
            return;
        }

        try {
            const response = await axios.get("http://localhost:8090/api/check-nickname", {
                params: { nickname: formData.nickname },
            });
            setNicknameAvailable(response.data.available);

            if (response.data.available) {
                alert("사용 가능한 닉네임입니다.");
                setIsNicknameConfirmed(true); // 닉네임 확정
            } else {
                alert("이미 사용 중인 닉네임입니다.");
            }
        } catch (error) {
            console.error("닉네임 중복 확인 중 오류 발생:", error);
            alert("닉네임 확인 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.gender) {
            alert("성별을 선택해주세요.");
            return;
        }

        if (!isNicknameConfirmed) {
            alert("닉네임 중복 확인을 완료해주세요.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:8090/api/signup",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            if (response.data.success) {
                alert("회원가입이 완료되었습니다!");
                setIsLoggedIn(true);
                navigate('/');
            } else {
                alert("회원가입 실패: " + response.data.message);
            }
        } catch (error) {
            console.error("회원가입 요청 중 오류 발생:", error);
            alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h1 className="signup-title">CoseCose 회원가입</h1>

            {/* 이름 */}
            <div className="form-group">
                <label htmlFor="name">이름</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    placeholder="이름을 입력해주세요"
                    required
                />
            </div>

            {/* 전화번호 */}
            <div className="form-group">
                <label htmlFor="tel">전화번호</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    placeholder="010-1234-1234"
                    pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                    required
                />
            </div>

            {/* 닉네임 */}
            <div className="form-group">
                <label htmlFor="nickname">닉네임</label>
                <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    placeholder="닉네임을 입력해주세요"
                    disabled={isNicknameConfirmed}
                    required
                />
                <button
                    type="button"
                    className="check-button"
                    onClick={checkNickname}
                    disabled={isNicknameConfirmed}
                >
                    중복확인
                </button>
                {nicknameAvailable !== null && (
                    <span className="nickname-status">
                        {nicknameAvailable ? "✔ 사용 가능" : "❌ 사용 불가능"}
                    </span>
                )}
            </div>

            {/* MBTI */}
            <div className="form-group">
                <label htmlFor="mbti">MBTI</label>
                <select
                    id="mbti"
                    name="mbti"
                    value={formData.mbti}
                    onChange={handleChange}
                    required
                >
                    <option value="">MBTI를 선택해주세요</option>
                    {["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP", "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"].map((mbti) => (
                        <option key={mbti} value={mbti}>
                            {mbti}
                        </option>
                    ))}
                </select>
            </div>

            {/* 액티비티 */}
            <div className="form-group">
                <label>액티비티</label>
                <div className="form-options">
                    {["헬스", "자전거", "볼링", "야구", "클라이밍"].map((activity) => (
                        <label key={activity} className="checkbox-label">
                            <input
                                type="checkbox"
                                name="activities"
                                value={activity}
                                onChange={handleChange}
                                data-group="activities"
                            />
                            {activity}
                        </label>
                    ))}
                </div>
            </div>

            {/* 힐링 */}
            <div className="form-group">
                <label>힐링</label>
                <div className="form-options">
                    {["바다", "계곡", "산책", "꽃구경", "드라이브"].map((healing) => (
                        <label key={healing} className="checkbox-label">
                            <input
                                type="checkbox"
                                name="healing"
                                value={healing}
                                onChange={handleChange}
                                data-group="healing"
                            />
                            {healing}
                        </label>
                    ))}
                </div>
            </div>

            {/* 음식 */}
            <div className="form-group">
                <label>음식</label>
                <div className="form-options">
                    {["한식", "중식", "양식", "일식", "디저트"].map((food) => (
                        <label key={food} className="checkbox-label">
                            <input
                                type="checkbox"
                                name="food"
                                value={food}
                                onChange={handleChange}
                                data-group="food"
                            />
                            {food}
                        </label>
                    ))}
                </div>
            </div>

            {/* 취미 */}
            <div className="form-group">
                <label>취미</label>
                <div className="form-options">
                    {["게임", "드로잉", "글램핑", "독서", "음악"].map((hobby) => (
                        <label key={hobby} className="checkbox-label">
                            <input
                                type="checkbox"
                                name="hobbies"
                                value={hobby}
                                onChange={handleChange}
                                data-group="hobbies"
                            />
                            {hobby}
                        </label>
                    ))}
                </div>
            </div>

            {/* 생년월일 */}
            <div className="form-group">
                <label htmlFor="dob">생년월일</label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    min={minDate}
                    max={maxDate}
                    required
                />
            </div>

            {/* 성별 */}
            <div className="form-group">
                <label>성별</label>
                <label className="radio-label">
                    <input
                        type="radio"
                        name="gender"
                        value="M"
                        onChange={handleChange}
                        required
                    />
                    남성
                </label>
                <label className="radio-label">
                    <input
                        type="radio"
                        name="gender"
                        value="F"
                        onChange={handleChange}
                        required
                    />
                    여성
                </label>
            </div>

            <button type="submit" className="submit-button">회원가입 완료하기</button>
        </form>
    );
}

export default SignUpForm;
