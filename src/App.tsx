export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-2xl rounded-3xl border border-slate-700 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/30">
        <h1 className="text-4xl font-semibold tracking-tight text-white">
          Riveting Data Consult
        </h1>
        <p className="mt-4 text-lg text-slate-300">
          Website restored from repository metadata and ready for production.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            className="rounded-full bg-sky-500 px-5 py-3 font-semibold text-white transition hover:bg-sky-400"
            href="https://github.com/Riveting-Data-Consult-Limited"
          >
            View GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
