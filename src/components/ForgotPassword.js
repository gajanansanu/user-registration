
import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'


const ForgotPassword = () => {
    const emailRef = useRef();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();


    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check your inbox for futher instructions...');
        } catch {
            setError('Failed to reset password');
        }
        setLoading(false);
     }
    return (
        <>
            <Card>
                <Card.Body>
                    <h1 className='text-center text-primary font-weight-light font-italic mb-4'>Cviiisys</h1>
                    <h2 className='text-center mb-4'>Password Reset</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}
                    <Form onSubmit={ handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email ID</Form.Label>
                            <Form.Control type='email' ref={emailRef} required></Form.Control>
                        </Form.Group>
                        
                        <Button disabled={ loading }className='w-100' type='submit'>Reset</Button>
                    </Form>
                   
                </Card.Body>                
            </Card>
            <div className='w-100 text-center mt-2'>
                Remembered your password? <Link to='/signin'> Sign In</Link>
            </div>
                
        </>
    )
}

export default ForgotPassword;
