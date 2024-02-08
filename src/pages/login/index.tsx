import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import google from '../../assets/images/common/google.svg';
import microsoft from '../../assets/images/common/micro.svg';
import linkedin from '../../assets/images/common/linkedin.svg';
import authbg from '../../assets/images/auth-bg.svg';
import { Card, Link } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { navigate } from 'gatsby';
import { withCardLayout } from '../../components/auth';
import '../../assets/styles/App.scss';
import { ToastContainer, toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { useDispatch } from 'react-redux';
import { fetchLoginUser, fetchSingleUserData } from '../../api/userAPI';
import { client } from '../../utils/config';
import { LOGIN_USER } from '../../graphql/users/users.graphql';

import { useSelector } from 'react-redux';

const validUser = {
  email: 'admin@testrunz.com',
  password: 'Test@123',
};
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email')
    .matches(emailRegex, 'In-correct email'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Wrong password'),
});

const Login = () => {
  let isLoggedIn: any = null;

  if (typeof window !== 'undefined') {
    isLoggedIn = localStorage.getItem('isLoggedIn');
  }
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const dispatch: any = useDispatch();
  const userSliceData = useSelector((state: any) => state.userLogin.data);
  console.log(userSliceData);

  const onSubmit = (values: any) => {
    const isMatch = checkCredentials(values.email, values.password);
    console.log('isMatch', isMatch);
    setIsSubmitted(true);
    if (isMatch) {
      if (typeof window !== 'undefined') {
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential: any) => {
            console.log(userCredential.user?.accessToken);
            let payload = {
              idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUzZWFiMDBhNzc5MTk3Yzc0MWQ2NjJmY2EzODE1OGJkN2JlNGEyY2MiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRGV2YSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS90ZXN0cnVuc3Byb2QiLCJhdWQiOiJ0ZXN0cnVuc3Byb2QiLCJhdXRoX3RpbWUiOjE3MDc0MDg0NzUsInVzZXJfaWQiOiJpQjZuYzhJdUtkVHVxRWNab09HMGZ3VHNETjQzIiwic3ViIjoiaUI2bmM4SXVLZFR1cUVjWm9PRzBmd1RzRE40MyIsImlhdCI6MTcwNzQwODQ3NSwiZXhwIjoxNzA3NDEyMDc1LCJlbWFpbCI6ImFkbWlub25lQHlvcG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFkbWlub25lQHlvcG1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.M10P98qvAAbM4kjQUPXo9cRJr0V-2yMc81ukGyJhSBVmRywDBwTc89o_6dXK6QY8xNCLeMuNO_O8nqAuDHiKWO0Bl-6Vr0dVxIxJdA8nXbDt4NIloIn4wsn2h0vEcq7-nxqqmxK34c-qOeoqH9bTCbZr6aPW2Pl9gdGR2mKCiMHRwsUJYaOgd2uqAWOo8i6pn9t0z3Cflw7cFmXS6XgqG4GpVFV_BNF7xUl2OBpWtwK_YtlyM-faLZN_jE1XNAsQkkIH3i3_YwpucK0SklbSUCv_hnNzXm6ob4YAe_iyyVBdLDVl7CRbS1bcpvp3IqPq628GWtQLfV_d76NwGW61Kw",
            };
            // let temp = { _id: userSliceData?.verifyToken?._id };
            window.localStorage.setItem(
              'accessToken',
              userCredential.user?.accessToken,
            );
            dispatch(fetchLoginUser(payload))
              .then((res) => {
                const temp = { _id: res?.verifyToken?._id };
                dispatch(fetchSingleUserData(temp))
                  .then((isSuccess: any) => {
                    const data = isSuccess?.get_user ?? {};
                    window.localStorage.setItem(
                      'userProfileDetails',
                      JSON.stringify(isSuccess?.get_user),
                    );
                    if (data.status !== 'Active') {
                      toast(`The user is inactive !`, {
                        style: {
                          background: '#d92828',
                          color: '#fff',
                        },
                      });
                      setTimeout(() => {
                        navigate('/login');
                        setIsSubmitted(isSubmitted);
                      }, 2000);
                    } else {
                      window.localStorage.setItem('isLoggedIn', 'true');

                      toast(` Login successfully !`, {
                        style: {
                          background: '#00bf70',
                          color: '#fff',
                        },
                      });
                      setTimeout(() => {
                        navigate('/mypage');
                      }, 2000);
                    }

                    // }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          })

          // Signed in
          // const user = userCredential.user;
          // ...
          // })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast(`Invalid Credentials !`, {
              style: {
                background: 'red',
                color: '#fff',
              },
            });
            setTimeout(() => {
              setIsSubmitted(isSubmitted);
              console.log('isSubmitted', isSubmitted);
            }, 2000);
          });

        // },1000)
      }
    }
    // else {
    //   if (values.email !== validUser.email) {
    //     formik.setFieldError('email', 'Invalid email');
    //   }
    //   if (values.password !== validUser.password) {
    //     formik.setFieldError('password', 'Invalid password');
    //   }
    // }
  };

  const checkCredentials = (email: any, password: any) => {
    // if (email === validUser.email && password === validUser.password) {
    return true;
    // } else {
    //   return false;
    // }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  // if (isLoggedIn === 'true') {
  //   console.log("false");

  //   navigate('/mypage');
  //   return null;
  // }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={false}
        hideProgressBar={true}
      />
      <Typography variant="h5" className="title-text">
        Log in to your Test Runs account
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ mt: 4 }} className="auth-inner">
          <Box style={{ position: 'relative' }}>
            <InputLabel htmlFor="email"> E-mail </InputLabel>
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

          <Box style={{ position: 'relative' }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <TextField
              type={showPassword ? 'text' : 'password'}
              fullWidth
              autoComplete="off"
              inputProps={{ maxLength: 24 }}
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
          </Box>

          <Box
            sx={{
              display: { xs: 'block', sm: 'flex' },
              alignItems: 'center',
              bottom: '20px',
              position: 'relative',
              justifyContent: 'space-between',
              textAlign: 'center',
            }}
          >
            <Box sx={{ paddingLeft: '8px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    sx={{
                      color: '#9F9F9F',
                      '&.Mui-checked': {
                        color: '#FFC60B',
                      },
                    }}
                  />
                }
                label="Remember me"
                className="remember-me"
                style={{ marginBottom: '0rem' }}
              />
            </Box>
            <Box sx={{ marginTop: { xs: '1rem', sm: '0rem' } }}>
              <Typography
                className="forgot-pass"
                onClick={() => navigate('/forgot-password')}
              >
                Forget your password?
              </Typography>
            </Box>
          </Box>

          <Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 0,
                mb: 0,
                // background: "#FFC60B",
              }}
              className="signup-btn"
              disabled={isSubmitted}
            >
              Log in
            </Button>
          </Box>
        </Box>
      </form>
      <Box sx={{ marginTop: { xs: '1rem', sm: '2rem' } }}>
        <Typography className="forgot-pass1">version 2. 4. 9</Typography>
      </Box>
      <Box sx={{ mt: '2rem' }}>
        <Typography className="read-text">
          Don't have an account yet?{' '}
          <span
            style={{ color: '#FF8400', cursor: 'pointer' }}
            onClick={() => navigate('/signup')}
          >
            Click here to Sign up!
          </span>
        </Typography>
      </Box>
    </>
  );
};
// if (isLoggedIn === 'true') {
const EnhancedLoginPage = withCardLayout(Login);

export default EnhancedLoginPage;
