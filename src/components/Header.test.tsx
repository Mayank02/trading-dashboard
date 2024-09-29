import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  test("renders the trading view title with the correct pair", () => {
    render(<Header pair="bnbbtc" />);
    const titleElement = screen.getByText(/BNBBTC Trading View/i);
    expect(titleElement).toBeInTheDocument();
  });
});
