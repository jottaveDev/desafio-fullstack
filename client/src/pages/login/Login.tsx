import { AxiosError } from 'axios';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import useForm from '../../hooks/useForm';
import { LOGIN } from '../../services/userService';

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
        <main className="flex items-center justify-center flex-col min-h-screen">
            <h1 className="text-3xl font-bold">Fazer Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8">
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
            <p className="text-gray-950">
                Não tem conta?{' '}
                <a
                    className="font-bold cursor-pointer text-inherit"
                    onClick={() => navigate('/register')}
                >
                    Cadastre-se
                </a>
            </p>
        </main>
    );
};

export default Login;
