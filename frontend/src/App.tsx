import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// Layouts
import UserLayouts from "./layouts/UserLayouts";
import AdminLayouts from "./layouts/AdminLayouts";

// Pages (use lazy if needed)
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import BookAppointment from "./pages/BookAppointment";
import AdminHoliday from "./pages/AdminHoliday";

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />}></Route>
        {/* USER Routes */}
        <Route element={<ProtectedRoute role="USER" />}>
          <Route path="/dashboard" element={<UserLayouts />}>
            <Route index element={<UserDashboard />} />
            <Route path="/dashboard/book" element={<BookAppointment />} />
          </Route>
        </Route>

        {/* ADMIN Routes */}
        <Route element={<ProtectedRoute role="ADMIN" />}>
          <Route path="/admin" element={<AdminLayouts />}>
            <Route index element={<AdminDashboard />} />
            <Route path="/admin/holidays" element={<AdminHoliday />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
