import { Tag, Text, VStack, Button, Image, useColorModeValue, Box } from "@chakra-ui/react";
import React from "react";
import { Link as RichLink } from "react-router-dom";
import PlayerList from "./PlayerList";
import { getUserId } from "../../utils_sec/auth";

const EventCard = (event) => {
  const { _id, title, description, picture, schedule, player_limits, category, organizer } = event;
  const role = getUserId()?.userRole;
  return (
    <VStack
      justifyContent="space-between"
      shadow={"md"}
      bg={useColorModeValue("white", "gray.700")}
      alignItems={"flex-start"}
    >
      <Box backgroundImage={picture} backgroundSize="cover" width="full" height={"200px"}></Box>

      <VStack p="4" alignItems={"flex-start"}>
        <Text fontWeight={"700"}>{title}</Text>
        <Text fontWeight={"500"}>
          Category: <Tag>{category}</Tag>
        </Text>
        <Text fontSize={"sm"}>Schedule: {new Date(schedule).toLocaleString()}</Text>
        {role === "user" && <Button
          as={RichLink}
          to={`/eventDetails/${_id}`}
          size="sm"
          colorScheme={"blue"}
          variant="outline"
        >
          More
        </Button> }
        
      </VStack>
    </VStack>
  );
};

export default EventCard;
