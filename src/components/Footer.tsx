import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";

export function Footer() {
  return (
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
              <li><a href="/" className="transition hover:text-white">Home</a></li>
              <li><a href="/#services" className="transition hover:text-white">Services</a></li>
              <li><a href="/#academy" className="transition hover:text-white">Digital Academy</a></li>
              <li><a href="/#contact" className="transition hover:text-white">Contact Us</a></li>
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
  );
}
