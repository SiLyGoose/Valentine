import styles from "@/app/page.module.css";

import Popup from "@/app/components/Overlay/Popup";

import { faHeart, faMessage, faPhone, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function StarchCard() {
	const optionList = [
		{ alt: "pass", icon: faXmark, primary: "var(--pass-red)", secondary: "rgb(255,92,60)" },
		{ alt: "like", icon: faHeart, primary: "var(--like-green)", secondary: "rgb(111,255,234)" },
	];

	const selectedOptionList = [
		{ alt: "call", icon: faPhone, primary: "var(--call-purple)" },
		{ alt: "message", icon: faMessage, primary: "var(--message-blue)" },
	];

	const responseMap = {
		pass: [null],
		like: ["Will you be my Valentine?"],
	};

	const [selectedOption, setSelectedOption] = useState(null);
	const [responseProvided, setResponseProvided] = useState(false);

	useEffect(() => {
		const cardWrapper = document.getElementById("cardWrapper");
		const popup = document.getElementById("popup");

		const onPageClick = (event) => {
			event.preventDefault();

			// element focus (elF), element action (elA)
			const elF = event.target.closest("div[data-focus]"),
				elA = event.target.closest("div[data-action]");
			if (!elF && !elA && !popup) return cardWrapper.classList.remove(styles.focusMask);

			if (!elA && !popup) {
				elF.classList.toggle(styles.focusMask);
			} else if (popup) {
				if (!event.target.closest("#popup")) {
					setSelectedOption(null);
				}
			} else {
				setSelectedOption(elA?.dataset?.option);
			}
		};

		document.onclick = onPageClick;
	}, [selectedOption]);

	return (
		<>
			<div className={clsx("d-flex h-100 w-100 pb-2 align-items-center justify-content-center overflow-hidden", styles.cardContainer)}>
				<div data-focus id="cardWrapper" className={styles.cardWrapper}>
					<div className={styles.cardImage} />
					<div className={styles.imageMask} />
					{responseProvided && <div className={styles.ribbonMask}>Valentine's Date</div>}
					<div className={clsx("d-flex flex-column position-absolute w-100 px-4 pb-4 bottom-0 align-items-start", styles.optionsContainer)}>
						<div className={clsx("d-flex align-items-end", styles.textWrapper)}>
							<span className={styles.name}>Simon</span>
							<span className={styles.age}>21</span>
						</div>
						<div className={clsx("d-flex w-100 pb-3 align-items-end", styles.textWrapper, styles.hookWrapper)}>
							<div className={styles.hook}>
								<i>TOP PICK</i>
							</div>
						</div>
						<div className="d-flex flex-row w-100 justify-content-between">
							{(responseProvided ? selectedOptionList : optionList).map((option, index) => (
								<div data-action data-option={option.alt} key={index} className={clsx("d-flex", styles.iconContainer)} style={{ borderColor: option.primary }}>
									<FontAwesomeIcon icon={option.icon} color={option.primary} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			{selectedOption && !responseProvided && (
				<Popup
					prompt={responseMap[selectedOption][0]}
					closePopup={(response) => {
						setSelectedOption(null);
						setResponseProvided(response);
					}}
				/>
			)}
		</>
	);
}
