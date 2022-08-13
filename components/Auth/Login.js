import {Flex, FormControl, Input, Button, Alert} from "@chakra-ui/react";
import {useContext, useState} from "react";
import { signInUser } from "../../utils/firebase-utils";
import { useRouter } from "next/router";
import {UserContext} from "../../context/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()
    const { profile, updateProfile } = useContext(UserContext)

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async () => {
        setIsLoading(true)
      try {
          await signInUser(email, password)
          router.push('/home')
      } catch (e) {
          setError(e.message)
      } finally {
            setIsLoading(false)
      }


  };

  return (
    <>
      <Flex flexDir={"column"} w={"100%"} gap={"10px"}>
        <FormControl>
          <Input
            type="text"
            placeholder="phone number or username or email"
            border={"1px solid"}
            borderColor={"gray.300"}
            borderRadius={"4px"}
            aria-lable={"phone number or username or email"}
            _focusWithin={{
              borderColor: "gray.500",
              boxShadow: "none",
            }}
            onChange={handleEmailChange}
            value={email}
          />
        </FormControl>
        <FormControl>
          <Input
            type="password"
            placeholder="password"
            aria-lable={"password"}
            border={"1px solid"}
            borderColor={"gray.300"}
            borderRadius={"4px"}
            _focusWithin={{
              borderColor: "gray.500",
              boxShadow: "none",
            }}
            onChange={handlePasswordChange}
            value={password}
          />
        </FormControl>
          {error ? <Alert status='error'>
              {error}
          </Alert>: ''}
        <Button
            isLoading={isLoading}
            disabled={isLoading}
          colorScheme="primary"
          borderRadius={"4px"}
          onClick={handleSubmit}
        >
          Log in
        </Button>
      </Flex>
    </>
  );
};

export default Login;
