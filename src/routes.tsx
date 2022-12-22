import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdHome, MdLock } from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
// import NFTMarketplace from 'views/admin/marketplace';
import DataTables from 'views/admin/dataTables';

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import SignUpCentered from 'views/auth/signUp';

const routes = [
	{
		name: 'Your Rev Dashboard',
		layout: '/admin',
		path: '/default',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},
	// We can add it in furure by removing this comment
	// {
	// 	name: 'NFT Marketplace',
	// 	layout: '/admin',
	// 	path: '/nft-marketplace',
	// 	icon: <Icon as={MdOutlineShoppingCart} width='20px' height='20px' color='inherit' />,
	// 	component: NFTMarketplace,
	// 	secondary: true
	// },
	{
		name: 'Data Tables',
		layout: '/admin',
		icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
		path: '/data-tables',
		component: DataTables
	},
	{
		name: 'Sign In',
		layout: '/auth',
		path: '/sign-in',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		component: SignInCentered
	},
	{
		name: 'Sign Up',
		layout: '/auth',
		path: '/sign-up',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		component: SignUpCentered
	}
];

export default routes;
