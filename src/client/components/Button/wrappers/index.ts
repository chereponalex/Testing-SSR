import styled, { css } from "styled-components";

type ButtonSize = "small" | "medium" | "large";

const mainTheme = {
  type: "main",
  backGround: "#F4F7FF",
  colors: {
    white: "#FFFFFF",
    red: "#FB3640",
    black: {
      first: "#222222",
      second: "#656565",
      third: "#C6C6C6",
      fourth: "#F0F0F0",
      fifth: "#F7F7F7",
    },
    blue: {
      first: "#538DFF",
      second: "#94B8FF",
      third: "#BFD4FF",
      fourth: "#E9F1FF",
    },
    yellow: {
      first: "#fefad2",
    },
    pink: {
      first: "#f8e5ea",
      second: "#fdf1e9",
    },
    primary: "#4858CC",
  },
};

const font14M = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`;

const font16M = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

const paddingStyles = css`
  padding: 12px 16px;
`;

const smallSizeStyles = css`
  ${font14M};
  padding: 8px 16px;
`;

const mediumSizeStyles = css`
  ${font14M};
  ${paddingStyles};
  padding: 12px 16px;
`;

const largeSizeStyles = css`
  ${font16M};
  padding: 14.5px 16px;
`;

type ButtonColors = "black" | "blue" | "white";

const blackColorStyles = css`
  background: ${(props) => mainTheme.colors.black.first};
  color: ${(props) => mainTheme.colors.white};

  &:not(:disabled) {
    &:active,
    &:hover {
      box-shadow: 0px 0px 42px rgba(188, 195, 214, 0.3);
    }
  }

  &:disabled {
    background: ${(props) => mainTheme.colors.black.third};
  }
`;

const blueColorStyles = css`
  color: ${(props) => mainTheme.colors.black.first};
  background: ${(props) => mainTheme.colors.blue.fourth};

  &:not(:disabled) {
    &:active,
    &:hover {
      box-shadow: 0px 0px 42px rgba(188, 195, 214, 0.3);
    }
  }

  &:disabled {
    background: ${(props) => mainTheme.backGround};
    color: ${(props) => mainTheme.colors.black.third};
  }
`;

const whiteColorStyles = css`
  background: ${(props) => mainTheme.colors.white};
  color: ${(props) => mainTheme.colors.black.first};
  border: 2px solid #f0f0f0;

  &:not(:disabled) {
    &:active,
    &:hover {
      box-shadow: 0px 0px 42px rgba(188, 195, 214, 0.3);
    }
  }

  &:disabled {
    background: ${(props) => mainTheme.colors.black.fourth};
    color: ${(props) => mainTheme.colors.black.second};
  }
`;

export const ButtonWrapper = styled.button<{
  size: ButtonSize;
  color: ButtonColors;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  text-align: center;
  border-radius: 16px;
  border: none;
  outline: none;
  cursor: pointer;
  min-width: 50px;
  margin: 10px 0 10px 0;

  ${(props) => {
    switch (props.size) {
      case "small":
        return smallSizeStyles;
      case "large":
        return largeSizeStyles;
      case "medium":
        return mediumSizeStyles;
      default:
        return mediumSizeStyles;
    }
  }}

  ${(props) => {
    switch (props.color) {
      case "black":
        return blackColorStyles;
      case "white":
        return whiteColorStyles;
      case "blue":
        return blueColorStyles;
      default:
        return whiteColorStyles;
    }
  }}
`;
