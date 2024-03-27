import { AbstractControl, ValidationErrors } from "@angular/forms";

export class NoSpaceValidation{
    static noSpace(control : AbstractControl): ValidationErrors | null{
        let val = control.value as string;

        if(!val){
            return null;
        }
        if(val.includes(" ")){
            return {
                noSpaceErr : 'No Space Allowed'
            }
        }
        else{
            return null;
        }
    }
}