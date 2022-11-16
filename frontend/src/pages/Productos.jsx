import {
	Button,
	Flex,
	FormControl,
	Grid,
	Select,
	Stack,
	Text
} from '@chakra-ui/react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
	addProduct,
	productsInCart
} from '~/features/products/productsCartSlice';
import { useNavigate } from 'react-router-dom';

// assets
import bgProducts from '/assets/bg-products.png';

// components and hooks
import { useUserAuth } from '~/hooks/useUserAuth';
// import { ProductsCardItem } from '~/components/products/ProductsCardItem';
import { ProductsCardItem } from '~/components/products/ProductsCardItem';
import { getProducts1 } from '~/features/products/getProductsSlice';
import { useEffect } from 'react';

const productsArray = [
	{
		id: 1,
		name: 'CREMA DE CHOCOLATE 10 AÑOS',
		price: '10.000,00',
		prevPrice: '12.000,00'
	},
	{ id: 2, name: 'HYDRA 9 AÑOS', price: '12.000,00' },
	{
		id: 3,
		name: 'CREMA DE WHYSKI 12 AÑOS',
		price: '15.000,00',
		prevPrice: '18.000,00'
	},
	{ id: 4, name: 'CREMA DE WHYSKI 18 AÑOS', price: '13.950,00' },
	{ id: 5, name: 'WHISKY 18 AÑOS', price: '15.950,00' },
	{
		id: 6,
		name: 'CREMA DE CHOCOLATE 10 AÑOS',
		price: '10.000,00',
		prevPrice: '12.000,00'
	},
	{ id: 7, name: 'HYDRA 9 AÑOS', price: '12.000,00' },
	{
		id: 8,
		name: 'CREMA DE WHYSKI 12 AÑOS',
		price: '15.000,00',
		prevPrice: '18.000,00'
	},
	{ id: 9, name: 'CREMA DE WHYSKI 18 AÑOS', price: '13.950,00' },
	{ id: 10, name: 'WHISKY 18 AÑOS', price: '15.950,00' }
];

export const Productos = () => {
	const dispatch = useDispatch();
	// const productsCart = useSelector(productsInCart);
	const navigate = useNavigate();
	const { isUserLogged, jwt } = useUserAuth();

	useEffect(() => {
		dispatch(getProducts1({ jwt }));
	}, []);

	// console.log(productsCart);
	const handleAddProduct = (product) => {
		if (!isUserLogged) return navigate('/');
		dispatch(addProduct(product));
	};

	return (
		<Flex
			as='main'
			minH='100vh'
			bgPos='right'
			bgSize='contain'
			bgRepeat='no-repeat'
			bgImage={bgProducts}
			color='white'
			pt='120px'
			pb='50px'
		>
			<Stack
				w='80%'
				maxW='1040px'
				alignItems='center'
				pl='100px'
				gap='30px'
			>
				<FormControl
					as='form'
					w='max-content'
					display='flex'
					alignItems='center'
					justifyContent='center'
				>
					<Text
						pr='10px'
						w='170px'
						textAlign='end'
						borderRight='1px solid gray'
					>
						Ordernar Por
					</Text>
					<Select
						color='gray'
						placeholder='Seleccione'
						bgColor='transparent'
						variant='flushed'
						pl='10px'
					>
						<option value='option1'>Option 1</option>
						<option value='option2'>Option 2</option>
						<option value='option3'>Option 3</option>
					</Select>
				</FormControl>
				<Grid
					w='100%'
					gridTemplateColumns='repeat(auto-fill, minmax(150px,1fr))'
					gap='15px'
				>
					{productsArray.map((product) => (
						<ProductsCardItem
							key={`product-${product.id}`}
							handleAddProduct={() => handleAddProduct(product)}
							name={product.name}
							price={product.price}
							prevPrice={product.prevPrice}
						/>
					))}
				</Grid>
				<Button
					bgColor='#D9D9D9'
					color='black'
					fontWeight='200'
					p='10px 30px'
				>
					VER TODOS LOS PRODUCTOS
				</Button>
			</Stack>
		</Flex>
	);
};
