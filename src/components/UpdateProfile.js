
import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'


const UpdateProfile = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match');
        }
        const promises = []
        setLoading(true);
        setError('');
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }
        Promise.all(promises).then(() => {
            history.push('/');
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
        try {
            
            //await update(emailRef.current.value, passwordRef.current.value);
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
                    <h2 className='text-center mb-4'>Update Profile</h2>
                    
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={ handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email ID</Form.Label>
                            <Form.Control type='email' ref={emailRef} 
                                defaultValue={currentUser.email }></Form.Control>
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef}
                                placeholder='Leave blank to keep the same password' ></Form.Control>
                        </Form.Group>
                        <Form.Group id='password-confirm'>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef}
                                placeholder='Leave blank to keep the same password' ></Form.Control>
                        </Form.Group>
                        <Button disabled={ loading }className='w-100' type='submit'>Update</Button>
                    </Form>
                    
                </Card.Body>                
            </Card>
            <div className='w-100 text-center mt-2'>
               <Link to='/'> Cancel</Link>
            </div>
                
        </>
    )
}

export default UpdateProfile
