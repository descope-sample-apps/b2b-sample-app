import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Sdk } from "./Sdk";

export function AdminExperience() {

  return (
    <Accordion
      allowMultiple
      ml={{ sm: "0", md: "0", lg: "0" }}
      w={{ sm: "100%", md: "90%", lg: "80%", "2xl": "80%" }}
    >
      <AccordionItem>
        <Text
          background="#111C44"
          height="64px"
          paddingTop={{ lg: "11px", md: "11px" }}
        >
          <AccordionButton _focus={{ boxShadow: "none" }}>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              color="#FFFFFF"
              fontSize="18px"
            >
              Interested to learn how we built this "Step-Up" experience?
            </Box>
            <AccordionIcon color="#FFFFFF" />
          </AccordionButton>
        </Text>
        <AccordionPanel background="#D9D5DE">
          <Text
            pb={{ md: "18px", sm: "18px" }}
            textAlign="center"
            pt={{ md: "18px", sm: "18px" }}
            color="#170A2C"
          >
            This “Step Up” experience was built using Descope Flows 
            (the same Flow as the one used for the login page), 
            and validated using the Descope Backend SDKs.
          </Text>
          <Tabs
            background="#111C44"
            borderRadius="15px"
            borderBottom="none"
            boxShadow="none"
          >
            <TabList borderBottom={"none"} color={"#ffffff"}>
              <Tab _focus={{ boxShadow: "none" }} fontWeight={"800"}>
                SDKs
              </Tab>
            </TabList>

            <TabPanels color="#C6C6CB">
              <TabPanel>
                <Sdk />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
