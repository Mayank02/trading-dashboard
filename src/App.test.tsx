import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  test("renders the title", () => {
    render(<App />);
    const titleElement = screen.getByText(/Trades/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the select element with correct options", () => {
    render(<App />);
    const selectElement = screen.getByLabelText(/Select Trading Pair/i);
    expect(selectElement).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent("BNB/BTC");
    expect(options[1]).toHaveTextContent("ETH/BTC");
    expect(options[2]).toHaveTextContent("LTC/BTC");
  });

  test("updates the trading pair when a new option is selected", () => {
    render(<App />);
    const selectElement = screen.getByLabelText(/Select Trading Pair/i);
    fireEvent.change(selectElement, { target: { value: "ethbtc" } });
    expect(selectElement).toHaveValue("ethbtc");
  });
});
