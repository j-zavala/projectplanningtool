import React from "react";
import "./App.css";
import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import axios from "axios";

function App() {
  const handleClick = async () => {
    const response = await axios.post("http://localhost:3002/name", {
      name: "Jet",
    });
    console.log("RESPONSE", response.data);
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
