import React,{useState} from 'react';
import {Form,FormGroup,Label, Input,Button} from 'reactstrap';

const Signup = (props)=>{
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [warning,setWarning]=useState(' ');
    
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(username===""||username=="undefined"){
            setWarning("username required")
            return;
        }
        fetch('http://localhost:3000/user/register',{
            method:'POST',
            body:JSON.stringify({user:{username:username,password:password}}),
            headers: new Headers({
                'Content-Type':'application/json'
            })
        })
        .then((res)=>res.json())
        .then((data)=>{console.log(data);props.updateToken(data.sessionToken)})
    }


    return(
        <div>
            {/* <h1>Welcome to Travel App!</h1> */}
            <h2 className="siglog">Signup</h2>
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <FormGroup>
                    <Label id="suLabel" htmlFor="username">Username</Label>
                    <Input id="textBox" onChange={(e)=>setUsername(e.target.value)} name = "username" value={username}/>
                    <p className="warning-text">{warning}</p>
                </FormGroup>
                <FormGroup>
                    <Label id="suLabel" htmlFor="password">Password</Label>
                    <Input id="textBox" onChange={(e)=>setPassword(e.target.value)} name = "password" value={password}/>

                </FormGroup>
                <Button id="suBtn" type="submit">Signup</Button>
            </Form>

        </div>
    )
}

export default Signup;