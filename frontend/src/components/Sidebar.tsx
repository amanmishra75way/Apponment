import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const goToDashboard = () => {
    user?.role === "ADMIN" ? navigate("/admin") : navigate("/dashboard");
  };

  const goToBooking = () => {
    if (user?.role === "USER") {
      navigate("/dashboard/book");
    }
  };

  return (
    <List>
      <ListItemButton onClick={goToDashboard}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      {/* Only for USER */}
      {user?.role === "USER" && (
        <ListItemButton onClick={goToBooking}>
          <ListItemIcon>
            <EventAvailableIcon />
          </ListItemIcon>
          <ListItemText primary="Book Appointment" />
        </ListItemButton>
      )}

      {/* Only for ADMIN */}
      {user?.role === "ADMIN" && (
        <ListItemButton onClick={() => navigate("/admin/holidays")}>
          <ListItemIcon>
            <EventAvailableIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Holidays" />
        </ListItemButton>
      )}

      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

export default Sidebar;
