import { ArrowUpRight } from "lucide-react";
import { certifications } from "@/data/certifications";
import CertificationCard from "@/components/CertificationCard";

export default function Certifications() {
  const displayCertifications = certifications.slice(0, 5);

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
          Licenses &amp; Certifications
        </h2>

        {/*<p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
          Professional certifications, scholarships, research programs, and virtual
          experiences in AI, Data Science, and Software Engineering.
        </p>*/}

        <div className="space-y-4">
          {displayCertifications.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/certifications"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-sm font-medium bg-white text-black border border-white hover:bg-black hover:text-white transition-colors duration-300"
          >
            View All Licenses &amp; Certifications
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}