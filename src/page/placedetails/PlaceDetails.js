import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PlaceList.css";

const PlaceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // 더미 데이터 (실제 API 연동 시 삭제 가능)
    const places = [
        {
            id: "1",
            name: "무라텐",
            address: "유성구 반석동",
            tags: ["#식당", "#일식", "#텐동", "#반석동"],
            rating: 4.3,
            price: 15000,
            image: "https://via.placeholder.com/363x140.png?text=Place+1",
            description: "일본 전통 텐동 요리를 맛볼 수 있는 식당입니다.",
        },
        {
            id: "2",
            name: "연선홈베이커리",
            address: "유성구 지족동",
            tags: ["#카페", "#빵", "#베이커리", "#지족동"],
            rating: 4.7,
            price: 10000,
            image: "https://via.placeholder.com/363x140.png?text=Place+2",
            description: "신선한 재료로 만든 다양한 빵과 음료를 즐길 수 있는 베이커리입니다.",
        },
        {
            id: "3",
            name: "글램핑 존",
            address: "유성구 문지동",
            tags: ["#글램핑", "#캠핑", "#힐링", "#문지동"],
            rating: 4.0,
            price: 20000,
            image: "https://via.placeholder.com/363x140.png?text=Place+3",
            description: "자연 속에서 힐링하며 캠핑을 즐길 수 있는 글램핑 존입니다.",
        },
    ];

    // ID로 장소 데이터 찾기
    const place = places.find((p) => p.id === id);

    if (!place) {
        return <div>장소 정보를 찾을 수 없습니다.</div>;
    }

    const handleClose = () => {
        navigate(-1); // 이전 페이지로 돌아가기
    };

    return (
        <div className="place-details-container">
            {/* 헤더 */}
            <header className="place-details-header">
                <h1>{place.name}</h1>
            </header>

            {/* 기본 정보 */}
            <section className="place-details-section">
                <img src={place.image} alt={place.name} className="place-details-image" />
                <p>
                    <strong>주소:</strong> {place.address}
                </p>
                <p>
                    <strong>평점:</strong> {place.rating} / 5
                </p>
                <p>
                    <strong>가격:</strong> {place.price.toLocaleString()}원
                </p>
                <p>
                    <strong>설명:</strong> {place.description}
                </p>
            </section>

            {/* 추가 정보 */}
            <section className="place-additional-info">
                <h2>추가 정보</h2>
                <p>이 장소는 평일 및 주말 모두 운영됩니다. 더 많은 정보는 곧 추가될 예정입니다.</p>
            </section>

            {/* X 버튼 */}
            <button onClick={handleClose} className="place-details-close-button">
                X
            </button>
        </div>
    );
};

export default PlaceDetails;
