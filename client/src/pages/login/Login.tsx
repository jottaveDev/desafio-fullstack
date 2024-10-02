import { AxiosError } from 'axios';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import useForm from '../../hooks/useForm';
import { LOGIN } from '../../services/userService';
import './login.module.css';

const Login = () => {
    const email = useForm('email');
    const password = useForm('password');
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const userIsValid = email.validate() && password.validate();
        if (userIsValid) {
            try {
                const body = {
                    email: email.value,
                    password: password.value,
                };
                const { data } = await LOGIN(body);
                localStorage.setItem('token', data.token);
                navigate('/');
                return data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    password.setError(error.response?.data.message);
                }
            }
        }
    };

    return (
        <main>
            <h1>Fazer Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    label="Email"
                    {...email}
                />
                <Input
                    type="password"
                    name="password"
                    id="password"
                    label="Senha"
                    {...password}
                />
                <Button text="Login" />
            </form>
            <p>
                Não tem conta?{' '}
                <a onClick={() => navigate('/register')}>Cadastre-se</a>
            </p>
        </main>
    );
};

export default Login;
