import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';

export const ProductCard = ({ product, addProduct }) => {
	const [imgClassName, setImgClassName] = useState('');
	const imgHeight = useRef(null);

	useEffect(() => {
		setImgClassName(
			imgHeight.current.offsetHeight > 200 ? 'bigImg' : 'smallImg'
		);
	}, []);
	return (
		<li className={styles.card}>
			<img
				src={product.img}
				alt={product.name}
				ref={imgHeight}
				className={styles[imgClassName]}
			/>
			<div>
				<h3>{product.name}</h3>
				<span className={styles.category}>{product.category}</span>
				<span className={`${styles.price} paragraph semi-bold`}>
					{product.price.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}
				</span>
				<button
					className="btn small paragraph semi-bold"
					onClick={() => addProduct(product)}>
					Adicionar
				</button>
			</div>
		</li>
	);
};
