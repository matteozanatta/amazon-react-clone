import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <img
        src="https://m.media-amazon.com/images/I/61DsuAN45rL._SX3000_.jpg"
        className="home__containerImage"
        alt=""
      ></img>
      <div className="home__container">
        <div className="home__element">
          <Product
            id="1"
            image="https://m.media-amazon.com/images/I/71jOMTtw7BL._AC_SX679_.jpg"
            title="De'Longhi EDG160.A Nescafé Dolce Gusto Infinissima Macchina per caffè Espresso e Altre Bevande, 1470 W, 1.2 Litri, Nero"
            rating={4}
            price="69.89"
            quantity="1"
          />
        </div>
        <div className="home__element">
          <Product
            id="2"
            image="https://m.media-amazon.com/images/I/81mEyL0rLQS._AC_SX679_.jpg"
            title="2020 Apple Mac mini con Chip Apple M1 (8GB RAM, 256GB SSD)"
            rating={5}
            price="699.00"
            quantity="1"
          />
        </div>
        <div className="home__element">
          <Product
            id="6"
            image="https://m.media-amazon.com/images/I/51PNkygUOHL._AC_SX679_.jpg"
            title='Microsoft Surface Pro 7 Laptop (Windows 10, touchscreen da 12,3 ", Intel Core i5, 8 GB di RAM, SSD da 128 GBGB), Argento (Platinum)'
            rating={5}
            price="849.00"
            quantity="1"
          />
        </div>

        <div className="home__element">
          <Product
            id="3"
            image="https://m.media-amazon.com/images/I/51JbsHSktkL._AC_SX679_.jpg"
            title="Bose QuietComfort 45 Bluetooth wireless Headphones con riduzione del rumore con microfono per chiamate, nero, Taglia unica"
            rating={5}
            price="279.20"
            quantity="1"
          />
        </div>
        <div className="home__element">
          <Product
            id="4"
            image="https://m.media-amazon.com/images/I/8191HlZ4-6L._AC_SY879_.jpg"
            title="Amazon Basics - Kettlebell in ghisa"
            rating={4}
            price="20.54"
            quantity="1"
          />
        </div>
        <div className="home__element">
          <Product
            id="5"
            image="https://images-na.ssl-images-amazon.com/images/I/41r2OmyhA+L._SX324_BO1,204,203,200_.jpg"
            title="Thinking, fast and slow: Daniel Kahneman"
            rating={5}
            price="12.50"
            quantity="1"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
