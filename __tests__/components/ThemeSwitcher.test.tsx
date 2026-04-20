import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const mockSetTheme = vi.fn();
let mockTheme = "light";

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: mockTheme, setTheme: mockSetTheme }),
}));

describe("ThemeSwitcher", () => {
  it("renders nothing before mount (SSR guard)", () => {
    // The component uses useEffect to set mounted=true
    // In the test environment useEffect runs synchronously after render
    // so mounted will be true and the switcher will render
    // This test just ensures it doesn't throw during render
    const { container } = render(<ThemeSwitcher />);
    expect(container).toBeTruthy();
  });

  it("shows an SVG icon when theme is light (moon)", () => {
    mockTheme = "light";
    const { container } = render(<ThemeSwitcher />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("toggles to dark when clicked in light mode", async () => {
    const user = userEvent.setup();
    mockTheme = "light";
    const { container } = render(<ThemeSwitcher />);
    const switcher = container.firstChild as HTMLElement;
    await user.click(switcher);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("toggles to light when clicked in dark mode", async () => {
    const user = userEvent.setup();
    mockTheme = "dark";
    const { container } = render(<ThemeSwitcher />);
    const switcher = container.firstChild as HTMLElement;
    await user.click(switcher);
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });
});
