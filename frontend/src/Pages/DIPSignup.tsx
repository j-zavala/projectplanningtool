import React, { useState } from 'react';
import { Box, Text, Input, Button, FormLabel } from "@chakra-ui/react";
import axios from 'axios';

const DIPSignUp: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

const onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setFirstName(e.target.value);
}

const onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setLastName(e.target.value);
}


const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("POST request body: ", {
        firstName,
        lastName,
    });
    axios.post('http://localhost:3002/auth/sign-up', {
        firstName,
        lastName,
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
          <FormLabel>First Name: </FormLabel>
          <Input type="text" onChange={onFirstNameChange} />
        </Box>
        <Box display="flex" flexDirection="column" gap={2} w="100%">
          <FormLabel>Last Name: </FormLabel>
          <Input type="text" onChange={onLastNameChange} />
        </Box>
        <Button type="submit" w="100%">
          Submit
        </Button>
      </Box>
      </form>
    </Box>
  );
};

export default DIPSignUp;
