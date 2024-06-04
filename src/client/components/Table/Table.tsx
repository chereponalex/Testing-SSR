import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Spinner } from "../Spinner/Spinner";

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const tableStyle = {
  width: "100%",
  background: "#a0a0a0",
  border: "none",
  borderRadius: "5px",
  boxShadow:
    "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 10px 10px 25px 2px",
  margin: "10px",
};
const headerStyle = {};

const rowStyle = {
  height: "170px",
};

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`;

export const Table: React.FC<any> = (props) => {
  const [entity, setEntity] = useState<any>({});
  const [initEntity, setInitEntity] = useState<any>({});
  const [rowData, setRowData] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState(props.queryParams);

  const getData = (params: { [key: string]: string }) => {
    setLoading(true);
    props
      .getTableData(params)
      .then((res: any) => {
        if (res.status === 200) {
          Object.keys(initEntity).length === 0 && setInitEntity(res.data);
          setEntity(res.data);
          setRowData(res.data.data);
        }
      })
      .catch((err: any) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData(queryParams);
  }, [queryParams]);

  const onPageChange = (pageNumber: number) => {
    setQueryParams((prev: any) => ({ ...prev, page: pageNumber }));
  };
  const SearchFilter = useCallback(
    (props: any) => {
      if (props.searchComponent === null) {
        return null;
      }
      const Comp = props.searchComponent;

      return (
        <Comp {...props} entity={entity} setQueryParams={setQueryParams} />
      );
    },
    [initEntity]
  );

  return (
    <>
      {isLoading && <Spinner />}
      <TableContainer>
        <SearchFilter {...props} />
        <table style={tableStyle}>
          <thead style={headerStyle}>
            <tr>
              {props.columns.map((col: any) => (
                <th key={col.key}>{col.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowData.map((row: any) => {
              return renderRow(row, props.renderRules);
            })}
          </tbody>
        </table>
        {props.config.pagination && entity.paginate && (
          <Pagination {...entity.paginate} onPageChange={onPageChange} />
        )}
      </TableContainer>
    </>
  );
};

const Pagination = (paginationData: any) => {
  return (
    <PaginationContainer>
      {Array.from(
        Array(Math.round(paginationData.total / paginationData.per_page)).keys()
      ).map((i) => (
        <span
          key={i}
          onClick={() => paginationData.onPageChange(i + 1)}
          style={{
            cursor: "pointer",
            margin: "5px",
            color: paginationData.current_page === i + 1 ? "red" : "black",
          }}
        >
          {i + 1}
        </span>
      ))}
    </PaginationContainer>
  );
};

const renderRow = (rowData: any, ruleSet: any) => {
  return (
    <tr style={rowStyle} key={rowData.id}>
      {Object.keys(rowData).map((key) => {
        if (ruleSet[key]?.render) {
          return ruleSet[key].render(rowData, rowData.id);
        }
        return null;
      })}
    </tr>
  );
};
