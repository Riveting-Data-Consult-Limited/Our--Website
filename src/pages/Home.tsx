import {
  Briefcase,
  BarChart3,
  Cpu,
  Sparkles,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { seoDefaults, organizationSchema } from "@/utils/seo";

const services = [
  {
    title: "Software & Web Development",
    description:
      "Custom digital solutions tailored to your business needs, from MVPs to enterprise platforms.",
    icon: Briefcase,
  },
  {
    title: "Data Analytics",
    description:
      "Turn your business data into actionable insights with advanced visualization and analysis.",
    icon: BarChart3,
  },
  {
    title: "AI Agents & Chatbots",
    description:
      "Automate customer support and internal workflows with intelligent AI-powered assistants.",
    icon: Cpu,
  },
  {
    title: "Process Automation",
    description:
      "Streamline operations and eliminate repetitive tasks with custom automation workflows.",
    icon: Sparkles,
  },
  {
    title: "Microsoft Tech Trainings",
    description:
      "Official Microsoft technology certifications and practical digital skills for your workforce.",
    icon: BookOpen,
  },
  {
    title: "Regulatory Compliance",
    description:
      "Navigate business registration and legal requirements with expert guidance and support.",
    icon: ShieldCheck,
  },
];

const benefits = [
  {
    title: "Data-Driven",
    description: "Decisions backed by rigorous analysis and empirical evidence.",
  },
  {
    title: "Practical Impact",
    description: "Real-world solutions that translate into immediate business growth.",
  },
  {
    title: "Local Context",
    description: "Deep understanding of the Nigerian and African business ecosystem.",
  },
  {
    title: "Global Standards",
    description: "Delivering excellence that competes on an international scale.",
  },
];

export function Home() {
  return (
    <>
      <SEO
        title="Digital Transformation & Data Solutions"
        description={seoDefaults.defaultDescription}
        canonical={seoDefaults.siteUrl}
        ogImage={seoDefaults.defaultImage}
      >
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </SEO>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <main className="mx-auto max-w-7xl px-6 pb-20 pt-14">
          <section
            aria-label="Hero section"
            className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-[0_30px_120px_-80px_rgba(15,23,42,0.8)] sm:p-12"
          >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_30%)] opacity-70" />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full bg-sky-500/10 px-3 py-1 text-sm font-medium text-sky-300 ring-1 ring-sky-300/10">
                Empowering Business Through Innovation
              </span>
              <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Driving Growth with Technology & Data Solutions
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Riveting Data Consult Limited helps startups, SMEs, and government programs scale through digital transformation, automation, and capacity building.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
                >
                  Talk to Our Team
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
                >
                  Explore Services
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center rounded-[2rem] bg-slate-950/90 p-8 shadow-xl shadow-slate-950/20">
              <div className="h-72 w-full rounded-[1.75rem] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 text-slate-400 shadow-inner shadow-slate-950/30">
                <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-slate-800 bg-slate-950/80 p-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Corporate Consulting</p>
                    <h2 className="mt-4 text-3xl font-semibold text-white">Modern business systems built to scale</h2>
                    <p className="mt-4 text-sm leading-6 text-slate-400">
                      A polished digital experience for stakeholders, customers, and teams.
                    </p>
                  </div>
                  <div className="mt-4 rounded-3xl bg-slate-900/90 p-4 text-sm text-slate-400">
                    <p className="font-semibold text-white">Trusted by ambitious teams seeking measurable growth.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mt-20" aria-label="Our services">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-400">What We Offer</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Comprehensive Digital & Business Solutions</h2>
              <p className="mt-4 text-slate-400">
                We provide end-to-end consulting and technology services designed to optimize your business operations and accelerate impact.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 transition hover:border-sky-500/40 hover:bg-slate-900">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300 ring-1 ring-sky-500/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{service.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="advantage" className="mt-20 rounded-3xl border border-slate-800 bg-slate-900/80 p-10" aria-label="Our competitive advantage">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-400">Our Advantage</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Why Riveting Data Consult?</h2>
              <p className="mt-4 text-slate-400">
                We combine deep technical expertise with business strategy to deliver solutions that are not just modern, but sustainable and effective in the local market.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
                    <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8">
              <div className="rounded-[1.75rem] bg-slate-900/90 p-8">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Request a Strategic Consultation</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">Ready to transform your business?</h3>
                <p className="mt-4 text-slate-400 leading-7">
                  Let's discuss your goals and how our technology solutions can get you there.
                </p>
                <form className="mt-8 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
                  >
                    Book Discovery Call
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="academy" className="mt-20 grid gap-10 rounded-3xl border border-slate-800 bg-slate-950/90 p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center" aria-label="Featured training program">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-400">Featured Program</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Riveting Digital Academy</h2>
            <p className="mt-4 text-slate-400 leading-7">
              Upskilling the next generation of digital leaders. From Microsoft technology certifications to EdTech solutions, we bridge the skill gap for youth and professionals.
            </p>
            <ul className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              <li className="rounded-2xl bg-slate-900/80 px-4 py-3">Microsoft Technologies</li>
              <li className="rounded-2xl bg-slate-900/80 px-4 py-3">Digital Literacy</li>
              <li className="rounded-2xl bg-slate-900/80 px-4 py-3">Workforce Development</li>
              <li className="rounded-2xl bg-slate-900/80 px-4 py-3">EdTech Solutions</li>
            </ul>
            <a
              href="#contact"
              className="mt-8 inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Learn More
            </a>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
            <div className="h-full rounded-3xl bg-slate-900/80 p-8">
              <div className="h-80 rounded-3xl bg-slate-800/90 p-6 text-slate-400">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Digital Academy</p>
                <h3 className="mt-6 text-2xl font-semibold text-white">Practical learning for fast-moving teams</h3>
                <p className="mt-4 leading-7 text-slate-400">
                  Empower your staff with digital skills that support business growth, innovation, and compliance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
