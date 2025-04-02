"use client"

import { Button } from "@/components/ui/button"

export function AuthCheck() {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm">
        Sign In
      </Button>
    </div>
  )
}

