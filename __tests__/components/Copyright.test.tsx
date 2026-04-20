import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Copyright from "@/components/Copyright";

describe("Copyright", () => {
  it("renders the name", () => {
    render(<Copyright name="Anna Elise Johnson" />);
    expect(screen.getByText(/Anna Elise Johnson/)).toBeInTheDocument();
  });

  it("renders the copyright symbol", () => {
    render(<Copyright name="Anna Elise Johnson" />);
    expect(screen.getByText(/©/)).toBeInTheDocument();
  });

  it("renders the current year", () => {
    render(<Copyright name="Anna Elise Johnson" />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders 'All rights reserved.'", () => {
    render(<Copyright name="Anna Elise Johnson" />);
    expect(screen.getByText(/All rights reserved\./)).toBeInTheDocument();
  });
});
