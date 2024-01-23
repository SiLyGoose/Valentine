"use client";

import { useEffect } from "react";
import styles from "@/app/page.module.css";

import clsx from "clsx";
import StarchCard from "@/app/components/StarchCard";
import NavBar from "@/app/components/NavBar";
import Header from "@/app/components/Header";

export default function Home() {
	return (
		<main className={clsx("d-flex flex-column h-100 justify-content-between", styles.mainContainer)}>
			<Header />
			<StarchCard />
			<NavBar />
		</main>
	);
}
