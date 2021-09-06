import React from 'react';
import './css/Navbar.css';
import axios from "axios";
class Navbar extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            buttonon:0,
            currentview:"signup",
        }
    }

    handleclick = (event) => {
        if(event.target.value === '0'){
            this.setState({
                buttonon:'1'
            })
            this.props.stateofparent("dark");
        }
        else{
            this.setState({
                buttonon:'0'
            })
            this.props.stateofparent("light");
        }
        // event.preventDefault
    }

    handlemainview = (event) =>{
        let k  = event.target.value
        this.props.stateofmainview(k)
    }
    handlelogout = (event) =>{
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/logout',
          }).then(Response => {
            console.log(Response)
            console.log(Response.data.status)
            if((Response.data.status) === 200){
                this.props.stateofloggedin(false)
            }
            else(
                alert(Response.data.message)
            )
        })
        .catch(error =>{
            console.log(error)
        });

        let k  = event.target.value
        this.props.stateofmainview(k)
    }

    render(){

    let content;
    if (!this.props.loginstatus){
        content = <>
                    <li>
                        <button onClick = {this.handlemainview} value="signup">SIGN UP</button>
                    </li>
                    <li>
                        <button onClick = {this.handlemainview} value="login">LOG IN</button>
                    </li>
                </>
    }
    else{
        content = <>
                    <li>
                        <button onClick = {this.handlemainview} value="home">Home</button>
                    </li>
                    <li>
                        <button onClick = {this.handlemainview} value="profile">Profile</button>
                    </li>
                    <li>
                        <button onClick = {this.handlelogout} value="signup">Log Out</button>
                    </li>
                </>
    }
    
    return (
        <div className="nav">
            <div className="logo">
                <h2>
                    Django Assignment
                </h2>
            </div>
            <div className="items">
                <ul>
                    {content}
                    <li>
                        <button onClick = {this.handleclick} value={this.state.buttonon}>Theme</button>
                    </li>
                </ul>
            </div>
        </div>

    )}
}

export default Navbar