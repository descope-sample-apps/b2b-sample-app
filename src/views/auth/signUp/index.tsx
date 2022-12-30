import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { Descope } from "@descope/react-sdk";
import illustration from "assets/img/auth/app_login.svg";
import DefaultAuth from "layouts/auth/Default";
import { useHistory } from "react-router-dom";

export default function DescopeSignUp() {
    const textColor = useColorModeValue("navy.700", "white");
    let history = useHistory();

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
                        Sign Up
                    </Heading>
                </Box>
                <Descope
                    flowId={process.env.REACT_APP_DESCOPE_SIGN_UP_FLOW_ID || "sign-up"}
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
