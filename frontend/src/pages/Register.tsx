import { Box, Button, Container, TextField, Typography, InputAdornment, IconButton, Paper, Link } from "@mui/material";
import { Visibility, VisibilityOff, Lock, Email, Person } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterMutation } from "../services/authApi";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await registerUser(data).unwrap();
      navigate("/dashboard"); // or login page
    } catch (err: any) {
      setServerError(err?.data?.message || "Registration failed");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Register
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
              label="Name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />

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
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>

            <Typography variant="body2" align="center" mt={2}>
              Already have an account?{" "}
              <Link href="/" underline="hover">
                Sign In
              </Link>
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Register;
