import { ProductActions, ProductActionTypes } from './product.action';
import { Product } from '../product';

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

// initial state
const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
};

// reducer
export function reducer(
  state = initialState,
  action: ProductActions
): ProductState {
  switch (action.type) {
    // TOGGLE PRODUCT CODE
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };
    // SELECT A PRODUCT FROM STORE TO EDIT OR DELETE
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProductId: action.payload.id
      };
    // INITIALIZE A FORM TO CREATE NEW PRODUCT
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null
      };
    // LOAD PRODUCTS FROME EXTERNAL SOURCE
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: ''
      };
    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        error: action.payload
      };
    // UPDATE PRODUCT IN THE STORE
    case ProductActionTypes.UpdateProductSuccess:
      const updatedProducts = state.products.map(
        item => action.payload.id === item.id ? action.payload : item
      );
      return {
        ...state, products: updatedProducts,
        currentProductId: action.payload.id,
        error: ''
      };
    case ProductActionTypes.UpdateProductFail:
      return { ...state, error: action.payload };

    // CREATE PRODUCT SUCCESS OR FAIL
    case ProductActionTypes.CreateProductSuccess:
      return {
        ...state,
        products: [...state.products, action.payload],
        currentProductId: action.payload.id,
        error: ''
      };
    case ProductActionTypes.CreateProductFail:
      return {
        ...state,
        error: action.payload
      };
    // DELETE PRODUCT SUCCESS OR FAIL
    case ProductActionTypes.DeleteProductSuccess:
      return {
        ...state,
        products: [...state.products.filter(product => product.id !== action.payload)],
        currentProductId: null,
        error: ''
      };
    case ProductActionTypes.DeleteProductFail:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
