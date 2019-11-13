import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

// NGRX
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.action';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage$: Observable<string>;

  displayCode: boolean;

  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  // unsubscribe from store
  componentActive = true;

  constructor(
    private productService: ProductService,
    private store: Store<fromProduct.State>
  ) { }

  ngOnInit(): void {
    // TODO: unsubscribe
    this.store
      .pipe(select(fromProduct.getCurrentProduct),
        takeWhile(() => this.componentActive))
      .subscribe(currentProduct => (this.selectedProduct = currentProduct));

    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));

    this.store.dispatch(new productActions.Load());

    // this.store.pipe(select(fromProduct.getProducts)).subscribe(
    //   (products: Product[]) => (this.products = products)
    // );

    this.products$ = this.store.pipe(select(fromProduct.getProducts));

    // TODO: unsubscribe
    this.store
      .pipe(select(fromProduct.getShowProductCode),
        takeWhile(() => this.componentActive))
      .subscribe(showProductCode => {
        this.displayCode = showProductCode;
      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
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
}
