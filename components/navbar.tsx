import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, BookOpen } from "lucide-react"
import MobileMenu from "./mobile-menu"

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MobileMenu />

        <Link href="/" className="flex items-center gap-2 mr-6 hidden md:flex">
          <BookOpen className="h-6 w-6 text-purple-500" />
          <span className="font-bold text-xl text-purple-500">NoteNexus.ai</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium flex-1">
          <Link href="/" className="transition-colors hover:text-foreground/80">
            Home
          </Link>
          <Link href="/explore" className="transition-colors hover:text-foreground/80">
            Explore
          </Link>
          <Link href="/ai-tools" className="transition-colors hover:text-foreground/80">
            AI Tools
          </Link>
          <Link href="/community" className="transition-colors hover:text-foreground/80">
            Community
          </Link>
          <Link href="/quizzes" className="transition-colors hover:text-foreground/80">
            Quizzes
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4 ml-auto">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search notes..." className="w-full pl-8 rounded-full bg-background" />
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile logo (centered) */}
        <div className="flex md:hidden items-center justify-center flex-1">
          <Link href="/" className="flex items-center gap-1">
            <BookOpen className="h-5 w-5 text-purple-500" />
            <span className="font-bold text-lg text-purple-500">NoteNexus.ai</span>
          </Link>
        </div>

        {/* Mobile search button */}
        <Button variant="ghost" size="icon" className="ml-auto md:hidden">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </header>
  )
}

export default Navbar

