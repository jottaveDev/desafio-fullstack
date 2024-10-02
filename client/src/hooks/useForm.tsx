import { BaseSyntheticEvent, useState } from 'react';
import { IUserDataValid } from '../models/user';

const types: IUserDataValid = {
    email: /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/,
    password: /[0-9a-zA-Z]{6,}/,
};

const useForm = (type: string | boolean) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const validate = (value: string) => {
        if (type === false) return true;
        if (
            types[type as keyof IUserDataValid] &&
            !types[type as keyof IUserDataValid].test(value)
        ) {
            setError('Digite um valor válido!');
            return false;
        } else {
            setError('');
            return true;
        }
    };

    const onChange = ({ target }: BaseSyntheticEvent): void => {
        if (target) setValue(target.value);
        setError('');
    };

    return {
        value,
        setValue,
        error,
        onChange,
        setError,
        onBlur: () => validate(value),
        validate: () => validate(value),
    };
};

export default useForm;
