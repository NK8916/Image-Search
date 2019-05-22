import { Component, OnInit, Input, Injectable, Output, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router ,NavigationExtras} from '@angular/router';

@Injectable({
  providedIn:'root'
})
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  url = 'http://localhost:3000';
searchText='';
// Data=[]
@Output() Data=new EventEmitter<any>();
  constructor(private http: HttpClient,private router:Router) { 
    
  }

  ngOnInit() {
  }

  input(){
    console.log(this.searchText)
    this.http.get(`${this.url}/search/${this.searchText}`).subscribe(
      (data:any)=>{
        console.log("At Home")
        console.log("Data at Home",data)
        var value=JSON.stringify(data)
        // console.log(value)
        let navigationExtras: NavigationExtras = {
          queryParams: {
              "data": value
          }
      };
      console.log(navigationExtras)
        this.router.navigate(['display'],navigationExtras)
      }, (err) => {
        console.log(err);
        
    }
    );
    
    
  }

}
