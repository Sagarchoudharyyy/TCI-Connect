import { useNavigate } from "react-router-dom";

function SuccessScreen({
    title,
    subtitle,
    buttonText,
    redirectPath,
    handleReset
}) {

    const navigate =
        useNavigate();

    const handleButtonClick =
        () => {

            if (handleReset) {
                handleReset();
            }

            if (redirectPath) {
                navigate(
                    redirectPath
                );
            }
        };

    return (
        <div
            className="text-center py-5"
            style={{
                background: "#fff",
                borderRadius: "20px"
            }}
        >

            <h1
                style={{
                    color: "#0152a8",
                    fontWeight: "bold"
                }}
            >
                {title}
            </h1>

            {subtitle && (
                <p
                    className="mt-3"
                    style={{
                        color: "#555",
                        fontSize: "18px"
                    }}
                >
                    {subtitle}
                </p>
            )}

            <button
                className="btn btn-primary mt-4 px-5 py-2"
                onClick={
                    handleButtonClick
                }
            >
                {buttonText}
            </button>

        </div>
    );
}

export default SuccessScreen;