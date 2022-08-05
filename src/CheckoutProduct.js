import React from "react";
import "./CheckoutProduct.css";
import { useDispatch } from "react-redux";

function CheckoutProduct(props) {
  const dispatch = useDispatch();
  const removeItem = (idToDelete) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: idToDelete,
    });
  };
  const changeQnt = (id, event) => {
    dispatch({
      type: "CHANGE_QUANTITY",
      id: id,
      quantity: event.target.value,
    });
  };
  return (
    <div key={props.id}>
      <div className="checkoutproduct__container">
        <img src={props.image} className="checkoutproduct__image" alt=""></img>
        <div className="checkoutproduct__description">
          <div className="checkoutproduct__descriptionTitle">{props.title}</div>
          <div className="checkoutproduct__descriptionRating">
            {Array(props.rating)
              .fill()
              .map((item) => "⭐")}
          </div>
          <div className="checkoutproduct__modifiers">
            <select
              className="checkoutproduct__modifiersSelectquant"
              onChange={(event) => changeQnt(props.id, event)}
              value={props.quantity}
            >
              {Array(Math.max(20, parseInt(props.quantity) + 10))
                .fill()
                .map((item, index) => (
                  <option value={index + 1}>{index + 1}</option>
                ))}
            </select>
            <hr />
            <button
              className="checkoutproduct__modifiersRemove"
              onClick={() => removeItem(props.id)}
            >
              Rimuovi
            </button>
          </div>
        </div>
        <div className="checkoutproduct__price">
          €{Number(props.price * props.quantity).toFixed(2)}
        </div>
      </div>
      <hr />
    </div>
  );
}

export default CheckoutProduct;
