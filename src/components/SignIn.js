
import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'


const SignIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signin } = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('');
            setLoading(true);
            await signin(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch {
            setError('Failed to Sign In');
        }
        setLoading(false);
     }
    return (
        <>
            <Card>
                <Card.Body>
                    <h1 className='text-center text-primary font-weight-light font-italic mb-4'>Cviiisys</h1>
                    <h2 className='text-center mb-4'>Sign In</h2>
                    
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
                        <Button disabled={ loading }className='w-100' type='submit'>Sign In</Button>
                    </Form>
                    <div className='w-100 text-center mt-3'>
                <Link to='/forgot-password'> Forgot Password?</Link>
            </div>
                </Card.Body>                
            </Card>
            <div className='w-100 text-center mt-2'>
                Need an account? <Link to='/signup'> Sign Up</Link>
            </div>
                
        </>
    )
}

export default SignIn
