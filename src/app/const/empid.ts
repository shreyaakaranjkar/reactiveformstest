import { AbstractControl, ValidationErrors } from "@angular/forms";

export class EmpIdvalidator{
    static isEmpIdValid(control : AbstractControl) : ValidationErrors | null{
        let val = control.value as string;

        if(!val){
            return null
        }
        let regexp = /^[E]\d{3}/;

        let isvalid = regexp.test(val);

        if(isvalid){
            return null
        }
        else{
            return{
                invalidempid : 'Emp Id must start with E followed by 3 digits'
            }
        }
    }
}