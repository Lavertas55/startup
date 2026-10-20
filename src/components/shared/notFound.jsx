import { useNavigate } from "react-router-dom";

export function NotFound() {
    const navigate = useNavigate();

    React.useEffect(() => {
        const goBackTimer = setTimeout(() => {
                navigate(-1);
        }, 3000)

        return () => clearTimeout(goBackTimer);
    }, []);

    return (
        <main className="container-fluid bg-secondary text-center">
            <div className="card rounded-3">
                <div className="card-header">
                    <h1>Oops... (404)</h1>
                </div>

                <div className="card-body p-3">
                    <p>The page you are looking for doesn't exist.</p>
                    <p>Don't worry we'll take you back in 3 seconds.</p>
                </div>
            </div>
        </main>
    );
}