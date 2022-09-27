import { useShallowSelector } from "hooks/useShallowSelector";
import { useMemo } from "react";
import { ActionType } from "store/actionTypes";
import { statusSelector } from "store/status/selectors";
import { Backdrop, CircularProgress } from "@mui/material";
import { RequestStatus } from "store/status";

export const Loader = () => {
  const { [ActionType.AddVacancy]: addVacancyStatus } =
    useShallowSelector(statusSelector);

  const shouldShowLoading = useMemo(
    () => addVacancyStatus === RequestStatus.Pending,
    [addVacancyStatus]
  );

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={shouldShowLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
