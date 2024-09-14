import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Providers } from "@/providers"
import { SpeedInsights } from "@vercel/speed-insights/next"
import NextTopLoader from "nextjs-toploader"
import { Toaster } from "sonner"

import { Header } from "@/shared"
import { siteConfig } from "@/config/site"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<NextTopLoader
						color="#2299DD"
						initialPosition={0.08}
						crawlSpeed={200}
						height={3}
						crawl={true}
						showSpinner={true}
						easing="ease"
						speed={200}
						shadow="0 0 10px #2299DD,0 0 5px #2299DD"
					/>
					<Header />
					<main className="flex flex-col">{children}</main>
					<SpeedInsights />
				</Providers>
				<Toaster
					richColors={true}
					position="top-right"
					closeButton
					toastOptions={{
						classNames: {
							closeButton: `!self-end m-3 left-[90%]`
						}
					}}
				/>
			</body>
		</html>
	)
}
