import { useState } from 'react';
import { Flex, Stack, Spinner } from '@chakra-ui/react';

// ? components and hooks
import { TopBanner } from '~/components/flavors/TopBanner';
import { FooterBanners } from '~/components/flavors/FooterBanners';
import { Filters } from '~/components/products/Filters';
import { ProductsCardList } from '~/components/products/productsCardList';
import { AsideFilters } from '~/components/flavors/AsideFilters';
import { ButtonOrange } from '~/components/products/ButtonOrange';
import { useFilters } from '~/hooks/useFilters';
import { useProducts } from '~/hooks/useProducts';

const Flavors = () => {
	const { selectFilters, setSelectFilters } = useFilters();
	const {
		products,
		isLoading,
		showMoreProducts,
		showAllProducts,
		productsList
	} = useProducts({ selectFilters });

	// ? filters aside
	const [selectedCategories, setSelectedCategories] = useState([]);

	const filteredProducts = () => {
		if (!selectedCategories.length) return products();

		const filtered = productsList.filter((product) =>
			selectedCategories.includes(product.category_id)
		);

		return filtered.length > 10 && !showAllProducts
			? filtered.slice(0, 10)
			: filtered;
	};

	return (
		<Flex
			as='main'
			flexDir='column'
			pt='110px'
			color='white'
			minH='100vh'
			justify='center'
			align='center'
			gap='50px'
		>
			<TopBanner />
			<Flex w='100%'>
				{/* AsideFilters */}
				<AsideFilters
					selectedCategories={selectedCategories}
					setSelectedCategories={setSelectedCategories}
				/>
				{/* AsideFilters */}
				<Stack
					flex='1'
					m='0 auto'
					alignItems='center'
					justifyContent='center'
					gap='80px'
				>
					<Filters
						selectFilters={selectFilters}
						setSelectFilters={setSelectFilters}
					/>
					<Flex minH='100vh' w='100%' justify='center'>
						{isLoading ? (
							<Spinner size='xl' alignSelf='center' />
						) : (
							<ProductsCardList products={filteredProducts} />
						)}
					</Flex>
					<ButtonOrange
						p='18px 35px'
						disabled={filteredProducts().length < 10}
						onClick={showMoreProducts}
					>
						{showAllProducts
							? 'VER MENOS PRODUCTOS'
							: 'VER TODOS LOS PRODUCTOS'}
					</ButtonOrange>
					{/* footer */}
					<FooterBanners />
					{/* footer */}
				</Stack>
			</Flex>
		</Flex>
	);
};

export default Flavors;
