import styles from "@/app/page.module.css";
import { rand } from "@/app/util/helpers";

import gsap from "gsap";

export default function Popup({ prompt, closePopup }) {
	const choiceList = prompt === null ? ["Ok"] : ["Yes", "No"];

	const rejectStatementList = ["Sorry, I can't take no for an answer.", "You THOUGHT.", "It's yes or yes.", "PLEASE. PLEASE SAY YES."];
	const rejectStatement = rejectStatementList[rand(0, rejectStatementList.length - 1)];

	var startTime = Date.now() - 1000;
	const rejectionConfig = {
		timeoutMs: 1000,
	};

	return (
		<div className={styles.popup}>
			<div className={styles.popupMask} />
			<div id="popup" className={styles.popupContainer}>
				<div className={styles.prompt}>
					<span id="prompt" className={styles.text}>
						{prompt === null ? rejectStatement : prompt}
					</span>
				</div>
				<div id="popupChoices" className={styles.choices}>
					{choiceList.map((choice, index) => (
						<div
							key={index}
							data-index={index}
							className="w-100 text-center"
							onClick={(event) => {
								event.stopPropagation();
								if (Date.now() - startTime > rejectionConfig.timeoutMs) {
									if (prompt && index === 1) {
										document.getElementById("prompt").innerText = rejectStatementList[rand(0, rejectStatementList.length - 1)];
										startTime = Date.now();
										return;
									} else {
										closePopup((prompt && index === 0) ? "accepted" : false);
									}
								}
							}}
						>
							<span className={styles.text}>{choice}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
