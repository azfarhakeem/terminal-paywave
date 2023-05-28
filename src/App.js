import LocationOnIcon from "@material-ui/icons/LocationOn";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
// import React from "react";

import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  DoneOutlined,
  CloseOutlined,
  HourglassBottom,
  HourglassEmptyOutlined,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  dashedDivider: {
    borderTop: "1px dashed rgba(0, 0, 0, 0.3)",
  },
  header: {
    backgroundColor: "rgba(228, 37, 97, 255)",
    padding: "20px 20px 30px",
    color: "white",
  },
  touchSwipeButton: {
    color: "white",
    backgroundColor: "rgba(228, 37, 97, 255)",
    padding: "10px 20px",
    borderRadius: "5px",
    marginTop: "20px",
  },
  boxContainer: {
    backgroundColor: "#f5f5f5",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "20px",
  },
  secondBoxContainer: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "40px",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "20px",
    width: "40%", // Adjust the width value as desired
  },
  thirdBoxContainer: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "40px",
    justifyContent: "space-between",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "20px",
    width: "70%", // Adjust the width value as desired
  },
  fourthBoxContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "40px", // Adjust the margin-top value as desired
    width: "90%", // Adjust the width value as desired
  },
  label: {
    marginRight: "10px",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  image: {
    maxWidth: "60%",
    height: "auto",
  },
  touchSwipeContainer: {
    backgroundColor: "rgba(228, 37, 97, 255)",
    padding: "10px",
    borderRadius: "10px",
    marginLeft: "40px",
    marginTop: "20px",
    textAlign: "center",
    width: "80%", // Adjust the width value as desired
    margin: "0 auto",
  },
  touchSwipeText: {
    color: "white",
  },
  boxShape: {
    width: "25px",
    height: "25px",
    borderRadius: "10px",
    margin: "10px",
    border: `2px solid rgba(228, 37, 97, 255)`, // Update border color to match the desired color
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.primary.main,
    fontSize: "1.5rem",
    backgroundColor: "white", // Added background color to make the box symmetrical
  },
  iconBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    borderRadius: "50%",
    padding: "5px",
    color: "rgba(76,231,51,255) !important", // Update color to rgba(228, 37, 97, 255)
    backgroundColor: "transparent",
    marginTop: "10px",
    boxShadow: "0px 0px 0px 2px rgba(76,231,51,255)", // Update boxShadow color to rgba(228, 37, 97, 255)
  },
  iconCloseBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    borderRadius: "50%",
    padding: "5px",
    color: "rgba(228, 37, 97, 255) !important", // Update color to rgba(228, 37, 97, 255)
    backgroundColor: "transparent",
    marginTop: "10px",
    boxShadow: "0px 0px 0px 2px rgba(228, 37, 97, 255)", // Update boxShadow color to rgba(228, 37, 97, 255)
  },
  iconAwaitBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    borderRadius: "50%",
    padding: "5px",
    color: "rgba(228, 37, 97, 255) !important", // Update color to rgba(228, 37, 97, 255)
    backgroundColor: "transparent",
    marginTop: "10px",
    boxShadow: "0px 0px 0px 2px grey", // Update boxShadow color to rgba(228, 37, 97, 255)
  },
  transactionBox: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  transactionText: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  closeBox: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  resetButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
  },
}));

