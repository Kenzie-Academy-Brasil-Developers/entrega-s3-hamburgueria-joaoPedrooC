import { useState } from 'react';
import Logo from '../../assets/Logo.svg';
import { MdSearch, MdShoppingCart } from 'react-icons/md';
import styles from './style.module.scss';

export const Header = ({ cartList, setIsVisible, handleSearchList }) => {
	const [value, setValue] = useState('');

	return (
		<header className={styles.header}>
			<div className="container">
				<img src={Logo} alt="Logo Kenzie Burguer" />
				<div>
					<button onClick={() => setIsVisible(true)}>
						<MdShoppingCart size={21} color="var(--grey-200)" />
						<span className="paragraph semi-bold">{cartList.length}</span>
					</button>
					<form
						onSubmit={event => {
							handleSearchList(event, value);
							setValue('');
						}}>
						<input
							type="text"
							value={value}
							onChange={e => setValue(e.target.value)}
							placeholder="Digitar Pesquisa"
						/>
						<button className="" type="submit">
							<MdSearch size={21} />
						</button>
					</form>
				</div>
			</div>
		</header>
	);
};
