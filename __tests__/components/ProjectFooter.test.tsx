import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectFooter from "@/components/ProjectFooter";

describe("ProjectFooter", () => {
  it("renders dimensions with inch marks", () => {
    render(<ProjectFooter dimensions="12x16" media="Oil on canvas" />);
    expect(screen.getByText(/12"x16"/)).toBeInTheDocument();
  });

  it("renders media", () => {
    render(<ProjectFooter dimensions="12x16" media="Watercolor" />);
    expect(screen.getByText(/Watercolor/)).toBeInTheDocument();
  });

  it("renders year when provided", () => {
    render(<ProjectFooter dimensions="12x16" media="Oil" year="2023" />);
    expect(screen.getByText(/2023/)).toBeInTheDocument();
  });

  it("omits year section when year is not provided", () => {
    render(<ProjectFooter dimensions="12x16" media="Oil" />);
    expect(screen.queryByText(/Year:/)).toBeNull();
  });

  it("omits dimensions section when empty string", () => {
    render(<ProjectFooter dimensions="" media="Oil" />);
    expect(screen.queryByText(/Dimensions:/)).toBeNull();
  });

  it("omits media section when empty string", () => {
    render(<ProjectFooter dimensions="12x16" media="" />);
    expect(screen.queryByText(/Media:/)).toBeNull();
  });

  it("appends inch marks to the last digit in each number, including decimals", () => {
    render(<ProjectFooter dimensions="12.5x16.5" media="Oil" />);
    // Regex targets any digit not followed by another digit or dot
    // So "12.5" → "12.5\"" and "16.5" → "16.5\""
    expect(screen.getByText(/12\.5"x16\.5"/)).toBeInTheDocument();
  });
});
