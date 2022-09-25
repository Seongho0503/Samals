import Header from "../components/Header";

import "../styles/Register.css";

const Register = () => {
  return (
    <div>
      <Header />
      <div className="login-box">
        <h2>Register</h2>
        <form>
          <div className="user-box">
            <input type="text" name="" required="" />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="" required="" />
            <label>nft명</label>
          </div>
          <a href="#">Submit</a>
        </form>
      </div>
    </div>
  );
};

export default Register;
