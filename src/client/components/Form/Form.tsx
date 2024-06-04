import React, { useState } from "react";
import styled from "styled-components";

const InputStyled = styled.input<{ error?: boolean }>`
  width: 300px;
  height: 30px;
  border-radius: 5px;
  font-family: "Jura", sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 20px;
  border: ${({ error }) => `1px solid ${error ? "#FF6B00" : "#C6C6C6"}`};
  &:focus {
    border: 1px solid #c6c6c6;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Label = styled.div<{ error?: boolean }>`
  display: flex;
  align-items: flex-start;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 2px;
  color: ${({ error }) => (error ? "#FF6B00" : "#656565")};
`;
type ErrorTypes = {
  [key: string]: boolean;
};

export type FormTypes = {
  [key: string]: string;
};

export const Form = (props: any) => {
  const initData = props.initialData ? { ...props.initialData } : {};
  const [formValues, setValues] = useState<FormTypes>(initData);
  const [formErrors, setErrors] = useState<ErrorTypes>({});

  const onInputChange = (key: string, value: string) => {
    setValues({ ...formValues, [key]: value });
    setErrors({ ...formErrors, [key]: !value });
  };
  const submitForm = (e: any) => {
    e.preventDefault();
    let hasErrors = false;
    let errors: ErrorTypes = {};
    if (!formValues.login || !formValues.password) {
      hasErrors = true;
      errors["login"] = !formValues.login;
      errors["password"] = !formValues.password;
    }

    if (!hasErrors) {
      props.submitForm(formValues);
    } else {
      setErrors({ ...errors });
    }
  };

  return (
    <form onSubmit={submitForm}>
      <FormWrapper>
        <>
          <Label>Логин</Label>
          <InputStyled
            value={formValues["login"] || ""}
            type="text"
            onChange={(e) => onInputChange("login", e.target.value)}
            error={!!formErrors["login"]}
          />
          <Label>Пароль</Label>
          <InputStyled
            value={formValues["password"] || ""}
            type="password"
            onChange={(e) => onInputChange("password", e.target.value)}
            error={!!formErrors["password"]}
          />
        </>
        {props.children}
      </FormWrapper>
    </form>
  );
};
