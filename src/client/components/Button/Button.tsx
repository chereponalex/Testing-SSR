import * as React from "react";
import styled from "styled-components";

import { MouseEvent } from "react";
import { ButtonWrapper } from "./wrappers";

export const Button = styled((props: any) => {
  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    props.onClick && props.onClick(e);
  };

  return (
    <ButtonWrapper onClick={handleOnClick} {...props}>
      {props.children}
    </ButtonWrapper>
  );
})``;
