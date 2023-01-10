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
  const code = `// Import Descope SDK
import descopeSdk from '@descope/web-js-sdk';

//Create SDK with project_id
const sdk = descopeSdk({ projectId: <project_id> });

// user object with user details from the form
user = { "name": "Joe Person", "phone": "555-555-5555", "email": "email@company.com"};

// identifier for the user to send the OTP to
identifier = "email@company.com";

// Delivery Method
delivery_method = "email";

// Call the function for signing up user
resp = await sdk.otp.signUpOrIn[delivery_method].(identifier, user);
`;
  return (
    <Flex direction={{ sm: "column", md: "row" }}>
      <Box w={{ sm: "100%", md: "50%" }} mr="9px">
        <Text paddingBottom="19px">
          Descope SDKs allow you to easily integrate any passwordless
          authentication method into your app.
        </Text>
        <Text paddingBottom="36px">
          You can use Client SDKs to let Descope handle session management, or
          Backend SDKs to directly connect your app server to our service.
        </Text>
        <Box display={{ sm: "none", md: "block" }}>
          <a
            href="https://docs.descope.com/build/guides/client_sdks/"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              color={"#FFFFFF"}
              background={"#4318FF"}
              borderRadius={"5px"}
              w="47%"
            _hover={{ color: "#4096ff", borderColor: "#4096ff" }}
            >
              Client SDKs
            </Button>
          </a>
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
              w="47%"
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
        {/* New code can be added here */}
        {/* <pre style={{ margin: 0, overflow: 'auto' }}>
          <code
            className={`language-javascript`}
            // style={{ "overflow-y": "scroll" }}
            style={{ overflow: 'scroll' }}
          >
            {code}
          </code>
        </pre> */}
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
