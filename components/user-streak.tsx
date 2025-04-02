"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Flame } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function UserStreak() {
  const [streakDays] = useState(7)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="flex items-center gap-1 bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Flame className="h-4 w-4" />
            <span className="text-xs font-medium">{streakDays}</span>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>You're on a {streakDays}-day learning streak!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

