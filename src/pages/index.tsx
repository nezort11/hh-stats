import { Box, Button, Container, TextField, Typography } from "@mui/material";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h3" sx={{ marginBottom: 2 }}>
        HH stats
      </Typography>
      <Box sx={{ marginBottom: 1 }}>
        <TextField variant="outlined" label="Query" />
      </Box>
      <Typography sx={{ marginBottom: 2 }}>Result: ...</Typography>

      <Button variant="contained">Query</Button>
    </Container>
  );
};

export default Home;
