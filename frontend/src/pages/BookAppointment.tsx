import { Box, Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, TimePicker, LocalizationProvider, PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { useBookAppointmentMutation } from "../services/appointmentApi";
import { useGetHolidaysQuery } from "../services/holidayApi";

const services = ["Clinic", "Salon", "Coworking"];

const schema = yup.object({
  date: yup
    .mixed<Dayjs>()
    .required("Date is required")
    .test("is-dayjs", "Invalid date", (value) => dayjs.isDayjs(value)),
  time: yup
    .mixed<Dayjs>()
    .required("Time is required")
    .test("is-dayjs", "Invalid time", (value) => dayjs.isDayjs(value)),
  serviceType: yup.string().required("Please select a service type"),
  notes: yup.string().optional(),
});

const CustomDay = (props: PickersDayProps & { holidays: string[] }) => {
  const { holidays, day, ...other } = props;
  const formatted = day.format("YYYY-MM-DD");
  const isHoliday = holidays.includes(formatted);

  return (
    <PickersDay
      day={day}
      {...other}
      disabled={isHoliday}
      sx={{
        backgroundColor: isHoliday
          ? "rgba(255, 0, 0, 0.15)"
          : other.selected
          ? "primary.main"
          : "rgba(0, 255, 0, 0.05)",
        color: isHoliday ? "red" : "inherit",
        borderRadius: "50%",
      }}
    />
  );
};

const BookAppointment = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [bookAppointment, { isLoading }] = useBookAppointmentMutation();
  const { data: holidays = [] } = useGetHolidaysQuery();

  const holidayDates = holidays.map((h) => dayjs(h.date).format("YYYY-MM-DD"));

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: dayjs(),
      time: dayjs(),
      serviceType: "",
      notes: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        userId: user.id,
        date: values.date.format("YYYY-MM-DD"),
        timeSlot: values.time.format("HH:mm"),
        serviceType: values.serviceType,
        notes: values.notes,
      };

      await bookAppointment(payload).unwrap();
      toast.success("Appointment booked successfully!");
      reset({
        date: dayjs(),
        time: dayjs(),
        serviceType: "",
        notes: "",
      });
    } catch (err: any) {
      toast.error(err?.data?.error || "Booking failed");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box maxWidth={500} mx="auto" mt={4}>
        <Typography variant="h5" mb={2}>
          Book an Appointment
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {/* ✅ Date Picker */}
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Select Date"
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                  shouldDisableDate={(date) => holidayDates.includes(date.format("YYYY-MM-DD"))}
                  slots={{
                    day: (props) => <CustomDay {...props} holidays={holidayDates} />,
                  }}
                  slotProps={{
                    textField: {
                      error: !!errors.date,
                      helperText: errors.date?.message,
                    },
                  }}
                />
              )}
            />

            {/* ✅ Time Picker */}
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <TimePicker
                  label="Select Time"
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                  slotProps={{
                    textField: {
                      error: !!errors.time,
                      helperText: errors.time?.message,
                    },
                  }}
                />
              )}
            />

            {/* ✅ Service Type Select */}
            <Controller
              name="serviceType"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Select Service Type"
                  {...field}
                  error={!!errors.serviceType}
                  helperText={errors.serviceType?.message}
                >
                  {services.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* ✅ Notes */}
            <Controller
              name="notes"
              control={control}
              render={({ field }) => <TextField label="Notes (Optional)" multiline rows={3} {...field} />}
            />

            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? "Booking..." : "Book Appointment"}
            </Button>
          </Stack>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default BookAppointment;
