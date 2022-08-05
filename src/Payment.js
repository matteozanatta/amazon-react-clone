import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useDispatch, useSelector } from "react-redux";
import PaymentProduct from "./PaymentProduct.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm.js";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51LRfe1D25nTGHUiPG1YHwJoeGE8455rKWaqhIeWjFJIReOyBqOOIBsTcu2TKDgcduUUw0rhgQkiMwbjwQbTOtCRz004tzHZGDs"
);

function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const [cart, user] = useSelector((state) => [state.cart, state.user]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (user !== null && cart.length > 0) {
      fetch("http://localhost:3001/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
          dispatch({ type: "SECRET_CHECK", elem: data.clientSecret });
        });
    } else {
      navigate("/");
    }
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const totalCart = cart.reduce(
    (sum, item) =>
      (parseFloat(sum) + parseFloat(item.price * item.quantity)).toFixed(2),
    0
  );
  const totalQuant = cart.reduce(
    (sum, item) => parseInt(sum) + parseInt(item.quantity),
    0
  );

  return (
    <div className="payment">
      <div className="payment__title">
        <h2>
          Riepilogo ordine ({totalQuant}{" "}
          {totalQuant !== 1 ? "articoli" : "articolo"})
        </h2>
      </div>
      <div className="payment__container">
        <div className="payment__address">
          <div className="payment__addressLeft">
            <h3>1</h3>
            <h3>Indirizzo di consegna</h3>
          </div>
          <div className="payment__addressRight">
            <p>{user && user.email}</p>
            <p>Name Surname</p>
            <p>Address</p>
            <p>City, ZIP code</p>
          </div>
        </div>
        <hr />
        <div className="payment__sumup">
          <div className="payment__sumupTitle">
            <h3>2</h3>
            <h3>Riepilogo degli articoli</h3>
          </div>
          <div className="payment__sumupProducts">
            {cart.map((item) => (
              <div key={item.id}>
                <PaymentProduct
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  rating={item.rating}
                  price={item.price}
                  quantity={item.quantity}
                />
              </div>
            ))}
          </div>
          <div className="payment__sumupPrice">
            <p>
              Totale ({totalQuant} {cart.length !== 1 ? "articoli" : "articolo"}
              ):
            </p>
            <span className="payment__sumupPriceTotal">
              <b>€{totalCart}</b>
            </span>
          </div>
          <hr />
        </div>
        {cart.length > 0 && (
          <div className="payment__mode">
            <div className="payment__modeTitle">
              <h3>3</h3>
              <h3>Seleziona la modalità di pagamento</h3>
            </div>
            <div className="payment__modeCard">
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
