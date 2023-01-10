import React from "react";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

const CartItem = ({ item }) => {
  const { state, dispatch } = useStateContext();
  const handletoggleCartItemQuantity = (x) => {
    dispatch({
      type: "toggleCartItemQuantity",
      value: { id: item._id, value: x },
    });
  };
  return (
    <div className="product" key={item._id}>
      <img src={urlFor(item?.image[0])} className="cart-product-image" />
      <div className="item-desc">
        <div className="flex top">
          <h5>{item.name}</h5>
          <h4>${item.price} </h4>
        </div>
        <div className="flex bottom">
          <div>
            <p className="quantity-desc">
              <span
                className="minus"
                onClick={() => handletoggleCartItemQuantity("-")}
              >
                <AiOutlineMinus />{" "}
              </span>
              <span className="num" onClick={() => {}}>
                {item.quantity}
              </span>
              <span
                className="plus"
                onClick={() => handletoggleCartItemQuantity("+")}
              >
                <AiOutlinePlus />{" "}
              </span>
            </p>
          </div>
          <button
            type="button"
            className="remove-item"
            onClick={() =>
              dispatch({
                type: "removeItemFromCartItems",
                value: { id: item._id },
              })
            }
          >
            <TiDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
