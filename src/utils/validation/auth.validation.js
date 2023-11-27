import passwordValidator from "password-validator";
import isEmail from 'validator/lib/isEmail';

var schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(60)                                  // Maximum length 60
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']);

const generateJSON = (message,valid)=>{
    return {
        message,
        valid
    }
}

/**
 * 
 * @param {*} password "string" 
 * @returns "error message"
 * @author "ankush shenoy"
 */

const isValidPassword = (password)=>{
    if(typeof(password) === "string"){
        const results = schema.validate(password,{details:true});
        if(results.length === 0){
            return generateJSON("",true)
        }else
            return generateJSON(results[0].message,false)
    }else{
        return generateJSON("not valid password format",false)
    }
    
}

const isValidFullname = (fullname)=>{
    if(!fullname){
        return generateJSON("fullname cannot be empty",false)
    }else{
        return generateJSON("",true)
    }
}


const isValidEmail = (email)=>{
    if(typeof(email) === "string"){
        const results = isEmail(email);
        if(!results){
            return generateJSON("Email is not valid",false); 
        }else{
            return generateJSON("",true);
        }
    }else{
        return "not valid email format"
    }
}

export {isValidPassword,isValidEmail,isValidFullname}