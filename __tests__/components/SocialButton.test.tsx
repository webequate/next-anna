import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SocialButton from "@/components/SocialButton";

vi.mock("next/link", () => ({
  default: ({ href, children, title, "aria-label": ariaLabel, target }: any) => (
    <a href={href} title={title} aria-label={ariaLabel} target={target}>
      {children}
    </a>
  ),
}));

const networks = ["facebook", "github", "instagram", "linkedin", "twitter", "youtube"];

describe("SocialButton", () => {
  it("renders a link with the correct href", () => {
    render(<SocialButton name="instagram" url="https://instagram.com/test" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://instagram.com/test");
  });

  it("opens in a new tab", () => {
    render(<SocialButton name="instagram" url="https://instagram.com/test" />);
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });

  it("sets aria-label to the network name", () => {
    render(<SocialButton name="twitter" url="https://twitter.com/test" />);
    expect(screen.getByRole("link", { name: "twitter" })).toBeInTheDocument();
  });

  it.each(networks)("renders an SVG icon for %s", (name) => {
    const { container } = render(<SocialButton name={name} url={`https://${name}.com`} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("falls back to Facebook icon for unknown network", () => {
    const { container } = render(<SocialButton name="unknown" url="https://example.com" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
