import { API_BASE_URL, ACCESS_TOKEN} from "../constants"

const request = options => {
    const headers = new Headers({
        "Content-Type":"application/json"
    });

    if(localStorage.getItem(ACCESS_TOKEN)){
        headers.append(
            "Authorization",
            "Bearer " + localStorage.getItem(ACCESS_TOKEN)
        );
    }

    const defaults = {headers:headers};
    options = Object.assign({},defaults,options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(
            json => {
                if(!response.ok){
                    return Promise.reject(json);
                }
                
                return json;
            }) 
            )
    .catch(error => {
        console.log("I cAtch i apiUtils: " + error)
        return Promise.reject(error);

    });
}


export function login(loginRequest){

    console.log("In login function in ApiUtils")
    console.log(API_BASE_URL+"/auth/signin");

    return request ({
        url: API_BASE_URL+"/auth/signin",
        method: "POST",
        body:JSON.stringify(loginRequest)
    })
}

export function getUserList(){
    return request ({
        url : API_BASE_URL + "/users/getUserList",
        method : "GET"
    })
}