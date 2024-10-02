/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './input.module.css';

type InputProps = {
    type: string;
    name: string;
    id: string;
    label: string;
    value: string;
    error: string;
    onChange: any;
    onBlur: any;
};
const Input = ({
    type,
    name,
    id,
    label,
    value,
    error,
    onChange,
    onBlur,
}: InputProps) => {
    return (
        <fieldset>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                style={{ borderColor: `${error ? 'red' : ''}` }}
                className={styles.input}
            />
            {error && (
                <p
                    style={{
                        marginTop: '6px',
                        fontSize: '14px',
                        color: 'red',
                    }}
                >
                    {error}
                </p>
            )}
        </fieldset>
    );
};

export default Input;
