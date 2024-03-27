import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from './const/allvalidation';
import { NoSpaceValidation } from './const/nospace';
import { EmpIdvalidator } from './const/empid';
import { Icountry } from './model/coutny';
import { COUNTRIES_META_DATA } from './const/countries';
import { AsyncValidator } from './const/isEmail';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'reactiveformstest';
 
  signupform! : FormGroup;
  genders : Array<string>=['Male','Female','Others'];
  countriesArr! : Array<Icountry>;

  ngOnInit(): void {
    this.createform()
    this.countriesArr = COUNTRIES_META_DATA;
    this.checkAddress()
    this.checkPermAdd()
    this.checkPassword()
    this.checkconfirmpass()
  }

  
 createform(){
  this.signupform = new FormGroup({
    username : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.onlyText),
    Validators.minLength(4),Validators.maxLength(6), NoSpaceValidation.noSpace]),
    email : new FormControl(null, [Validators.required,Validators.pattern(CustomRegex.email)],
    [AsyncValidator.isEmailAvailable]),
    empId : new FormControl(null,[Validators.required,EmpIdvalidator.isEmpIdValid]),
    gender : new FormControl(null),
    skills : new FormArray([new FormControl(null)]),
    currentAddress : new FormGroup({
      country : new FormControl(null),
      state : new FormControl(null),
      city : new FormControl(null),
      zipcode : new FormControl(null)
    }),
    permanentAddress : new FormGroup({
      country : new FormControl(null),
      state : new FormControl(null),
      city : new FormControl(null),
      zipcode : new FormControl(null)
    }),
  isAddSame : new FormControl({value : null, disabled : true}),
  password : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.password)]),
  confirmPassword : new FormControl({value : null, disabled:true},Validators.required)
  })
 }

 checkAddress(){
  this.f['currentAddress'].valueChanges
  .subscribe(res => {
    console.log(res);
    if(this.f['currentAddress'].valid){
      this.f['isAddSame'].enable()
    }
    else{
      this.f['isAddSame'].disable()
      this.f['permanentAddress'].patchValue(false)
    }
  })
}

checkPermAdd(){
  this.f['isAddSame'].valueChanges
  .subscribe(res => {
    console.log(res)
    if(res){
      this.f['permanentAddress'].patchValue(this.f['currentAddress'].value)
      this.f['permanentAddress'].disable()
    }
    else{
      this.f['permanentAddress'].reset();
      this.f['permanentAddress'].enable()
    }
  })
}

checkPassword(){
  this.f['password'].valueChanges
  .subscribe(res => {
    console.log(res);
    console.log(this.f['password'].valid);
    if(this.f['password'].valid){
      this.f['confirmPassword'].enable()
    }
    else{
      this.f['confirmPassword'].disable()
    }
  })
}

checkconfirmpass(){
  this.f['confirmPassword'].valueChanges
  .subscribe(res => {
    if(res !== this.f['password'].value){
      this.f['confirmPassword'].setErrors({passwordandconfirm : 'Password and Confirm Password dont match!'})
    }
    else{
      this.f['confirmPassword'].disable()
    }
  })
}

get skillsArr(){
  return this.signupform.get('skills') as FormArray
}
onRemoveSkill(i:number){
  this.skillsArr.removeAt(i)
}
 onSubmit(){
  console.log(this.signupform);
  console.log(this.signupform.value);
 }

 addSkill(){
  let newskill = new FormControl(null);
  this.skillsArr.push(newskill)
 }
 get getusername(){
  return this.signupform.get('username') as FormControl
 }
 get f(){
  return this.signupform.controls
 }
}
