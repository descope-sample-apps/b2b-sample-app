import { Box, Button, Flex, Text } from "@chakra-ui/react";
import "prismjs/themes/prism-tomorrow.css";
import Prism from 'prismjs';
import { useEffect } from "react";
import 'assets/css/ExplanationScroll.css';

export const Api = () => {
  // The code snippet you want to highlight, as a string

  useEffect(() => {
    Prism.highlightAll()
  }, [])
  const codeApi = `// Rest API call for signup or signin user
  
  curl -i -X POST 
    https://api.descope.com/v1/auth/otp/signup-in/email 
    -H 'Authorization: Bearer <project_id>' 
    -H 'Content-Type: application/json' 
    -d '{
        "externalId": "string",
        "loginOptions": {
        "stepup": true,
        "customClaims": {},
        "mfa": true
        }
    }'
`;
  return (
    <Flex direction={{ sm: "column", md: "row" }}>
      <Box w={{ sm: "100%", md: "50%" }} mr={{ sm: "0", md: "9px" }}>
        <Text paddingBottom="36px">
          The Descope REST API enables you to add authentication to your app
          while retaining full control over your app and user experience.
        </Text>
        <a href="https://docs.descope.com/api/" target="_blank" rel="noreferrer">

          <Button
            color={"#FFFFFF"}
            background={"#4318FF"}
            borderRadius={"5px"}
            display={{ sm: "none", md: "block" }}
            _hover={{ color: "#4096ff", borderColor: "#4096ff" }}
          >
            See API reference
          </Button>
        </a>
      </Box>
      <Box
        border={" 0.931707px dashed #f90c0c"}
        background={"#0B1437"}
        marginTop={{ sm: "0", md: "-42px" }}
        w={{ sm: "100%", md: "50%" }}
      >
        <pre style={{ margin: 0, overflow: 'auto' }}>
          <code className={`language-javascript`} style={{ overflowY: "scroll" }}>{codeApi}</code>
        </pre>
      </Box>
      <Box pt="20px">
        <a href="https://docs.descope.com/api/" target="_blank" rel="noreferrer">

          <Button
            color={"#FFFFFF"}
            background={"#4318FF"}
            borderRadius={"5px"}
            display={{ sm: "block", md: "none" }}
            w={{ sm: "100%" }}
            fontSize={{ lg: "13px" }}
            _hover={{ color: "#4096ff", borderColor: "#4096ff" }}
          >
            See API reference
          </Button>
        </a>
      </Box>
    </Flex>
  );
};
