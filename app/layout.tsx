import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "NoteNexus.ai - AI-Powered Notes Platform",
	description: "AI-powered notes platform for students. Learn smarter, not harder.",
	icons: {
		icon: "/favicon.ico",
	},
	generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			</head>
			<body className={`${inter.className} min-h-screen antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
					<div className="relative min-h-screen flex flex-col">{children}</div>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}



import './globals.css'