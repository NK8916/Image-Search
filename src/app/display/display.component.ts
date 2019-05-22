import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from "@angular/platform-browser";
import { Router ,NavigationExtras} from '@angular/router';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
data;
url = 'http://localhost:3000';
imagePath;
  constructor(private http: HttpClient,private route: ActivatedRoute,private sanitization:DomSanitizer) { 
    this.route.queryParams.subscribe(params => {
      console.log("Data at display")
      var data=JSON.parse(params['data'])
      

        // this.imagePath = this.sanitization.bypassSecurityTrustUrl(`${this.url}/${data['path'][0]}`);
       
  console.log(data.path[0])
this.imagePath=data.path[0]
  // this.http.post(`${this.url}/file`,data).subscribe(
  //   (data:any)=>{
  //     console.log("At Display")
  //     console.log("Data at Display",data)
  //     // var value=JSON.stringify(data)
  //     // console.log(value)
      
  //   }, (err) => {
  //     console.log(err);
      
  // });  
  });
  }

  ngOnInit() {
    
  }

  fun(){
    console.log(this.imagePath)
    // this.imagePath='../images/'+(JSON.parse(this.data)['path'][0])
    // console.log(this.imagePath)
  }
 
  
}
