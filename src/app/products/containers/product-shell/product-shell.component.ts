import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { Product } from '../../product';
import * as fromProduct from '../../state/product.reducer';
import * as productActions from '../../state/product.action';

@Component({
  templateUrl: './product-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product> | null;
  currentProduct$: Observable<Product>;

  constructor(private store: Store<fromProduct.State>) { }

  ngOnInit() {
    this.store.dispatch(new productActions.Load());
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
    this.currentProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

  deleteProduct(product: Product): void {
    this.store.dispatch(new productActions.DeleteProduct(product.id));
  }

  clearProduct(): void {
    this.store.dispatch(new productActions.ClearCurrentProduct());
  }
  saveProduct(product: Product): void {
    this.store.dispatch(new productActions.CreateProduct(product));
  }

  updateProduct(product: Product): void {
    this.store.dispatch(new productActions.UpdateProduct(product));
  }
}
