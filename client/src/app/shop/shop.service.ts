import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/'

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    let brandId = shopParams.brandId;
    let typeId = shopParams.typeId;
    let sort = shopParams.sort;

    if(brandId !== 0) {
      params = params.append('brandId', brandId.toString()); // query string key being passed
    }

    if(typeId !== 0) {
      params = params.append('typeId', typeId.toString());
    }

    if(shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('PageSize', shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params })
      .pipe(
        map(resposne => {
          return resposne.body;
        })
      );
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}