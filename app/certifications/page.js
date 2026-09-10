import { certifications } from "@/data/certifications";
import CertificationCard from "@/components/CertificationCard";

export default function Certifications() {
  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
          Licenses &amp; Certifications
        </h2>

        {/*<p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
          Professional certifications, scholarships, research programs, and virtual
          experiences in AI, Data Science, and Software Engineering.
        </p>*/}

        <div className="space-y-4">
          {certifications.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}