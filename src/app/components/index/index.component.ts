import { Component, OnInit } from '@angular/core';
import {HttpCommonService} from '../../services/http-common.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  ceshi: any;
  constructor(private http: HttpClient , private httpService: HttpCommonService) {
    // this.httpService.get('/hello', {name: '789456123'}).subscribe(data => {
    //   console.log(data);
    //   this.ceshi = data;
    // });
  }

  ngOnInit() {
  }

}
