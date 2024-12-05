import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaceList.css";

const PlaceList = () => {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("ALL");
    const [sortOption, setSortOption] = useState("인기순");
    const [likedPlaces, setLikedPlaces] = useState({});
    const navigate = useNavigate();

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
                setFilteredPlaces(data);
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        };

        fetchPlaces();
    }, []);

    useEffect(() => {
        let filtered = places.filter((place) => {
            const matchesSearch =
                searchQuery === "" ||
                place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                place.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                place.tags.some((tag) =>
                    tag.toLowerCase().includes(searchQuery.toLowerCase())
                );

            const matchesTag =
                selectedTag === "ALL" || place.tags.includes(selectedTag);

            return matchesSearch && matchesTag;
        });

        if (sortOption === "인기순") {
            filtered = filtered.sort((a, b) => b.popularity - a.popularity);
        } else if (sortOption === "가격순") {
            filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (sortOption === "평점순") {
            filtered = filtered.sort((a, b) => b.rating - a.rating);
        }

        setFilteredPlaces(filtered);
    }, [searchQuery, selectedTag, sortOption, places]);

    const toggleLike = (id, event) => {
        setLikedPlaces((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
        event.target.blur();
    };

    const handleCardClick = (id) => {
        navigate(`/details/${id}`);
    };

    return (
        <div className="placelist-container">
            <header className="placelist-header">CoseCose</header>

            <div className="placelist-search-bar">
                <input
                    type="text"
                    placeholder="장소명, 태그 검색"
                    className="placelist-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="placelist-search-button">🔍</button>
            </div>

            <div className="placelist-filters-container">
                <div className="placelist-filters">
                    {["ALL", "#카페", "#식당", "#놀거리", "#산책로", "#힐링", "#캠핑"].map(
                        (label, idx) => (
                            <button
                                key={idx}
                                className={`placelist-filter-button ${
                                    selectedTag === label ? "placelist-filter-active" : ""
                                }`}
                                onClick={() => setSelectedTag(label)}
                            >
                                {label}
                            </button>
                        )
                    )}
                </div>
            </div>

            <div className="placelist-sort-options">
                {["인기순", "가격순", "평점순"].map((option) => (
                    <label key={option} className="placelist-sort-label">
                        <input
                            type="radio"
                            name="sortOption"
                            value={option}
                            checked={sortOption === option}
                            onChange={(e) => setSortOption(e.target.value)}
                        />
                        {option}
                    </label>
                ))}
            </div>

            <div className="placelist-places">
                {filteredPlaces.map((place) => (
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
                            <button
                                className={`placelist-like-button ${
                                    likedPlaces[place.id] ? "liked" : ""
                                }`}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    toggleLike(place.id, event);
                                }}
                            >
                                {likedPlaces[place.id] ? "❤️" : "♡"}
                            </button>
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
    );
};

export default PlaceList;
