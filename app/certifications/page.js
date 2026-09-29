'use client'

import { useState } from "react";
import { certifications } from "@/data/certifications";
import CertificationCard from "@/components/CertificationCard";
import Pagination from "@/components/Pagination";

const CERTIFICATIONS_PER_PAGE = 6

export default function Certifications() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(certifications.length / CERTIFICATIONS_PER_PAGE)
  const startIndex = (currentPage - 1) * CERTIFICATIONS_PER_PAGE
  const paginatedCertifications = certifications.slice(
    startIndex,
    startIndex + CERTIFICATIONS_PER_PAGE
  )

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

        <div key={currentPage} className="space-y-4 animate-in fade-in duration-300">
          {paginatedCertifications.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}