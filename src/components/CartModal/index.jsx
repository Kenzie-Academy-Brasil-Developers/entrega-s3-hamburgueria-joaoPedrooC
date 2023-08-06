import { MdClose } from 'react-icons/md';
import { CartItemCard } from './CartItemCard';
import { useEffect, useRef } from 'react';
import styles from './style.module.scss';

export const CartModal = ({
	cartList,
	removeProduct,
	removeAllProducts,
	setIsVisible,
}) => {
	const modalRef = useRef(null);

	const total = cartList.reduce((prevValue, product) => {
		return prevValue + product.price;
	}, 0);

	useEffect(() => {
		const handleOutClick = event => {
			if (!modalRef.current?.contains(event.target)) {
				setIsVisible(false);
			}
		};

		window.addEventListener('mousedown', handleOutClick);

		const handleEscCloseModal = event => {
			if (event.key === 'Escape') {
				setIsVisible(false);
			}
		};

		window.addEventListener('keydown', handleEscCloseModal);

		return () => {
			window.removeEventListener('mousedown', handleOutClick);
			window.removeEventListener('keydown', handleEscCloseModal);
		};
	}, []);

	return (
		<div className={`${styles.container} `} role="dialog">
			<div className="" ref={modalRef}>
				<div className={styles.header}>
					<h2>Carrinho de compras</h2>
					<button
						onClick={() => setIsVisible(false)}
						aria-label="close"
						title="Fechar">
						<MdClose size={21} />
					</button>
				</div>
				<div>
					{cartList.length > 0 ? (
						<ul className={styles.cartListContainer}>
							{cartList.map(product => (
								<CartItemCard
									key={product.id}
									product={product}
									removeProduct={removeProduct}
								/>
							))}
						</ul>
					) : (
						<p className={`paragraph regular ${styles.noCartItems}`}>
							Não há itens no carrinho
						</p>
					)}
				</div>
				<div className={styles.priceContainer}>
					<div>
						<span className={`paragraph semi-bold ${styles.grey600}`}>
							Total
						</span>
						<span className={`paragraph semi-bold ${styles.grey300}`}>
							{total.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}
						</span>
					</div>
					<button
						className="btn big paragraph semi-bold"
						onClick={removeAllProducts}>
						Remover todos
					</button>
				</div>
			</div>
		</div>
	);
};
