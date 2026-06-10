function SuccessScreen({
    handleReset
}) {

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
                Case Submitted Successfully!
            </h1>

            <p className="mt-3">
                Thank you. We’ll
                review and contact
                you soon.
            </p>

            <button
                className="btn btn-primary mt-4 px-5 py-2"
                onClick={handleReset}
            >
                Submit Another Case
            </button>

        </div>
    );
}

export default SuccessScreen;