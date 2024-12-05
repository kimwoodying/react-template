import React from "react";
import "./MenuBar.css"; // CSS 파일을 임포트

const MenuBar = () => {
    return (
        <nav className="menu-bar">
            <a href="/category" className="menu-link">
                <img src="./img/Category.png" alt="Category" className="menu-icon"/>
            </a>
            <a href="/course" className="menu-link">
                <img src="./img/Course.png" alt="Course" className="menu-icon"/>
            </a>
            <a href="/MainForm" className="menu-link">
                <img src="./img/Home.png" alt="MainForm" className="menu-icon"/>
            </a>
            <a href="/FavoritePlace" className="menu-link">
                <img src="./img/Favorite.png" alt="Favorite" className="menu-icon"/>
            </a>
            <a href="/MyInfo" className="menu-link">
                <img src="./img/MyInfo.png" alt="MyInfo" className="menu-icon"/>
            </a>
        </nav>
    );
};

export default MenuBar;
