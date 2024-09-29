import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ViewActions from "./ViewActions";

describe("ViewActions Component", () => {
  const mockSetPair = jest.fn();
  const mockResetData = jest.fn();
  const mockShowLastTen = jest.fn();

  const props = {
    setPair: mockSetPair,
    resetData: mockResetData,
    showLastTen: mockShowLastTen,
    pair: "bnbbtc",
  };

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<ViewActions {...props} />);
  });

  test("renders the select element with correct options", () => {
    const selectElement = screen.getByLabelText(/Select Trading Pair/i);
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue("bnbbtc");

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent("BNB/BTC");
    expect(options[1]).toHaveTextContent("ETH/BTC");
    expect(options[2]).toHaveTextContent("LTC/BTC");
  });

  test("calls setPair when a new trading pair is selected", () => {
    const selectElement = screen.getByLabelText(/Select Trading Pair/i);
    fireEvent.change(selectElement, { target: { value: "ethbtc" } });
    expect(mockSetPair).toHaveBeenCalledWith("ethbtc");
  });

  test("renders the Reset Data button and calls resetData on click", () => {
    const resetButton = screen.getByText(/Reset Data/i);
    expect(resetButton).toBeInTheDocument();
    fireEvent.click(resetButton);
    expect(mockResetData).toHaveBeenCalled();
  });

  test("renders the Only last 10 trades button and calls showLastTen on click", () => {
    const lastTenButton = screen.getByText(/Only last 10 trades/i);
    expect(lastTenButton).toBeInTheDocument();
    fireEvent.click(lastTenButton);
    expect(mockShowLastTen).toHaveBeenCalled();
  });
});
