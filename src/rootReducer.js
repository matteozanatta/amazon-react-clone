const initialState = {
  cart: [],
  user: null,
  secret: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const cpArr = [...state.cart];
      if (cpArr.filter((item) => item.id === action.item.id).length > 0) {
        for (let i = 0; i < cpArr.length; i++) {
          if (cpArr[i].id === action.item.id) {
            cpArr[i].quantity = parseInt(cpArr[i].quantity) + 1;
          }
        }
      } else {
        cpArr.push(action.item);
      }
      return {
        ...state,
        cart: cpArr,
      };
    case "REMOVE_FROM_CART":
      const cpArray = [...state.cart];
      return {
        ...state,
        cart: cpArray.filter((item) => item.id !== action.id),
      };
    case "CHANGE_QUANTITY":
      const cpArray2 = [...state.cart];
      for (let i = 0; i < cpArray2.length; i++) {
        if (cpArray2[i].id === action.id) {
          cpArray2[i].quantity = action.quantity;
        }
      }
      return {
        ...state,
        cart: cpArray2,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "RESET_CART":
      return {
        ...state,
        cart: [],
      };
    case "SECRET_CHECK":
      return {
        ...state,
        secret: action.elem,
      };
    case "REMOVE_SECRET":
      return {
        ...state,
        secret: "",
      };
    default:
      return state;
  }
};

export default rootReducer;
