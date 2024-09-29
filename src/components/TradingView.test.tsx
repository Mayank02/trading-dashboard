import React from "react";
import { render, screen } from "@testing-library/react";
import { ITrade, TradingPair, TradingViewContext } from "../Context";
import TradingView from "./TradingView";

describe("TradingView Component", () => {
  const mockTrades: ITrade[] = [
    { tradeId: 1, price: "100", quantity: "0.5", time: 1627848123000 },
    { tradeId: 2, price: "101", quantity: "0.6", time: 1627848124000 },
  ];

  const renderWithContext = (component: any, trades: ITrade[]) => {
    return render(
      <TradingViewContext.Provider
        value={{
          pair: TradingPair.BNB_BTC,
          setPair: jest.fn(),
          resetData: jest.fn(),
          showLastTen: jest.fn(),
          currentTradingView: trades,
        }}
      >
        {component}
      </TradingViewContext.Provider>
    );
  };

  test("renders the trading view title", () => {
    renderWithContext(<TradingView />, mockTrades);
    const titleElement = screen.getByText(/Trading View/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders trade details correctly", () => {
    renderWithContext(<TradingView />, mockTrades);
    const firstTrade = screen.getByText(/100/i);
    const secondTrade = screen.getByText(/101/i);
    expect(firstTrade).toBeInTheDocument();
    expect(secondTrade).toBeInTheDocument();
  });

  test("renders a message when no trades are available", () => {
    renderWithContext(<TradingView />, []);
    const messageElement = screen.getByText(/Loading.../i);
    expect(messageElement).toBeInTheDocument();
  });
});
