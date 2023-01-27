import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  Text,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function WelcomeModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textColor = useColorModeValue('secondaryGray.1000', 'white');
  const closeIconColor = useColorModeValue('blue.60', 'white');
  const modalHeaderColor = useColorModeValue('blue.60', 'brand.400');
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    showModal();
  }, []);
  return (
    <Box>
      <Modal isOpen={isModalOpen} onClose={handleCancel} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent
          maxWidth={"87%"}
          boxShadow={"8px 8px 12px rgb(117 81 255 / 68%)"}
          opacity={0.95}
          borderRadius={14}
        >
          <ModalHeader
            textAlign={"center"}
            color={modalHeaderColor}
            // fontFamily={"Barlow"}
            fontWeight={800}
            fontSize={42}
            pt={43}
          >
            Welcome to Dolrr!
          </ModalHeader>
          <ModalCloseButton color={closeIconColor} style={{boxShadow: 'none'}}/>
          <ModalBody>
            <Text
              textAlign={"center"}
              me='auto' color={textColor}
              fontWeight={500}
              fontSize={22}
              //   fontFamily={"Robot"}
              // pb={20}
            >
              This is a sample B2B app built by Descope.
            </Text>
            <Text
              textAlign={"center"}
              me='auto' color={textColor}
              // fontWeight={500}
              fontSize={22}
              //   fontFamily={"Robot"}
              pb={43}
            >
              Currently using Descope Flows from Project ID: {localStorage.getItem('projectId') ? localStorage.getItem('projectId') : '(Descope Default)'}
            </Text>
            <Box
              color={"#170A2C"}
              fontWeight={400}
              fontSize={18}
              w={{ xl: "48%", sm: "100%", md: "86%" }}
              marginLeft={{ xl: "16em", md: "55px" }}
              paddingBottom={"45px"}
            >
              <Text pb="37px" me='auto' color={textColor}>
                Here are some ways you can explore the site and experience
                seamless and secure authentication:
              </Text>
              <UnorderedList marginLeft='2em'>
                <ListItem color={textColor}>Try signing up</ListItem>
              </UnorderedList>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
