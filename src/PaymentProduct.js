import React from "react";
import "./PaymentProduct.css";

function PaymentProduct(props) {
  return (
    <div key={props.id}>
      <div className="paymentproduct__container">
        <img src={props.image} className="paymentproduct__image" alt=""></img>
        <div className="paymentproduct__description">
          <div className="paymentproduct__descriptionTitle">{props.title}</div>
          <div className="paymentproduct__descriptionRating">
            {Array(props.rating)
              .fill()
              .map((item) => "⭐")}
          </div>
          <div className="paymentproduct__modifiers">
            <p>Quantità:</p>
            {props.quantity}
          </div>
        </div>
        <div className="paymentproduct__price">
          €{Number(props.price * props.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default PaymentProduct;
