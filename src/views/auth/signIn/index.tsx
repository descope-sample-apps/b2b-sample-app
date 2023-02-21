import {
  Box,
  Flex,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { Descope } from "@descope/react-sdk";
import illustration from "assets/img/auth/app_login.svg";
import { LoginExperience } from "components/loginExperience/LoginExperience";
import DefaultAuth from "layouts/auth/Default";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/img/auth/dolrr_logo.svg";

export default function DescopeSignIn() {
  // const textColor = useColorModeValue("navy.700", "white");
  let history = useHistory();
  const { colorMode } = useColorMode();
  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <>
        <Box display={{ lg: "none", sm: "block" }} h={"5%"}>
          <Image src={logo} alt="logo" h="60%" w="100%" />
        </Box>
        <Flex
          // maxW={{ base: "100%", md: "max-content" }}
          // w="100%"
          // overflowX={'hidden'}
          overflowY={{ lg: "auto" }}
          w={{ lg: "69.5%", sm: "100%" }}
          mx={{ base: "auto", lg: "0px" }}
          me="auto"
          h="100%"
          display="block"
          alignItems="start"
          justifyContent="center"
          mb={{ base: "30px", md: "0px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "40px", md: "14vh" }}
          flexDirection="column"
        >
          <Box w="99%">
            <Box
              me="auto"
              w={{ sm: "100%", md: "100%", lg: "80%", "2xl": "100%" }}
              height="fit-content"
              display={"flex"}
              justifyContent={"center"}
            >
              <Box w="70%" maxW="500px">
                <Descope
                  flowId={
                    process.env.REACT_APP_DESCOPE_SIGN_IN_FLOW_ID ||
                    "sign-up-or-in"
                  }
                  // use debug flag to show flow errors and addtional debugging information
                  // debug={true} 
                  onSuccess={(e) => {
                    window.analytics.identify(e.detail.user.userId, {
                      name: e.detail.user.name, //user trait
                      email: e.detail.user.email, //user trait
                    });
                    history.push("/admin");
                  }}
                  onError={(e) => console.log("Error!")}
                  theme={ colorMode }
                  />
              </Box>
            </Box>
            <LoginExperience />
          </Box>
        </Flex>
      </>
    </DefaultAuth>
  );
}
