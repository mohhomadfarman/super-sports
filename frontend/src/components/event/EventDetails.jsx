import {
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Tag,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createBookingAPI } from "../../store/booking/actions";
import { getEventDetailsAPI } from "../../store/event/action";
import PlayerList from "./PlayerList";

const EventDetails = () => {
  const { eventDetails } = useSelector((store) => store.event);
  const { approvedPlayerList } = useSelector((store) => store.booking);
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(getEventDetailsAPI(id));
  }, []);
  console.log(approvedPlayerList);

  const handleBooking = () => {
    dispatch(createBookingAPI({ status: "approve", event: eventDetails._id }))
      .then((res) => {
        toast({
          title: "Request send for booking",
          description: "Awaiting for organizer to confirm.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: error,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      {eventDetails._id ? (
        <Stack flexDir={{ base: "column", md: "row" }} m="10" gap="10">
          <Image src={eventDetails.picture} width={{ base: "100%", md: "50%" }} />
          <VStack alignItems={"flex-start"} fontWeight={"500"}>
            <Heading fontWeight={"700"}>{eventDetails.title}</Heading>
            <Text>Description: {eventDetails.description}</Text>
            <Text>
              Category: <Tag>{eventDetails.category}</Tag>
            </Text>
            <Text>
              Player Limits: <Tag>{eventDetails.player_limits}</Tag>
            </Text>
            <Text>
              Availble Seats: <Tag>{eventDetails.player_limits - eventDetails.bookedCount}</Tag>
            </Text>
            <Text>Schedule: {new Date(eventDetails.schedule).toLocaleString()}</Text>
            <Text color={"tomato"}>
              Organizer: {eventDetails.organizer.firstName} {eventDetails.organizer.lastName}
            </Text>
            <Button
              disabled={
                eventDetails.player_limits === eventDetails.bookedCount ||
                approvedPlayerList?.length
              }
              colorScheme={"blue"}
              variant="outline"
              onClick={handleBooking}
            >
              {approvedPlayerList?.length ? "Already joined" : "Request"}
            </Button>
            <PlayerList eventId={eventDetails._id} />
          </VStack>
        </Stack>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};

export default EventDetails;
