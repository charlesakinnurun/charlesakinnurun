import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function CertificationCard({ certification }) {
  return (
    <Card className="group bg-transparent hover:bg-[#242424] border-zinc-800 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-0.5 p-6">
      <div className="flex items-start gap-5">
        <div className="relative w-14 h-14 shrink-0">
          <Image
            src={certification.logo}
            alt={`${certification.organization} logo`}
            fill
            className="object-contain rounded-lg"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-white leading-tight mb-1">
                {certification.name}
              </h3>
              <p className="text-sm text-zinc-400">
                {certification.organization} · {certification.date}
              </p>
            </div>

            {certification.url && (
              <Link
                href={certification.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-purple-400 transition-colors duration-300 shrink-0 mt-0.5"
                aria-label={`Visit ${certification.organization}`}
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>

          <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
            {certification.description}
          </p>

          {certification.credentialId && (
            <p className="text-xs text-zinc-500 mt-2">
              Credential ID:{" "}
              <span className="text-zinc-400 font-mono">
                {certification.credentialId}
              </span>
            </p>
          )}

          {certification.url && (
            <div className="mt-3">
              <Link
                href={certification.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-white hover:text-purple-400 transition-colors duration-300"
              >
                View Credential
                <ExternalLink className="ml-1.5 w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
