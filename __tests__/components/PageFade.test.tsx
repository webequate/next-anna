import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import PageFade from "@/components/PageFade";

const mockPathname = vi.fn(() => "/");
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

const sessionStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
  };
})();

vi.stubGlobal("sessionStorage", sessionStorageMock);

beforeEach(() => {
  sessionStorageMock.clear();
  mockPathname.mockReturnValue("/");
});

describe("PageFade", () => {
  it("renders children", () => {
    const { getByText } = render(
      <PageFade><span>Hello</span></PageFade>
    );
    expect(getByText("Hello")).toBeInTheDocument();
  });

  it("adds fade-in class on first visit", () => {
    const { container } = render(
      <PageFade><span>Content</span></PageFade>
    );
    expect(container.firstChild).toHaveClass("fade-in");
  });

  it("skips fade-in on repeated visit to same pathname", () => {
    sessionStorageMock.setItem("page-fade-key", "/");
    const { container } = render(
      <PageFade><span>Content</span></PageFade>
    );
    expect(container.firstChild).not.toHaveClass("fade-in");
  });

  it("mode=root groups /works/* under the same fade key", () => {
    mockPathname.mockReturnValue("/works/some-painting");
    const { container } = render(
      <PageFade mode="root"><span>Content</span></PageFade>
    );
    // First visit to /works root — should animate
    expect(container.firstChild).toHaveClass("fade-in");
    expect(sessionStorageMock.getItem("page-fade-key")).toBe("/works");
  });

  it("mode=mount always animates regardless of sessionStorage", () => {
    sessionStorageMock.setItem("page-fade-key", "mount");
    const { container } = render(
      <PageFade mode="mount"><span>Content</span></PageFade>
    );
    expect(container.firstChild).toHaveClass("fade-in");
  });

  it("stores current pathname in sessionStorage after animation", () => {
    mockPathname.mockReturnValue("/about");
    render(<PageFade><span>Content</span></PageFade>);
    expect(sessionStorageMock.getItem("page-fade-key")).toBe("/about");
  });
});
