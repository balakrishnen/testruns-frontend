import React from 'react';
import PrivateRoute from '../../../components/PrivateRoute';
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import edit from '../../../assets/images/edit.svg';
import printer from '../../../assets/images/printer.svg';
import { Editor } from '@tinymce/tinymce-react';
import { fetchSingleProcedureData } from '../../../api/procedureAPI';
import { useDispatch, useSelector } from 'react-redux';
import ProcedureForm from '../ProcedureForm';
import SuccessPopup from '../../../components/SuccessPopup';

export default function ProcedureDetails() {
  const editorRef: any = React.useRef(null);
  const dispatch: any = useDispatch();
  const [procedureData, setprocedureData] = React.useState<any>({});
  const formPopupRef: any = React.useRef(null);
  const confirmationPopupRef: any = React.useRef(null);
  const successPopupRef: any = React.useRef(null);
  const procedureSliceData = useSelector(
    (state: any) => state.procedure.data?.get_procedure,
  );
  console.log(procedureSliceData);
  // console.log('log',window.location)
  const handleCloseFormPopup = (state: any) => {
    formPopupRef.current.open(state);
  };

  const handleSubmitFormPopup = () => {
    formPopupRef.current.open(false);
    successPopupRef.current.open(true, 'Procedure');
    setTimeout(() => {
      successPopupRef.current.open(false, 'Procedure');
    }, 3000);
  };

  const handleOpenConfirmationPopup = (state: any) => {
    confirmationPopupRef.current.open(state);
  };
  const handleConfirmationDone = (state: any) => {
    if (state === 1) {
      formPopupRef.current.open(false);
    }
    confirmationPopupRef.current.open(false);
  };
  React.useEffect(() => {
    setprocedureData(procedureSliceData);
  }, [procedureSliceData]);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(window.location.pathname.split('/'));
      const procedureId = { _id: window.location.pathname.split('/')[3] };
      dispatch(fetchSingleProcedureData(procedureId));
    }
  }, []);

  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };
  return (
    <PrivateRoute>
      <Box className="proceduredetails-page">
        <Box className="top-section">
          <Box sx={{ padding: '24px 0px', margin: '0px 24px' }}>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={12} sm={12} md={9} lg={9}>
                <Box>
                  <Typography className="id-detail">
                    ID023659ADN&ensp;/&ensp;Dept-Computer
                    science&ensp;/&ensp;Lab-Data structure
                  </Typography>
                  <Typography className="id-detail-title">
                    Bubble sort
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'end',
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    className="edit-btn"
                    onClick={() => {
                      formPopupRef.current.open(true);
                    }}
                  >
                    <img src={edit} alt="edit" style={{ marginRight: '8px' }} />
                    Edit
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Box>
                  <Typography className="id-detail">Created by</Typography>
                  <Typography
                    className="id-detail"
                    style={{
                      fontWeight: '600',
                      fontSize: '16px',
                      marginTop: '0.4rem',
                    }}
                  >
                    Teacher A
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <Box>
                  <Typography className="id-detail">Created on</Typography>
                  <Typography
                    className="id-detail"
                    style={{
                      fontWeight: '600',
                      fontSize: '16px',
                      marginTop: '0.4rem',
                    }}
                  >
                    28/05/2023 (Wed)
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ borderColor: '#FFEAA5', borderBottomWidth: '5px' }} />
        </Box>
        <Box className="main-proceduredetails">
          <Grid container spacing={2} className="asset-popup">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box>
                <label style={{ color: '#181818' }}>Procedure name</label>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  InputLabelProps={{ shrink: false }}
                  placeholder="bubble sort 2"
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="asset-popup">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box>
                <label style={{ color: '#181818' }}>Full procedures</label>
                <Box sx={{ mt: 2 }}>
                  <Editor
                    apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    init={{
                      height: 400,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                      ],
                      toolbar:
                        'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="edit-details" sx={{ p: 2 }}>
          <Button type="submit" variant="contained" className="cancel-btn">
            Back
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={printer}
              alt="printer"
              style={{ marginRight: '1rem', cursor: 'pointer' }}
            />
            <Button type="submit" variant="contained" className="add-btn">
              Save
            </Button>
          </Box>
        </Box>
        <ProcedureForm
          // formData={procedureData}
          type={'edit'}
          ref={formPopupRef}
          closeFormPopup={handleCloseFormPopup}
          submitFormPopup={handleSubmitFormPopup}
          openConfirmationPopup={handleOpenConfirmationPopup}
        />
        
        <SuccessPopup ref={successPopupRef} />
      </Box>
    </PrivateRoute>
  );
}
