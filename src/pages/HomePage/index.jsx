import { useEffect, useState } from 'react';
import { CartModal } from '../../components/CartModal';
import { Header } from '../../components/Header';
import { ProductList } from '../../components/ProductList';
import api from '../../services/axios/api';
import { toast } from 'react-toastify';
import SkeletonList from '../../components/Skeleton';

export const HomePage = () => {
	const cartListLocalStorage = localStorage.getItem('@BurguerCartList');
	const [productList, setProductList] = useState([]);
	const [cartList, setCartList] = useState(
		cartListLocalStorage ? JSON.parse(cartListLocalStorage) : []
	);
	const [isVisible, setIsVisible] = useState(false);
	const [searchValue, setSearchValue] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const getAllProducts = async () => {
			try {
				const response = await api.get();
				setProductList(response.data);
			} catch {
				toast.error('Oops, ocorreu um erro! Tente novamente mais tarde!');
			} finally {
				setLoading(false);
			}
		};

		getAllProducts();
	}, []);

	useEffect(() => {
		localStorage.setItem('@BurguerCartList', JSON.stringify(cartList));
	}, [cartList]);

	const addProduct = product => {
		if (cartList.some(element => element.id === product.id)) {
			toast.error('Produto já adicionado ao carrinho!');
		} else {
			setCartList([...cartList, product]);
			toast.success('Produto adicionado ao carrinho com sucesso!');
		}
	};

	const removeProduct = productId => {
		const filteredList = cartList.filter(element => element.id !== productId);

		setCartList(filteredList);
		toast.success('Produto removido com sucesso!');
	};

	const removeAllProducts = () => {
		if (cartList.length > 0) {
			toast.success('Todos os produtos foram removidos do carrinho!');
			setCartList([]);
		} else {
			toast.error('O carrinho já está vazio!');
		}
	};

	const handleSearchList = (event, searchedWord) => {
		event.preventDefault();

		if (searchedWord !== '') {
			const filteredList = productList.filter(
				product =>
					product.name.toLowerCase().includes(searchedWord.toLowerCase()) ||
					product.category.toLowerCase().includes(searchedWord.toLowerCase())
			);
			if (filteredList.length > 0) {
				setSearchValue(filteredList);
				toast.success(
					`Foram encontrados ${filteredList.length} resultados para "${searchedWord}"`
				);
			} else {
				toast.error(
					`Não foi possível encontrar resultados para "${searchedWord}"`
				);
				setSearchValue([]);
			}
		} else {
			toast.success('Exibindo todos os produtos');
			setSearchValue([]);
		}
	};

	// useEffect montagem - carrega os produtos da API e joga em productList -> DONE
	// useEffect atualização - salva os produtos no localStorage (carregar no estado) -> DONE
	// adição, exclusão, e exclusão geral do carrinho -> DONE
	// renderizações condições e o estado para exibir ou não o carrinho -> DONE
	// filtro de busca -> DONE
	// estilizar tudo com sass de forma responsiva -> DONE

	return (
		<>
			<Header
				cartList={cartList}
				setIsVisible={setIsVisible}
				handleSearchList={handleSearchList}
			/>
			<main>
				{loading ? <SkeletonList /> : null}
				{searchValue.length > 0 ? (
					<ProductList productList={searchValue} addProduct={addProduct} />
				) : (
					<ProductList productList={productList} addProduct={addProduct} />
				)}
				{isVisible === true ? (
					<CartModal
						cartList={cartList}
						removeProduct={removeProduct}
						removeAllProducts={removeAllProducts}
						setIsVisible={setIsVisible}
					/>
				) : null}
			</main>
		</>
	);
};
