type InputProps = {
    type: string;
    name: string;
    id: string;
    label: string;
    value: string;
    error: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
            <label htmlFor={id} className="block mb-1 text-sm font-semibold">
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
                className="w-56 py-2 px-4 rounded outline-none border-solid border-gray-300 border"
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
