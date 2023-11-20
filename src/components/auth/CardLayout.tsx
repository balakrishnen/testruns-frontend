import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import google from "../../assets/images/common/google.svg";
import microsoft from "../../assets/images/common/micro.svg";
import linkedin from "../../assets/images/common/linkedin.svg";
import authbg from "../../assets/images/auth-bg.svg";
import { Card, Link } from "@mui/material";
import { auth, provider } from "../../firebase.config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { navigate } from "gatsby";

export const CardLayout = ({ children }: any, props: any) => {
  const [answer, setAnswer] = React.useState<any>(10);

  const Placeholder = ({ children }: any) => {
    return <div>{children}</div>;
  };

  const onLoginStart = React.useCallback((e: void) => {
    return e;
  }, []);

  const googleSignup = (varient:string) => {
    const googleProvider = provider("google.com");
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result);
        if(varient=='signup'){
          navigate('/login')
        }
        else{
          navigate('/mypage')
          window.sessionStorage.setItem('isLoggedIn', 'true');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const microsoftSignup = (varient:string) => {
    const microsoftProvider = provider("microsoft.com");
    signInWithPopup(auth, microsoftProvider)
      .then((result) => {
        console.log(result);
        if(varient=='signup'){
          navigate('/login')
        }
        else{
          navigate('/mypage')
          window.sessionStorage.setItem('isLoggedIn', 'true');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box
      className="main-center"
      style={{
        height: "100vh",
        backgroundImage: `url(${authbg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        boxShadow: "0px 0px 0px 0px #ffffff",
      }}
    >
      <Grid
        container
        className="main-center-inner"
        style={{
          boxShadow: "0px 4px 10px 0px #0000001A",
          borderRadius: "10px",
        }}
      >
        <Grid item xs={12} sm={12} md={6} lg={6} className="sign-left">
          <Box>
            <Typography className="welcome-to">Welcome to</Typography>
            <Typography className="test-runz">Test Runs</Typography>
          </Box>
          {children.props.uri === "/login" && (
            <Box className="login-center">
               <Typography className="sign-via">Sign In via</Typography>
               <Box className="sign-via-btn">
                {/* <LoginSocialGoogle
                  client_id="32749125067-a5a3fnkg3jutfpnveghsvf2t8cu2ujvt.apps.googleusercontent.com"
                  onLoginStart={onLoginStart}
                  redirect_uri="http://localhost:8000"
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  typeResponse="accessToken"
                  onResolve={({ provider, data }: IResolveParams) => {
                    debugger;
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                > */}
                <Button
                  variant="contained"
                  style={{
                    fontWeight: 600,
                    color: "#181818",
                    fontSize: "15px",
                    textTransform: "none",
                  }}
                  onClick={() => googleSignup('signin')}
                >
                  {" "}
                  <img src={google} alt="google" />
                  Sign In with Google
                </Button>
                {/* </LoginSocialGoogle> */}
                {/* <LoginSocialMicrosoft
                  client_id="911d1fd2-9c9e-4a0e-bd71-90c3ec04f27f"
                  redirect_uri="http://localhost:8000"
                  onLoginStart={onLoginStart}
                  scope="openid profile email"
                  response_type="code"
                  tenant="common"
                  prompt="login"
                  onResolve={({ provider, data }: IResolveParams) => {
                    debugger;
                  }}
                  onReject={(err: any) => {
                    console.log(err);
                  }}
                > */}
                <Button
                  variant="contained"
                  style={{
                    fontWeight: 600,
                    color: "#181818",
                    fontSize: "15px",
                    textTransform: "none",
                  }}
                  onClick={() => microsoftSignup('signin')}
                >
                  {" "}
                  <img src={microsoft} alt="microsoft" />
                  Sign In with Microsoft
                </Button>
                {/* </LoginSocialMicrosoft> */}
                {/* <LoginSocialLinkedin
                  client_id="86j2ru56b16cq6"
                  client_secret="w33ztd5cu1CAhBgc"
                  redirect_uri="http://localhost:8000"
                  onLoginStart={onLoginStart}
                  scope="openid profile email"
                  response_type="code"
                  onResolve={({ provider, data }: IResolveParams) => {
                    debugger;
                  }}
                  onReject={(err: any) => {
                    console.log(err);
                  }}
                > */}
                {/* <Button
                    variant="contained"
                    style={{
                      fontWeight: 600,
                      color: "#181818",
                      fontSize: "15px",
                      textTransform: 'none'
                    }}
                  >
                    {" "}
                    <img src={linkedin} alt="linkedin" />
                    Sign up with Linkedin
                  </Button> */}
                {/* </LoginSocialLinkedin> */}
              </Box>
            </Box>
          )}
          {children.props.uri === "/signup" && (
            <Box>
              <Typography className="sign-via">Sign up via</Typography>
              <Box className="sign-via-btn">
                {/* <LoginSocialGoogle
                  client_id="32749125067-a5a3fnkg3jutfpnveghsvf2t8cu2ujvt.apps.googleusercontent.com"
                  onLoginStart={onLoginStart}
                  redirect_uri="http://localhost:8000"
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  typeResponse="accessToken"
                  onResolve={({ provider, data }: IResolveParams) => {
                    debugger;
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                > */}
                <Button
                  variant="contained"
                  style={{
                    fontWeight: 600,
                    color: "#181818",
                    fontSize: "15px",
                    textTransform: "none",
                  }}
                  onClick={() => googleSignup('signup')}
                >
                  {" "}
                  <img src={google} alt="google" />
                  Sign up with Google
                </Button>
                {/* </LoginSocialGoogle> */}
                {/* <LoginSocialMicrosoft
                  client_id="911d1fd2-9c9e-4a0e-bd71-90c3ec04f27f"
                  redirect_uri="http://localhost:8000"
                  onLoginStart={onLoginStart}
                  scope="openid profile email"
                  response_type="code"
                  tenant="common"
                  prompt="login"
                  onResolve={({ provider, data }: IResolveParams) => {
                    debugger;
                  }}
                  onReject={(err: any) => {
                    console.log(err);
                  }}
                > */}
                <Button
                  variant="contained"
                  style={{
                    fontWeight: 600,
                    color: "#181818",
                    fontSize: "15px",
                    textTransform: "none",
                  }}
                  onClick={() => microsoftSignup('signup')}
                >
                  {" "}
                  <img src={microsoft} alt="microsoft" />
                  Sign up with Microsoft
                </Button>
                {/* </LoginSocialMicrosoft> */}
                {/* <LoginSocialLinkedin
                  client_id="86j2ru56b16cq6"
                  client_secret="w33ztd5cu1CAhBgc"
                  redirect_uri="http://localhost:8000"
                  onLoginStart={onLoginStart}
                  scope="openid profile email"
                  response_type="code"
                  onResolve={({ provider, data }: IResolveParams) => {
                    debugger;
                  }}
                  onReject={(err: any) => {
                    console.log(err);
                  }}
                > */}
                {/* <Button
                    variant="contained"
                    style={{
                      fontWeight: 600,
                      color: "#181818",
                      fontSize: "15px",
                      textTransform: 'none'
                    }}
                  >
                    {" "}
                    <img src={linkedin} alt="linkedin" />
                    Sign up with Linkedin
                  </Button> */}
                {/* </LoginSocialLinkedin> */}
              </Box>
            </Box>
          )}
          <Box>
            {children.props.uri === "/forgot-password" && (
              <Box className="auth-inner-text">
                <Box>
                  <Typography variant="h5">Forgot your password?</Typography>
                </Box>
                <Box>
                  <Typography variant="h4">Don't worry we got you</Typography>
                </Box>
                <Box>
                  <Typography variant="h1">Covered</Typography>
                </Box>
              </Box>
            )}
            {children.props.uri === "/reset-password" && (
              <Box className="auth-inner-text">
                <Box>
                  <Typography variant="h5">Forgot your password?</Typography>
                </Box>
                <Box>
                  <Typography variant="h4">Don't worry we got you</Typography>
                </Box>
                <Box>
                  <Typography variant="h1">Covered</Typography>
                </Box>
              </Box>
            )}
            {children.props.uri === "/otp" && (
              <Box className="auth-inner-text">
                <Box>
                  <Typography variant="h5">Forgot your password?</Typography>
                </Box>
                <Box>
                  <Typography variant="h4">Don't worry we got you</Typography>
                </Box>
                <Box>
                  <Typography variant="h1">Covered</Typography>
                </Box>
              </Box>
            )}
            <Box className="country-term-section">
              <Box className="country-section">
                <InfoOutlinedIcon sx={{ color: "#565656", mr: 2 }} />
                <FormControl variant="standard">
                  <Select
                    labelId="country-list-select-label"
                    id="country-list"
                    inputProps={{ "aria-label": "Without label" }}
                    IconComponent={ExpandMoreOutlinedIcon}
                    value={answer}
                    displayEmpty
                    onChange={(event) => setAnswer(event.target.value)}
                    renderValue={
                      answer !== ""
                        ? undefined
                        : () => <Placeholder>Select Country</Placeholder>
                    }
                  >
                    <MenuItem value={10}>English (United states)</MenuItem>
                    <MenuItem value={20}>English (United kingdom)</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box className="terms-section">
                <Link href="#">Help</Link>
                <Link href="#">Terms</Link>
                <Link href="#">Privacy</Link>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          className="sign-right"
          style={{ minHeight: "700px" }}
        >
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
