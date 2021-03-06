import React,{useState} from 'react';
import {Form,FormGroup,Label, Input,Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import APIURL from '../helpers/environment';

const Signup = (props)=>{
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [warning,setWarning]=useState(' ');
    const [warning2,setWarning2]=useState(' ');

    const [authenticated, setAuthenticated] = useState(false);
    
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }

    const handleSubmit=(event)=>{
        event.preventDefault();
        
        if(username===""||username=="undefined"){
            setWarning("Username required!")
            return;
        } else if (!validateEmail(username)){
            setWarning("Please enter a valid email address");
            return;
        } else {
            setWarning("");       
        }
        if(password.length<5){
            setWarning2("Passwords must be at least 5 characters long.")
            return;
        } else {
            setWarning2("")
        }
        fetch(`${APIURL}/user/register`,{
            method:'POST',
            body:JSON.stringify({user:{username:username,password:password}}),
            headers: new Headers({
                'Content-Type':'application/json'
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            props.updateToken(data.sessionToken);
            if (props.sessionToken == undefined) {
                setAuthenticated(true);
            }
        })
    }


    return(
        <div style={{margin:'auto'}}>
            <h2 className="siglog">SIGN UP</h2>
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <FormGroup>
                    <Label id="suLabel" htmlFor="username">Email Address</Label>
                    <Input id="textBox" onChange={(e)=>setUsername(e.target.value)} name = "username" value={username}/>
                    <p className="warning-text">{warning}</p>
                </FormGroup>
                <FormGroup>
                    <Label id="suLabel" htmlFor="password">Password</Label>
                    <Input type='password' id="textBox" onChange={(e)=>setPassword(e.target.value)} name = "password" value={password}/>
                    <p className="warning-text">{warning2}</p>

                </FormGroup>
                {authenticated ? 
                    <Modal isOpen={true}>
                        <ModalHeader closeButton id="modalHeader">User Already Exists</ModalHeader>
                        <ModalBody id="modalBody">This User Already Exists.  Please Create A New User Or "CLICK HERE" Below To Login With An Existing User.</ModalBody>
                        <Button variant="secondary" onClick={() => setAuthenticated(false)} id="modalButton">Close</Button>
                    </Modal> : <br/> }
                <Button id="suBtn" type="submit">Sign up</Button>
            </Form>
        </div>
    )
}

export default Signup;