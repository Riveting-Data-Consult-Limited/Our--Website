import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Post } from "@/api/cms";

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-6 transition hover:border-sky-500/40 hover:bg-slate-900"
    >
      {post.featured_image && (
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-48 object-cover rounded-xl mb-4 group-hover:opacity-80 transition"
        />
      )}

      <h3 className="text-xl font-semibold text-white group-hover:text-sky-400 transition">
        {post.title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-400 line-clamp-2">{post.excerpt}</p>

      <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-800/50">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.published_at}>
            {new Date(post.published_at || post.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        </div>
        <ArrowRight className="h-4 w-4 text-sky-400 group-hover:translate-x-1 transition" />
      </div>
    </Link>
  );
}
