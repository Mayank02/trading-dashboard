import { useMemo } from "react";
import { TradingPair } from "../Context";
import styles from "./Styles.module.css";

interface ViewActionsProps {
  pair: string;
  setPair: (pair: string) => void;
  resetData: () => void;
  showLastTen: () => void;
}

export const ViewActions = (props: ViewActionsProps) => {
  const options = useMemo(
    () => (
      <>
        <option value={TradingPair.BNB_BTC}>BNB/BTC</option>
        <option value={TradingPair.ETH_BTC}>ETH/BTC</option>
        <option value={TradingPair.LTC_BTC}>LTC/BTC</option>
      </>
    ),
    []
  );

  return (
    <section className={`${styles.actions} ${styles.container}`}>
      <div>
        <label htmlFor="pair">Select Trading Pair : </label>
        <select
          id="pair"
          className={styles.select}
          onChange={(e) => props.setPair(e.target.value)}
          value={props.pair}
        >
          {options}
        </select>
      </div>
      <div className={styles.btnContainer}>
        <button
          className={`${styles.btn} ${styles.primary}`}
          onClick={props.resetData}
        >
          Reset Data
        </button>
        <button
          className={`${styles.btn} ${styles.secondary}`}
          onClick={props.showLastTen}
        >
          Only last 10 trades
        </button>
      </div>
    </section>
  );
};

export default ViewActions;
