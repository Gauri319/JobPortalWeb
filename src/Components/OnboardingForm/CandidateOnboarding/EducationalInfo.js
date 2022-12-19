import React from 'react';
import { TextField, Grid } from "@mui/material";
import Button1 from "../../common/Button/Button";

function EducationalInfo({ candidateInfo, setCandidateInfo, value, setValue }) {
    function handlenext() {
        if (candidateInfo.Degree != "" && candidateInfo.Branch != "" &&candidateInfo.College != "" && candidateInfo.Percentage != "") {
            if (value < 3) {
                setValue(String(parseInt(value) + 1))
            }
            else (setValue(value))
        }
        // else{
        //     alert("Please! Fill the all required Fields")
        // }
    }
    return (
        <div>
            <Grid container rowSpacing={4} columnSpacing={3}>
                <Grid item xs={12}>  <h2>Educational information</h2></Grid>
                <Grid item xs={12} md={6}>
                    <label>Degree <span style={{ color: "red" }}>*</span></label>
                    <TextField
                        value={candidateInfo.Degree}
                        required
                        type="text"
                        onChange={(e) => {
                            setCandidateInfo((p) => {
                                return { ...p, Degree: e.target.value };
                            });
                        }}
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <label>Branch <span style={{ color: "red" }}>*</span></label>
                    <TextField
                        value={candidateInfo.Branch}
                        required
                        type="text"
                        onChange={(e) => {
                            setCandidateInfo((p) => {
                                return { ...p, Branch: e.target.value };
                            });
                        }}
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <label>College Name <span style={{ color: "red" }}>*</span></label>
                    <TextField
                        value={candidateInfo.College}
                        required
                        type="text"
                        onChange={(e) => {
                            setCandidateInfo((p) => {
                                return { ...p, College: e.target.value };
                            });
                        }}
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <label>Percentage <span style={{ color: "red" }}>*</span></label>
                    <TextField
                        value={candidateInfo.Percentage}
                        required
                        type="text"
                        onChange={(e) => {
                            setCandidateInfo((p) => {
                                return { ...p, Percentage: e.target.value };
                            });
                        }}
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <label>Start Date</label>
                    <TextField
                        type="date"
                        onChange={(e) => {
                            setCandidateInfo((p) => {
                                return { ...p, education: e.target.value };
                            });
                        }}
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <label>End Date</label>
                    <TextField
                        type="date"
                        onChange={(e) => {
                            setCandidateInfo((p) => {
                                return { ...p, education: e.target.value };
                            });
                        }}
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "30px" }}>
                <Button1 text="< Previous" handleClick={() => { value > 1 ? setValue(String(parseInt(value) - 1)) : setValue(value) }} />
                <Button1 text="Next >" handleClick={() => {handlenext() }} />
            </div>
        </div>
    )
}

export default EducationalInfo