import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { loginAPI } from "../../store/auth/action";

const initData = { email: "", password: "" };

const Login = () => {
  const { isLoading,accessToken } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initData);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleForm = (e) => {
    e.preventDefault();
    dispatch(loginAPI(formData))
    .then((res)=>{
        window.location.reload()
    })

    .catch((err) => {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
   
  };

  return (
    <VStack minH="88vh" bg={useColorModeValue("gray.50", "gray.800")}>
      <VStack spacing={8} mx="auto" maxW="lg" p={6}>
        <Heading textAlign="center" fontSize="4xl">
          Login
        </Heading>

        <Box rounded="lg" bg={useColorModeValue("white", "gray.700")} boxShadow="lg" p={8}>
          <Stack as="form" onSubmit={handleForm} spacing={4} w={{ base: "auto", md: "xs" }}>
            <FormControl isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input type="email" name="email" onChange={handleInput} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" onChange={handleInput} />
            </FormControl>
            <Stack direction={{ base: "column", sm: "row" }} justify="space-between">
              <Checkbox>Remember me</Checkbox>
              <Link color="blue.400">Forgot password?</Link>
            </Stack>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={isLoading}
              loadingText="Logging in..."
            >
              Login
            </Button>
          </Stack>
          <Text my={4} textAlign="center">
            Don't have an account?{" "}
            <Link as={RouterLink} color="blue.400" to="/signup">
              Sign up
            </Link>
          </Text>
        </Box>
      </VStack>
    </VStack>
  );
};

export default Login;
