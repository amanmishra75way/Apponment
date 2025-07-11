// components/RescheduleModal.tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, TextField } from "@mui/material";
import { DatePicker, TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRescheduleAppointmentMutation } from "../services/appointmentApi";

const schema = yup.object({
  date: yup
    .mixed<Dayjs>()
    .required("Date is required")
    .test("is-dayjs", "Invalid date", (value) => dayjs.isDayjs(value)),
  time: yup
    .mixed<Dayjs>()
    .required("Time is required")
    .test("is-dayjs", "Invalid time", (value) => dayjs.isDayjs(value)),
});

interface Props {
  open: boolean;
  onClose: () => void;
  appointmentId: string | null;
}

const RescheduleModal = ({ open, onClose, appointmentId }: Props) => {
  const [rescheduleAppointment, { isLoading }] = useRescheduleAppointmentMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: dayjs(),
      time: dayjs(),
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: any) => {
    if (!appointmentId) return;

    try {
      const payload = {
        id: appointmentId,
        data: {
          date: values.date.format("YYYY-MM-DD"),
          timeSlot: values.time.format("HH:mm"),
        },
      };
      await rescheduleAppointment(payload).unwrap();
      toast.success("Appointment rescheduled!");
      reset();
      onClose();
    } catch (err: any) {
      toast.error("Failed to reschedule appointment");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Reschedule Appointment</DialogTitle>
        <DialogContent>
          <form id="reschedule-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} mt={1} width="300px">
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Select Date"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    slotProps={{ textField: { error: !!errors.date, helperText: errors.date?.message } }}
                  />
                )}
              />
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <TimePicker
                    label="Select Time"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    slotProps={{ textField: { error: !!errors.time, helperText: errors.time?.message } }}
                  />
                )}
              />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" form="reschedule-form" variant="contained" disabled={isLoading}>
            {isLoading ? "Saving..." : "Reschedule"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default RescheduleModal;
