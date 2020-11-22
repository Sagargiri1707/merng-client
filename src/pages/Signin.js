import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useContext } from "react";
import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

function Signin(props) {
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const { onChange, onSubmit, values } = useForm(LoginUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  function LoginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Signin
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      id
      token
      email
      username
      createdAt
    }
  }
`;

export default Signin;
