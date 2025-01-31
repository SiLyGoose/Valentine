import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
	variable: "--font-poppins",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	styles: ["normal"],
	subsets: ["latin"],
});

export const metadata = {
	title: "2025 Sack",
	description: "Valentine's Day 2025",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={poppins.variable}>{children}</body>
		</html>
	);
}
