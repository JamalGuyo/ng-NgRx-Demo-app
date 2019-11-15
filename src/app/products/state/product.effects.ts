import { Injectable } from '@angular/core';
import { ProductService } from '../product.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as productActions from './product.action';
import * as fromProduct from './product.reducer';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private productService: ProductService) { }

    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap((action: productActions.Load) => this.productService.getProducts().pipe(
            map((products: Product[]) => (new productActions.LoadSuccess(products))),
            catchError(err => of(new productActions.LoadFail(err)))
        ))
    );

    @Effect()
    updateProduct$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.UpdateProduct),
        map((action: productActions.UpdateProduct) => action.payload),
        mergeMap((product: Product) => this.productService.updateProduct(product).pipe(
            map(updatedProduct => (new productActions.UpdateProductSuccess(updatedProduct))),
            catchError(err => of(new productActions.UpdateProductFail(err)))
        ))
    );

    @Effect()
    createProduct$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.CreateProduct),
        map((action: productActions.CreateProduct) => action.payload),
        mergeMap((product: Product) => this.productService.createProduct(product).pipe(
            map(newProduct => (new productActions.CreateProductSuccess(newProduct))),
            catchError(error => of(new productActions.CreateProductFail(error)))
        ))
    );

    @Effect()
    deleteProduct$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.DeleteProduct),
        map((action: productActions.DeleteProduct) => action.payload),
        mergeMap((productId: number) => this.productService.deleteProduct(productId).pipe(
            map(() => (new productActions.DeleteProductSuccess(productId))),
            catchError(err => of(new productActions.DeleteProductFail(err)))
        ))
    );
}