const App = () => {
  const classes = useStyles();

  const [buttonState, setButtonState] = useState(0);
  const [transactionState, setTransactionState] = useState("awaiting");
  const [gpsState, setGpsState] = useState("off");

  const handleButtonClick = async () => {
    setButtonState(1);
    if (transactionState === "awaiting") {
      await fetch("http://192.168.223.3:8881/location", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat2: 3.1613244,
          lon2: 101.6954547,
          accountNo: 1,
        }),
      });
    }
  };

  const handleResetButtonClick = () => {
    setButtonState(0);
  };

  const handleTransactionState = (jsonData) => {
    if (jsonData.status === "TRANSACTION APPROVED") {
      setTransactionState("success");
    } else {
      setTransactionState("fail");
    }
  };

  useEffect(() => {}, [transactionState]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.223.3:8881/status", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const jsonData = await response.json();

        if (Object.keys(jsonData).length !== 0) {
          handleTransactionState(jsonData);
        }

        // setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const intervalId = setInterval(fetchData, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [buttonState]);

  console.log(buttonState, "button state");

  return (
    <div>
      <div className={classes.header}>
        <Typography variant="h4"></Typography>
      </div>
      <div className={classes.boxContainer}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "30%", textAlign: "center" }}>
            <LocationOnIcon
              style={{ fontSize: "2rem", color: "rgba(228, 37, 97, 255)" }}
            />
          </div>
          <Divider
            orientation="vertical"
            flexItem
            className={classes.dashedDivider}
          />
          <div style={{ width: "70%", paddingLeft: "10px" }}>
            <Typography variant="h6">Asia School of Business</Typography>
          </div>
        </div>
      </div>
      <div className={classes.secondBoxContainer}>
        <Typography variant="subtitle1" className={classes.netsPayment}>
          NETS PURCHASE
        </Typography>
      </div>
      <div className={classes.thirdBoxContainer}>
        <Typography variant="subtitle1" className={classes.label}>
          Amount:
        </Typography>
        <Typography variant="subtitle1">RM89.90</Typography>
      </div>
      {/* ----------------START UP PAGE----------- */}
      {buttonState === 0 && (
        <div>
          <div className={classes.imageContainer}>
            <img
              className={classes.image}
              src="https://drive.google.com/uc?export=view&id=1_eKurwUk57oGf9l_3Dh4bwmhuFZZ_Hiu"
              alt="Sample"
            />
          </div>
          <Button
            variant="contained"
            className={`${classes.touchSwipeContainer} ${classes.touchSwipeButton}`}
            onClick={handleButtonClick}
          >
            TOUCH / INSERT OR SWIPE HERE
          </Button>
        </div>
      )}

      <Button
        variant="contained"
        className={classes.resetButton}
        onClick={handleResetButtonClick}
      >
        Reset
      </Button>
      {/* ----------ENTER PIN---------- */}
      {/* <div className={classes.fourthBoxContainer}>
        <Typography variant="subtitle1" className={classes.label}>
          ENTER PIN ****
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper className={classes.boxShape} elevation={3}></Paper>
        <Paper className={classes.boxShape} elevation={3}></Paper>
        <Paper className={classes.boxShape} elevation={3}></Paper>
        <Paper className={classes.boxShape} elevation={3}></Paper>
        <Paper className={classes.boxShape} elevation={3}></Paper>
        <Paper className={classes.boxShape} elevation={3}></Paper>
      </div> */}
      {/* ---------------TRANSACTION SUCCESS--------- */}
      {buttonState === 1 && transactionState === "success" && (
        <div>
          <div className={classes.fourthBoxContainer}>
            <Paper elevation={3} className={classes.iconBox}>
              <DoneOutlined
                style={{ fontSize: "10rem", color: "rgba(76,231,51,255)" }}
              />
            </Paper>
          </div>
          <Box className={classes.transactionBox}>
            <Typography variant="subtitle1" className={classes.transactionText}>
              TRANSACTION ACCEPTED
            </Typography>
          </Box>
        </div>
      )}

      {/* ----------------TRANSACTION FAILED--------- */}
      {buttonState === 1 && transactionState === "fail" && (
        <div>
          <div className={classes.fourthBoxContainer}>
            <Paper elevation={3} className={classes.iconCloseBox}>
              <CloseOutlined
                style={{ fontSize: "10rem", color: "rgba(228, 37, 97, 255)" }}
              />
            </Paper>
          </div>
          <Box className={classes.transactionBox}>
            <Typography variant="subtitle1" className={classes.transactionText}>
              TRANSACTION REJECTED
            </Typography>
          </Box>
        </div>
      )}
      {/* ---------------------AWAITING TRANSACTION----------- */}
      {buttonState === 1 && transactionState === "awaiting" && (
        <div>
          <div className={classes.fourthBoxContainer}>
            <Paper elevation={3} className={classes.iconAwaitBox}>
              <HourglassEmptyOutlined
                style={{ fontSize: "10rem", color: "grey" }}
              />
            </Paper>
          </div>
          <Box className={classes.transactionBox}>
            <Typography variant="subtitle1" className={classes.transactionText}>
              AWAITING TRANSACTION
            </Typography>
          </Box>
        </div>
      )}
    </div>
  );
};

export default App;
