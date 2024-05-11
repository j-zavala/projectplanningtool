import React from "react";
import "./App.css";
import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import axios from "axios";

function App() {
  const handleClick = async () => {
    const repoonse = await axios.get("http://localhost:3002");
    console.log("RESPONSE", repoonse);
  };

  return (
    <ChakraProvider>
      <Box>Hello</Box>
      <Button colorScheme="blue" onClick={handleClick}>
        SUBMIT
      </Button>
    </ChakraProvider>
  );
}

export default App;
