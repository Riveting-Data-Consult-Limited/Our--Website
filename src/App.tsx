import {
  Briefcase,
  BarChart3,
  Cpu,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
} from "lucide-react";

const services = [
  {
    title: "Software & Web Development",
    description:
      "Modern web platforms, automation tools, and digital products crafted for growth.",
    icon: Briefcase,
  },
  {
    title: "Data Analytics",
    description:
      "Transform business data into insight, dashboards, and trusted decisions.",
    icon: BarChart3,
  },
  {
    title: "AI Agents & Chatbots",
    description:
      "Deliver intelligent customer experiences and internal process automation.",
    icon: Cpu,
  },
  {
    title: "Process Automation",
    description:
      "Streamline operations with workflows that reduce manual work and improve accuracy.",
    icon: Sparkles,
  },
  {
    title: "Microsoft Tech Trainings",
    description:
      "Build capacity with practical Microsoft certifications and digital skills programs.",
    icon: BookOpen,
  },
  {
    title: "Regulatory Compliance",
    description:
      "Navigate business registration, reporting, and governance with expert guidance.",
    icon: ShieldCheck,
  },
];

const benefits = [
  {
    title: "Data-Driven Delivery",
    description: "Decisions backed by rigorous analysis and business intelligence.",
  },
  {
    title: "Practical Impact",
    description: "Solutions designed for measurable results in the local market.",
  },
  {
    title: "Local Expertise",
    description: "Deep understanding of Nigerian and African business challenges.",
  },
  {
    title: "Global Standards",
    description: "Professional services that meet international quality expectations.",
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-50">
              Riveting Data Consult
            </p>
            <p className="text-sm text-slate-400">Technology, data and strategy for growth.</p>
          </div>
          <nav className="flex gap-6 text-sm text-slate-300">
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#advantage" className="transition hover:text-white">
              Advantage
            </a>
            <a href="#academy" className="transition hover:text-white">
              Academy
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-20 pt-14">
        <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-[0_30px_120px_-80px_rgba(15,23,42,0.8)] sm:p-14">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-slate-900 to-transparent opacity-30 md:block"></div>
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full bg-sky-500/10 px-3 py-1 text-sm font-medium text-sky-300 ring-1 ring-sky-300/10">
                Digital transformation for Nigerian businesses
              </span>
              <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Driving growth with technology, data, and intelligent business solutions.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Riveting Data Consult Limited helps startups, SMEs, and government programs scale through automation,
                analytics, and Microsoft-backed capacity building.
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
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
                >
                  Explore Services
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8 shadow-xl shadow-slate-950/20">
              <div className="grid gap-6">
                <div className="rounded-3xl bg-slate-900/90 p-6 ring-1 ring-slate-700/60">
                  <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Business Intelligence</p>
                  <h2 className="mt-4 text-2xl font-semibold text-white">Analytics dashboards</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Visualize performance, identify opportunities, and execute with confidence.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-900/90 p-6 ring-1 ring-slate-700/60">
                  <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Microsoft Skills</p>
                  <h2 className="mt-4 text-2xl font-semibold text-white">Training & certification</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Practical programs to build workforce capacity on Azure, Power Platform and modern software.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mt-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-400">What We Offer</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                Comprehensive digital & business solutions
              </h2>
              <p className="mt-4 text-slate-400">
                End-to-end services designed to optimize your operations, strengthen customer service,
                and accelerate impact across your organization.
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

        <section id="advantage" className="mt-20 rounded-3xl border border-slate-800 bg-slate-900/80 p-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-400">Our Advantage</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                Why choose Riveting Data Consult?
              </h2>
              <p className="mt-4 text-slate-400">
                We combine strong technical expertise with business strategy to deliver digital solutions that are modern,
                sustainable, and tailored to local needs.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
                  <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="academy" className="mt-20 grid gap-10 rounded-3xl border border-slate-800 bg-slate-950/90 p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-400">Featured Program</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Riveting Digital Academy</h2>
            <p className="mt-4 text-slate-400 leading-7">
              Upskilling the next generation of digital leaders with Microsoft technologies, digital literacy,
              and workforce development training built for professionals and youth.
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
            <div className="rounded-3xl bg-slate-900/80 p-8">
              <div className="h-80 rounded-3xl bg-slate-800/80 p-6 text-slate-400">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Academy spotlight</p>
                <h3 className="mt-6 text-2xl font-semibold text-white">Practical learning for fast-moving teams</h3>
                <p className="mt-4 leading-7 text-slate-400">
                  Empower your staff with digital skills that support business growth, innovation, and compliance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-slate-800 bg-slate-950/95 py-16">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div>
              <p className="text-lg font-semibold text-white">Riveting Data Consult Limited</p>
              <p className="mt-3 max-w-xl text-slate-400">
                Empowering startups, SMEs, and institutions through technology, data-driven insights, and strategic consulting.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-slate-300">
              <a href="https://ng.linkedin.com/company/riveting-data-consult-rdc" className="inline-flex items-center gap-2 text-slate-300 transition hover:text-white">
                <ExternalLink className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-base font-semibold text-white">Quick Links</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li><a href="#" className="transition hover:text-white">Home</a></li>
                <li><a href="#" className="transition hover:text-white">About Us</a></li>
                <li><a href="#services" className="transition hover:text-white">Services</a></li>
                <li><a href="#academy" className="transition hover:text-white">Digital Academy</a></li>
                <li><a href="#contact" className="transition hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Contact</h3>
              <ul className="mt-4 space-y-4 text-sm text-slate-400">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-sky-400" />
                  <a href="mailto:cchukwuwike@riveting-group.com.ng" className="transition hover:text-white">
                    cchukwuwike@riveting-group.com.ng
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-sky-400" />
                  <a href="tel:+2347068871897" className="transition hover:text-white">
                    +234 706 887 1897
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-sky-400" /> Lagos, Nigeria
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © 2026 Riveting Data Consult Limited. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
