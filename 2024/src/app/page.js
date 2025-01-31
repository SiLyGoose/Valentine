"use client";

import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";

import clsx from "clsx";
import StarchCard from "@/app/components/StarchCard";
import NavBar from "@/app/components/NavBar";
import Header from "@/app/components/Header";

export default function Home() {
	const [initialized, setInitialized] = useState(false);

	return (
		<main className={clsx("d-flex flex-column h-100 justify-content-between", styles.mainContainer)}>
			<div
				id="valentineFinder"
				onClick={() => {
					setInitialized(true);
					setTimeout(() => {
						document.getElementById("valentineFinder").style.display = "none";
					}, 850);
				}}
				className={clsx(styles.popup, styles.landingPopup, { [styles.hide]: initialized })}
			>
				<div className={styles.popupMask} />
				<div className={styles.popupContainer}>
					<div className={styles.prompt}>
						<span>
							Find your <span style={{ color: "var(--baby-pink)" }}>Starchmate</span> today!
						</span>
					</div>
				</div>
			</div>
			<Header />
			<StarchCard />
			<NavBar />
		</main>
	);
}
