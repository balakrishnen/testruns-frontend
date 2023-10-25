import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import { withCardLayout } from "../../components/auth";
import { navigate } from "gatsby";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../assets/styles/App.scss";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email").matches(emailRegex, "In-correct email"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Weak password"
    ),
  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), ""], "Password mismatch"),
});

const ResetPassword = () => {
  // const [showPassword, setShowPassword] = React.useState(false);
  // const [showPassword2, setShowPassword2] = React.useState(false);
  interface FormValidation {
    newpassword: boolean;
    confirmpassword: boolean;
  }
  
  const [initalStatus,setInitalStatus] = React.useState<FormValidation>({
    newpassword: false,
    confirmpassword: false,
  });

const handleClickShowPassword = (key: keyof FormValidation, newValue: boolean) => {
  const updatedValidation = { ...initalStatus };
  updatedValidation[key] = newValue;
  setInitalStatus(updatedValidation);
};

  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

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
    if (email!=="" && password !== "" && confirm_password!== "") {
      return true;
    } else {
      return false;
    }
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
              inputProps={{ maxLength: 50 }}
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
              type={initalStatus.newpassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={(e)=>handleClickShowPassword("newpassword",!initalStatus.newpassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ mr: 0 }}
                    >
                      {!initalStatus.newpassword  ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputProps={{ maxLength: 24 }}
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
              type={initalStatus.confirmpassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={(e)=>handleClickShowPassword("confirmpassword",!initalStatus.confirmpassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ mr: 0 }}
                    >
                      {!initalStatus.confirmpassword ? <VisibilityOff /> : <Visibility />}
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
