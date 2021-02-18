import React,{useState} from 'react';
import {Form,FormGroup,Label, Input,Button} from 'reactstrap';


const Login = (props)=>{
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    
    const handleSubmit=(event)=>{
        event.preventDefault();
        fetch('http://localhost:3000/user/login',{
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
            <h2 className="siglog">Login</h2>
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <FormGroup>
                    <Label id="suLabel" htmlFor="username">Username</Label>
                    <Input id="textBox" onChange={(e)=>setUsername(e.target.value)} name = "username" value={username}/>
                </FormGroup>
                <FormGroup>
                    <Label id="suLabel" htmlFor="password">Password</Label>
                    <Input id="textBox" onChange={(e)=>setPassword(e.target.value)} name = "password" value={password}/>

                </FormGroup>
                <Button id="suBtn" type="submit">Login</Button>
            </Form>

        </div>
    )
}

export default Login;