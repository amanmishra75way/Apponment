// src/pages/AdminHoliday.tsx
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAddHolidayMutation, useGetHolidaysQuery } from "../services/holidayApi";
import toast from "react-hot-toast";

const AdminHoliday = () => {
  const { register, handleSubmit, reset } = useForm();
  const [addHoliday, { isLoading: isAdding }] = useAddHolidayMutation();
  const { data: holidays = [], isLoading: isFetching } = useGetHolidaysQuery();

  const onSubmit = async (data: any) => {
    try {
      await addHoliday(data).unwrap();
      toast.success("Holiday added successfully");
      reset();
    } catch (err: any) {
      toast.error(err?.data?.error || "Failed to add holiday");
    }
  };

  return (
    <Box maxWidth={600} mx="auto" mt={5}>
      <Typography variant="h5" mb={3}>
        Manage Holidays
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} mb={4}>
          <TextField label="Holiday Date (YYYY-MM-DD)" fullWidth {...register("date")} />
          <TextField label="Reason" fullWidth {...register("reason")} />
          <Button type="submit" variant="contained" disabled={isAdding}>
            {isAdding ? "Adding..." : "Add Holiday"}
          </Button>
        </Stack>
      </form>

      <Typography variant="h6" mb={2}>
        Existing Holidays
      </Typography>
      {isFetching ? (
        <CircularProgress />
      ) : holidays.length === 0 ? (
        <Typography>No holidays added yet.</Typography>
      ) : (
        <List>
          {holidays.map((holiday) => (
            <Box key={holiday._id}>
              <ListItem>
                <ListItemText primary={holiday.date} secondary={holiday.reason || "No reason provided"} />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      )}
    </Box>
  );
};

export default AdminHoliday;
