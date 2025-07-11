import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  MenuItem,
  Select,
  Stack,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useGetAllAppointmentsQuery,
  useCancelAppointmentMutation,
  useCompleteAppointmentMutation,
  useSendReminderMutation,
} from "../services/appointmentApi";

const statusOptions = ["all", "booked", "completed", "cancelled", "rescheduled"];

const getChipColor = (status: string) => {
  switch (status) {
    case "booked":
      return "info";
    case "completed":
      return "success";
    case "cancelled":
      return "error";
    case "rescheduled":
      return "warning";
    default:
      return "default";
  }
};

const AdminDashboard = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const { data = [], isLoading, refetch } = useGetAllAppointmentsQuery();
  const [cancelAppointment] = useCancelAppointmentMutation();
  const [completeAppointment] = useCompleteAppointmentMutation();
  const [sendReminder] = useSendReminderMutation();

  const filteredAppointments = filterStatus === "all" ? data : data.filter((appt) => appt.status === filterStatus);

  const handleCancel = async (id: string) => {
    try {
      await cancelAppointment(id).unwrap();
      toast.success("Appointment cancelled");
      refetch();
    } catch {
      toast.error("Failed to cancel");
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await completeAppointment(id).unwrap();
      toast.success("Marked as completed");
      refetch();
    } catch {
      toast.error("Failed to mark complete");
    }
  };

  const handleReminder = async (id: string) => {
    try {
      await sendReminder(id).unwrap();
      toast.success("Reminder sent");
    } catch {
      toast.error("Failed to send reminder");
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        All Appointments
      </Typography>

      <Box mb={3}>
        <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} size="small">
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : filteredAppointments.length === 0 ? (
        <Typography>No appointments found.</Typography>
      ) : (
        <List>
          {filteredAppointments.map((appt) => (
            <ListItem key={appt._id} divider sx={{ flexDirection: "column", alignItems: "flex-start" }}>
              <ListItemText
                primary={`${appt.date} at ${appt.timeSlot}`}
                secondary={`Service: ${appt.serviceType} | User: ${appt.userId}`}
                sx={{ mb: 1 }}
              />

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                sx={{ width: "100%", justifyContent: "space-between", alignItems: "center" }}
              >
                <Chip
                  label={appt.status}
                  color={getChipColor(appt.status)}
                  sx={{ textTransform: "capitalize" }}
                  variant="outlined"
                />

                {appt.status === "booked" && (
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleComplete(appt._id)}>
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton onClick={() => handleCancel(appt._id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleReminder(appt._id)}>
                      <NotificationsActiveIcon />
                    </IconButton>
                  </Stack>
                )}
              </Stack>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default AdminDashboard;
