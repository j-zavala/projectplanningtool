import React, { useState } from 'react';
import { Box, Text, Input, Button, FormLabel } from "@chakra-ui/react";
import axios from 'axios';

const SignUp: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setName(e.target.value);
}

const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setEmail(e.target.value);
}

const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUsername(e.target.value);
}

const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setPassword(e.target.value);
}

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("POST request body: ", {
        name,
        email,
        username,
        password,
    });
    axios.post('http://localhost:3002/auth/sign-up', {
        name,
        email,
        username,
        password,
    }).then((res) => {
        console.log("RESPONSE:", res);
    }).catch((error) => {
        console.log("ERROR: ", error);
    });
}

  return (
    <Box>
      <Text textAlign={"center"} mb={4} fontSize={20}>
        Create An Account
      </Text>
      <form onSubmit={onSubmit}>
      <Box
        maxW="75%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 auto"
        gap={4}
      >
        <Box display="flex" flexDirection="column" gap={2} w="100%">
          <FormLabel>Name: </FormLabel>
          <Input type="text" onChange={onNameChange} />
        </Box>
        <Box display="flex" flexDirection="column" gap={2} w="100%">
          <FormLabel>Email Address: </FormLabel>
          <Input type="email" onChange={onEmailChange} />
        </Box>
        <Box display="flex" flexDirection="column" gap={2} w="100%">
          <FormLabel>Username: </FormLabel>
          <Input type="text" onChange={onUsernameChange} />
        </Box>
        <Box display="flex" flexDirection="column" gap={2} w="100%">
          <FormLabel>Password: </FormLabel>
          <Input type="password" onChange={onPasswordChange} />
        </Box>
        <Button type="submit" w="100%">
          Submit
        </Button>
      </Box>
      </form>
    </Box>
  );
};

export default SignUp;
