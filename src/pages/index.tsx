import {
  Box,
  Button,
  Container,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Container sx={{ paddingY: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Box
          component="img"
          src="https://i.hh.ru/favicons/hh.ico?v=2015_03_17"
          alt="hh logo"
          sx={{ width: 64, height: 64, marginRight: 2 }}
        />

        <Typography variant="h3">HH stats</Typography>
      </Box>
      <Box sx={{ marginBottom: 1 }}>
        <TextField variant="outlined" label="Query" />
      </Box>
      <Typography sx={{ display: "flex", marginBottom: 2 }}>
        <Box sx={{ marginRight: 1 }}>Result:</Box>{" "}
        <Skeleton sx={{ width: 32 }} />
      </Typography>

      <Button variant="contained">Query</Button>
    </Container>
  );
};

export default Home;
