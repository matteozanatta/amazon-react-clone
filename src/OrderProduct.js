import React from "react";
import PaymentProduct from "./PaymentProduct";
import "./OrderProduct.css";

function OrderProduct(props) {
  console.log(props);
  const data = props.data;
  const time = data.time.toDate();
  const [minutes, hours, day, month, year] = [
    time.getMinutes(),
    time.getHours(),
    time.getDay(),
    time.getMonth(),
    time.getFullYear(),
  ];

  return (
    <div className="orderproduct">
      <div className="orderproduct__container">
        <div className="orderproduct__title"></div>
        <div className="orderproduct__orderUpper">
          <div className="orderproduct__date">
            <p>ORDINE EFFETTUATO IL:</p>
            <div className="orderproduct__dateValues">
              <p>
                {day < 10 ? "0" + day : day}/{month < 10 ? "0" + month : month}/
                {year}
              </p>
              <p>
                {hours < 10 ? "0" + hours : hours}:
                {minutes < 10 ? "0" + minutes : minutes}
              </p>
            </div>
          </div>
          <div className="orderproduct__total">
            <p>TOTALE</p>
            <p className="orderproduct__totalPrice">
              EUR {data.totalValue.toString()}
            </p>
          </div>
          <div className="orderproduct__id">
            <p>ORDINE #</p>
            <p>{data.id}</p>
          </div>
        </div>
        <div className="orderproduct__orderBottom">
          {data.cart.map((element) => (
            <div key={data.cart.indexOf(element)}>
              <PaymentProduct
                image={element.image}
                title={element.title}
                rating={element.rating}
                quantity={element.quantity}
                price={element.price}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderProduct;
