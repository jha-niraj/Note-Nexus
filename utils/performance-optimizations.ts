"use client"

import { useEffect } from "react"

import { useState } from "react"

import React from "react"

/**
 * Performance optimization utilities for the NoteNexus.ai platform
 */

// Image optimization helper
export const getOptimizedImageUrl = (url: string, width: number, quality = 80): string => {
  // For placeholder images, use the existing URL format
  if (url.includes("/placeholder.svg")) {
    return url
  }

  // For real images, add width and quality parameters
  const baseUrl = url.split("?")[0]
  return `${baseUrl}?w=${width}&q=${quality}&auto=format`
}

// Lazy loading helper for components
export const lazyLoadComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
): React.LazyExoticComponent<T> => {
  return React.lazy(importFunc)
}

// Debounce function for search and other intensive operations
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Memoize expensive calculations
export function memoize<T extends (...args: any[]) => any>(func: T): T {
  const cache = new Map()

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = func(...args)
    cache.set(key, result)
    return result
  }) as T
}

// Intersection Observer hook for lazy loading content
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = { threshold: 0.1 },
): boolean {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!elementRef.current) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)

    observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
    }
  }, [elementRef, options])

  return isVisible
}

