import { ProductActions, ProductActionTypes } from './product.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../product';
import * as fromRoot from '../../state/app.state';

// strong typing
export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

// initial state
const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};

// selectors
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

// reducer
export function reducer(
  state = initialState,
  action: ProductActions
): ProductState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };
    default:
      return state;
  }
}
