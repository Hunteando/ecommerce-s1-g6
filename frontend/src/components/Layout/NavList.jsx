import { Flex } from '@chakra-ui/react';
import { PATHS } from '~/constans/pathsRoutes';
import { NavLinkChakra } from './NavLinkChakra';

const navElement = [
	{ name: 'inicio', path: '/' },
	{ name: 'sabores', path: PATHS.FLAVORS },
	{ name: 'promociones', path: PATHS.PROMOTIONS }
];

export const NavList = ({ direction = 'row', gap = '0', mayus = false }) => {
	return (
		<Flex direction={direction} flex='1' justify='space-around' gap={gap}>
			{navElement.map(({ name, path }) => (
				<NavLinkChakra key={`nav-${name}`} to={path}>
					{mayus ? name.toUpperCase() : name}
				</NavLinkChakra>
			))}
		</Flex>
	);
};
