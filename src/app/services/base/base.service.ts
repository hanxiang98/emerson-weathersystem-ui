import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export class BaseService {
  protected api = environment.apiUrl; // get apiUrl dynamically from environment component
  
  protected httpHeader?= new HttpHeaders({
    'Content-Type': 'application/json',
    //'Authorization': 'Bearer ' + this.oktaAuth.getAccessToken(),
    'Access-Control-Allow-Origin': '*'
  }); 
  protected headerUpload?= new HttpHeaders({

    //'Content-Type': 'multipart/form-data',    
    // 'Authorization': 'Bearer ' + this.oktaAuth.getAccessToken(),
    
    'Access-Control-Allow-Origin': '*'
  }); 
  

  constructor(){}
  
}
