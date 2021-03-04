import {useState} from 'react';
import {Form,FormGroup,Label, Input,Button, Modal, ModalHeader, ModalBody} from 'reactstrap';


const Login = (props)=>{
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    
    const handleSubmit=(event)=>{
        event.preventDefault();
        // console.log('Where is the event', event);
        fetch('http://localhost:3000/user/login',{
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
        <div>
            <h2 className="siglog">LOG IN</h2>
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <FormGroup>
                    <Label id="suLabel" htmlFor="username">Username</Label>
                    <Input id="textBox" onChange={(e)=>setUsername(e.target.value)} name = "username" value={username}/>
                </FormGroup>
                <FormGroup>
                    <Label id="suLabel" htmlFor="password">Password</Label>
                    <Input id="textBox" onChange={(e)=>setPassword(e.target.value)} name = "password" value={password}/>

                </FormGroup>
                {authenticated ? 
                    <Modal isOpen={true}>
                        <ModalHeader closeButton id="modalHeader">No User Exists</ModalHeader>
                        <ModalBody id="modalBody">Please Try Again With Valid Username and Password</ModalBody>
                        <Button id="modalButton" variant="secondary" onClick={() => setAuthenticated(false)}>Close</Button>
                    </Modal> : <br/> }
                <Button id="suBtn" type="submit">Login</Button>
            </Form>
        </div>
    )
}

export default Login;
