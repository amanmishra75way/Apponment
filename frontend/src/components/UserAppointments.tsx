import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetUserAppointmentsQuery } from "../services/appointmentApi";

const UserAppointments = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { data, isLoading, error } = useGetUserAppointmentsQuery(user?.id);

  if (isLoading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">Failed to load appointments.</Typography>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography>No appointments found.</Typography>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Typography variant="h6" mb={2}>
        Your Appointments
      </Typography>

      {data.map((appt) => (
        <Card key={appt._id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography>
              <strong>Service:</strong> {appt.serviceType}
            </Typography>
            <Typography>
              <strong>Date:</strong> {appt.date}
            </Typography>
            <Typography>
              <strong>Time:</strong> {appt.timeSlot}
            </Typography>
            {appt.notes && (
              <Typography>
                <strong>Notes:</strong> {appt.notes}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default UserAppointments;
