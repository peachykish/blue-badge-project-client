import {useState} from 'react';
import {Form,FormGroup,Label, Input,Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import APIURL from '../helpers/environment';

const Login = (props)=>{
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [authenticated, setAuthenticated] = useState(false);
    
    const handleSubmit=(event)=>{
        event.preventDefault();
        fetch(`${APIURL}/user/login`,{
            method:'POST',
            body:JSON.stringify({user:{username:username,password:password}}),
            headers: new Headers({
                'Content-Type':'application/json'
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            props.updateToken(data.sessionToken);
            if (props.sessionToken == undefined) {
                setAuthenticated(true);
            }
        })
    }
    return(
        <div style={{margin:'auto'}}>
            <h2 className="siglog">LOG IN</h2>
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <FormGroup>
                    <Label id="suLabel" htmlFor="username">Email Address</Label>
                    <Input id="textBox" onChange={(e)=>setUsername(e.target.value)} name = "username" value={username}/>
                </FormGroup>
                <FormGroup>
                    <Label id="suLabel" htmlFor="password">Password</Label>
                    <Input type='password' id="textBox" onChange={(e)=>setPassword(e.target.value)} name = "password" value={password}/>

                </FormGroup>
                {authenticated ? 
                    <Modal isOpen={true}>
                        <ModalHeader closeButton id="modalHeader">No User Exists</ModalHeader>
                        <ModalBody id="modalBody">Please Try Again With Valid Email address and Password</ModalBody>
                        <Button id="modalButton" variant="secondary" onClick={() => setAuthenticated(false)}>Close</Button>
                    </Modal> : <br/> }
                <Button id="suBtn" type="submit">Login</Button>
              
            </Form>
        </div>
    )
}

export default Login;
