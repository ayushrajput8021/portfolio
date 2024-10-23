import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { siteConfig } from '@/config/site-config';

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
		<html lang='en'>
			<body className={`${nunito.className} antialiased`}>{children}</body>
		</html>
	);
}
