import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "./firebase";

function Header() {
  const cartElements = useSelector((state) =>
    state.cart.reduce((sum, item) => sum + parseInt(item.quantity), 0)
  );
  const user = useSelector((state) => state.user);
  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          className="header__logo"
          alt=""
        ></img>
      </Link>
      <div className="header__search">
        <select className="header__searchCategory">
          <option>Tutte le categorie</option>
        </select>
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__navbar">
        <Link className="header__accountLink" to="/login">
          <div onClick={handleAuth} className="header__account">
            <span className="header__accountFirstLine">
              Ciao {user ? user.email.split("@")[0] : "ospite"}
            </span>
            <span className="header__accountSecondLine">
              {user ? "Disconnettiti" : "Accedi"}
            </span>
          </div>
        </Link>
        <Link className="header__ordersLink" to={user ? "/orders" : "/login"}>
          <div className="header__orders">
            <span className="header__ordersFirstLine">Resi e</span>
            <span className="header__ordersSecondLine">Ordini</span>
          </div>
        </Link>
        <Link className="header__cartLink" to="/checkout">
          <div className="header__cart">
            <span className="header__cartCounter">{cartElements}</span>
            <ShoppingCartIcon className="header__cartIcon" />
          </div>
          <span className="header__cartSpan">Carrello</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
