import { Box, Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, useColorModeValue, ModalOverlay, Text } from "@chakra-ui/react";
import React from "react";
import flow_image from "../../../src/assets/img/explanationDailogue/flow.jpg";
import 'assets/css/ExplanationScroll.css';

export const Flows = () => {
  const [imagePreview, setImagePreview] = React.useState(false);
  const closeIconColor = useColorModeValue('blue.60', 'white');

  const showImage = () => {
    setImagePreview(!imagePreview);
  }
  const code = 
`// Wrapping react App with <AuthProvider>
<AuthProvider projectId=YOUR_PROJECT_ID>
    <App />
</AuthProvider>

// Embedding Descope flow component
<Descope
    flowId="sign-up-or-in"
    onSuccess={(e) => {
        console.log("Logged in")
        console.log("Username", e.detail.user.name)
        console.log("Email", e.detail.user.email)
    }}
    onError={(e) => {
        console.log("Error!", e)
    }
    theme="light"
/>`;
  
  return (
    <>
     <Modal isOpen={imagePreview} onClose={showImage} size="xl" isCentered>
     <ModalOverlay />
     <ModalContent
          maxWidth={"90%"}
          boxShadow={"8px 8px 12px rgb(117 81 255 / 68%)"}
          opacity={0.95}
          borderRadius={14}
        >
          <ModalCloseButton 
          color={closeIconColor} 
          style={{boxShadow: 'none'}}/>
          <ModalBody padding={0}>
          <Image src={flow_image} className="img-flow" />
          </ModalBody>
          </ModalContent>
      </Modal>
    <Flex direction={{ sm: "column", md: "row" }}>
      <Box w={{ sm: "100%", md: "50%" }} mr="9px">
        <Text paddingBottom="36px">
          With Descope Flows, you can create no-code authentication flows and
          user-facing screens directly in the Descope Console.
        </Text>
        <a
          href="https://docs.descope.com/build/guides/gettingstarted/"
          target="_blank"
          rel="noreferrer"
        >
          <Button
            background={"#4318FF"}
            borderRadius={"5px"}
            color={"#FFFFFF"}
            display={{ sm: "none", md: "block" }}
            _hover={{ color: "#4096ff", borderColor: "#4096ff" }}
          >
            Learn more
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
          <code
            className={`language-javascript`}
            // style={{ "overflow-y": "scroll" }}
            style={{ overflow: 'scroll' }}
          >
            {code}
          </code>
        </pre>
      </Box>
      <Box pt="20px">
        <a
          href="https://docs.descope.com/build/guides/gettingstarted/"
          target="_blank"
          rel="noreferrer"
        >
          <Button
            background={"#4318FF"}
            borderRadius={"5px"}
            color={"#FFFFFF"}
            display={{ sm: "block", md: "none" }}
            w={{ sm: "100%" }}
            fontSize={{ lg: "13px" }}
            _hover={{ color: "#4096ff", borderColor: "#4096ff" }}
          >
            Learn more
          </Button>
        </a>
      </Box>
    </Flex>
    </>
  );
};
