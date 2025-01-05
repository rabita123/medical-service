import {
  CART_ADD_ITEM,
  CART_ADD_MEDCINE_ITEM,
  CART_REMOVE_ITEM,
  CART_REMOVE_MEDICINE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,

  // CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

export const cartMedicineReducer = (
  state = { cartNursingItems: [] },
  action
) => {
  switch (action.type) {
    case CART_ADD_MEDCINE_ITEM:
      const item = action.payload;

      const existItem = state.cartNursingItems.find(
        (x) => x.medicine === item.medicine
      );

      if (existItem) {
        return {
          ...state,
          cartNursingItems: state.cartNursingItems.map((x) =>
            x.medicine === existItem.medicine ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartNursingItems: [...state.cartNursingItems, item],
        };
      }

    case CART_REMOVE_MEDICINE_ITEM:
      return {
        ...state,
        cartNursingItems: state.cartNursingItems.filter(
          (x) => x.medicine !== action.payload
        ),
      };

    default:
      return state;
  }
};
