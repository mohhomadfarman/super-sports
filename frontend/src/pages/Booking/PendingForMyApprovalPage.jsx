import { SimpleGrid, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PendingBookingCard from "../../components/booking/PendingBookingCard";
import { getPendingApprovalAPI, updateBookingAPI } from "../../store/booking/actions";

const PendingForMyApprovalPage = () => {
  const { myPendingApprovalBookings, isloading } = useSelector((store) => store.booking);
  const dispatch = useDispatch();
  const toast = useToast();
  useEffect(() => {
    dispatch(getPendingApprovalAPI());
  }, []);

  const handleBooking = (eventid, status) => {
    dispatch(updateBookingAPI(eventid, { status }))
      .then(() => {
        toast({
          title: "Event updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        dispatch(getPendingApprovalAPI());
      })
      .catch((error) => {
        toast({
          title: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <VStack>
      {isloading ? (
        <Spinner thickness="4px" color="blue.500" size="xl" />
      ) : myPendingApprovalBookings?.length ? (
        <>
          {myPendingApprovalBookings?.map((el) => {
            return <PendingBookingCard card="request" key={el._id} data={el} handleBooking={handleBooking} />;
          })}
        </>
      ) : (
        <Text mt="5">No Pending Bookings..</Text>
      )}
    </VStack>
  );
};

export default PendingForMyApprovalPage;
