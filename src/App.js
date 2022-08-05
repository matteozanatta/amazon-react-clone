import "./App.css";
import React, { useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import CompleteOrder from "./CompleteOrder";
import Orders from "./Orders";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="app">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Routes>
        <Route path="/checkout" element={[<Header />, <Checkout />]} />
        <Route path="/payment" element={[<Header />, <Payment />]} />
        <Route path="/complete-order" element={<CompleteOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={[<Header />, <Orders />]} />
        <Route path="/" element={[<Header />, <Home />]} />
      </Routes>
    </div>
  );
}

export default App;
