import { ArrowUpRight } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ContributionCard from "@/components/ContributionCard"
import { openSourceContributions } from "@/data/openSource"

export default function OpenSource() {
  const displayContributions = openSourceContributions.slice(0, 3);

  return (
    <section id="open-source" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-6xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-white to-zinc-600 text-transparent bg-clip-text">
          Open Source Contributions
        </h2>

        <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
          Actively building in the open — sharing projects, shipping features,
          and contributing to the data science and machine learning community.
        </p>

        <div className="space-y-4">
          {displayContributions.map((contribution) => (
            <ContributionCard
              key={contribution.id}
              contribution={contribution}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/open-source">
            <Button
              variant="outline"
              size="lg"
              className="text-black bg-white border-white hover:bg-black hover:text-white transition-colors duration-300"
            >
              View All Open Source Contributions
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}