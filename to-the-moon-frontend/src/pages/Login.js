import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/userSlice';

const Login = () => {
    //states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function submit(e){
        e.preventDefault();
        dispatch(login({
            email: email,
            password: password,
            loggedIn: true
        }))
        navigate('/');
    }

    return (
        <div>
            Login
            <textarea>
                Email
            </textarea>
            <textarea>
                Password
            </textarea>
        </div>
    )
}

export default Login
