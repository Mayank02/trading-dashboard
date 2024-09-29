import React from "react";
import { render, screen } from "@testing-library/react";
import TradingGrid from "./TradingGrid";
import { ITrade } from "../Context";

const mockTrades: ITrade[] = [
  { tradeId: 1, price: "100", quantity: "0.5", time: 1627848123000 },
  { tradeId: 2, price: "101", quantity: "0.6", time: 1627848124000 },
];

describe("TradingGrid Component", () => {
  test("renders without crashing", () => {
    render(<TradingGrid currentTradingView={mockTrades} />);
    const gridElement = screen.getByRole("treegrid");
    expect(gridElement).toBeInTheDocument();
  });

  test("renders the correct number of rows", () => {
    render(<TradingGrid currentTradingView={mockTrades} />);
    const rows = screen.getAllByRole("row");
    // Including header row
    expect(rows.length).toBe(mockTrades.length + 1);
  });

  test("renders the correct column headers", () => {
    render(<TradingGrid currentTradingView={mockTrades} />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers.length).toBe(4); // tradeId, price, quantity, time
  });

  test("renders the correct data in cells", () => {
    render(<TradingGrid currentTradingView={mockTrades} />);
    const firstRowCells = screen.getAllByRole("gridcell", { name: /100/i });
    expect(firstRowCells[0]).toHaveTextContent("100");
  });
});
