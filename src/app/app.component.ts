import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  projectForm: FormGroup;
  project: any;
  

  ngOnInit() {
    this.projectForm = new FormGroup({
      pjName: new FormControl(null, [Validators.required, this.validNames.bind(this)], this.forbiddenNames),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl("finished", Validators.required),
    });
  }

  onSubmit(){
    this.project = this.projectForm.value
    this.projectForm.reset()
    console.log("this is PROJECT", this.project);
    
  }

  validNames(control: FormControl): {[s: string]: boolean}{
    if(control.value === 'Test'){
      return {'nameIsForbidden': true}
    }
  return null
}

  forbiddenNames(control: FormControl):Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject)=>{
      setTimeout(()=>{
        if(control.value === 'Test'){
          resolve({wrongName: true})
        } else {
          resolve(null)
        }
      },1500)
    })
    return promise
  }
}
