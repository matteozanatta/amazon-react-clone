import React, { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { db } from "./firebase.js";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

function CompleteOrder() {
  const [cart, user, secret] = useSelector((state) => [
    state.cart,
    state.user,
    state.secret,
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const paymentIntent = url.get("payment_intent");
    const paymentIntentClientSecret = url.get("payment_intent_client_secret");

    const process = async () => {
      const docRef = doc(
        db,
        "users/" + user.email + "/orders/" + paymentIntent
      );
      await setDoc(docRef, {
        id: v4(),
        time: serverTimestamp(),
        cart: cart,
        totalValue: Number(
          cart.reduce((sum, item) => sum + item.quantity * item.price, 0)
        ).toFixed(2),
      });
      batch(() => {
        dispatch({ type: "REMOVE_SECRET" });
        dispatch({ type: "RESET_CART" });
      });
    };

    if (
      cart.length > 0 &&
      user != null &&
      paymentIntentClientSecret === secret
    ) {
      process();
    }

    navigate("/");
  }, []);

  return <div></div>;
}

export default CompleteOrder;
