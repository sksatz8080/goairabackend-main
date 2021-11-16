import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Button, Modal, TextField, Grid, CardActions, InputLabel, FormControl, MenuItem, Select, Typography, SelectChangeEvent } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { adminData } from "../models/admin";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { driverData, VehicleData, DownloadData, LicenseData, DriverId, driverModel } from "../models/driver";

const Input = styled('input')({
    display: 'none',
});
const useStyles = makeStyles({
    dtable: {
        width: "100%",
        border: "1px solid #f2f2f2",
        borderCollapse: "collapse",
        '& th': {
            border: "1px solid #f2f2f2",
            borderCollapse: "collapse"
        },
        '& td': {
            padding: 0,
            border: "1px solid #f2f2f2",
            borderCollapse: "collapse",
        },
        '& tr': {
            border: "1px solid #f2f2f2",
            borderCollapse: "collapse"
        },
    },
});

const VehiclePage = () => {
    const classes = useStyles();
    const { data, error, valid, label, name } = driverData;
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editId, setEditId] = useState('');
    const[driverId, setDriverId] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [adminDetails, setAdminDetails] = useState(adminData);
    const [adminModel, setAdminModel] = useState();
    const [vehicleDetails, setVehicleDetails] = useState(VehicleData);
    const [vehicleModel, setVehicleModel] = useState();
    const [driverDetails, setdriverDetails] = useState({ data, error, valid, label });
    const [addVehicle, setAddVehicle] = useState(false);
    const [editVehicle, setEditVehicle] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [vehicles, setVehicles] = React.useState([]);
    const [viewId, setViewId] = useState('');
    const [downloadDetails, setDownloadDetails] = useState(DownloadData);
    const [roadTax, setRoadTax] = useState(false);
    const [permit, setPermit] = useState(false);
    const [fcCertificate, setFcCertificate] = useState(false);
    const [insurance, setInsurance] = useState(false);
    const [noc, setNoc] = useState(false);
    const [leaseCopy, setLeaseCopy] = useState(false);
    const [rcBook, setRcBook] = useState(false);
    const [vehiclePhoto, setVehiclePhoto] = useState(false);


    useEffect(() => {
        axios.get('https://vehicleapi-hldux24wua-el.a.run.app/').then(res => {
            setVehicleModel(res.data);

        });
        setRefresh(false);
    }, [refresh])

    useEffect(() => {
        if (!addVehicle && !editVehicle) {
            setVehicleDetails(VehicleData);
        }
    }, [addVehicle, editVehicle])


    

     
    // useEffect(() => {
    //             (async () => {
    //                 if (viewModal) {
    //                     await axios.get(`https://vehicleapi-hldux24wua-el.a.run.app/driver/${viewId}`).then(async (res) => {
    //                         console.log(res.data)
    //                         if (res.data.length > 0) {
    //                             await axios.get(`https://vehicleapi-hldux24wua-el.a.run.app/${res.data[0].vehicle_id}`).then(res => {
    //                                 setVehicles(res.data[0]);
    //                                 console.log(res.data[0]);
    //                                 setVehicleModel(res.data);
    //                                 setRefresh(false);
    //                             })
    //                         }

    //                     })
    //                 }

    //                
    //             });
    //     }, [createModal, editModal, viewModal]);



    useEffect(() => {
        if (!createModal && !editModal) {
            setVehicleDetails(VehicleData)
        }
    }, [createModal, editModal])

    const VehicleColumn: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 250, sortable: false },
        { field: 'v_type', headerName: 'Vehicle Type', width: 250, sortable: false },
        { field: 'v_reg_no', headerName: 'Vehicle Registration No.', width: 250, sortable: false },
        { field: 'v_model', headerName: 'Vehicle Model', width: 250, sortable: false },
        { field: 'v_make', headerName: 'Vehicle Make', width: 250, sortable: false },

        {
            field: 'Actions', headerName: 'Actions', width: 150, sortable: false, renderCell: (params) => {
                return (
                    <>
                        <Button variant="contained" color="warning" style={{ marginRight: "8px" }} onClick={async () => {

                            setViewModal(true);
                            setViewId(params.row.id);
                            console.log(params.row.id);
                            console.log(viewId);
                            setVehicleDetails(prevState => {
                                return {
                                    ...prevState,
                                    data: {
                                        ...prevState.data,
                                        id: params.row.id,
                                        v_type: params.row.v_type,
                                        v_reg_no: params.row.v_reg_no,
                                        v_model: params.row.v_model,
                                        v_make: params.row.v_make,
                                        v_engine_no: params.row.v_engine_no,
                                        v_chassis_no: params.row.v_chassis_no,
                                        v_manufacture: params.row.v_manufacture,
                                        v_roadtax_expiry: params.row.v_roadtax_expiry,
                                        v_insurance_expiry: params.row.v_insurance_expiry,
                                        v_permit_expiry: params.row.v_permit_expiry,
                                        v_fc_expiry: params.row.v_fc_expiry

                                    }
                                }
                            }


                            );
                            console.log(params.row.id);
                            await axios.get(`https://vehicleapi-hldux24wua-el.a.run.app/vehicle/${params.row.id}`).then(res => {
                                console.log(res.data[0].driver_id);
                                setDriverId(res.data[0].driver_id);

                             axios.get(`https://driver-upload-api-hldux24wua-el.a.run.app/driverdocs/${res.data[0].driver_id}`).then(res => {
                                if (res.data.length > 0) {
                                    setRefresh(false);
                                    setDownloadDetails(prevstate => {
                                        return {
                                            ...prevstate,
                                            data: {
                                                ...prevstate.data,
                                                id: res.data[0].id,
                                                driver_id: res.data[0].driver_id,
                                                profile_photo: res.data[0].profile_photo,
                                                aadhar_card: res.data[0].aadhar_card,
                                                pan_card: res.data[0].pan_card,
                                                license: res.data[0].license,
                                                road_tax: res.data[0].road_tax,
                                                permit: res.data[0].permit,
                                                fc_certificate: res.data[0].fc_certificate,
                                                insurance: res.data[0].insurance,
                                                lease_copy: res.data[0].lease_copy,
                                                noc: res.data[0].noc,
                                                rc_book: res.data[0].rc_book,
                                                vehicle_photo: res.data[0].vehicle_photo,
                                                license_suspend: res.data[0].license_suspend,
                                                profile_photo_approved: '',
                                                aadhar_card_approved: res.data[0].aadhar_card_approved,
                                                pan_card_approved: res.data[0].pan_card_approved,
                                                license_approved: res.data[0].license_approved,
                                                road_tax_approved: res.data[0].road_tax_approved,
                                                permit_approved: res.data[0].permit_approved,
                                                fc_certificate_approved: res.data[0].fc_certificate_approved,
                                                insurance_approved: res.data[0].insurance_approved,
                                                lease_copy_approved: res.data[0].lease_copy_approved,
                                                noc_approved: res.data[0].noc_approved,
                                                rc_book_approved: res.data[0].rc_book_approved,
                                                vehicle_photo_approved: res.data[0].vehicle_photo_approved,
                                                license_suspend_approved: res.data[0].license_suspend_approved,
                                                license_penalty_approved: res.data[0].license_penalty_approved
                                            }
                                        }
                                    });
                                }
                            })
                                 
                                 
                           }) 


                            
                        }}>View</Button>
                       
                        <Button variant="contained" color="primary" style={{ marginRight: "8px" }} onClick={() => {

                            setEditVehicle(true)
                            setVehicleDetails(prevState => {
                                return {
                                    ...prevState,
                                    data: {
                                        ...prevState.data,
                                        v_type: params.row.v_type,
                                        v_reg_no: params.row.v_reg_no,
                                        v_model: params.row.v_model,
                                        v_make: params.row.v_make,
                                        v_engine_no: params.row.v_engine_no,
                                        v_chassis_no: params.row.v_chassis_no,
                                        v_manufacture: params.row.v_manufacture,
                                        v_roadtax_expiry: params.row.v_roadtax_expiry,
                                        v_insurance_expiry: params.row.v_insurance_expiry,
                                        v_permit_expiry: params.row.v_permit_expiry,
                                        v_fc_expiry: params.row.v_fc_expiry,
                                    }
                                }
                            })

                        }}>Edit</Button>
                    </>
                )
            }
        },
    ]

    const DriverColumn: GridColDef[] = [

        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'mobile', headerName: 'Mobile', width: 250 },
        { field: 'email', headerName: 'Email', width: 250, sortable: false },
        { field: 'status', headerName: 'Status', width: 250, sortable: false },
        { field: 'dob', headerName: 'Dob', width: 250, sortable: false, hide: true },
        { field: 'father_name', headerName: 'Father Name', width: 250, sortable: false, hide: true },
        { field: 'aadhar', headerName: 'Aadhar', width: 250, sortable: false, hide: true },
        { field: 'marital_status', headerName: 'Marital Status', width: 250, sortable: false, hide: true },
        { field: 'blood_group', headerName: 'Blood Group', width: 250, sortable: false, hide: true },
        { field: 'qualification', headerName: 'Qualification', width: 250, sortable: false, hide: true },
        { field: 'experience', headerName: 'Experience', width: 250, sortable: false, hide: true },
        { field: 'previous_work', headerName: 'Previous Work', width: 250, sortable: false, hide: true },
        { field: 'c_address', headerName: 'Communication Address', width: 250, sortable: false, hide: true },
        { field: 'c_pincode', headerName: 'C Pincode', width: 250, sortable: false, hide: true },
        { field: 'c_state', headerName: 'C State', width: 250, sortable: false, hide: true },
        { field: 'languages', headerName: 'Languages Known', width: 250, sortable: false, hide: true },
        { field: 'p_address', headerName: 'Permanent Address', width: 250, sortable: false, hide: true },
        { field: 'p_pincode', headerName: 'P Pincode', width: 250, sortable: false, hide: true },
        { field: 'p_state', headerName: 'P State', width: 250, sortable: false, hide: true },
        { field: 'e_number', headerName: 'Emergency Contact Number', width: 250, sortable: false, hide: true },
        { field: 'e_name', headerName: 'Emergency Contact Name', width: 250, sortable: false, hide: true },
        { field: 'e_relation', headerName: 'Emergency Contact Relation', width: 250, sortable: false, hide: true },



        {
            field: 'Actions', headerName: 'Actions', width: 300, sortable: false, renderCell: (params) => {
                return (

                    <>
                        <Button variant="contained" color="warning" style={{ marginRight: "8px" }} onClick={async () => {

                            setViewModal(true);
                            setViewId(params.row.id);
                            setdriverDetails(prevState => {
                                return {
                                    ...prevState,
                                    data: {
                                        ...prevState.data,

                                        name: params.row.name,
                                        mobile: params.row.mobile,
                                        aadhar: params.row.aadhar,
                                        gender: params.row.gender,
                                        dob: params.row.dob,
                                        email: params.row.email,
                                        father_name: params.row.father_name,
                                        marital_status: params.row.marital_status,
                                        blood_group: params.row.blood_group,
                                        qualification: params.row.qualification,
                                        experience: params.row.experience,
                                        previous_work: params.row.previous_work,
                                        c_address: params.row.c_address,
                                        c_city: params.row.c_city,
                                        c_pincode: params.row.c_pincode,
                                        c_state: params.row.c_state,
                                        c_country: params.row.c_country,
                                        p_address: params.row.p_address,
                                        p_city: params.row.p_city,
                                        p_pincode: params.row.p_pincode,
                                        p_state: params.row.p_state,
                                        p_country: params.row.p_country,
                                        languages: params.row.languages,
                                        e_number: params.row.e_number,
                                        e_name: params.row.e_name,
                                        e_relation: params.row.e_relation,
                                        status: params.row.status

                                    }
                                }
                            }


                            );

                        }}>View</Button>
            </>
                )
            }
        }
    ];


    return (

        <Card>
            <CardHeader title="Vehicle Details" action={
                <Button variant="contained" color="primary" onClick={() => setCreateModal(true)}>Create Vehicle</Button>
            } />
            <CardContent style={{ height: "700px" }}>
                <DataGrid rows={vehicleModel ?? []}
                    columns={VehicleColumn}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick />
            </CardContent>

            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={viewModal}
                aria-labelledby="view-driver-title"
                aria-describedby="view-driver-description"
            >
                <Card style={{ width: "70%", height: "80%", overflow: "auto" }} >
                    <CardHeader title="View Driver" style={{ display: "flex", borderBottom: "1px solid #f2f2f2", position: "fixed", zIndex: 3, backgroundColor: "white", justifyContent: "space-between", width: "70%" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setViewModal(false)
                        }}>Close</Button>
                    } />
                    <CardContent style={{ marginTop: 70 }}>
                        <Grid container style={{ padding: "0 30px" }}>
                            <Grid item xs={12}>
                                <Typography variant="h6">
                                    Vehicle Details
                                </Typography>

                            </Grid>



                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Vehicle Type:</b> {vehicleDetails.data.v_type}

                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Vehicle Registration Number:</b> {vehicleDetails.data.v_reg_no}
                                </Typography>
                            </Grid>



                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Vehicle Model:</b> {vehicleDetails.data.v_model}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Vehicle Make:</b> {vehicleDetails.data.v_make}

                                </Typography>
                            </Grid>

                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Vehicle Engine Number:</b> {vehicleDetails.data.v_engine_no}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Vehicle Chassis number:</b> {vehicleDetails.data.v_chassis_no}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Vehicle Manufacture Date:</b> {vehicleDetails.data.v_manufacture}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Road Tax Expiry:</b> {vehicleDetails.data.v_roadtax_expiry}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Vehicle Insurance Expiry:</b> {vehicleDetails.data.v_insurance_expiry}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Vehicle Permit Expiry:</b> {vehicleDetails.data.v_permit_expiry}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Vehicle FC Expiry:</b> {vehicleDetails.data.v_fc_expiry}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Primary Driver:</b> {vehicleDetails.data.v_fc_expiry}
                                </Typography>
                            </Grid>

                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Card sx={{ minWidth: 200, width: '65%', }}>
                                    <CardContent>
                                        <Typography>
                                            <b>Vehicle Photo </b>
                                            <label htmlFor="contained-button-file1">
                                                <Input id="contained-button-file1" type="file" />
                                                <IconButton component="span" color="default"  >
                                                    <UploadFileIcon />
                                                </IconButton>
                                            </label>
                                            {downloadDetails.data.vehicle_photo ?
                                                <IconButton aria-label="download" onClick={() => {
                                                     console.log(downloadDetails)
                                                    setVehiclePhoto(true);

                                                }}>
                                                    <RemoveRedEyeIcon style={{ justifyContent: "right" }} /> </IconButton>
                                            : <IconButton disabled aria-label="download" >
                                               <RemoveRedEyeIcon style={{ justifyContent: "right" }} /> </IconButton> }
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Card sx={{ minWidth: 200, width: '65%', }}>
                                    <CardContent>
                                        <Typography>
                                            <b>RC Book </b>
                                            <label htmlFor="contained-button-file2">
                                                <Input id="contained-button-file2" type="file" />
                                                <IconButton component="span" color="default"  >
                                                    <UploadFileIcon />
                                                </IconButton>
                                            </label>
                                            {downloadDetails.data.rc_book ?
                                                <IconButton aria-label="download" onClick={() => {
                                                     console.log(downloadDetails)
                                                    setRcBook(true);

                                                }}>
                                                    <RemoveRedEyeIcon style={{ justifyContent: "right" }} /> </IconButton>
                                            : <IconButton disabled aria-label="download" >
                                               <RemoveRedEyeIcon style={{ justifyContent: "right" }} /> </IconButton> }
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Card sx={{ minWidth: 200, width: '65%', }}>
                                    <CardContent>
                                        <Typography>
                                            <b>Insurance </b>
                                            <label htmlFor="contained-button-file3">
                                                <Input id="contained-button-file3" type="file" />
                                                <IconButton component="span" color="default"  >
                                                    <UploadFileIcon />
                                                </IconButton>
                                            </label>
                                            {downloadDetails.data.insurance ?
                                                <IconButton aria-label="download" onClick={() => {
                                                     console.log(downloadDetails)
                                                    setInsurance(true);

                                                }}>
                                                    <RemoveRedEyeIcon style={{ justifyContent: "right" }} /> </IconButton>
                                            : <IconButton disabled aria-label="download" >
                                               <RemoveRedEyeIcon style={{ justifyContent: "right" }} /> </IconButton> }
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Card sx={{ minWidth: 200, width: '65%', }}>
                                    <CardContent>
                                        <Typography>
                                            <b>FC Certificate</b>
                                            <label htmlFor="contained-button-file4">
                                                <Input id="contained-button-file4" type="file" />
                                                <IconButton component="span" color="default"  >
                                                    <UploadFileIcon />
                                                </IconButton>
                                            </label>
                                            {downloadDetails.data.fc_certificate ?
                                                <IconButton aria-label="download" onClick={() => {
                                                     console.log(downloadDetails)
                                                    setFcCertificate(true);

                                                }}>
                                                    <RemoveRedEyeIcon style={{ justifyContent: "right" }} /> </IconButton>
                                            : <IconButton disabled aria-label="download" >
                                               <RemoveRedEyeIcon style={{ justifyContent: "right" }} /> </IconButton> }
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Card sx={{ minWidth: 200, width: '65%', }}>
                                    <CardContent>
                                        <Typography>
                                            <b>Permit</b>
                                            <label htmlFor="contained-button-file5">
                                                <Input id="contained-button-file5" type="file" />
                                                <IconButton component="span" color="default"  >
                                                    <UploadFileIcon />
                                                </IconButton>
                                            </label>
                                            {downloadDetails.data.permit ?
                                                <IconButton aria-label="download" onClick={() => {
                                                     console.log(downloadDetails)
                                                    setPermit(true);

                                                }}>
                                                    <RemoveRedEyeIcon style={{ justifyContent: "right" }} /> </IconButton>
                                            : <IconButton disabled aria-label="download" >
                                               <RemoveRedEyeIcon style={{ justifyContent: "right" }} /> </IconButton> }
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Card sx={{ minWidth: 200, width: '65%', }}>
                                    <CardContent>
                                        <Typography>
                                            <b>Road Tax</b>
                                            <label htmlFor="contained-button-file6">
                                                <Input id="contained-button-file6" type="file" />
                                                <IconButton component="span" color="default"  >
                                                    <UploadFileIcon />
                                                </IconButton>
                                            </label>
                                            {downloadDetails.data.road_tax ?
                                                <IconButton aria-label="download" onClick={() => {
                                                     console.log(downloadDetails)
                                                    setRoadTax(true);

                                                }}>
                                                    <RemoveRedEyeIcon style={{ justifyContent: "right" }} /> </IconButton>
                                            : <IconButton disabled aria-label="download" >
                                               <RemoveRedEyeIcon style={{ justifyContent: "right" }} /> </IconButton> }
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid container xs={12}>
                                <Grid item xs={6} style={{ marginTop: "1rem" }}>
                                    <Typography variant="h6">Vehicle Details</Typography>
                                </Grid>
                                <Grid item xs={6} style={{ marginTop: "1rem", }}>
                                    <Button variant="contained" color="primary" style={{ float: "right" }} onClick={() => setAddVehicle(true)}>Add Vehicle</Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ margin: "1rem 0", height: "170px" }}>
                                <DataGrid rows={driverModel || []}
                                    columns={DriverColumn}
                                    hideFooter
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Modal>
            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={vehiclePhoto}
                data-backdrop="static"
                
                aria-labelledby="Vehicle photo"
                aria-describedby="Vehicle photo"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="Vehicle photo" style={{ borderBottom: "1px solid #f2f2f2" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setVehiclePhoto(false)
                    
                        
                           
                        }}>Close</Button>
                    } />
                    <CardContent>
                        <Grid container spacing={3} style={{ display: "flex",justifyContent: "center",paddingTop: 30 }}>

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${downloadDetails.data.driver_id}/${downloadDetails.data.vehicle_photo}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let vehicle_photo_approve = {
                                      "vehicle_photo_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${downloadDetails.data.driver_id}/`, vehicle_photo_approve).then(res=> setVehiclePhoto(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let vehicle_photo_reject = {
                                    "vehicle_photo_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${downloadDetails.data.driver_id}/`, vehicle_photo_reject).then(res=> setVehiclePhoto(false))                   
                            
                            }}>Reject</Button>
                            
                            
                            
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>
            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={insurance}
                data-backdrop="static"
                
                aria-labelledby="Insurance"
                aria-describedby="Insurance"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="Insurance" style={{ borderBottom: "1px solid #f2f2f2" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setInsurance(false)
                    
                        
                           
                        }}>Close</Button>
                    } />
                    <CardContent>
                        <Grid container spacing={3} style={{ display: "flex",justifyContent: "center",paddingTop: 30 }}>

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${downloadDetails.data.driver_id}/${downloadDetails.data.insurance}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let insurance_approve = {
                                      "insurance_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${downloadDetails.data.driver_id}/`, insurance_approve).then(res=> setInsurance(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let insurance_reject = {
                                    "insurance_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, insurance_reject).then(res=> setInsurance(false))                   
                            
                            }}>Reject</Button>
                            
                            
                            
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>
            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={rcBook}
                data-backdrop="static"
                
                aria-labelledby="RC Book"
                aria-describedby="RC Book"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="RC Book" style={{ borderBottom: "1px solid #f2f2f2" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setRcBook(false)                  
                                                   
                        }}>Close</Button>
                    } />
                    <CardContent>
                        <Grid container spacing={3} style={{ display: "flex",justifyContent: "center",paddingTop: 30 }}>

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${downloadDetails.data.driver_id}/${downloadDetails.data.rc_book}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let rc_book_approve = {
                                      "rc_book_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${downloadDetails.data.driver_id}/`, rc_book_approve).then(res=> setRcBook(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let rc_book_reject = {
                                    "rc_book_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${downloadDetails.data.driver_id}/`, rc_book_reject).then(res=> setRcBook(false))                   
                            
                            }}>Reject</Button>                           
                                                        
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>

            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={fcCertificate}
                data-backdrop="static"
                
                aria-labelledby="Fc Certificate"
                aria-describedby="Fc Certificate"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="Fc Certificate" style={{ borderBottom: "1px solid #f2f2f2" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setFcCertificate(false)
                    
                        
                           
                        }}>Close</Button>
                    } />
                    <CardContent>
                        <Grid container spacing={3} style={{ display: "flex",justifyContent: "center",paddingTop: 30 }}>

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${downloadDetails.data.driver_id}/${downloadDetails.data.fc_certificate}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let fc_certificate_approve = {
                                      "fc_certificate_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${downloadDetails.data.driver_id}/`, fc_certificate_approve).then(res=> setFcCertificate(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let fc_certificate_reject = {
                                    "fc_certificate_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${downloadDetails.data.driver_id}/`, fc_certificate_reject).then(res=> setFcCertificate(false))                   
                            
                            }}>Reject</Button>                           
                                                        
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>

            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={roadTax}
                data-backdrop="static"
                
                aria-labelledby="Road Tax"
                aria-describedby="Road Tax"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="Road Tax" style={{ borderBottom: "1px solid #f2f2f2" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setRoadTax(false)
                    
                        
                           
                        }}>Close</Button>
                    } />
                    <CardContent>
                        <Grid container spacing={3} style={{ display: "flex",justifyContent: "center",paddingTop: 30 }}>

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${downloadDetails.data.driver_id}/${downloadDetails.data.road_tax}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let road_tax_approve = {
                                      "road_tax_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${downloadDetails.data.driver_id}/`, road_tax_approve).then(res=> setRoadTax(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let road_tax_reject = {
                                    "road_tax_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${downloadDetails.data.driver_id}/`, road_tax_reject).then(res=> setRoadTax(false))                   
                            
                            }}>Reject</Button>
                            
                            
                            
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>
            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={permit}
                data-backdrop="static"
                
                aria-labelledby="Permit"
                aria-describedby="Permit"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="Permit" style={{ borderBottom: "1px solid #f2f2f2" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setPermit(false)
                    
                        
                           
                        }}>Close</Button>
                    } />
                    <CardContent>
                        <Grid container spacing={3} style={{ display: "flex",justifyContent: "center",paddingTop: 30 }}>

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${downloadDetails.data.driver_id}/${downloadDetails.data.permit}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let permit_approve = {
                                      "permit_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${downloadDetails.data.driver_id}/`, permit_approve).then(res=> setPermit(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let permit_reject = {
                                    "permit_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${downloadDetails.data.driver_id}/`, permit_reject).then(res=> setPermit(false))                   
                            
                            }}>Reject</Button>
                            
                            
                            
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>
        </Card>
    )
}

export default VehiclePage;