import React from "react";
import "./Header.css"; // קובץ CSS לעיצוב הכותרת

export default function Header() {
    return (
        <div className="header">
            <img src="/images/logo.webp" alt="Logo" className="shop-logo" />
        </div>
    );
}
