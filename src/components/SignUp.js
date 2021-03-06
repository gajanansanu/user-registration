
import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match');
        }
            
        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to create an account');
        }
        setLoading(false);
     }
    return (
        <>
            <Card>
                <Card.Body>
                    <h1 className='text-center text-primary font-weight-light font-italic mb-4'>Cviiisys</h1>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                    
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={ handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email ID</Form.Label>
                            <Form.Control type='email' ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id='password-confirm'>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={ loading }className='w-100' type='submit'>Sign Up</Button>
                    </Form>    
                </Card.Body>                
            </Card>
            <div className='w-100 text-center mt-2'>
                Already have an account? <Link to='/signin'>Sign In</Link>
            </div>
                
        </>
    )
}

export default SignUp
