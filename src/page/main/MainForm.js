import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainForm.css'; // CSS 파일 연결

function MainPage() {
    const navigate = useNavigate();
    const [data, setPlaces] = useState([]);

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

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const data = [
                    {
                        id: 1,
                        name: "무라텐",
                        address: "유성구 반석동",
                        tags: ["#식당", "#일식", "#텐동", "#반석동"],
                        rating: 4.3,
                        price: 15000,
                        popularity: 500,
                        image: "https://via.placeholder.com/363x140.png?text=Place+1",
                    },
                    {
                        id: 2,
                        name: "연선홈베이커리",
                        address: "유성구 지족동",
                        tags: ["#카페", "#빵", "#베이커리", "#지족동"],
                        rating: 4.7,
                        price: 10000,
                        popularity: 1000,
                        image: "https://via.placeholder.com/363x140.png?text=Place+2",
                    },
                    {
                        id: 3,
                        name: "글램핑 존",
                        address: "유성구 문지동",
                        tags: ["#글램핑", "#캠핑", "#힐링", "#문지동"],
                        rating: 4.0,
                        price: 20000,
                        popularity: 300,
                        image: "https://via.placeholder.com/363x140.png?text=Place+3",
                    },
                    {
                        id: 4,
                        name: "연선홈베이커리",
                        address: "유성구 지족동",
                        tags: ["#카페", "#빵", "#베이커리", "#지족동"],
                        rating: 4.7,
                        price: 10000,
                        popularity: 1000,
                        image: "https://via.placeholder.com/363x140.png?text=Place+2",
                    },
                    {
                        id: 5,
                        name: "연선홈베이커리",
                        address: "유성구 지족동",
                        tags: ["#카페", "#빵", "#베이커리", "#지족동"],
                        rating: 4.7,
                        price: 10000,
                        popularity: 1000,
                        image: "https://via.placeholder.com/363x140.png?text=Place+2",
                    },
                ];
                setPlaces(data);
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        };

        fetchPlaces();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/details/${id}`);
    };

    return (
        <div className="place_list_div">
            <div className="header_cosecose">
                <h1 className="main_title">CoseCose</h1>
            </div>
            <div className="event_div">
                <h1 className='event_title'>이달의 축제</h1>
                <div className="event_pic_div">
                    <img
                        className="event_pic"
                        src="/images/event_img/event1.png"
                        alt="이달의 축제"
                    />
                </div>
            </div>
            <div className="content_div_popup">
                <h1 className='content_div_title'>#전시회/팝업</h1>
                <div className="content_dive_plcae">
                    {data.map((place) => (
                        <div
                            key={place.id}
                            className="placelist-place-card"
                            onClick={() => handleCardClick(place.id)}
                        >
                            <div className="placelist-place-image-container">
                                <img
                                    src={place.image}
                                    alt={place.name}
                                    className="placelist-place-image"
                                />
                            </div>
                            <div className="placelist-place-details">
                                <h3 className="placelist-place-name">{place.name}</h3>
                                <p className="placelist-place-address">{place.address}</p>
                                <div className="placelist-place-tags">
                                    {place.tags.map((tag, index) => (
                                        <span key={index} className="placelist-place-tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    
}

export default MainPage;