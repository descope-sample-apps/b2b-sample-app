import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Prism from 'prismjs';
import 'assets/css/ExplanationScroll.css';

export const Sdk = () => {

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  // The code snippet you want to highlight, as a string
  const code = 
`import DescopeClient from "@descope/node-sdk";

// Acquiring the authorization header sent by the client
const header = request.headers['authorization'];
const session_token = header?.split(" ")[1] ?? "";

const descopeClient = DescopeClient({projectId: YOUR_PROJECT_ID});

const jwt = await descopeClient.validateSession(session_token);

const stepUpConfirmed = (jwt.token.su === true)
if (stepUpCOnfirmed) {
  // step up confirmed
} else {
  // step up needed
}
`;
  return (
    <Flex direction={{ sm: "column", md: "row" }}>
      <Box w={{ sm: "100%", md: "50%" }} mr="9px">
        <Text paddingBottom="19px">
          Descope SDKs allow validate the provided session token, and extract any claims embedded on it. 
          MFA and Step-Up are built-in claims that can be acquired as part of the validation process. 
        </Text>
        <Text paddingBottom="36px">
          Additional backend SDKs are available for other languages. 
        </Text>
        <Box display={{ sm: "none", md: "block" }}>
          <a
            href="https://docs.descope.com/build/guides/backend_sdks/"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              color={"#FFFFFF"}
              background={"#4318FF"}
              borderRadius={"5px"}
              w="99%"
            _hover={{ color: "#4096ff", borderColor: "#4096ff" }}
            >
              Backend SDKs
            </Button>
          </a>
        </Box>
      </Box>
      <Box
        border={" 0.931707px dashed #f90c0c"}
        background={"#0B1437"}
        marginTop={{ sm: "0", md: "-42px" }}
        w={{ sm: "100%", md: "50%" }}
      >
        <pre style={{ margin: 0, overflow: 'auto' }}>
          <code
            className={`language-javascript`}
            // style={{ "overflow-y": "scroll" }}
            style={{ overflow: 'scroll' }}
          >
            {code}
          </code>
        </pre>
      </Box>
      <Box pt="20px" display={{ sm: "block", md: "none" }}>
        <a
          href="https://docs.descope.com/build/guides/client_sdks/"
          target="_blank"
          rel="noreferrer"
        >
          <Button
            color={"#FFFFFF"}
            background={"#4318FF"}
            borderRadius={"5px"}
            w="48%"
            fontSize={{ md: "13px" }}
            _hover={{ color: "#4096ff", borderColor: "#4096ff" }}
          >
            Client SDKs
          </Button></a>
        &nbsp;&nbsp;
        <a
          href="https://docs.descope.com/build/guides/backend_sdks/"
          target="_blank"
          rel="noreferrer"
        >
          <Button
            color={"#FFFFFF"}
            background={"#4318FF"}
            borderRadius={"5px"}
            w="48%"
            fontSize={{ md: "13px" }}
            _hover={{ color: "#4096ff", borderColor: "#4096ff" }}
          >
            Backend SDKs
          </Button>
        </a>
      </Box>
    </Flex>
  );
};
