import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectHeader from "@/components/ProjectHeader";

vi.mock("next/link", () => ({
  default: ({ href, children, "aria-label": ariaLabel }: any) => (
    <a href={href} aria-label={ariaLabel}>
      {children}
    </a>
  ),
}));

describe("ProjectHeader", () => {
  it("renders the title", () => {
    render(<ProjectHeader title="Still Life" path="works" />);
    expect(screen.getByText("Still Life")).toBeInTheDocument();
  });

  it("renders prev link when prevId provided", () => {
    render(<ProjectHeader title="Test" prevId="prev-work" path="works" />);
    expect(screen.getByRole("link", { name: /previous artwork/i })).toHaveAttribute(
      "href",
      "/works/prev-work"
    );
  });

  it("renders next link when nextId provided", () => {
    render(<ProjectHeader title="Test" nextId="next-work" path="works" />);
    expect(screen.getByRole("link", { name: /next artwork/i })).toHaveAttribute(
      "href",
      "/works/next-work"
    );
  });

  it("does not render prev link when prevId is absent", () => {
    render(<ProjectHeader title="Test" nextId="next-work" path="works" />);
    expect(screen.queryByRole("link", { name: /previous artwork/i })).toBeNull();
  });

  it("does not render next link when nextId is absent", () => {
    render(<ProjectHeader title="Test" prevId="prev-work" path="works" />);
    expect(screen.queryByRole("link", { name: /next artwork/i })).toBeNull();
  });

  it("uses the path prop in link hrefs", () => {
    render(<ProjectHeader title="Test" prevId="p1" nextId="n1" path="history" />);
    expect(screen.getByRole("link", { name: /previous artwork/i })).toHaveAttribute(
      "href",
      "/history/p1"
    );
    expect(screen.getByRole("link", { name: /next artwork/i })).toHaveAttribute(
      "href",
      "/history/n1"
    );
  });
});
