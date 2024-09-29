import React from "react";
import { TradingViewProvider } from "./Context";
import TradingView from "./components/TradingView";

const App: React.FC = () => {
  return (
    <TradingViewProvider>
      <TradingView />
    </TradingViewProvider>
  );
};

export default App;
