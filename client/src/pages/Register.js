import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import Alert from "../components/Alert";
import FormRow from "../components/FormRow";
import { useAppContext } from "../context/appContext";
// global context and useNavigate later

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  showAlert: true,
};
// if possible prefer local state
// global state

function Register() {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert, clearAlert } = useAppContext();
  //toggle members
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  // global context and useNavigate later

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      clearAlert();
    }
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        {values.showAlert && <Alert />}
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {/* toggle name */}

        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email field */}
        <FormRow
          type="email"
          value={values.email}
          name="email"
          handleChange={handleChange}
        />

        {/* email field */}
        <FormRow
          type="password"
          value={values.password}
          name="password"
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
