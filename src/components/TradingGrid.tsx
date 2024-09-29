import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { ITrade } from "../Context";
import styles from "./Styles.module.css";

const colDefs: ColDef<ITrade>[] = [
  { field: "tradeId", filter: true },
  { field: "price", filter: true },
  { field: "quantity", filter: true },
  { field: "time", filter: true },
];

const defaultColDef: ColDef = {
  flex: 1,
};

interface TradingGridProps {
  currentTradingView: ITrade[];
}

export const TradingGrid = (props: TradingGridProps) => {
  return (
    <section className={styles.step}>
      <div
        className={"ag-theme-quartz"}
        style={{ width: "60%", margin: "0 auto" }}
      >
        {props.currentTradingView && props.currentTradingView.length ? (
          <AgGridReact
            rowData={props.currentTradingView}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            domLayout="autoHeight"
            rowHeight={40}
            headerHeight={40}
            pagination={true}
            paginationPageSize={10}
          />
        ) : (
          "Loading..."
        )}
      </div>
    </section>
  );
};

export default TradingGrid;
