/* eslint-disable react/display-name */
import React from 'react';
import { Box, Chip, Dialog, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TablePopup = React.forwardRef((props, ref) => {
  const [openPopup, setOpenPopup] = React.useState(false);
  const [listName, setListName] = React.useState('');
  const [listItems, setListItems] = React.useState<any>([]);

  React.useImperativeHandle(ref, () => ({
    open(state: any, name: string, items: any) {
      setOpenPopup(state);
      setListName(name);
      setListItems(items)
    },
  }));

  const handlePopupClose = () => {
    setOpenPopup(false);
    setListName('');
  };

  return (
    <Dialog
      open={openPopup}
      keepMounted
      onClose={handlePopupClose}
      aria-labelledby="confirmation-title"
      aria-describedby="confirmation"
      fullWidth
      maxWidth="sm"
      className="popup-outer"
    >
      <Box className="popup-section">
        <Box className="title-popup" sx={{marginBottom: '1rem !important'}}>
          <Typography>{listName} list ({listItems.length})</Typography>
          <CloseIcon onClick={handlePopupClose} />
        </Box>
        <Box>
          <Typography className="follow-people">
            You have selected following {listName}.
          </Typography>
          <Box
            style={{
              borderRadius: '10px',
              border: '1px solid #9F9F9F',
              padding: '20px 10px',
              margin: '15px 0px',
            }}
          >
            <Box>
              {listItems?.map((item, index) => (
                <Chip key={index} label={item.name} sx={{ m: 0.5 }} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
});

export default TablePopup;

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
];
