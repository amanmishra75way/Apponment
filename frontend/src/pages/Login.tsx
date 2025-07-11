import { Box, Button, Container, TextField, Typography, InputAdornment, IconButton, Paper, Link } from "@mui/material";
import { Visibility, VisibilityOff, Lock, Email } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const [serverError, setServerError] = useState("");
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);
  const onSubmit = async (data: any) => {
    try {
      await login(data).unwrap();
      navigate("/dashboard");
    } catch (err: any) {
      setServerError(err?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          {serverError && (
            <Typography color="error" align="center">
              {serverError}
            </Typography>
          )}

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" fullWidth variant="contained" disabled={isLoading} sx={{ mt: 3, borderRadius: 2 }}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            <Typography variant="body2" align="center" mt={2}>
              Don't have an account?{" "}
              <Link href="/signup" underline="hover">
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Login;
