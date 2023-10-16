import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CloseRed from '../assets/images/close-red.svg';
import search from "../assets/images/search.svg";

const AddPeople = ({ open, close }: any) => {
    return (
        <Dialog
            style={{ zIndex: 2000 }}
            open={open}
            keepMounted
            onClose={close}
            aria-labelledby="confirmation-title"
            aria-describedby="confirmation"
            fullWidth
            maxWidth="md"
            className="popup-outer"
        >
            <Box className="popup-section">
                <Box className="title-popup">
                    <Typography>Add people</Typography>
                    <CloseIcon onClick={close} />
                </Box>
                <Box>
                    <Typography className="follow-people">You have selected following people.</Typography>
                    <Box className="follow-list">
                        <Box>
                            <span><span className="inner-span">Tester 1 <img src={CloseRed} alt="CloseRed" /> </span></span>
                            <span><span className="inner-span">Tester 2 <img src={CloseRed} alt="CloseRed" /> </span></span>
                            <span><span className="inner-span">Tester 3 <img src={CloseRed} alt="CloseRed" /> </span></span>
                            <span><span className="inner-span">Tester 4 <img src={CloseRed} alt="CloseRed" /> </span></span>
                            <span><span className="inner-span">Tester 5 <img src={CloseRed} alt="CloseRed" /> </span></span>
                            <span><span className="inner-span">Requester 1 <img src={CloseRed} alt="CloseRed" /> </span></span>
                            <span><span className="inner-span">Person 1 <img src={CloseRed} alt="CloseRed" /> </span></span>
                            <span><span className="inner-span">Person 2 <img src={CloseRed} alt="CloseRed" /> </span></span>
                            <span><span className="inner-span">Person 3 <img src={CloseRed} alt="CloseRed" /> </span></span>
                            <span><span className="inner-span">Person 4<img src={CloseRed} alt="CloseRed" /> </span></span>
                            <span><span className="inner-span">Tester11<img src={CloseRed} alt="CloseRed" /> </span></span>
                            <span><span className="inner-span">Tester12<img src={CloseRed} alt="CloseRed" /> </span></span>
                            <span><span className="inner-span">Requester 2<img src={CloseRed} alt="CloseRed" /> </span></span>
                            <span><span className="inner-span">Requester 3<img src={CloseRed} alt="CloseRed" /> </span></span>
                        </Box>
                        <Box>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="Search"
                                id="Search"
                                InputLabelProps={{ shrink: false }}
                                placeholder="Search for name"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <img src={search} />
                                        </InputAdornment>
                                    ),
                                }}
                                className="search-field-inner"
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: { xs: "block", sm: 'flex' }, justifyContent: 'flex-end', mt: 3 }}>
                    <Button type="submit" onClick={close} variant="contained" className="cancel-btn">Cancel</Button>
                    <Button type="submit" onClick={close} variant="contained" className="add-btn">Save</Button>
                </Box>
            </Box>
        </Dialog>
    );
};
export default AddPeople;