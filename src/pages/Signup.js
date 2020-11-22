import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useContext } from "react";
import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

import { useForm } from "../utils/hooks";

function Signup(props) {
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);

  const { onChange, onSubmit, values } = useForm(RegisterUsers, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { register: userData } }) {
      login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  function RegisterUsers() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
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
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $confirmPassword: String!
    $password: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        confirmPassword: $confirmPassword
        password: $password
      }
    ) {
      id
      token
      email
      username
      createdAt
    }
  }
`;

export default Signup;
