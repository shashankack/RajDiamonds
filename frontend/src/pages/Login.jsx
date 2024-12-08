import React from 'react'
import api from '../utils/api'
import { setAccessToken, setRefreshToken } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const nav = useNavigate();


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        api.post('token/', {email, password})
            .then(response => {
            setAccessToken(response.data.access);
            setRefreshToken(response.data.refresh);
            nav('/home');
        })
        .catch(error => {
            setError('Invalid credentials');
        });
    };


  return (
    <div>Login</div>
  )
}

export default Login