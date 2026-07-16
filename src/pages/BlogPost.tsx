import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { postsApi, Post } from "@/api/cms";

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const loadPost = async () => {
      try {
        setIsLoading(true);
        const data = await postsApi.getBySlug(slug);
        setPost(data);
      } catch (err) {
        console.error("Failed to load blog post:", err);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-slate-400">Loading article...</p>
      </div>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-3xl px-6 py-20">
        {/* Hero */}
        {post.featured_image && (
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-2xl mb-12"
          />
        )}

        {/* Article Header */}
        <article>
          <h1 className="text-5xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-slate-400 mb-8 pb-8 border-b border-slate-800">
            <Calendar className="h-5 w-5" />
            <time dateTime={post.published_at}>
              {new Date(post.published_at || post.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div
              className="text-slate-300 leading-8 space-y-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Back Link */}
          <div className="mt-16 pt-8 border-t border-slate-800">
            <a href="/blog" className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 transition">
              ← Back to articles
            </a>
          </div>
        </article>
      </main>
    </div>
  );
}
