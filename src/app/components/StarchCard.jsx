import styles from "@/app/page.module.css";

import Popup from "@/app/components/Overlay/Popup";
import images from "@/app/util/images";

import { faHeart, faMessage, faPhone, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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

	const carousel = useRef();
	const [carouselIndex, setCarouselIndex] = useState(0);

	const drag = { startX: 0, endX: 50, limit: 50 };

	useEffect(() => {
		const cardWrapper = document.getElementById("cardWrapper");
		const popup = document.getElementById("popup");

		const onPageClick = (event) => {
			event.preventDefault();
			if (Math.abs(drag.startX - drag.endX) > drag.limit) return;

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

		const carouselIndexContainer = document.getElementById("carouselIndexContainer");
		carouselIndexContainer.style.gridTemplateColumns = `repeat(${images.length}, 1fr)`;

		const cardImageCarousel = document.getElementById("cardImageCarousel");
		const cardImageWrapper = document.querySelector("#cardImageCarousel > div");

		const dragStart = (e) => {
			cardImageCarousel.classList.add(styles.dragging);

			if (e.touches?.length === 1) {
				e.pageX = e.touches[0].pageX;
			}

			drag.startX = e.pageX - cardImageCarousel.getBoundingClientRect().left;
		};

		const dragStop = (e) => {
			cardImageCarousel.classList.remove(styles.dragging);

			if (e.changedTouches?.length === 1) {
				e.pageX = e.changedTouches[0].pageX;
			}

			drag.endX = e.pageX - cardImageCarousel.getBoundingClientRect().left;

			if (drag.startX > drag.endX + drag.limit) {
				cardImageCarousel.scrollLeft += cardImageWrapper.getBoundingClientRect().width;
				setCarouselIndex(Math.min(carouselIndex + 1, images.length - 1));
			} else if (drag.endX > drag.startX + drag.limit) {
				cardImageCarousel.scrollLeft -= cardImageWrapper.getBoundingClientRect().width;
				setCarouselIndex(Math.max(carouselIndex - 1, 0));
			}
		};

		cardImageCarousel.addEventListener("mousedown", dragStart);
		cardImageCarousel.addEventListener("mouseup", dragStop);

		cardImageCarousel.addEventListener("touchstart", dragStart);
		cardImageCarousel.addEventListener("touchend", dragStop);

		return () => {
			cardImageCarousel.removeEventListener("mousedown", dragStart);
			cardImageCarousel.removeEventListener("mouseup", dragStop);

			cardImageCarousel.removeEventListener("touchstart", dragStart);
			cardImageCarousel.removeEventListener("touchend", dragStop);
		};
	}, [selectedOption, carouselIndex]);

	return (
		<>
			<div className={clsx("d-flex h-100 w-100 align-items-center justify-content-center overflow-hidden", styles.cardContainer)}>
				<div data-focus id="cardWrapper" className={styles.cardWrapper}>
					<div id="carouselIndexContainer" className={styles.carouselIndexContainer}>
						{images.map((_, index) => (
							<div key={index} className={clsx(styles.carouselIndex, { [styles.activeIndex]: carouselIndex === index })} />
						))}
					</div>
					<div ref={carousel} className={styles.carouselContainer}>
						<div id="cardImageCarousel" className={clsx(styles.cardImageCarousel)}>
							{images.map((image, index) => (
								<div key={index} className={clsx(styles.cardImageWrapper)}>
									<img src={image.src} className={styles.cardImage} />
								</div>
							))}
						</div>
					</div>
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
