import React from 'react'
import { TextField, Grid } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button1 from "../../common/Button/Button";

function Personalnfo({ candidateInfo, setCandidateInfo, value, setValue }) {
    const [gender, setGender] = React.useState('');
    function handlenext() {
        if (candidateInfo.Firstname != "" && candidateInfo.Lastname != "" && candidateInfo.email != "" && candidateInfo.phone != "" && candidateInfo.BirthDate != "" && candidateInfo.location != "") {
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
                <Grid item xs={12}>  <h2>Personal information</h2></Grid>
                <Grid item xs={12} md={6}>
                    <label>First Name<span style={{ color: "red" }}>*</span></label>
                    <TextField required value={candidateInfo.Firstname}
                        onChange={(e) => {
                            setCandidateInfo((p) => {
                                return { ...p, Firstname: e.target.value };
                            });
                        }}
                        type="text"
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <label>Last Name<span style={{ color: "red" }}>*</span></label>
                    <TextField required value={candidateInfo.Lastname}
                        onChange={(e) => {
                            setCandidateInfo((p) => {
                                return { ...p, Lastname: e.target.value };
                            });
                        }}
                        type="text"
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <label>
                        email<span style={{ color: "red" }}>*</span>
                    </label>
                    <TextField
                        disabled
                        required
                        type="email"
                        value={candidateInfo.email}
                        onChange={(e) => {
                            setCandidateInfo((p) => {
                                return { ...p, email: e.target.value };
                            });
                        }}
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <label>
                        Phone no.<span style={{ color: "red" }}>*</span>
                    </label>
                    <TextField
                        required
                        type="number"
                        inputProps={{ maxLength: 10 }}
                        value={candidateInfo.phone}
                        onChange={(e) => {
                            setCandidateInfo((p) => {
                                return { ...p, phone: e.target.value };
                            });
                        }}
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <label>
                        Birth Date<span style={{ color: "red" }}>*</span>
                    </label>
                    <TextField
                        required
                        type="date"
                        inputProps={{ maxLength: 10 }}
                        value={candidateInfo.BirthDate}
                        onChange={(e) => {
                            setCandidateInfo((p) => {
                                return { ...p, BirthDate: e.target.value };
                            });
                        }}
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <label>
                        Gender<span style={{ color: "red" }}>*</span>
                    </label>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label" >Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            label="gender"
                            onChange={(e) => {
                                setGender(e.target.value)
                                setCandidateInfo((p) => {
                                    return { ...p, Gender: e.target.value };
                                });
                            }}
                        >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                            <MenuItem value={"other"}>other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <label>Location <span style={{ color: "red" }}>*</span></label>
                    <TextField required value={candidateInfo.location}
                        onChange={(e) => {
                            setCandidateInfo((p) => {
                                return { ...p, location: e.target.value };
                            });
                        }}
                        type="text"
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <label>Country</label>
                    <TextField value={candidateInfo.Country}
                        onChange={(e) => {
                            setCandidateInfo((p) => {
                                return { ...p, Country: e.target.value };
                            });
                        }}
                        type="text"
                        size="small"
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "20px" }}>
                <Button1 text="Next >" handleClick={() => {handlenext()}} />
            </div>
        </div>
    )
}

export default Personalnfo