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
import { Flows } from "./Flows";
import { Sdk } from "./Sdk";
import { Api } from "./Api";

export function LoginExperience() {
  const textColor = useColorModeValue("#FFFFFF", "black");

  return (
    <Accordion
      // defaultIndex={[0]}
      allowMultiple
      // ml={{ sm: "0", md: "0", lg: "-81px" }}
      // w={{ sm: "100%", md: "100%", lg: "53%" }}
      ml={{ sm: "0", md: "0", lg: "0" }}
      w={{ sm: "100%", md: "100%", lg: "80%", '2xl': '100%' }}
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
              Interested to learn how we built this login experience?
            </Box>
            <AccordionIcon color="#FFFFFF" />
          </AccordionButton>
        </Text>
        <AccordionPanel background="#D9D5DE">
          <Text
            pb={{ md: "18px", sm: "18px" }}
            textAlign="center"
            pt={{ md: "18px", sm: "18px" }}
            color='#170A2C'
          >
            This login experience was built using Descope Flows. You also have
            several other ways of implementing login with Descope – choose
            whichever one best fits your needs.
          </Text>
          <Tabs
            background="#111C44"
            borderRadius="15px"
            borderBottom="none"
            boxShadow="none"
          >
            <TabList borderBottom={"none"} color={"#ffffff"}>
              <Tab _focus={{ boxShadow: "none" }} fontWeight={"800"}>
                Flows
              </Tab>
              <Tab _focus={{ boxShadow: "none" }} fontWeight={"800"}>
                SDKs
              </Tab>
              <Tab _focus={{ boxShadow: "none" }} fontWeight={"800"}>
                API
              </Tab>
            </TabList>

            <TabPanels color="#C6C6CB">
              <TabPanel>
                <Flows />
              </TabPanel>
              <TabPanel>
                <Sdk />
              </TabPanel>
              <TabPanel>
                <Api />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
