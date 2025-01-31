import styles from "@/app/page.module.css";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

export default function NavBar() {
	const navList = [{ src: "/Starch.svg" }, "Explore", "DMs", { icon: faUser }];

	return (
		<div className={clsx("d-flex flex-row py-2 mx-5 align-items-center justify-content-between opacity-100", styles.optionsContainer)}>
			{navList.map((navOption, index) => (
				<div key={index} className={styles.navIconContainer}>
					{navOption.src ? <div style={{ backgroundImage: `url('${navOption.src}')` }} /> : <FontAwesomeIcon icon={navOption.icon || faXmark} color={"var(--gray)"} />}
				</div>
			))}
		</div>
	);
}
