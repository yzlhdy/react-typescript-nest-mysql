import Http from '../http';

const http = new Http()

export interface CategoryListData {
  pageIndex: number;
  pageSize: number;
}
export interface Products {

  pageIndex: number;
  pageSize: number;
}

export interface Logins {
  username: string;
  password: string;
}

export const reqLogin = (url: "/user/login", params: Logins) => {
  // console.log(options);

  return http.post(url, params)

}
export const categoryList = (url = '/commodity/list', params: CategoryListData) => http.post(url, params)
export const queryProduct = (url = "/product/list", params: Products) => http.post(url, params)