import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./Login.css";

function Login() {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingReg, setLoadingReg] = useState(false);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
    setLoading(false);
  };

  const register = async (e) => {
    e.preventDefault();
    setLoadingReg(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
    setLoadingReg(false);
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"
          alt=""
          className="login__logo"
        ></img>
      </Link>
      <div className="login__container">
        <h2>Accedi o Registrati</h2>
        <p>
          <b>Indirizzo e-mail</b>
        </p>
        <input
          type="text"
          name="email"
          onChange={(event) => setMail(event.target.value)}
        ></input>
        <p>
          <b>Password</b>
        </p>
        <input
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type="submit" onClick={login} className="login__button">
          {loading ? <div className="spinner"></div> : "Continua"}
        </button>
        <p>
          Accedendo al tuo account dichiari di aver letto e accetti le nostre
          Condizioni generali di uso e vendita. Prendi visione della nostra
          Informativa sulla privacy, della nostra Informativa sui Cookie e della
          nostra Informativa sulla Pubblicità definita in base agli interessi.
        </p>
      </div>
      <div className="login__register">
        <p>Sei nuovo su Amazon?</p>
        <button onClick={register}>
          {loadingReg ? (
            <div className="spinner"></div>
          ) : (
            "Crea il tuo account Amazon"
          )}
        </button>
      </div>
    </div>
  );
}

export default Login;
