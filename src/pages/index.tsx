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
import { useCallback, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addVacancy, getVacancies } from "store/vacancy/actions";
import { vacancySelector } from "store/vacancy/selectors";
import { FontWeight } from "styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { statusSelector } from "store/status/selectors";
import { ActionType } from "store/actionTypes";
import { RequestStatus } from "store/status";

export enum QueryFormInput {
  Query = "query",
}

export interface QueryForm {
  query: string;
}

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const { vacancies } = useShallowSelector(vacancySelector);
  const { [ActionType.GetVacancies]: getVacanciesStatus } =
    useShallowSelector(statusSelector);
  const shouldShowSkeletons = useMemo(
    () => getVacanciesStatus !== RequestStatus.Success,
    [getVacanciesStatus]
  );

  useEffect(() => {
    dispatch(getVacancies());
  }, [dispatch]);

  const schema = useMemo(
    () =>
      yup
        .object({
          [QueryFormInput.Query]: yup
            .string()
            .trim()
            .required()
            .notOneOf(vacancies?.map(({ query }) => query) ?? []),
        })
        .required(),
    [vacancies]
  );

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = useForm<QueryForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleAddVacancy: Parameters<typeof handleSubmit>[0] = useCallback(
    (data) => {
      dispatch(addVacancy({ query: data.query }));
      reset();
    },
    [dispatch, reset]
  );

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
            <Box sx={{ fontWeight: FontWeight.Medium }}>
              &#171;{query}&#187;
            </Box>
            <Box>
              {shouldShowSkeletons ? (
                <Skeleton sx={{ width: 32 }} />
              ) : (
                <Typography>{count?.toLocaleString()}</Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}

      <Box
        component="form"
        sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}
        onSubmit={handleSubmit(handleAddVacancy)}
      >
        <TextField
          {...register(QueryFormInput.Query, {})}
          variant="outlined"
          label="Query"
          autoComplete="off"
          sx={{ marginRight: 2 }}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Add
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
