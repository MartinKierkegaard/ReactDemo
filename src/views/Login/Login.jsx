import React,{ Component } from "react";
import { Input , Button} from 'antd';
import {login as LoginApi} from "../../util/ApiUtils";
import { ACCESS_TOKEN } from "../../constants";

class Login extends Component{
    constructor(props){
        super(props);

        //function som jeg skal bruge i denne side skal bindes her i konstruktor
        this.login = this.login.bind(this);


        //put local variables/attributes here 
    this.state = {
          center : undefined,
          username : undefined,
          password : undefined
        }
    }

     //login function
    login(){
        console.log("in the login function")


        const json = {center : this.state.center,
                      username : this.state.username,
                      password : this.state.password
                    };

        console.log("json login" + JSON.stringify(json));

       LoginApi(json)
       .then(
           response => {
               console.log("Token :"+ response.accessToken);
               localStorage.setItem(ACCESS_TOKEN, response.accessToken)
           })
        .catch(error => console.log(error));           

    }

render (){
    return (
        <div>
            <h1>Login</h1>

            <Input type="text" id = "center" placeholder="Center" 
            onChange={event => 
            this.setState({
                center : event.target.value
            })} />
            <br/>
            <Input type="text" id = "username" placeholder="Username"onChange={event => 
            this.setState({
                username : event.target.value
            })} />
            <br/>
            <Input type="text" id = "password" placeholder = "Password"onChange={event => 
            this.setState({
                password : event.target.value
            })} />
            <br/>
            <Button onClick={this.login }>Login </Button>

        
        </div>
    );
}

}

export default Login;