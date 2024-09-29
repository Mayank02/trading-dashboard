import React, { useContext } from "react";
import { TradingViewContext } from "../Context";
import Header from "./Header";
import styles from "./Styles.module.css";
import TradingGrid from "./TradingGrid";
import ViewActions from "./ViewActions";

const TradingView: React.FC = () => {
  const { pair, resetData, showLastTen, currentTradingView, setPair } =
    useContext(TradingViewContext);

  return (
    <div className={styles.wrapper}>
      <Header pair={pair} />
      <ViewActions
        pair={pair}
        setPair={setPair}
        resetData={resetData}
        showLastTen={showLastTen}
      />
      <TradingGrid currentTradingView={currentTradingView} />
    </div>
  );
};

export default TradingView;
