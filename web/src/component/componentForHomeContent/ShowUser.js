import React,{Component} from 'react'
import UserList from './UserList'
import { Divider } from 'antd';
class ShowUser extends Component
{
    showUser = ()=>{
        if(this.props.users)
        {
            console.log("props in ShowUser : ",this.props.users);
            return this.props.users.map(user=>(
                <UserList key ={user._id} {...user}/>
            ))
        }
    }
    render()
    {
        return(
            <div>
                {this.showUser()} 
            </div>
        )
    }
}
export default ShowUser;
