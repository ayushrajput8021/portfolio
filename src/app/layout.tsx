import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { siteConfig } from '@/config/site-config';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';

const nunito = localFont({
	src: './fonts/Nunito-Regular.ttf',
	weight: 'normal',
	style: 'normal',
});

export const metadata: Metadata = siteConfig;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			style={{
				colorScheme: 'dark',
			}}
		>
			<body className={`${nunito.className} antialiased`}>
				{children}
				<Analytics />
				<SpeedInsights />
				<GoogleAnalytics gaId='G-TBV6GNBDJ8' />
			</body>
		</html>
	);
}
