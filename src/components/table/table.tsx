import React from "react";
import { styled } from "@mui/material";

interface Props<T> {
  th: {
    width?: number;
    l?: string;
    key?: keyof T;
    align?: "left" | "right";
    render?: (
      data: T,
      index: number
    ) => React.ReactNode | React.ReactElement | undefined;
  }[];
  data: T[];
}

export default function Table<T extends object>(props: Props<T>) {
  const getColWidth = (width: number | undefined) => {
    return (
      width ||
      props.th.reduce((b, a) => b - (a.width || 0), 100) /
        props.th.filter(x => x.width === undefined).length
    );
  };

  return (
    <TableWrap>
      <colgroup>
        {props.th.map((x, i) => (
          <col
            key={i.toString()}
            style={{
              width: getColWidth(x.width) + "%"
            }}
          />
        ))}
      </colgroup>

      <thead>
        <tr>
          {props.th.map((x, i) => {
            return (
              <th key={i.toString()} className={"v-t-" + x.align}>
                {x.l}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {props.data.map((d, di) => {
          return (
            <tr key={di.toString()}>
              {props.th.map((h, hi) => {
                return (
                  <td key={di + "" + hi} className={"v-t-" + h.align}>
                    {h.render ? h.render(d, di) : h.key ? d[h.key] : ""}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </TableWrap>
  );
}

const TableWrap = styled("table")`
  border-collapse: collapse;

  & thead {
    & tr {
      background: linear-gradient(
        #362e7f,
        rgba(42, 35, 105, 0.5),
        rgba(42, 35, 105, 0.47),
        #312975
      );
      background-color: #1e184f;
      & th {
        :first-of-type {
          border-top-left-radius: 8px;
        }
        :last-of-type {
          border-top-right-radius: 8px;
        }
        font-size: 14px;
        color: #5954cc;
        font-family: Heebo-Regular;
        padding: 20px;
      }
    }
  }
  & tbody {
    & tr {
      border-bottom: 1px solid #1e184f;
      max-height: 80px;
      background-color: #0d0c25;
      & td {
        text-align: center;
        padding: 26px 20px;
        color: #c9c7d7;
        font-family: Heebo-Regular;
        font-size: 15px;
      }
      :last-of-type {
        & td {
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
    }
  }

  .v-t-left {
    text-align: left;
  }
`;
