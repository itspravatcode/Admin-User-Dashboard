
import { useLocation, Link } from "react-router-dom";

export default function LoginErrorPage() {
  const location = useLocation();
  const errorMessage = location.state?.message || "An unknown error occurred.";

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Login Error</h1>
      <p>{errorMessage}</p>
      <Link to="/login">Try again</Link>
    </div>
  );
}
