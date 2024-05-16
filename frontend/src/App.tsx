import React, { useState } from "react";
import "./App.css";
import { Box, Button, ChakraProvider, Input } from "@chakra-ui/react";
import axios from "axios";

function App() {
  const [name, setName] = useState("Jacob");
  // const [error, setError] = useState(""); // add error handling at some point

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleClick = async () => {
    const response = await axios.post("http://localhost:3002/name", {
      name,
    });
    console.log("RESPONSE", response.data);
  };

  return (
    <ChakraProvider>
      <Box m={10} display="flex" gap={4}>
        <Input placeholder="Please put your name..." onChange={onChange} />
        <Button colorScheme="blue" onClick={handleClick}>
          SUBMIT
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default App;
