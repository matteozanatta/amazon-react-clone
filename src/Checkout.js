import React from "react";
import "./Checkout.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
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
    <div className="checkout">
      <div className="checkout__upperbanner">
        <button className="checkout__upperbannerButton">Scopri di più</button>
        <div className="checkout__upperbannerText">
          <b>Metti da parte il budget per i tuoi futuri acquisti </b>
          <span>Amazon Ricarica.</span>
        </div>
        <AccountBalanceWalletIcon />
      </div>
      <div className="checkout__container">
        <div className="checkout__left">
          <div className="checkout__leftLabels">
            {cart.length > 0 ? (
              <h2 className="checkout__leftTitle">Carrello</h2>
            ) : (
              <h2 className="checkout__leftTitle">
                Il tuo carrello Amazon è vuoto.
              </h2>
            )}
            <h5 className="checkout__leftPricelabel">Prezzo</h5>
          </div>
          <hr />
          <div className="checkout__leftItems">
            {cart.map((item) => (
              <div key={item.id}>
                <CheckoutProduct
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
          <div className="checkout__leftSubtotal">
            Totale provvisorio ({totalQuant} articoli): <b>€{totalCart}</b>
          </div>
        </div>
        {cart.length > 0 ? (
          <div className="checkout__right">
            {cart.length > 0 && (
              <div>
                <div>
                  <CheckCircleIcon className="checkout__rightIcon" />
                  <div className="checkout__rightFreeshipment">
                    <span className="checkout__rightFreeshipment__green">
                      <b>Spedizione GRATUITA</b> disponibile per il tuo ordine
                    </span>
                    <span>
                      Selezionare questa opzione al momento della conferma
                      dell’ordine.
                    </span>
                  </div>
                </div>
                <div className="checkout__rightTotal">
                  <p>
                    Totale provvisorio ({totalQuant} articoli):{" "}
                    <b>€{totalCart}</b>
                  </p>
                </div>
                <div
                  onClick={(e) =>
                    user ? navigate("/payment") : navigate("/login")
                  }
                  className="checkout__rightButtonorder"
                >
                  <button>Procedi all'ordine</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
