/* selectors */
export const getCart = ({cart}) => cart.products;

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_PRODUCT = createActionName('ADD_PRODUCT');
const REMOVE_PRODUCT = createActionName('REMOVE_PRODUCT');
const CHANGE_QUANTITY = createActionName('CHANGE_QUANTITY');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addToCart = payload => ({ payload, type: ADD_PRODUCT });
export const removeFromCart = payload => ({ payload, type: REMOVE_PRODUCT });
export const handleQuantity = (quantity, _id) => ({ quantity, _id, type: CHANGE_QUANTITY });

/* thunk creators */
export const fetchCart = () => {
  return (dispatch) => {
    const storage = JSON.parse(localStorage.getItem('cart'));
    dispatch(fetchSuccess(storage));
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }

    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        products: action.payload,
      };
    }

    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }

    case ADD_PRODUCT: {
      const product = action.payload;
      let received = JSON.parse(localStorage.getItem('cart'));
      let newStatePart = statePart.products || [];

      if (!received || received.length === 0) {
        received = [];
        received.push(product);
        localStorage.setItem('cart', JSON.stringify(received));
        newStatePart.push(product);
      }
      else if (received != null && received.length >= 1) {
        const isInLocalStorage = received.some(item => item._id === product._id);

        if (isInLocalStorage) {
          const toEdit = received.filter(item => item._id === product._id);
          toEdit[0].quantity += product.quantity;
          let toStay = received.filter(item => item._id !== product._id);
          toStay.push(toEdit[0]);
          localStorage.setItem('cart', JSON.stringify(toStay));

          newStatePart.map(item => {
            if (item._id === product._id) {
              item.quantity += product.quantity;
            }
            return newStatePart;
          });
        }
        else if (!isInLocalStorage) {
          received.push(product);
          localStorage.setItem('cart', JSON.stringify(received));
          newStatePart.push(product);
        }
      }
      return {
        ...statePart,
        products: newStatePart,
      };
    }

    case REMOVE_PRODUCT: {
      let received = JSON.parse(localStorage.getItem('cart'));
      let toStay = received.filter(item => item._id !== action.payload._id);
      localStorage.setItem('cart', JSON.stringify(toStay));
      return {
        ...statePart,
        products: statePart.products.filter(product => product._id !== action.payload._id),
      };
    }

    case CHANGE_QUANTITY: {
      const quantity = action.quantity;
      const _id = action._id;

      statePart.products.map(item => {
        if (item._id === _id) {
          item.quantity += quantity;
        }
        return statePart;
      });

      let received = JSON.parse(localStorage.getItem('cart'));
      const toEdit = received.filter(item => item._id === _id);
      toEdit[0].quantity += quantity;
      let toStay = received.filter(item => item._id !== _id);
      toStay.push(toEdit[0]);
      localStorage.setItem('cart', JSON.stringify(toStay));

      return {
        ...statePart,
      };
    }

    default:
      return statePart;
  }
};
