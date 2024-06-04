import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { checkAuth } from "../../components/Hoc/checkAuth";

import { Button } from "../../components/Button/Button";
import { Container } from "../../style";
import { UserContainer } from "./style";
import { Spinner } from "../../components/Spinner/Spinner";

import { getEntity } from "../../network/entity/get-entity";
import { deleteEntity } from "../../network/entity/delete-entity";
import { updateEntity } from "../../network/entity/update-entity";

export const UserEntity = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { id }: any = useParams();
  const navigate = useNavigate();
  const url = window.location.href;
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const mode = urlParams.get("mode");

  useEffect(() => {
    setLoading(true);
    getEntity(id)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const removeEntity = () => {
    if (id) {
      deleteEntity(id)
        .then((res: any) => {
          if (res.status === 200) {
            navigate("/");
          }
        })
        .catch((err: any) => console.log(err));
    }
  };

  const changeEntity = () => {
    setLoading(true);
    const { name, last_name, middle_name } = user;
    updateEntity(id, { name, last_name, middle_name })
      .then((res: any) => {
        if (res.status === 200) {
          setUser(res.data.data.data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <UserContainer>
          ID: {user?.id}
          <br />
          Имя:{" "}
          {mode === "change" ? (
            <input
              value={user?.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          ) : (
            user?.name
          )}{" "}
          <br />
          Фамилия:{" "}
          {mode === "change" ? (
            <input
              value={user?.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            />
          ) : (
            user?.last_name
          )}{" "}
          <br />
          Отчество:{" "}
          {mode === "change" ? (
            <input
              value={user?.middle_name}
              onChange={(e) =>
                setUser({ ...user, middle_name: e.target.value })
              }
            />
          ) : (
            user?.middle_name
          )}{" "}
          <br />
          {(() => {
            switch (mode) {
              case "change":
                return <Button onClick={changeEntity}>Изменить</Button>;
              case "delete":
                return <Button onClick={removeEntity}>Удалить</Button>;
              default:
                return null;
            }
          })()}
        </UserContainer>
      )}
    </Container>
  );
};

export const UserPage = checkAuth({ to: "/login", mustBeAuthed: true })(
  UserEntity
);
