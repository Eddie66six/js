//time
let regex_time_without_mask = /([0-2]{1}[0-4]{1})([0-6]{1}[0-9]{1}){2}/g;
let regex_time_with_mask = /([0-2]{1}[0-4]{1}\:)([0-6]{1}[0-9]\:)([0-6]{1}[0-9]{1})/g;

let strWithoutMask = '246060';
let strWithMask = '20:60:60';

let _without = regex_time_without_mask.test(strWithoutMask);
console.log('without mask', _without);
let _with = regex_time_with_mask.test(strWithMask);
console.log('with mask', _with);

if(_without){
    console.log(strWithoutMask.replace(/(\d{2})(?=\d)/g, '$1:'));
}
console.log(validateTimeWithoutMask(strWithoutMask));

function validateTimeWithoutMask(str){
    let index = 0;
    let newStr = str.replace(/(\d{2})/g, (el)=>{
        if(index == 0 && parseInt(el) > 24){
            el = "24";
        }
        else if(parseInt(el) > 60){
            el = "60";
        }
        index++;
        return el + (index < 3 ? ':' : '');
    });
    return newStr;
}