import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

const SmartNotesDiscovery = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Smart Notes Discovery</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-purple-500 hover:text-purple-400 hover:bg-purple-500/10"
          asChild
        >
          <Link href="/notes">
            View all
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Discovery cards would go here */}
        <div className="bg-card rounded-lg p-4 border shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-medium mb-2">Machine Learning Basics</h3>
          <p className="text-sm text-muted-foreground">Introduction to key ML concepts and algorithms</p>
        </div>
        <div className="bg-card rounded-lg p-4 border shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-medium mb-2">React Hooks Deep Dive</h3>
          <p className="text-sm text-muted-foreground">Advanced usage patterns for React hooks</p>
        </div>
      </div>
    </div>
  )
}

export default SmartNotesDiscovery

