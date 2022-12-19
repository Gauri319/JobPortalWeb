import React from 'react';
import { TextField, Grid } from "@mui/material";
import Button1 from "../../common/Button/Button";
import TextareaAutosize from '@mui/material/TextareaAutosize';

function AdditionalInfo({ clientInfo, setClientInfo, value, setValue }) {
   
    return (
        <div>
            <Grid container rowSpacing={4} columnSpacing={4}>
                <Grid item xs={12}>  <h2>Additional information</h2></Grid>

                <Grid item md={12} xs={12}>
                    <label>About Company *</label>
                    <TextareaAutosize
                       fullWidth
                        aria-label="minimum height"
                        minRows={4}
                        placeholder="About..."
                        style={{width:"100%",borderWidth:"0px 0px 1px 0px",outline:"none"}}
                        onChange={(e) => {
                            setClientInfo((p) => {
                                return { ...p, aboutComapny: e.target.value };
                            });
                        }}
                    />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                    <label>Company Type*</label>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="text"
                        variant="standard"
                        size="small"
                        type="text"
                        required
                        value={clientInfo.Type}
                        onChange={(e) => {
                            setClientInfo((p) => {
                                return { ...p, Type: e.target.value };
                            });
                        }}
                    />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                    <label>Company Size*</label>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Enter company Size"
                        variant="standard"
                        size="small"
                        type="number"
                        required
                        value={clientInfo.Size}
                        onChange={(e) => {
                            setClientInfo((p) => {
                                return { ...p, Size: e.target.value };
                            });
                        }}
                    />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                    <label>Headquaters</label>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Enter Company Headquaters Location "
                        variant="standard"
                        size="small"
                        required
                        value={clientInfo.Headquaters}
                        onChange={(e) => {
                            setClientInfo((p) => {
                                return { ...p, Headquaters: e.target.value };
                            });
                        }}
                    />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                    <label>Branches</label>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="How Many Branches"
                        variant="standard"
                        size="small"
                        type="number"
                        required
                        value={clientInfo.Branches}
                        onChange={(e) => {
                            setClientInfo((p) => {
                                return { ...p, Branches: e.target.value };
                            });
                        }}
                    />
                </Grid>
            </Grid>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "30px" }}>
                <Button1 text="< Previous" handleClick={() => { value > 1 ? setValue(String(parseInt(value) - 1)) : setValue(value) }} />
                <Button1 text="Submit" type="submit" />
            </div>
        </div>
    )
}

export default AdditionalInfo