import React from "react";
import { LoginContainer } from "./style";
import { Form } from "../../components/Form/Form";
import { Button } from "../../components/Button/Button";
import { loginUser } from "../../network/login-user";
import { sessionToken } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../components/Hoc/checkAuth";

const Page = () => {
  const navigate = useNavigate();
  const submitForm = (dataCredentials: any) => {
    loginUser({
      login: dataCredentials.login,
      password: dataCredentials.password,
    })
      .then((response) => {
        if (response.status === 200) {
          sessionToken.set(response.data.data.token);
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <LoginContainer>
      <Form submitForm={submitForm}>
        <Button type="submit">Войти</Button>
      </Form>
    </LoginContainer>
  );
};

export const LoginPage = checkAuth({ to: "/", mustBeAuthed: false })(Page);
