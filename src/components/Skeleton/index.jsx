import styles from './style.module.scss';

const SkeletonList = () => {
	return (
		<div className={`${styles.skeletonList} container`}>
			<div className={styles.skeletonItem}>
				<div></div>
			</div>
			<div className={styles.skeletonItem}>
				<div></div>
			</div>
			<div className={styles.skeletonItem}>
				<div></div>
			</div>
			<div className={styles.skeletonItem}>
				<div></div>
			</div>
			<div className={styles.skeletonItem}>
				<div></div>
			</div>
			<div className={styles.skeletonItem}>
				<div></div>
			</div>
			<div className={styles.skeletonItem}>
				<div></div>
			</div>
			<div className={styles.skeletonItem}>
				<div></div>
			</div>
		</div>
	);
};

export default SkeletonList;
