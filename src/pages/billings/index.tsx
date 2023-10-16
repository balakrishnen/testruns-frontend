import React from "react";
import PrivateRoute from "../../components/PrivateRoute";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssetsData } from "../../api/assetsAPI";

export default function Billings() {
  const dispatch: any = useDispatch();
  const { data, loading, error }: any = useSelector((state) => state);

  React.useEffect(() => {
    // const payload: any = {
    //   productId: 1
    // }
    // dispatch(fetchAssetsData(payload));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <PrivateRoute>
      {" "}
      <Box className="main-padding">
        <Box className="title-main">
          <Typography>Billing and Subscriptions</Typography>
        </Box>
      </Box>
      {/* {JSON.stringify(data)} */}
    </PrivateRoute>
  );
}
