import React, { useState } from "react";
import "./App.css";
import { Box, Button, ChakraProvider, Input } from "@chakra-ui/react";
import axios from "axios";

function App() {
  const [firstName, setFirstName] = useState("Luke");
  const [lastName, setLastName] = useState("Abbott");
  // const [error, setError] = useState(""); // add error handling at some point

  const onChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const onChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleClick = async () => {
    const response = await axios.post("http://localhost:3002/name", {
      firstName,
      lastName,
    });
    console.log("RESPONSE", response.data);
  };

  return (
    <ChakraProvider>
      <Box m={10} display="flex" gap={4}>
        <Input
          placeholder="Please put your first name..."
          onChange={onChangeFirstName}
        />
        <Input
          placeholder="Please put your last name..."
          onChange={onChangeLastName}
        />
        <Button colorScheme="blue" onClick={handleClick}>
          ADD
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default App;
