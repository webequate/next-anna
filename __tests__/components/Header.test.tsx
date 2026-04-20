import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/Header";

vi.mock("next/link", () => ({
  default: ({ href, children, className, "aria-label": ariaLabel }: any) => (
    <a href={href} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/AnnaEliseJohnson", () => ({
  default: () => <span>Anna Elise Johnson</span>,
}));

vi.mock("@/components/SocialButton", () => ({
  default: () => <span data-testid="social-button" />,
}));

vi.mock("@/components/ThemeSwitcher", () => ({
  default: () => <span data-testid="theme-switcher" />,
}));

vi.mock("@/components/Hamburger", () => ({
  default: ({ showMenu, toggleMenu }: { showMenu: boolean; toggleMenu: () => void }) => (
    <button onClick={toggleMenu} aria-label="Hamburger Menu">
      {showMenu ? "close" : "open"}
    </button>
  ),
}));

const mockPathname = vi.fn(() => "/");
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

const socialLink = { name: "instagram", handle: "test", url: "https://instagram.com/test" };

describe("Header", () => {
  it("renders nav links", () => {
    render(<Header socialLink={socialLink} />);
    expect(screen.getAllByRole("link", { name: /home/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /about/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /press/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /contact/i })[0]).toBeInTheDocument();
  });

  it("marks Home active on '/'", () => {
    mockPathname.mockReturnValue("/");
    render(<Header socialLink={socialLink} />);
    // homeLinks[0] is the logo link; homeLinks[1] is the desktop nav Home link
    const homeLinks = screen.getAllByRole("link", { name: /home/i });
    expect(homeLinks[1]).toHaveClass("active");
  });

  it("marks Home active on '/works/...'", () => {
    mockPathname.mockReturnValue("/works/some-painting");
    render(<Header socialLink={socialLink} />);
    const homeLinks = screen.getAllByRole("link", { name: /home/i });
    expect(homeLinks[1]).toHaveClass("active");
  });

  it("marks About active on '/about'", () => {
    mockPathname.mockReturnValue("/about");
    render(<Header socialLink={socialLink} />);
    const aboutLinks = screen.getAllByRole("link", { name: /about/i });
    expect(aboutLinks[0]).toHaveClass("active");
  });

  it("does not mark About active on '/'", () => {
    mockPathname.mockReturnValue("/");
    render(<Header socialLink={socialLink} />);
    const aboutLinks = screen.getAllByRole("link", { name: /about/i });
    expect(aboutLinks[0]).not.toHaveClass("active");
  });

  it("toggles mobile menu on hamburger click", async () => {
    const user = userEvent.setup();
    mockPathname.mockReturnValue("/");
    render(<Header socialLink={socialLink} />);
    const btn = screen.getByRole("button", { name: /hamburger menu/i });
    expect(btn).toHaveTextContent("open");
    await user.click(btn);
    expect(btn).toHaveTextContent("close");
  });

  it("renders theme switcher", () => {
    render(<Header socialLink={socialLink} />);
    expect(screen.getByTestId("theme-switcher")).toBeInTheDocument();
  });
});
