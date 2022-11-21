import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Search from "../../../assets/svgFile/search.svg";
import Location from "../../../assets/svgFile/location.svg";
import animatedImage from "./animatedImage.png"

export default function Headers() {
  const headingstyle = {
    fontWeight: "700",
    fontSize:{xs:"2rem",sm:"3rem", md:"3rem",lg:"4.2rem"},
    textAlign: "center",
  }
  return (
    <div
      style={{
        width:"100%",
        bgcolor: "white",
        padding:"15px 3px",
      }}  >
      <Grid container maxWidth="100vw">
        <Grid item xs={12} md={7} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <Box sx={{ display: "flex"}}>
            <Typography
              sx={headingstyle} >
              Get The
            </Typography>
            <Typography
              sx={headingstyle} color="#4540DB">
              &nbsp;  Right Job
            </Typography>
          </Box>
          <Box>
            <Typography sx={headingstyle}>
              You Deserve
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize:{md:"2rem",sm:"1.7rem",xs:"1rem"},
                textAlign: "center",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              786 jobs & 110 candidates are registeresd
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              ShadowRoot: "0px 1px 22px 1px rgba(69, 64, 219, 0.04)",
              borderRadius: "20px",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              width: "70%",
              marginTop: { xs: "6%", md: "3vh" },
            }}
          >
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: { sm: "column", md: "row" },
                alignItems: "center",
                marginBlock: "20px",
              }}
            >
              <Grid item xs={12} md={5}>
                <TextField
                  placeholder="Search title or keywoard"
                  sx={{
                    border: "none",
                    outline: "none",
                    width: "100%",

                    "& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <img
                        src={Search}
                        alt="Search"
                        style={{
                          marginRight: "10px",
                          maxWidth: "30px",
                          width: { xs: "10%", md: "100%" },
                          maxHeight: "30px",
                          height: { xs: "10%", md: "100%" },
                        }}
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <TextField
                  sx={{
                    border: "none",
                    width: "100%",
                    outline: "none",

                    "& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="search location"
                  InputProps={{
                    startAdornment: (
                      <img
                        alt="Location"
                        src={Location}
                        style={{
                          maxWidth: "30px",
                          width: { xs: "10%", md: "100%" },
                          maxHeight: "30px",
                          height: { xs: "10%", md: "100%" },
                          marginRight: "10px",
                        }}
                      />
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              sx={{
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                borderRadius: "1.5vw",
                bgcolor: "#4540DB",
                marginBottom:"10px"
              }}
            >
              Search
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}  sx={{ clipPath:{md:"ellipse(76% 60% at 81% 40%)"}, backgroundColor: "blue",textAlign:{md:"right",xs:"left"} }}>
          <img src={animatedImage} alt="headerimage" style={{width:"100%", height:"100%"}}></img>
        </Grid>
      </Grid>
    </div>
  );
}
