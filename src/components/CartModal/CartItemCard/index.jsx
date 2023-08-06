import { MdDelete } from 'react-icons/md';
import styles from './style.module.scss';
import { useEffect, useRef, useState } from 'react';

export const CartItemCard = ({ product, removeProduct }) => {
	const [className, setClassName] = useState('');
	const imgHeight = useRef(null);

	useEffect(() => {
		setClassName(
			imgHeight.current.offsetHeight > 190 ? styles.bigImg : styles.smallImg
		);
	}, []);

	return (
		<li className={styles.cartItem}>
			<div>
				<figure>
					<img
						src={product.img}
						alt={product.name}
						ref={imgHeight}
						className={className}
					/>
				</figure>
				<h3 className="title small">{product.name}</h3>
			</div>
			<button
				onClick={() => removeProduct(product.id)}
				aria-label="delete"
				title="Remover item">
				<MdDelete size={21} className={styles.trashBtn} />
			</button>
		</li>
	);
};
