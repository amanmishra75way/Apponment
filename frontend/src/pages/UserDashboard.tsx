import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
  Chip,
} from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useGetUserAppointmentsQuery, useCancelAppointmentMutation } from "../services/appointmentApi";
import { useEffect, useState } from "react";
import RescheduleModal from "../components/RescheduleModal";

const UserDashboard = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { data = [], isLoading, refetch } = useGetUserAppointmentsQuery(user?.id);
  const [cancelAppointment] = useCancelAppointmentMutation();
  const [openId, setOpenId] = useState<string | null>(null);

  const handleCancel = async (id: string) => {
    try {
      await cancelAppointment(id).unwrap();
      toast.success("Appointment cancelled");
      refetch();
    } catch (err: any) {
      toast.error("Failed to cancel appointment");
    }
  };

  const statusCount = {
    booked: data.filter((a) => a.status === "booked").length,
    completed: data.filter((a) => a.status === "completed").length,
    cancelled: data.filter((a) => a.status === "cancelled").length,
  };

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

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        My Appointments
      </Typography>

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                <TodayIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                Total: {data.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="orange">
                <HourglassEmptyIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                Booked: {statusCount.booked}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="green">
                <CheckCircleIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                Completed: {statusCount.completed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" mb={2}>
        Upcoming Appointments
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : data.length === 0 ? (
        <Typography>No appointments found.</Typography>
      ) : (
        <List>
          {data.map((appt) => (
            <ListItem key={appt._id} divider>
              <ListItemText primary={`${appt.date} at ${appt.timeSlot}`} secondary={`Service: ${appt.serviceType}`} />
              <Chip
                label={appt.status}
                color={getChipColor(appt.status)}
                variant="outlined"
                sx={{ mr: 2, textTransform: "capitalize" }}
              />
              <ListItemSecondaryAction>
                {appt.status === "booked" && (
                  <>
                    <IconButton edge="end" onClick={() => setOpenId(appt._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleCancel(appt._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      {/* Reschedule Modal */}
      <RescheduleModal open={!!openId} onClose={() => setOpenId(null)} appointmentId={openId || ""} />
    </Box>
  );
};

export default UserDashboard;
