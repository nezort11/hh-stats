import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useShallowSelector } from "hooks/useShallowSelector";
import type { NextPage } from "next";
import { ChangeEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addVacancy } from "store/vacancy/actions";
import { vacancySelector } from "store/vacancy/selectors";
import { FontWeight } from "styles";

const Home: NextPage = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { vacancies } = useShallowSelector(vacancySelector);

  const handleQueryChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
    []
  );

  const handleAddVacancy = useCallback(() => {
    dispatch(addVacancy({ query }));
  }, [dispatch, query]);

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

      {vacancies?.map(({ query, count }) => (
        <Card key={query} sx={{ marginBottom: 2, maxWidth: 400 }}>
          <CardContent
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ fontWeight: FontWeight.Medium }}>&quot;Abc&quot;</Box>
            <Box>
              <Skeleton sx={{ width: 32 }} />
            </Box>
          </CardContent>
        </Card>
      ))}

      <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
        <TextField
          variant="outlined"
          label="Query"
          onChange={handleQueryChange}
          sx={{ marginRight: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleAddVacancy}
          disabled={!query}
        >
          Add
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
