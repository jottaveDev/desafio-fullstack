type IconProps = {
    src: string;
    alt: string;
    onClick: () => void;
};
const Icon = ({ src, alt, onClick }: IconProps) => {
    return (
        <button
            className="bg-transparent p-1 rounded-full duration-300 hover:bg-gray-400"
            onClick={onClick}
        >
            <img className="cursor-pointer" src={src} alt={alt} />
        </button>
    );
};

export default Icon;
