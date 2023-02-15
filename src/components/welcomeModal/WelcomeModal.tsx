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
    if (sessionStorage.getItem("firstVisit") !== "1") {
      showModal();
      sessionStorage.setItem("firstVisit", "1");
    }
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
              This is a sample B2B app built by Descope.<br/>
              We hope this app can give you an idea of how Descope can help your B2B app <br/>with seamless and secure authentication.<br/><br/>

            </Text>
            <Box
              color={"#170A2C"}
              fontWeight={500}
              fontSize={22}
              w={{ xl: "60%", sm: "100%", md: "86%" }}
              marginLeft={{ xl: "14em", md: "55px" }}
              paddingBottom={"45px"}
            >
              <Text pb="37px" me='auto' color={textColor}>
              Here are some authentication flows you can explore:
              </Text>
              <UnorderedList marginLeft='2em'>
              <ListItem color={textColor}>Try signing up</ListItem>
              <ListItem color={textColor}>Try accessing the Admin Dashboard to experience a “Step Up” flow</ListItem>
              </UnorderedList>
            </Box>
            <Text
              textAlign={"center"}
              me='auto' color={textColor}
              // fontWeight={500}
              fontSize={18}
              //   fontFamily={"Robot"}
              pb={43}
            >
              <code>Currently using Descope Flows from Project ID: {localStorage.getItem('projectId') ? localStorage.getItem('projectId') : 'Descope default project'}</code>
            </Text>

          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
