import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return
    onPageChange(page)
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2 mt-12"
      aria-label="Pagination"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-10 w-10 rounded-lg bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white hover:border-purple-500"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant="outline"
          size="icon"
          onClick={() => goToPage(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={
            page === currentPage
              ? "h-10 w-10 rounded-lg bg-purple-600 border-purple-600 text-white hover:bg-purple-500"
              : "h-10 w-10 rounded-lg bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white hover:border-purple-500"
          }
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-10 w-10 rounded-lg bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white hover:border-purple-500"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}