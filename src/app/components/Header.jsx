import styles from "@/app/page.module.css";

import clsx from "clsx";

export default function Header() {
	return (
		<div className={clsx("d-flex flex-row py-2 align-items-center justify-content-center", styles.navHeader)}>
			<div className={styles.logoContainer}>
				<div className={styles.logo} />
			</div>
			<div className={styles.textMask}>
				<div className={styles.text}>Starch</div>
			</div>
		</div>
	);
}
