import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        const valid = passwordRegex.test(control.value);
        return valid ? null : { invalidPassword: { value: control.value } };
    };
}

export function confirmPasswordValidator(passwordControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const passwordValue = passwordControl ? passwordControl.value : null;
        const valid = passwordValue === control.value;
        return valid ? null : { invalidConfirmPassword: { value: control.value } };
    };
}

export function usernameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const validUsername = /^[a-zA-Z0-9_]{5,20}$/.test(control.value);
        return validUsername ? null : { invalidUsername: { value: control.value } };
    };
}

export function phoneValidator(): ValidatorFn {
    const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        return PHONE_REGEX.test(value) ? null : { phone: true };
    };
}