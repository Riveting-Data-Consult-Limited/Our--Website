import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { BlogCard } from "@/components/BlogCard";
import { Post } from "@/api/cms";

describe("BlogCard Component", () => {
  const mockPost: Post = {
    id: "test-1",
    title: "Test Blog Post",
    slug: "test-blog-post",
    excerpt: "This is a test excerpt",
    content: "This is the full content of the blog post",
    featured_image: "https://example.com/image.png",
    author_id: "author-1",
    status: "published",
    published_at: "2026-07-16T12:00:00Z",
    created_at: "2026-07-16T12:00:00Z",
    updated_at: "2026-07-16T12:00:00Z",
  };

  it("should render blog card with title and excerpt", () => {
    render(
      <BrowserRouter>
        <BlogCard post={mockPost} />
      </BrowserRouter>
    );

    expect(screen.getByText("Test Blog Post")).toBeInTheDocument();
    expect(screen.getByText("This is a test excerpt")).toBeInTheDocument();
  });

  it("should render featured image", () => {
    render(
      <BrowserRouter>
        <BlogCard post={mockPost} />
      </BrowserRouter>
    );

    const img = screen.getByAltText("Test Blog Post") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("image.png");
  });

  it("should display published date", () => {
    render(
      <BrowserRouter>
        <BlogCard post={mockPost} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Jul 16, 2026/)).toBeInTheDocument();
  });

  it("should link to blog post", () => {
    render(
      <BrowserRouter>
        <BlogCard post={mockPost} />
      </BrowserRouter>
    );

    const link = screen.getByRole("link") as HTMLAnchorElement;
    expect(link.href).toContain("/blog/test-blog-post");
  });

  it("should render without featured image", () => {
    const postWithoutImage = { ...mockPost, featured_image: undefined };

    render(
      <BrowserRouter>
        <BlogCard post={postWithoutImage} />
      </BrowserRouter>
    );

    expect(screen.getByText("Test Blog Post")).toBeInTheDocument();
  });
});
