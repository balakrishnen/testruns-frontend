import React from 'react'
import Dialog from "@mui/material/Dialog";
import { Box, Typography, Grid, TextField, FormControl, Select, MenuItem, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import Confirmationpopup from "../../components/ConfirmationPopup";
// import Successpopup from "../../components/SuccessPopup";

const ProcedureForm= React.forwardRef(({ open, close,closeFormPopup, openConfirmationPopup, submitFormPopup }: any,ref) =>{
    // const [openDlg2Dialog, setDialog2Open] = React.useState(false);
    // const [openSuccess, setSuccessOpen] = React.useState(false);
    const [openForm , setFormOpen]=React.useState(false)
    // const handleAddButtonClick = () => {
    //     setSuccessOpen(true);
    //     closeFormPopup();
    //     setTimeout(() => {
    //       setSuccessOpen(false);
    //     }, 2000);
    //   };
    //   const handleConfirmationYes = () => {
    //     setDialog2Open(false);
    //     closeFormPopup();
    //   };

      
    React.useImperativeHandle(ref, () => ({
        open(state: any) {
            setFormOpen(state);
        },
      }));

    return (
        <div>
            {/* <Confirmationpopup
                open={openDlg2Dialog}
                close={() => setDialog2Open(false)}
                handleConfirmationYes={handleConfirmationYes}
            />
            <Successpopup open={openSuccess} type={"Procedures"} close={() => setSuccessOpen(false)} /> */}
            <Dialog
                open={openForm}
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
                        <Grid container spacing={2} className='asset-popup calender-sec'>
                            <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingRight: { sm: '1rem !important' } }}>
                                <Box>
                                    <label style={{ display: 'block' }}>Procedure ID (autogenerated)</label>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        autoFocus
                                        InputLabelProps={{ shrink: false }}
                                        placeholder="ID023659ADN"
                                        className="bg-gray-input"
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingLeft: { sm: '1rem !important' }, paddingTop: { xs: '0rem !important', sm: '1rem !important' } }}>
                                <Box className="bg-gray-input">
                                    <label style={{ display: 'block' }}>Created on</label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker format="DD/MM/YYYY" />
                                    </LocalizationProvider>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className='asset-popup'>
                            <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingRight: { sm: '1rem !important' } }}>
                                <Box>
                                    <label style={{ display: 'block' }}>Department</label>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        autoFocus
                                        InputLabelProps={{ shrink: false }}
                                        placeholder="Physics"
                                        className="bg-gray-input"
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingLeft: { sm: '1rem !important' }, paddingTop: { xs: '0rem !important', sm: '1rem !important' } }}>
                                <Box>
                                    <label style={{ display: 'block' }}>Laboratory</label>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        autoFocus
                                        InputLabelProps={{ shrink: false }}
                                        placeholder="Mechanical"
                                        className="bg-gray-input"
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className='asset-popup'>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box>
                                    <label style={{ display: 'block' }}>Procedure name<span style={{ color: '#E2445C' }}>*</span></label>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        autoFocus
                                        InputLabelProps={{ shrink: false }}
                                        placeholder="The simple pendulum"
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ display: { xs: "block", sm: 'flex' }, justifyContent: 'flex-end', mt: 3 }}>
                        <Button type="submit" variant="contained" onClick={() => openConfirmationPopup(true)} className="cancel-btn">Cancel</Button>
                        <Button type="submit" variant="contained" onClick={submitFormPopup} className="add-btn">Create</Button>
                    </Box>
                </Box>
            </Dialog>
        </div>
    )
}
)
export default ProcedureForm