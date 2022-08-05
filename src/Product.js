import React from "react";
import "./Product.css";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function Product(props) {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: props.id,
        image: props.image,
        title: props.title,
        rating: props.rating,
        price: props.price,
        quantity: props.quantity,
      },
    });
    toast.success("Articolo aggiunto al carrello", {
      style: {
        border: "1px solid orange",
        borderRadius: "0px",
        position: "relative",
        top: "50px",
      },
      iconTheme: {
        primary: "rgb(255, 208, 0)",
        secondary: "black",
      },
    });
  };
  return (
    <div className="product">
      <img src={props.image} className="product__image" alt=""></img>
      <div className="product__description">
        <div className="product__descriptionTitle">{props.title}</div>
        <div className="product__descriptionRating">
          {Array(props.rating)
            .fill()
            .map((item) => "⭐")}
        </div>
        <div className="product__descriptionPrice">€{props.price}</div>
      </div>
      <div className="product__addbasket">
        <button onClick={addToCart}>
          <span>Aggiungi al carrello</span>
        </button>
      </div>
    </div>
  );
}

export default Product;
