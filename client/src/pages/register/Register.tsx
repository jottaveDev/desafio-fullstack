import { AxiosError } from 'axios';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import useForm from '../../hooks/useForm';
import { CREATE_USER } from '../../services/userService';

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
        <main className="flex items-center justify-center flex-col min-h-screen">
            <h1 className="text-3xl font-bold">Fazer Cadastro</h1>
            <form className="flex flex-col gap-4 p-8" onSubmit={handleSubmit}>
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
            <p className="text-gray-950">
                Já tem conta?{' '}
                <a
                    className="font-bold cursor-pointer text-inherit"
                    onClick={() => navigate('/login')}
                >
                    Faça Login
                </a>
            </p>
        </main>
    );
};

export default Register;
