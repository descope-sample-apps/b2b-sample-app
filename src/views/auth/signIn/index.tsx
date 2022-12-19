import { Box, Flex, Heading, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Descope } from "@descope/react-sdk";
import illustration from "assets/img/auth/auth.png";
import DefaultAuth from "layouts/auth/Default";
import { useHistory } from "react-router-dom";

export default function DescopeSignIn() {
	const textColor = useColorModeValue("navy.700", "white");
	let history = useHistory();
	const { colorMode } = useColorMode()
	console.log(colorMode)
	return (
		<DefaultAuth illustrationBackground={illustration} image={illustration}>
			<Flex
				maxW={{ base: "100%", md: "max-content" }}
				w="100%"
				mx={{ base: "auto", lg: "0px" }}
				me="auto"
				h="100%"
				alignItems="start"
				justifyContent="center"
				mb={{ base: "30px", md: "60px" }}
				px={{ base: "25px", md: "0px" }}
				mt={{ base: "40px", md: "14vh" }}
				flexDirection="column"
			>
				<Box me="auto">
					<Heading color={textColor} fontSize="36px" mb="10px">
						Sign In
					</Heading>
				</Box>
				<Descope
					// theme={ colorMode }
					flowId={process.env.REACT_APP_DESCOPE_SIGN_IN_FLOW_ID || "sign-up-or-in"}
					onSuccess={(e) => {
						console.log("Success!" + JSON.stringify(e.detail.user));
						history.push("/admin");
					}}
					onError={(e) => console.log("Error!")}
					theme="light"
				/>
			</Flex>
		</DefaultAuth>
	);
}
