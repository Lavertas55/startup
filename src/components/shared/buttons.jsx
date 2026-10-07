import { useNavigate } from "react-router-dom";

export function BackButton({ btnStyle, btnText }) {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <button className={`btn btn-${btnStyle}`} type="button" onClick={goBack}>
            {btnText}
        </button>
    );
}