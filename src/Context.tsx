import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  createContext,
} from "react";

export interface ITrade {
  tradeId: number;
  price: string;
  quantity: string;
  time: number;
}

export enum TradingPair {
  BNB_BTC = "bnbbtc",
  ETH_BTC = "ethbtc",
  LTC_BTC = "ltcbtc",
}

interface ITradingViewContextType {
  pair: string;
  setPair: (pair: string) => void;
  resetData: () => void;
  showLastTen: () => void;
  currentTradingView: ITrade[];
}

interface ITradingViewProviderProps {
  children: React.ReactNode;
}

export const TradingViewContext = createContext({} as ITradingViewContextType);

export const TradingViewProvider = (props: ITradingViewProviderProps) => {
  const { children } = props;
  const [trades, setTrades] = useState<Record<string, ITrade[]>>({});
  const [currentTradingView, setCurrentTradingView] = useState<ITrade[]>([]);
  const [pair, setPair] = useState<string>(TradingPair.BNB_BTC);

  const resetData = useCallback(() => {
    setTrades({});
    setCurrentTradingView([]);
  }, []);

  const showLastTen = useCallback(() => {
    const lastTenTrades = currentTradingView.slice(-10);
    setCurrentTradingView(lastTenTrades);
    setTrades((prevTrades) => ({ ...prevTrades, [pair]: lastTenTrades }));
  }, [currentTradingView, pair]);

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);
    ws.onmessage = (event) => {
      const tradeData = JSON.parse(event.data);
      try {
        const newTrade: ITrade = {
          tradeId: tradeData.t,
          price: tradeData.p,
          quantity: tradeData.q,
          time: tradeData.T,
        };
        const updatedData: ITrade[] = trades[pair]
          ? [...trades[pair], newTrade]
          : [newTrade];

        setTrades({ ...trades, [pair]: updatedData });
      } catch (error) {
        console.error("Error parsing trade data", error);
      }
    };

    return () => {
      ws.close();
    };
  }, [pair, trades]);

  useEffect(() => {
    setCurrentTradingView(trades[pair] || []);
  }, [pair, trades]);

  const value = useMemo(() => {
    return {
      pair: pair,
      setPair: setPair,
      resetData: resetData,
      showLastTen: showLastTen,
      currentTradingView: currentTradingView,
    };
  }, [currentTradingView, pair, resetData, showLastTen]);

  return (
    <TradingViewContext.Provider value={value}>
      {children}
    </TradingViewContext.Provider>
  );
};
