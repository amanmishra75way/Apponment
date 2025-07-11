import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";

// Keep these small ones eagerly loaded
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// Lazy-loaded Layouts
const UserLayouts = lazy(() => import("./layouts/UserLayouts"));
const AdminLayouts = lazy(() => import("./layouts/AdminLayouts"));

// Lazy-loaded Pages
const Register = lazy(() => import("./pages/Register"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const BookAppointment = lazy(() => import("./pages/BookAppointment"));
const AdminHoliday = lazy(() => import("./pages/AdminHoliday"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* USER Routes */}
        <Route element={<ProtectedRoute role="USER" />}>
          <Route path="/dashboard" element={<UserLayouts />}>
            <Route index element={<UserDashboard />} />
            <Route path="book" element={<BookAppointment />} />
          </Route>
        </Route>

        {/* ADMIN Routes */}
        <Route element={<ProtectedRoute role="ADMIN" />}>
          <Route path="/admin" element={<AdminLayouts />}>
            <Route index element={<AdminDashboard />} />
            <Route path="holidays" element={<AdminHoliday />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
