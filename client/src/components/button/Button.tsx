type ButtonProps = {
    text: string;
};
const Button = ({ text }: ButtonProps) => {
    return (
        <button
            className="block font-semibold p-2 cursor-pointer bg-zinc-950 border-none rounded text-sm duration-300 text-white hover:opacity-80"
            type="submit"
        >
            {text}
        </button>
    );
};

export default Button;
