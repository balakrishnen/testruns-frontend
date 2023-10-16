import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import google from "../../assets/images/common/google.svg";
import microsoft from "../../assets/images/common/micro.svg";
import linkedin from "../../assets/images/common/linkedin.svg";
import authbg from "../../assets/images/auth-bg.svg";
import { Card, Link } from "@mui/material";
import { withCardLayout } from "../../components/auth";
import { navigate } from "gatsby";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../assets/styles/App.scss";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Weak password"
    ),
  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), ""], "Passwords mismatch"),
});

const ResetPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (values: any) => {
    const isMatch = checkCredentials(
      values.email,
      values.password,
      values.confirm_password
    );

    if (isMatch) {
      alert("Reset successful!");
    } else {
      formik.setFieldError("email", "Invalid email");
      formik.setFieldError("password", "Invalid password");
      formik.setFieldError("confirm_password", "Invalid confirm password");
    }
  };

  const checkCredentials = (
    email: any,
    password: any,
    confirm_password: any
  ) => {
    return true;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });
  return (
    <>
      <Typography variant="h5" className="title-text">
        Reset Password
      </Typography>
      <Box sx={{ pt: 3 }}>
        <Typography className="reg-text">
          We will send you an OTP on your registered email-ID.
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ mt: 4 }} className="auth-inner">
          <Box style={{ position: "relative" }}>
            <InputLabel> Registered email-id</InputLabel>
            <TextField
              margin="normal"
              fullWidth
              name="email"
              id="email"
              InputLabelProps={{ shrink: false }}
              placeholder="E-mail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            {formik.touched.email && formik.errors.email && (
              <Typography className="error-field">
                {formik.errors.email}
              </Typography>
            )}
          </Box>
          <Box style={{ position: "relative" }}>
            <InputLabel>New password</InputLabel>
            <TextField
              type={showPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ mr: 0 }}
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              variant="outlined"
              error={formik.touched.password && Boolean(formik.errors.password)}
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password && (
              <Typography className="error-field">
                {formik.errors.password}
              </Typography>
            )}
            {formik.touched.password && !formik.errors.password && (
              <Typography className="valid-field">Strong password</Typography>
            )}
          </Box>
          <Box style={{ position: "relative" }}>
            <InputLabel>Confirm password</InputLabel>
            <TextField
              type={showPassword2 ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ mr: 0 }}
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              name="confirm_password"
              id="confirm_password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
              variant="outlined"
              error={
                formik.touched.confirm_password &&
                Boolean(formik.errors.confirm_password)
              }
              placeholder="Confirm Password"
            />
            {formik.touched.confirm_password &&
              formik.errors.confirm_password && (
                <Typography className="error-field">
                  {formik.errors.confirm_password}
                </Typography>
              )}
            {formik.touched.confirm_password &&
              !formik.errors.confirm_password && (
                <Typography className="valid-field">
                  Password matched
                </Typography>
              )}
          </Box>
          <Box pt={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 0 }}
              className="signup-btn"
            >
              Reset
            </Button>
          </Box>
        </Box>
      </form>
      <Box sx={{ mt: 5 }}>
        <Typography className="read-text">
          Back to{" "}
          <span
            style={{ color: "#FF8400", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            log in!
          </span>
        </Typography>
      </Box>
    </>
  );
};

const EnhancedResetPage = withCardLayout(ResetPassword);

export default EnhancedResetPage;
