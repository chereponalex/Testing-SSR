import React from "react";
import { Navigate } from "react-router-dom";
import { sessionToken } from "../../utils/cookie";

export const checkAuth = ({ to = "/", mustBeAuthed = true }: any) => {
  return (Child: React.ComponentType) => {
    return ({ ...props }) => {
      const isAuthed = sessionToken.get();

      if (mustBeAuthed && !isAuthed) {
        return <Navigate to={to} />;
      }

      if (!mustBeAuthed && isAuthed) {
        return <Navigate to={to} />;
      }
      return <Child {...props} />;
    };
  };
};
