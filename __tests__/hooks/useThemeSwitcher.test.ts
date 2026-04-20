import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useThemeSwitcher from "@/hooks/useThemeSwitcher";

// Use real document from jsdom — just spy on classList
let addSpy: ReturnType<typeof vi.spyOn>;
let removeSpy: ReturnType<typeof vi.spyOn>;

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
  };
})();

vi.stubGlobal("localStorage", localStorageMock);

beforeEach(() => {
  localStorageMock.clear();
  addSpy = vi.spyOn(document.documentElement.classList, "add");
  removeSpy = vi.spyOn(document.documentElement.classList, "remove");
});

afterEach(() => {
  addSpy.mockRestore();
  removeSpy.mockRestore();
});

describe("useThemeSwitcher", () => {
  it("defaults to dark theme when localStorage is empty", () => {
    const { result } = renderHook(() => useThemeSwitcher());
    const [activeTheme] = result.current;
    // dark theme → activeTheme is "light"
    expect(activeTheme).toBe("light");
  });

  it("reads saved theme from localStorage on mount", () => {
    localStorageMock.setItem("theme", "light");
    const { result } = renderHook(() => useThemeSwitcher());
    const [activeTheme] = result.current;
    // saved "light" → activeTheme is "dark"
    expect(activeTheme).toBe("dark");
  });

  it("applies theme class to documentElement", () => {
    renderHook(() => useThemeSwitcher());
    expect(addSpy).toHaveBeenCalledWith("dark");
  });

  it("removes opposite theme class when applying theme", () => {
    renderHook(() => useThemeSwitcher());
    expect(removeSpy).toHaveBeenCalledWith("light");
  });

  it("persists theme to localStorage", () => {
    renderHook(() => useThemeSwitcher());
    expect(localStorageMock.getItem("theme")).toBe("dark");
  });

  it("setTheme toggles activeTheme", () => {
    const { result } = renderHook(() => useThemeSwitcher());
    act(() => {
      result.current[1]("light");
    });
    expect(result.current[0]).toBe("dark");
  });

  it("does not loop — Effect 1 runs only once on mount", () => {
    const setItemSpy = vi.spyOn(localStorageMock, "setItem");
    renderHook(() => useThemeSwitcher());
    // One setItem call from Effect 2, not multiple from a loop
    expect(setItemSpy).toHaveBeenCalledTimes(1);
    setItemSpy.mockRestore();
  });
});
