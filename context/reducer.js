export const initialState = {
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
};
export const AppReducer = (state, action) => {
  switch (action.type) {
    case "init_stored": {
      return action.value;
    }
    case "incQty": {
      return {
        ...state,
        qty: state.qty + 1,
      };
    }
    case "decQty": {
      return {
        ...state,
        qty: state.qty - 1,
      };
    }
    case "setQty": {
      return {
        ...state,
        qty: action.value,
      };
    }
    case "setshowCart": {
      return {
        ...state,
        showCart: action.value,
      };
    }
    case "addToCart": {
      const { product, qty: quantity } = action.value;
      const { cartItems } = state;
      let exists = cartItems.find((item) => item._id === product._id);
      return {
        ...state,
        cartItems: exists
          ? state.cartItems.map((cartProduct) => {
              if (cartProduct._id === product._id) {
                return {
                  ...cartProduct,
                  quantity: cartProduct.quantity + quantity,
                };
              } else {
                return cartProduct;
              }
            })
          : [...state.cartItems, { ...product, quantity }],
        totalPrice: state.totalPrice + product.price * quantity,
        totalQuantities: state.totalQuantities + quantity,
      };
    }
    case "toggleCartItemQuantity": {
      const { id, value } = action.value;
      const { cartItems } = state;
      const foundProduct = cartItems.find((item) => item._id === id);
      let v = 0;
      let addPrice = 0;
      let addQty = 0;
      if (value === "+") {
        addPrice = foundProduct.price;
        addQty = 1;
        v += 1;
      } else if (value === "-") {
        if (foundProduct.quantity > 1) {
          addPrice -= foundProduct.price;
          addQty -= 1;
          v -= 1;
        }
      }
      return {
        ...state,
        cartItems: cartItems.map((item) => {
          if (item._id === id) {
            return {
              ...item,
              quantity: item.quantity + v,
            };
          } else return item;
        }),
        totalPrice: state.totalPrice + addPrice,
        totalQuantities: state.totalQuantities + addQty,
      };
    }
    case "removeItemFromCartItems": {
      const { id } = action.value;
      const { cartItems } = state;
      const foundProduct = cartItems.find((item) => item._id === id);
      return {
        ...state,
        cartItems: cartItems.filter((item) => item._id !== id),
        totalPrice:
          state.totalPrice - foundProduct.price * foundProduct.quantity,
        totalQuantities: state.totalQuantities - foundProduct.quantity,
      };
    }
    case "reload": {
      return {
        ...state,
        cartItems: [],
        totalPrice: 0,
        totalQuantities: 0,
      };
    }
  }
};
