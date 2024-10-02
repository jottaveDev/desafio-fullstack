type IconProps = {
    src: string;
    alt: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick: any;
};
const Icon = ({ src, alt, onClick }: IconProps) => {
    return (
        <button onClick={onClick}>
            <img src={src} alt={alt} />
        </button>
    );
};

export default Icon;
