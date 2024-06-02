import { Box, Text, Input, Button, FormLabel } from "@chakra-ui/react";

const SignUp: React.FC = () => {
  return (
    <Box>
      <Text textAlign={"center"} mb={4} fontSize={20}>
        Create An Account
      </Text>
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
          <Input type="text" />
        </Box>
        <Box display="flex" flexDirection="column" gap={2} w="100%">
          <FormLabel>Email Address: </FormLabel>
          <Input type="email" />
        </Box>
        <Box display="flex" flexDirection="column" gap={2} w="100%">
          <FormLabel>Username: </FormLabel>
          <Input type="text" />
        </Box>
        <Box display="flex" flexDirection="column" gap={2} w="100%">
          <FormLabel>Password: </FormLabel>
          <Input type="password" />
        </Box>
        <Box display="flex" flexDirection="column" gap={2} w="100%">
          <FormLabel>Confirm password: </FormLabel>
          <Input type="password" />
        </Box>
        <Button type="submit" w="100%">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
