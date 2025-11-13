import "./Login.css";
const Login = ({ login }) => (
  <div className="login-wrapper">
    <div className="login-container">
      <h2>Please Login</h2>
      <button onClick={login}>Login with Google</button>
    </div>
  </div>
);

export default Login;
