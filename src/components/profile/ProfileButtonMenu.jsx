import {
	Flex,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
import { useAuth } from "@descope/react-sdk";
import { useHistory } from "react-router-dom";
import { getDisplayName } from "../../utils/user";

export default function ProfileButtonMenu() {
	const { user, logout, authenticated } = useAuth();
	let history = useHistory();

	function logoutUser() {
		logout();
		localStorage.removeItem('ajs_user_traits');
		localStorage.removeItem('ajs_user_id');
		localStorage.removeItem('ajs_anonymous_id');
		// this is a temp solution until the SDK is fixed and the logout is done properly
		window.location.href = "/";
	}
	
	let menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);
	const gotoSignIn = () => {
		history.push("/auth/sign-in");
	};
	const gotoSignUp = () => {
		history.push("/auth/sign-up");
	};

    return (
			<MenuList
				boxShadow={shadow}
				p="0px"
				mt="10px"
				borderRadius="20px"
				bg={menuBg}
				border="none"
			>
				{authenticated && (
					<>
						<Flex w="100%" mb="0px">
							<Text
								ps="20px"
								pt="16px"
								pb="10px"
								w="100%"
								borderBottom="1px solid"
								borderColor={borderColor}
								fontSize="sm"
								fontWeight="700"
								color={textColor}
							>
								👋&nbsp; Hey, {getDisplayName(user)}
							</Text>
						</Flex>
						<Flex flexDirection="column" p="10px">
							<MenuItem
								_hover={{ bg: "none" }}
								_focus={{ bg: "none" }}
								color="red.400"
								borderRadius="8px"
								px="14px"
								onClick={logoutUser}
							>
								<Text fontSize="sm">Log out</Text>
							</MenuItem>
						</Flex>
					</>
				)}
				{!authenticated && process.env.REACT_APP_DESCOPE_SIGN_UP_FLOW_ID && (
					<Flex flexDirection="column" p="10px">
						<MenuItem
							_hover={{ bg: "none" }}
							_focus={{ bg: "none" }}
							borderRadius="8px"
							px="14px"
							onClick={gotoSignUp}
						>
							<Text fontSize="sm">Sign Up</Text>
						</MenuItem>
					</Flex>
				)}
				{!authenticated && (
					<Flex flexDirection="column" p="10px">
						<MenuItem
							_hover={{ bg: "none" }}
							_focus={{ bg: "none" }}
							borderRadius="8px"
							px="14px"
							onClick={gotoSignIn}
						>
							<Text fontSize="sm">Sign In</Text>
						</MenuItem>
					</Flex>
				)}
			</MenuList>
	);
}
