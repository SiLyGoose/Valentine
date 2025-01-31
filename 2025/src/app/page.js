"use client";

import styles from "./page.module.css";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
	const [valentineAccepted, setValentineAccepted] = useState(false);

	const [gifUri, setGifUri] = useState("/mocha-dance.gif");
	const [prompt, setPrompt] = useState("Will you be my Valentine?");
	const [noCount, setNoCount] = useState(0);

	const onAcceptance = () => {
		setValentineAccepted(true);
		setGifUri("/mocha-milk-kiss.gif");
		setPrompt("I knew you'd say yes <3");
		setNoCount(0);
	};

	const incrementNoCount = () => {
		setNoCount(noCount + 1);
	};

	const rejections = [
		"No",
		"Are you sure?",
		"What if I asked really nicely?",
		"Pretty please?",
		"With extra caviar on top?",
		"PLEASE",
		"POOKIE :(",
		"IT DOESN'T HAVE TO BE LIKE THIS",
		"Last chance",
		"Last last chance",
		"Last last last chance",
		"Brother.",
		"Are we going to have some problems?",
		"I'm not playing with you.",
		"Last last last last chance",
		"FINAL CHANCE",
		"I stg",
		"Say Yes. Now. 🔪",
	];

	const getRejection = () => {
		return rejections[Math.min(noCount, rejections.length - 1)];
	};

	return (
		<div className={styles.page}>
			<div className="gifContainer">
				<Image
					className={styles.gif}
					src={gifUri}
					alt="Mocha Milk Gif"
					height={200}
					width={250}
					unoptimized
				/>
			</div>
			<div className={styles.textContainer}>
				<span>{prompt}</span>
			</div>
			{!valentineAccepted && (
				<div className={styles.buttonContainer}>
					<button
						data-nocount={noCount}
						style={{ fontSize: `${noCount * 8 + 16}px` }}
						onClick={onAcceptance}
					>
						<span>{noCount < 25 ? "Yes" : "Yes (you have no choice now)"}</span>
					</button>
					{noCount < 25 && (
						<button onClick={incrementNoCount}>
							<span>{getRejection()}</span>
						</button>
					)}
				</div>
			)}
		</div>
	);
}
