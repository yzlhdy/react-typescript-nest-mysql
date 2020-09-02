import http from '../http'
interface LoginProps {
  username: string;
  password: string;
}

export interface ArcionData {
  pageIndex: number;
  pageSize: number;
}
export interface CrateArcion {
  columnId: number;
  name: string;
  description: string;
  time?: string;
  username: string

}
export interface ProductList {
  pageIndex: number;
}

export interface Create {
  name: string;
  time: string | any;
}
export interface UpdateCategory {
  id: number;
  name: string;
  time: string

}
export interface DeleteCategory {
  id: number;

}

export const logins = (Options: LoginProps) => http.post('/user/login', Options)
export const arcionList = (Options: ArcionData) => http.post('/commodity/list', Options)
export const createArcion = (Options: CrateArcion) => http.post('/commodity/create', Options)
export const productList = (Options: ProductList) => http.post('/product/list', Options)
export const categoryList = (Options: ProductList) => http.post('/category/list', Options)
export const createCategory = (Options: Create) => http.post('/category/create', Options)
export const updateCategory = (Options: UpdateCategory) => http.post('/category/update', Options)
export const deleteCategory = (Options: DeleteCategory) => http.post('/category/delete', Options)
