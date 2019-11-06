import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class HttpCommonService {

  // 请求头
  private headers: HttpHeaders;
  // 本地
  private baseUrl = 'recruitmentSystem/Api';  // URL to web api
  private timeCode = '&t=' + new Date().getTime();  // 时间戳

  constructor(private http: HttpClient , public cookieService: CookieService) {
    // 解决ie缓存页面不刷新问题
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=UTF-8')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache');
  }

  public getBaseUrl(): any {
    return this.baseUrl;
  }

  /**
   * get请求
   */
  get(url: string, params?: any): any {
    this.setHeaders();
    if (params) {
      params = this.encodeParams(params);
    }
    return this.http.get(this.getBaseUrl() + url, {headers: this.headers, params});
    // return this.http.get(this.getBaseUrl() + url, {headers: this.headers, params: params}).timeout(60000);
  }

  /**
   * post请求
   */
  post(url: string, body, type?: string): any {
    this.setHeaders();
    body = JSON.stringify(body);
    // return this.http.post(this.getBaseUrl() + url, body, {headers: this.headers}).timeout(60000);
    return this.http.post(this.getBaseUrl() + url, body, {headers: this.headers});
  }

  /**
   * 将对象类型的参数转换成HttpParams类型
   */
  encodeParams(params: any): HttpParams {
    let str = '';
    Object.keys(params).forEach(key => {
      str += key + '=' + params[key] + '&';
    });
    return new HttpParams({fromString: str.substring(0, str.length - 1)});
  }

  /**
   * 将cookie中的token设置在header请求头里，token每1小时变更一次，所以需要每次请求都去cookie中取一下
   */
  setHeaders() {
    const type = '_userType';
    const userType = JSON.parse(localStorage.getItem('_user')) ? JSON.parse(localStorage.getItem('_user'))[type] : '';
    this.headers = this.headers.set('User-Type', userType ? userType : 'tourist').
    set('Set-Cookie', 'auth-token=' + this.cookieService.get('auth-token'));
  }
}
