import { lib } from "./app/lib.js";

let account={};

lib.data.readAccount('00003',(statusCode,data)=>{
    if(statusCode==200 && data) {
        account={...data};
        console.log(account);
    } else {
        console.log('Error: ',statusCode,data)
    }
});