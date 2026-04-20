import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectGrid from "@/components/ProjectGrid";
import type { Project } from "@/types/project";

vi.mock("next/link", () => ({
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, priority, style }: any) => (
    <img src={src} alt={alt} data-priority={priority ? "true" : "false"} style={style} />
  ),
}));

const projects: Project[] = [
  { id: "work-1", title: "First Work", dimensions: "12x16", media: "Oil", image: "work1.jpg", featured: true, order: 1 },
  { id: "work-2", title: "Second Work", dimensions: "8x10", media: "Watercolor", image: "work2.jpg", featured: true, order: 2 },
  { id: "work-3", title: "Third Work", dimensions: "24x36", media: "Acrylic", image: "work3.jpg", featured: false, order: 3 },
  { id: "work-4", title: "Fourth Work", dimensions: "5x7", media: "Pencil", image: "work4.jpg", featured: false, order: 4 },
];

describe("ProjectGrid", () => {
  it("renders a link for each project", () => {
    render(<ProjectGrid projects={projects} path="works" />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4);
  });

  it("links to the correct project path", () => {
    render(<ProjectGrid projects={projects} path="works" />);
    expect(screen.getAllByRole("link")[0]).toHaveAttribute("href", "/works/work-1");
  });

  it("uses the path prop in hrefs", () => {
    render(<ProjectGrid projects={projects} path="history" />);
    expect(screen.getAllByRole("link")[0]).toHaveAttribute("href", "/history/work-1");
  });

  it("renders images with alt text from title", () => {
    render(<ProjectGrid projects={projects} path="works" />);
    expect(screen.getByAltText("First Work")).toBeInTheDocument();
  });

  it("sets priority on first 3 images only", () => {
    render(<ProjectGrid projects={projects} path="works" />);
    const imgs = screen.getAllByRole("img");
    expect(imgs[0]).toHaveAttribute("data-priority", "true");
    expect(imgs[2]).toHaveAttribute("data-priority", "true");
    expect(imgs[3]).toHaveAttribute("data-priority", "false");
  });

  it("appends inch marks to dimensions in hover overlay", () => {
    render(<ProjectGrid projects={projects} path="works" />);
    expect(screen.getByText(/12"x16"/)).toBeInTheDocument();
  });

  it("renders an empty grid when projects array is empty", () => {
    render(<ProjectGrid projects={[]} path="works" />);
    expect(screen.queryByRole("link")).toBeNull();
  });
});
