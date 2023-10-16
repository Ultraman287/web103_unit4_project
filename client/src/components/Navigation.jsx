import React from "react";
import "../App.css";
import "../css/Navigation.css";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <h1>Order</h1>
        </li>
      </ul>

      <ul>
        <li>
          <a href="/" role="button">
            Customize
          </a>
        </li>
        <li>
          <a href="/customorders" role="button">
            View Orders
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
