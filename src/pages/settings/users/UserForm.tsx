import React from "react";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
// import Successpopup from "../../../components/SuccessPopup";
// import Confirmationpopup from "../../../components/ConfirmationPopup";

const UserForm = React.forwardRef(({ open, close,closeFormPopup, openConfirmationPopup, submitFormPopup }: any,ref) => {
  const [openDlg2Dialog, setDialog2Open] = React.useState(false);
  const [openSuccess, setSuccessOpen] = React.useState(false);
  const [answers, setAnswers] = React.useState("");
  const [formPopup, setFormPopup] = React.useState(false);

  const Placeholder = ({ children }: any) => {
    return <div>{children}</div>;
  };

  React.useImperativeHandle(ref, () => ({
    open(state: any) {
      setFormPopup(state);
    },
  }));

  // const handleAddButtonClick = () => {
  //   setSuccessOpen(true);
  //   closeFormPopup();
   
  //   setTimeout(() => {
  //     setSuccessOpen(false);
  //   }, 2000);
  // };
  // const handleConfirmationYes = () => {
  //   setDialog2Open(false);
  //   closeFormPopup();
  // };
  return (
    <div>
      {/* <Confirmationpopup
        open={openDlg2Dialog}
        close={() => setDialog2Open(false)}
        handleConfirmationYes={handleConfirmationYes}
      />
      <Successpopup open={openSuccess} type={"User"} close={() => setSuccessOpen(false)} /> */}
      <Dialog
        open={formPopup}
        keepMounted
        onClose={() => closeFormPopup(false)}
        aria-labelledby="add-new-asset-title"
        aria-describedby="add-new-asset"
        fullWidth
        maxWidth="md"
        className="popup-outer"
      >
        <Box className="popup-section">
          <Box className="title-popup">
            <Typography>Create new user</Typography>
            <CloseIcon onClick={() => closeFormPopup(false)} />
          </Box>
          <Box>
            <Grid container spacing={2} className="asset-popup">
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                sx={{ paddingRight: { sm: "1rem !important" } }}
              >
                <Box>
                  <label style={{ display: "block" }}>Full name</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    InputLabelProps={{ shrink: false }}
                    placeholder="Username"
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                sx={{
                  paddingLeft: { sm: "1rem !important" },
                  paddingTop: { xs: "0rem !important", sm: "1rem !important" },
                }}
              >
                <Box>
                  <label style={{ display: "block" }}>Last name</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    InputLabelProps={{ shrink: false }}
                    placeholder="Last name"
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="asset-popup">
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                sx={{ paddingRight: { sm: "1rem !important" } }}
              >
                <Box>
                  <label style={{ display: "block" }}>Email ID</label>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      labelId="tselect-popup-label"
                      id="select-popup"
                      value={answers}
                      displayEmpty
                      IconComponent={ExpandMoreOutlinedIcon}
                      onChange={(event) => setAnswers(event.target.value)}
                      renderValue={
                        answers !== ""
                          ? undefined
                          : () => <Placeholder>Physics</Placeholder>
                      }
                    >
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                      <MenuItem value={"3"}>3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                sx={{
                  paddingLeft: { sm: "1rem !important" },
                  paddingTop: { xs: "0rem !important", sm: "1rem !important" },
                }}
              >
                <Box>
                  <label style={{ display: "block" }}>Mobile</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="last"
                    name="last"
                    autoComplete="last"
                    autoFocus
                    InputLabelProps={{ shrink: false }}
                    placeholder="v +91     |  000000023"
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="asset-popup">
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                sx={{ paddingRight: { sm: "1rem !important" } }}
              >
                <Box>
                  <label style={{ display: "block" }}>Organisation</label>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      labelId="tselect-popup-label"
                      id="select-popup"
                      value={answers}
                      displayEmpty
                      IconComponent={ExpandMoreOutlinedIcon}
                      onChange={(event) => setAnswers(event.target.value)}
                      renderValue={
                        answers !== ""
                          ? undefined
                          : () => <Placeholder>Organisation</Placeholder>
                      }
                    >
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                      <MenuItem value={"3"}>3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                sx={{
                  paddingLeft: { sm: "1rem !important" },
                  paddingTop: { xs: "0rem !important", sm: "1rem !important" },
                }}
              >
                <Box>
                  <label style={{ display: "block" }}>Instituition</label>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      labelId="tselect-popup-label"
                      id="select-popup"
                      value={answers}
                      displayEmpty
                      IconComponent={ExpandMoreOutlinedIcon}
                      onChange={(event) => setAnswers(event.target.value)}
                      renderValue={
                        answers !== ""
                          ? undefined
                          : () => <Placeholder>College A</Placeholder>
                      }
                    >
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                      <MenuItem value={"3"}>3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="asset-popup">
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                sx={{ paddingRight: { sm: "1rem !important" } }}
              >
                <Box>
                  <label style={{ display: "block" }}>Department/s</label>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      labelId="tselect-popup-label"
                      id="select-popup"
                      value={answers}
                      displayEmpty
                      IconComponent={ExpandMoreOutlinedIcon}
                      onChange={(event) => setAnswers(event.target.value)}
                      renderValue={
                        answers !== ""
                          ? undefined
                          : () => <Placeholder>Select department/s</Placeholder>
                      }
                    >
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                      <MenuItem value={"3"}>3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                sx={{
                  paddingLeft: { sm: "1rem !important" },
                  paddingTop: { xs: "0rem !important", sm: "1rem !important" },
                }}
              >
                <Box>
                  <label style={{ display: "block" }}>Laboratory/ies</label>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      labelId="tselect-popup-label"
                      id="select-popup"
                      value={answers}
                      displayEmpty
                      IconComponent={ExpandMoreOutlinedIcon}
                      onChange={(event) => setAnswers(event.target.value)}
                      renderValue={
                        answers !== ""
                          ? undefined
                          : () => (
                              <Placeholder>Select laboratory/ies</Placeholder>
                            )
                      }
                    >
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                      <MenuItem value={"3"}>3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="asset-popup">
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                sx={{ paddingRight: { sm: "1rem !important" } }}
              >
                <Box>
                  <label style={{ display: "block" }}>
                    User ID (autogenerated)
                  </label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="last"
                    name="last"
                    autoComplete="last"
                    autoFocus
                    InputLabelProps={{ shrink: false }}
                    placeholder="ID023659ADN"
                    className="bg-gray-input"
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                sx={{
                  paddingLeft: { sm: "1rem !important" },
                  paddingTop: { xs: "0rem !important", sm: "1rem !important" },
                }}
              >
                <Box>
                  <label style={{ display: "block" }}>Select role</label>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      labelId="tselect-popup-label"
                      id="select-popup"
                      value={answers}
                      displayEmpty
                      IconComponent={ExpandMoreOutlinedIcon}
                      onChange={(event) => setAnswers(event.target.value)}
                      renderValue={
                        answers !== ""
                          ? undefined
                          : () => <Placeholder>Requester</Placeholder>
                      }
                    >
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                      <MenuItem value={"3"}>3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="asset-popup">
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                sx={{ paddingRight: { sm: "1rem !important" } }}
              >
                <Box>
                  <label style={{ display: "block" }}>Current status</label>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      labelId="tselect-popup-label"
                      id="select-popup"
                      value={answers}
                      displayEmpty
                      IconComponent={ExpandMoreOutlinedIcon}
                      onChange={(event) => setAnswers(event.target.value)}
                      renderValue={
                        answers !== ""
                          ? undefined
                          : () => <Placeholder>Active</Placeholder>
                      }
                    >
                      <MenuItem value={"1"}>1</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                      <MenuItem value={"3"}>3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: { xs: "block", sm: "flex" },
              justifyContent: "flex-end",
              mt: 3,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              onClick={() => {
                openConfirmationPopup(true);
              }}
              className="cancel-btn"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={submitFormPopup}
              className="add-btn"
            >
              Create
            </Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
)

export default UserForm;
