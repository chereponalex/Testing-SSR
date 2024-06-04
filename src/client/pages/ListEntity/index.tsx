import React from "react";
import styled from "styled-components";
import { Container } from "../../style";
import { checkAuth } from "../../components/Hoc/checkAuth";
import { getEntities } from "../../network/entity/get-entities";
import { Table } from "../../components/Table/Table";
import { Link } from "react-router-dom";

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2px;
`;

const columns = [
  {
    dataKey: "id",
    title: "ID",
  },
  {
    dataKey: "last_name",
    title: "Фамилия",
  },
  {
    dataKey: "name",
    title: "Имя",
  },
  {
    dataKey: "middle_name",
    title: "Отчество",
  },
  {
    dataKey: "actions",
    title: "Действия",
  },
];

const renderRules = {
  id: {
    dataKey: "id",
    title: "ID",
    render: (item: any) => {
      return <td>{item.id}</td>;
    },
  },
  last_name: {
    dataKey: "last_name",
    title: "Фамилия",
    render: (item: any) => {
      return <td>{item.last_name}</td>;
    },
  },
  name: {
    dataKey: "name",
    title: "name",
    render: (item: any) => {
      return <td>{item.name}</td>;
    },
  },
  middle_name: {
    dataKey: "middle_name",
    title: "Отчество",
    render: (item: any) => {
      return <td>{item.middle_name}</td>;
    },
  },
  links: {
    dataKey: "links",
    title: "Действия",
    render: (item: any, id: string) => {
      return (
        <td>
          <ActionContainer>
            <Link to={`/user/${id}?mode=delete`}>Удалить</Link>
            <Link to={`/user/${id}?mode=view`}>Просмотр</Link>
            <Link to={`/user/${id}?mode=change`}>Изменить</Link>
          </ActionContainer>
        </td>
      );
    },
  },
};

const ListEntity = () => {
  return (
    <Container>
      <Table
        searchComponent={SearchFilters}
        columns={columns}
        renderRules={renderRules}
        getTableData={getEntities}
        queryParams={{ per_page: 5 }}
        config={{
          pagination: true,
          infinityScroll: false,
        }}
      />
    </Container>
  );
};

const debounce = (fn: Function, ms: number) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(function () {
      timer = null;
      // @ts-ignore
      fn.apply(this, args);
    }, ms);
  };
};

const SearchFilters = (props: any) => {
  const onFilterChange = (key: string, value: string) => {
    props.setQueryParams((prev: any) => ({ ...prev, [key]: value, page: 1 }));
  };

  const debouncedChanged = debounce(onFilterChange, 400);

  return (
    <FilterContainer>
      {props.entity?.filters?.map((filter: any) => {
        if (props.renderRules[filter.name]) {
          return (
            <FilterItem>
              {filter.label}
              <input
                placeholder="Пусто"
                onChange={(e) => debouncedChanged(filter.name, e.target.value)}
              />
            </FilterItem>
          );
        }
        return null;
      })}
    </FilterContainer>
  );
};
export const HomePage = checkAuth({ to: "/login", mustBeAuthed: true })(
  ListEntity
);
