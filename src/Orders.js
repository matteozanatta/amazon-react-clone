import React, { useEffect, useState } from "react";
import "./Orders.css";
import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";
import { useSelector } from "react-redux";
import OrderProduct from "./OrderProduct";
import { useNavigate } from "react-router-dom";

function Orders() {
  const user = useSelector((state) => state.user);
  const [docArr, setDocArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      const getData = async () => {
        setLoading(true);
        await getDocs(collection(db, "users/" + user.email + "/orders")).then(
          (coll) => {
            setDocArr(coll.docs);
          }
        );

        setLoading(false);
      };
      getData();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <div className="orders">
        <div className="orders__container">
          <div className="orders__title">
            <h2>I miei ordini</h2>
          </div>
          <hr />
          <div className="orders__order">
            {loading === true ? (
              <div className="loading"></div>
            ) : (
              <div>
                {docArr.length > 0 ? (
                  docArr.map((order) => (
                    <div key={docArr.indexOf(order)}>
                      <OrderProduct data={order.data()} />
                    </div>
                  ))
                ) : (
                  <div className="orders__noorder">
                    <p>Non hai ancora effettuato alcun ordine</p>
                    <p>
                      Ritorna alla home page, aggiungi articoli al carrello ed
                      effettua il checkout per poter correttamente visualizzare
                      il tuo primo ordine!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
