import { AxiosError } from 'axios';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import useForm from '../../hooks/useForm';
import { CREATE_USER } from '../../services/userService';
import './register.module.css';

const Register = () => {
    const email = useForm('email');
    const password = useForm('password');
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const userIsValid = email.validate() && password.validate();
        if (userIsValid) {
            try {
                const user = { email: email.value, password: password.value };
                const { data } = await CREATE_USER(user);
                navigate('/login');
                return data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    email.setError(error.response?.data.message);
                }
            }
        }
    };

    return (
        <main>
            <h1>Fazer Cadastro</h1>
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
                <Button text="Cadastrar" />
            </form>
            <p>
                Já tem conta?{' '}
                <a onClick={() => navigate('/login')}>Faça Login</a>
            </p>
        </main>
    );
};

export default Register;
