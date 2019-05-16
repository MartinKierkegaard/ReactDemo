import React,{ Component } from "react";

import {getUserList} from "../../util/ApiUtils";

//henter design Table from antd modules som er installeret via npm "npm i antd"
import { Table } from "antd"

class UserList extends Component {
    constructor(props){
        super(props);
        
        this.colums =[
            {
                title:"Username",
                dataIndex : "username",
                key : "username"
            },
            {
                title:"Name",
                dataIndex : "name",
                key : "name"
            },
            {
                title:"Surname",
                dataIndex : "surname",
                key : "surname"
            },  
        ];

        //put local variables/attributes here 
        this.state = {
            userData: []

        }
    }


    componentWillMount(){
        getUserList()
        .then(
        
            response => {
                console.log("I ComponentWillMount");
                console.log(JSON.stringify(response));
                this.setState({
                    userData: response.map((prop,key) =>{
                        return {
                            id : key,
                            username: prop.username,
                            name: prop.name,
                            surname : prop.surname,
                            // role : userRole[prop.roles[0].name]
                        };
                    })
                });
        })
        .catch(error => 
            console.log(error)
        );
    }




    render (){
        return(
            <div>
                <h1>UserList</h1>
                
                <div>
                    <Table 
                    dataSource= {this.state.userData}
                    columns = {this.colums}
                    pagination ={{pageSize: 5}}
                    />
                </div>            

            </div>
        );
    }
}
export default UserList;
