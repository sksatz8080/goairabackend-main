import React, { useState, useEffect } from "react";
import {
    Card, CardContent, CardHeader, Typography, Modal, Chip, TextField, OutlinedInput, Box,
    Grid, CardActions, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, FormHelperText
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { driverData, VehicleData, DownloadData, LicenseData } from "../models/driver";
import { makeStyles } from '@mui/styles';
import axios from "axios";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { render } from "react-dom";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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
            padding: "5px 10px",
            border: "1px solid #f2f2f2",
            borderCollapse: "collapse"
        },
        '& tr': {
            border: "1px solid #f2f2f2",
            borderCollapse: "collapse"
        },
    },
});

const DriverPage = () => {
    const classes = useStyles();
    const { data, error, valid, label, name } = driverData;
    const [checked, setChecked] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const [vehicles, setVehicles] = React.useState([]);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [refreshVehicle, setRefreshVehicle] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [addLicense, setAddLicense] = useState(false);
    const [editLicense, setEditLicense] = useState(false);
    const [viewId, setViewId] = useState('')
    const [addVehicle, setAddVehicle] = useState(false);
    const [addBadge, setAddBadge] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(false);
    const [aadharCard, setAadharCard] = useState(false);
    const [panCard, setPanCard] = useState(false);
    const [license, setLicense] = useState(false);
    const [roadTax, setRoadTax] = useState(false);
    const [permit, setPermit] = useState(false);
    const [fcCertificate, setFcCertificate] = useState(false);
    const [insurance, setInsurance] = useState(false);
    const [noc, setNoc] = useState(false);
    const [leaseCopy, setLeaseCopy] = useState(false);
    const [rcBook, setRcBook] = useState(false);
    const [vehiclePhoto, setVehiclePhoto] = useState(false);
    const [licenseSuspend, setLicenseSuspend] = useState(false);
    const [licensePenalty, setLicensePenalty] = useState(false);
    const [editVehicle, setEditVehicle] = useState(false);
    const [driverDetails, setdriverDetails] = useState({ data, error, valid, label });
    const [driverMobCheck, setdriverMobCheck] = useState([]);
    const [driverAadharCheck, setdriverAadharCheck] = useState([]);
    const [allId, setAllId] = useState([]);
    const [activeId, setActiveId] = useState([]);
    const [vehicleDetails, setVehicleDetails] = useState(VehicleData);
    const [serviceType, setServiceType] = useState(LicenseData);
    const [downloadDetails, setDownloadDetails] = useState(DownloadData);
    const [driverModel, setDriverModel] = useState();
    const [licenseModel, setLicenseModel] = useState();
    const [vehicleModel, setVehicleModel] = useState();
    const [lang, setLang] = useState<string[]>([]);
    const [checkk, setCheckk] = useState(false);
    const [car, setCar] = useState('');

    const handleChange = (event: any) => {
        setChecked(event.target.checked);
        if (event.target.checked == true) {
            driverDetails.data.p_address = driverDetails.data.c_address;
            driverDetails.data.p_city = driverDetails.data.c_city;
            driverDetails.data.p_pincode = driverDetails.data.c_pincode;
            driverDetails.data.p_state = driverDetails.data.c_state;
            driverDetails.data.p_country = driverDetails.data.c_country;
            if (driverDetails.data.p_address) {
                setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, p_address: "" },
                        valid: {
                            ...prevState.valid, p_address: false
                        },
                    }
                });
            }
            if (driverDetails.data.p_address) {
                setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, p_city: "" },
                        valid: {
                            ...prevState.valid, p_city: false
                        },
                    }
                });
            }
            if (driverDetails.data.p_address) {
                setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, p_country: "" },
                        valid: {
                            ...prevState.valid, p_country: false
                        },
                    }
                });
            }
            if (driverDetails.data.p_address) {
                setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, p_pincode: "" },
                        valid: {
                            ...prevState.valid, p_pincode: false
                        },
                    }
                });
            }
            if (driverDetails.data.p_address) {
                setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, p_state: "" },
                        valid: {
                            ...prevState.valid, p_state: false
                        },
                    }
                });
            }
        }
        else {
            driverDetails.data.p_address = "";
            driverDetails.data.p_city = "";
            driverDetails.data.p_pincode = "";
            driverDetails.data.p_state = "";
            driverDetails.data.p_country = "";
        }


    };

    


    useEffect(() => {
        axios.get('https://driverapi-hldux24wua-el.a.run.app/all').then(res => {
            setDriverModel(res.data);
            let i = 0;
            let all_id_length = res.data.length;
            for (i = 0; i < all_id_length; i++) {
                setdriverMobCheck(value => [...value, res.data[i].mobile])
                setdriverAadharCheck(value => [...value, res.data[i].aadhar])
                setAllId(value => [...value, res.data[i].id])
            }
            setRefresh(false)
        });
    }, [refresh, addLicense, editLicense, addBadge]);

    

    useEffect(() => {
        (async () => {
            if (viewModal) {
                await axios.get(`https://vehicleapi-hldux24wua-el.a.run.app/driver/${viewId}`).then(async (res) => {
                    console.log(res.data)
                    if (res.data.length > 0) {
                        await axios.get(`https://vehicleapi-hldux24wua-el.a.run.app/${res.data[0].vehicle_id}`).then(res => {
                            setVehicles(res.data[0]);
                            console.log(res.data[0]);
                            setVehicleModel(res.data);
                            setRefresh(false);
                        })
                    }

                })
            }

            if (!createModal && !editModal && !viewModal) {
                setdriverDetails({ data, error, valid, label });
            }
        })();
    }, [createModal, editModal, viewModal, refreshVehicle]);

    useEffect(() => {
        if (!addLicense && !editLicense && !addBadge) {
            setdriverDetails(driverData);
        }
    }, [addLicense, editLicense, addBadge])

    useEffect(() => {
        if (!addVehicle && !editVehicle) {
            setVehicleDetails(VehicleData);
        }
    }, [addVehicle, editVehicle])


    const VehicleColumn: GridColDef[] = [
        { field: 'v_type', headerName: 'Vehicle Type', width: 250, sortable: false },
        { field: 'v_reg_no', headerName: 'Vehicle Registration No.', width: 250, sortable: false },
        { field: 'v_model', headerName: 'Vehicle Model', width: 250, sortable: false },
        { field: 'v_make', headerName: 'Vehicle Make', width: 250, sortable: false },

        {
            field: 'Actions', headerName: 'Actions', width: 150, sortable: false, renderCell: (params) => {
                return (
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
                )
            }
        },
    ]

    const LicenseColumn: GridColDef[] = [
        { field: 'l_no', headerName: 'License No.', width: 150, sortable: false },
        { field: 'l_expiry', headerName: 'License Expiry', width: 150, sortable: false },
        { field: 'l_type', headerName: 'License Type', width: 150, sortable: false },
        { field: 'l_badge', headerName: 'Badge No.', width: 150, sortable: false },
        { field: 'l_badge_expiry', headerName: 'Badge Expiry', width: 150, sortable: false },
        { field: 'l_state', headerName: 'Issued State', width: 150, sortable: false },
        {
            field: 'Actions', headerName: 'Actions', width: 150, sortable: false, renderCell: (params) => {
                return (
                    <Button variant="contained" color="primary" style={{ marginRight: "8px" }} onClick={() => {
                        setEditLicense(true);
                        setRefresh(false);
                        setdriverDetails(prevState => {
                            return {
                                ...prevState,
                                data: {
                                    ...prevState.data,
                                    l_no: params.row.l_no,
                                    l_expiry: params.row.l_expiry,
                                    l_type: params.row.l_type,
                                    l_badge: params.row.l_badge,
                                    l_badge_expiry: params.row.l_badge_expiry,
                                    l_state: params.row.l_state,
                                }
                            }
                        })
                    }}>Edit</Button>

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

                            await axios.get(`https://driverapi-hldux24wua-el.a.run.app/${params.row.id}`).then(res => {
                                setLicenseModel(res.data);
                                console.log(res.data);
                                setdriverDetails(prevState => {
                                    return {
                                        ...prevState,
                                        data: {
                                            ...prevState.data,
                                            l_no: params.row.l_no,
                                            l_expiry: params.row.l_expiry,
                                            l_type: params.row.l_type,
                                            l_badge: params.row.l_badge,
                                            l_badge_expiry: params.row.l_badge_expiry,
                                            l_state: params.row.l_state,
                                        }
                                    }
                                })



                            });


                            await axios.get(`https://driver-upload-api-hldux24wua-el.a.run.app/driverdocs/${params.row.id}`).then(res => {
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
                        }}>View</Button>
                        <Button variant="contained" color="primary" style={{ marginRight: "8px" }} onClick={() => {

                            setEditModal(true);
                            setEditId(params.row.id);
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
                            })
                        }}>Edit</Button>
                        {params.row.deleted_at ?
                            <Button variant="contained" style={{ backgroundColor: "green" }} onClick={() => {
                                axios.put(`https://driverapi-hldux24wua-el.a.run.app/restore/${params.row.id}`);
                                setRefresh(true);
                            }}>Active</Button>
                            :
                            <Button disabled={disabled} variant="contained" style={{ backgroundColor: "red" }} onClick={() => {
                                axios.delete(`https://driverapi-hldux24wua-el.a.run.app/${params.row.id}`);
                                setRefresh(true);

                            }}>Inactive</Button>

                        }
                    </>
                )
            }
        }
    ];


    const upload_refresh = async () => {
        await axios.get(`https://driver-upload-api-hldux24wua-el.a.run.app/driverdocs/${viewId}`).then(res => {
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
                            vehicle_photo: res.data[0].vehicle_photo
                        }
                    }
                });
            }
        })


    }
    const license_refresh = async () => {
        await axios.get(`https://driverapi-hldux24wua-el.a.run.app/${viewId}`).then(res => {
            setLicenseModel(res.data);
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    data: {
                        ...prevState.data,
                        name: driverDetails.data.name,
                        mobile: driverDetails.data.mobile,
                        aadhar: driverDetails.data.aadhar,
                        gender: driverDetails.data.gender,
                        dob: driverDetails.data.dob,
                        email: driverDetails.data.email,
                        father_name: driverDetails.data.father_name,
                        marital_status: driverDetails.data.marital_status,
                        blood_group: driverDetails.data.blood_group,
                        qualification: driverDetails.data.qualification,
                        experience: driverDetails.data.experience,
                        previous_work: driverDetails.data.previous_work,
                        c_address: driverDetails.data.c_address,
                        c_city: driverDetails.data.c_city,
                        c_pincode: driverDetails.data.c_pincode,
                        c_state: driverDetails.data.c_state,
                        c_country: driverDetails.data.c_country,
                        p_address: driverDetails.data.p_address,
                        p_city: driverDetails.data.p_city,
                        p_pincode: driverDetails.data.p_pincode,
                        p_state: driverDetails.data.p_state,
                        p_country: driverDetails.data.p_country,
                        languages: driverDetails.data.languages,
                        e_number: driverDetails.data.e_number,
                        e_name: driverDetails.data.e_name,
                        e_relation: driverDetails.data.e_relation,
                        status: driverDetails.data.status,
                        l_no: driverDetails.data.l_no,
                        l_expiry: driverDetails.data.l_expiry,
                        l_type: driverDetails.data.l_type,
                        l_state: driverDetails.data.l_state,
                        l_badge_expiry: driverDetails.data.l_badge_expiry,
                        l_badge: driverDetails.data.l_badge

                    }
                }
            })
        });
        
    }

    const erVehicleOnSubmit = () => {
        let date = new Date();
        let a3 = new Date(vehicleDetails.data.v_roadtax_expiry);
        let a4 = new Date(vehicleDetails.data.v_insurance_expiry);
        let a5 = new Date(vehicleDetails.data.v_permit_expiry);
        if (!vehicleDetails.data.v_chassis_no) {
            setVehicleDetails(prevState => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        v_chassis_no: "Vehicle Chassis Number Should not be empty"
                    },
                    valid: {
                        ...prevState.valid, v_chassis_no: true
                    },
                }
            })
        }
        if (!vehicleDetails.data.v_engine_no) {
            setVehicleDetails(prevState => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        v_engine_no: "Vehicle Engine Number Should not be empty"
                    },
                    valid: {
                        ...prevState.valid, v_engine_no: true
                    },
                }
            })
        }
        if (!vehicleDetails.data.v_fc_expiry) {
            setVehicleDetails(prevState => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        v_fc_expiry: "Vehicle FC Expiry Should not be empty"
                    },
                    valid: {
                        ...prevState.valid, v_fc_expiry: true
                    },
                }
            })
        }
        let a6 = new Date(vehicleDetails.data.v_fc_expiry);
        if (a6 < date) {
            setVehicleDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, v_fc_expiry: "Please select valid expiry date" },
                    valid: {
                        ...prevState.valid, v_fc_expiry: true
                    },
                }
            })
        }
        if (!vehicleDetails.data.v_insurance_expiry) {
            setVehicleDetails(prevState => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        v_insurance_expiry: "Vehicle Insurance Expiry Should not be empty"
                    },
                    valid: {
                        ...prevState.valid, v_insurance_expiry: true
                    },
                }
            })
        }

        if (a4 < date) {
            setVehicleDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, v_insurance_expiry: "Please select valid expiry date" },
                    valid: {
                        ...prevState.valid, v_insurance_expiry: true
                    },
                }
            })
        }
        if (!vehicleDetails.data.v_make) {
            setVehicleDetails(prevState => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        v_make: "Vehicle Make Should not be empty"
                    },
                    valid: {
                        ...prevState.valid, v_make: true
                    },
                }
            })
        }
        if (!vehicleDetails.data.v_manufacture) {
            setVehicleDetails(prevState => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        v_manufacture: "Vehicle Manufacture Should not be empty"
                    },
                    valid: {
                        ...prevState.valid, v_manufacture: true
                    },
                }
            })
        }
        if (!vehicleDetails.data.v_model) {
            setVehicleDetails(prevState => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        v_model: "Vehicle Model Should not be empty"
                    },
                    valid: {
                        ...prevState.valid, v_model: true
                    },
                }
            })
        }
        if (!vehicleDetails.data.v_permit_expiry) {
            setVehicleDetails(prevState => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        v_permit_expiry: "Vehicle Permit Expiry Should not be empty"
                    },
                    valid: {
                        ...prevState.valid, v_permit_expiry: true
                    },
                }
            })
        }

        if (a5 < date) {
            return setVehicleDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, v_permit_expiry: "Please select valid expiry date" },
                    valid: {
                        ...prevState.valid, v_permit_expiry: true
                    },
                }
            })
        }
        if (!vehicleDetails.data.v_reg_no) {
            setVehicleDetails(prevState => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        v_reg_no: "Vehicle Reg Number Should not be empty"
                    },
                    valid: {
                        ...prevState.valid, v_reg_no: true
                    },
                }
            })
        }
        if (!vehicleDetails.data.v_roadtax_expiry) {
            setVehicleDetails(prevState => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        v_roadtax_expiry: "Vehicle Roadtax Expiry Should not be empty"
                    },
                    valid: {
                        ...prevState.valid, v_roadtax_expiry: true
                    },
                }
            })
        }

        if (a3 < date) {
            setVehicleDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, v_roadtax_expiry: "Please select valid expiry date" },
                    valid: {
                        ...prevState.valid, v_roadtax_expiry: true
                    },
                }
            })
        }
        if (!vehicleDetails.data.v_type) {
            setVehicleDetails(prevState => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        v_type: "Vehicle Type Should not be empty"
                    },
                    valid: {
                        ...prevState.valid, v_type: true
                    },
                }
            })
        }

    }
    const erBadgeOnSubmit = () => {
        let date = new Date();
        let a2 = new Date(driverDetails.data.l_badge_expiry);
        if (!driverDetails.data.l_badge) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        l_badge: "Badge Should not be empty"
                    },
                    valid: {
                        ...prevState.valid, l_badge: true
                    },
                }
            })
        }
        if (!driverDetails.data.l_badge_expiry) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        l_badge_expiry: "Badge Expiry Should not be empty"
                    },
                    valid: {
                        ...prevState.valid, l_badge_expiry: true
                    },
                }
            })
        }
        if (a2 < date && vehicleDetails.data.v_type == "Car") {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, l_badge_expiry: "Please select valid badge expiry date" },
                    valid: {
                        ...prevState.valid, l_badge_expiry: true
                    },
                }
            })
        }



    }
    const erLicenseOnSubmit = () => {
        let date = new Date();
        let a1 = new Date(driverDetails.data.l_expiry);
        if (!driverDetails.data.l_expiry) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        l_expiry: "License Expiry Should not be empty"
                    },
                    valid: {
                        ...prevState.valid, l_expiry: true
                    },
                }
            })
        }

        if (a1 < date) {
            return setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, l_expiry: "Please select a valid expiry date" },
                    valid: {
                        ...prevState.valid, l_expiry: true
                    },
                }
            })
        }
        if (!driverDetails.data.l_no) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        l_no: "License Number Should not be empty"
                    },
                    valid: {
                        ...prevState.valid, l_no: true
                    },
                }
            })
        }
        if (!driverDetails.data.l_no.match(/^\d{16}$/)) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, l_no: "License Number Should not be less than 16 Digits" },
                    valid: {
                        ...prevState.valid, l_no: true
                    },
                }
            })
        }

        if (!driverDetails.data.l_state) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        l_state: "License Issued State Should not be empty"
                    },
                    valid: {
                        ...prevState.valid, l_state: true
                    },
                }
            })
        }
        if (!driverDetails.data.l_type) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: {
                        ...prevState.error,
                        l_type: "License Type Should not be empty"
                    },
                    valid: {
                        ...prevState.valid, l_type: true
                    },
                }
            })
        }
    }

    const vehicleSelect = (e: SelectChangeEvent<typeof vehicleDetails.data.v_type>) => {
        console.log("changed")
        const val = e.target.value as string;
        setVehicleDetails(prevState => {
            return {
                ...prevState, data: {
                    ...prevState.data,
                    v_type: val
                }
            }
        });
        if (e.target.value.match("Car")) { setAddBadge(true);setCar('true') };
    }

    const saveDriver = async () => {

        if (driverDetails.data.name.length <= 0 || driverDetails.data.mobile.length <= 0 ||
            driverDetails.data.marital_status.length <= 0 || driverDetails.data.languages.length <= 0 ||
            driverDetails.data.gender.length <= 0 || driverDetails.data.father_name.length <= 0 ||
            driverDetails.data.experience.length <= 0 || driverDetails.data.email.length <= 0 ||
            driverDetails.data.e_relation.length <= 0 || driverDetails.data.e_number.length <= 0 ||
            driverDetails.data.e_name.length <= 0 || driverDetails.data.dob.length <= 0 ||
            driverDetails.data.c_state.length <= 0 || driverDetails.data.c_pincode.length <= 0 ||
            driverDetails.data.c_country.length <= 0 || driverDetails.data.c_address.length <= 0 ||
            driverDetails.data.blood_group.length <= 0 || driverDetails.data.aadhar.length <= 0 ||
            driverDetails.data.qualification.length <= 0 || driverDetails.data.previous_work.length <= 0 ||
            driverDetails.data.p_state.length <= 0 || driverDetails.data.p_pincode.length <= 0 ||
            driverDetails.data.p_country.length <= 0 || driverDetails.data.p_address.length <= 0 ||
            driverDetails.valid.aadhar == true || driverDetails.valid.blood_group == true ||
            driverDetails.valid.c_address == true || driverDetails.valid.c_country == true ||
            driverDetails.valid.c_pincode == true || driverDetails.valid.c_state == true ||
            driverDetails.valid.dob == true || driverDetails.valid.e_name == true ||
            driverDetails.valid.e_number == true || driverDetails.valid.e_relation == true ||
            driverDetails.valid.email == true || driverDetails.valid.experience == true || driverDetails.valid.father_name == true ||
            driverDetails.valid.gender == true || driverDetails.valid.languages == true ||
            driverDetails.valid.marital_status == true || driverDetails.valid.mobile || driverDetails.valid.name || driverDetails.valid.p_address == true ||
            driverDetails.valid.p_country == true || driverDetails.valid.p_pincode == true || driverDetails.valid.p_state == true ||
            driverDetails.valid.previous_work == true || driverDetails.valid.qualification == true
        ) {
            alert("Fill all the Fields");
            Validate_Driver();

        }
        else {
            axios.post('https://driverapi-hldux24wua-el.a.run.app/', driverDetails.data).then(res=>{
                console.log(res.data);
                setViewId(res.data[0].id);
                console.log(viewId);
        }
        )
            console.log(viewId);
            setCreateModal(false)
            setEditModal(false)
            setRefresh(true);
            setAddLicense(true);
        }
    };

    const updateDriver = async () => {
        if (driverDetails.data.name.length <= 0 || driverDetails.data.mobile.length <= 0 ||
            driverDetails.data.marital_status.length <= 0 || driverDetails.data.languages.length <= 0 ||
            driverDetails.data.gender.length <= 0 || driverDetails.data.father_name.length <= 0 ||
            driverDetails.data.experience.length <= 0 || driverDetails.data.email.length <= 0 ||
            driverDetails.data.e_relation.length <= 0 || driverDetails.data.e_number.length <= 0 ||
            driverDetails.data.e_name.length <= 0 || driverDetails.data.dob.length <= 0 ||
            driverDetails.data.c_state.length <= 0 || driverDetails.data.c_pincode.length <= 0 ||
            driverDetails.data.c_country.length <= 0 || driverDetails.data.c_address.length <= 0 ||
            driverDetails.data.blood_group.length <= 0 || driverDetails.data.aadhar.length <= 0 ||
            driverDetails.data.qualification.length <= 0 || driverDetails.data.previous_work.length <= 0 ||
            driverDetails.data.p_state.length <= 0 || driverDetails.data.p_pincode.length <= 0 ||
            driverDetails.data.p_country.length <= 0 || driverDetails.data.p_address.length <= 0 ||
            driverDetails.valid.aadhar == true || driverDetails.valid.blood_group == true ||
            driverDetails.valid.c_address == true || driverDetails.valid.c_country == true ||
            driverDetails.valid.c_pincode == true || driverDetails.valid.c_state == true ||
            driverDetails.valid.dob == true || driverDetails.valid.e_name == true ||
            driverDetails.valid.e_number == true || driverDetails.valid.e_relation == true ||
            driverDetails.valid.email == true || driverDetails.valid.experience == true || driverDetails.valid.father_name == true ||
            driverDetails.valid.gender == true || driverDetails.valid.languages == true ||
            driverDetails.valid.marital_status == true || driverDetails.valid.mobile || driverDetails.valid.name || driverDetails.valid.p_address == true ||
            driverDetails.valid.p_country == true || driverDetails.valid.p_pincode == true || driverDetails.valid.p_state == true ||
            driverDetails.valid.previous_work == true || driverDetails.valid.qualification == true
        ) {
            setRefresh(false);
            alert("Fill all the Fields");
        }
        else {
            await axios.put(`https://driverapi-hldux24wua-el.a.run.app/${editId}`, driverDetails.data);
            setCreateModal(false)
            setEditModal(false)
            setRefresh(true);
        }

    }


    const updatelicensez = async (eid: string) => {
        if (driverDetails.data.l_expiry.length <= 0 || driverDetails.data.l_no.length <= 0 ||
            driverDetails.data.l_state.length <= 0 || driverDetails.data.l_type.length <= 0 ||
            driverDetails.valid.l_type == true || driverDetails.valid.l_state == true ||
            driverDetails.valid.l_no == true || driverDetails.valid.l_expiry == true
        ) {
            alert("Fill all the Fields");
            await erLicenseOnSubmit();
        }
        else {
            let sv = {
                l_no: driverDetails.data.l_no,
                l_expiry: driverDetails.data.l_expiry,
                l_type: driverDetails.data.l_type,
                l_state: driverDetails.data.l_state
            }
            await axios.put(`https://driverapi-hldux24wua-el.a.run.app/license/${eid}`, sv)
            console.log(sv);
            setEditLicense(false);
            setAddLicense(false);
            await axios.get(`https://driverapi-hldux24wua-el.a.run.app/${eid}`).then(res => {
                setLicenseModel(res.data);
                console.log(res.data);
                setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        data: {
                            ...prevState.data,
                            name: driverDetails.data.name,
                            mobile: driverDetails.data.mobile,
                            aadhar: driverDetails.data.aadhar,
                            gender: driverDetails.data.gender,
                            dob: driverDetails.data.dob,
                            email: driverDetails.data.email,
                            father_name: driverDetails.data.father_name,
                            marital_status: driverDetails.data.marital_status,
                            blood_group: driverDetails.data.blood_group,
                            qualification: driverDetails.data.qualification,
                            experience: driverDetails.data.experience,
                            previous_work: driverDetails.data.previous_work,
                            c_address: driverDetails.data.c_address,
                            c_city: driverDetails.data.c_city,
                            c_pincode: driverDetails.data.c_pincode,
                            c_state: driverDetails.data.c_state,
                            c_country: driverDetails.data.c_country,
                            p_address: driverDetails.data.p_address,
                            p_city: driverDetails.data.p_city,
                            p_pincode: driverDetails.data.p_pincode,
                            p_state: driverDetails.data.p_state,
                            p_country: driverDetails.data.p_country,
                            languages: driverDetails.data.languages,
                            e_number: driverDetails.data.e_number,
                            e_name: driverDetails.data.e_name,
                            e_relation: driverDetails.data.e_relation,
                            l_no: driverDetails.data.l_no,
                            l_expiry: driverDetails.data.l_expiry,
                            l_type: driverDetails.data.l_type,
                            l_state: driverDetails.data.l_state,
                            l_badge_expiry: driverDetails.data.l_badge_expiry,
                            l_badge: driverDetails.data.l_badge

                        }
                    }
                })
            });
            setRefresh(false);
        }
        if(serviceType.data.s_type == "Driver"){setAddVehicle(true)}
        else{setAddVehicle(false)}
        setRefresh(false);
    }
    const updateBadge = (eid: string) => {
        if (driverDetails.data.l_badge.length <= 0 || driverDetails.data.l_badge_expiry.length <= 0 ||
            driverDetails.valid.l_badge == true || driverDetails.valid.l_badge_expiry == true) { alert("Add badge details"); erBadgeOnSubmit(); }
        else {
            axios.put(`https://driverapi-hldux24wua-el.a.run.app/license/${eid}`, driverDetails.data)
            alert("badge added");
            setAddLicense(false);
            setEditLicense(false);
            setRefresh(false);
            license_refresh();
        }

    }

    const addVehiclez = async (eid: string) => {
        if (vehicleDetails.data.v_chassis_no.length <= 0 || vehicleDetails.data.v_engine_no.length <= 0 ||
            vehicleDetails.data.v_fc_expiry.length <= 0 || vehicleDetails.data.v_insurance_expiry.length <= 0 ||
            vehicleDetails.data.v_make.length <= 0 || vehicleDetails.data.v_manufacture.length <= 0 ||
            vehicleDetails.data.v_model.length <= 0 || vehicleDetails.data.v_permit_expiry.length <= 0 ||
            vehicleDetails.data.v_reg_no.length <= 0 || vehicleDetails.data.v_roadtax_expiry.length <= 0 ||
            vehicleDetails.data.v_type.length <= 0 ||
            vehicleDetails.valid.v_chassis_no == true ||
            vehicleDetails.valid.v_engine_no == true || vehicleDetails.valid.v_fc_expiry == true ||
            vehicleDetails.valid.v_insurance_expiry == true || vehicleDetails.valid.v_make == true ||
            vehicleDetails.valid.v_manufacture == true || vehicleDetails.valid.v_model == true ||
            vehicleDetails.valid.v_permit_expiry == true || vehicleDetails.valid.v_reg_no == true ||
            vehicleDetails.valid.v_roadtax_expiry == true || vehicleDetails.valid.v_type == true) {
            alert("Fill all the Fields"); erVehicleOnSubmit();
        }
        else {
            await axios.get(`https://vehicleapi-hldux24wua-el.a.run.app/driver/${eid}`).then(async (res) => {
                if (res.data.length > 0) {
                    await axios.put(`https://vehicleapi-hldux24wua-el.a.run.app/${res.data[0].vehicle_id}`, vehicleDetails.data)
                } else {
                    await axios.post(`https://vehicleapi-hldux24wua-el.a.run.app/`, vehicleDetails.data).then(async (res) => {
                        if (res.data.id) {
                            await axios.post(`https://vehicleapi-hldux24wua-el.a.run.app/driver/${eid}/${res.data.id}`)
                        }
                    });
                }
            })
            setAddVehicle(false);
            setEditVehicle(false);
            //setRefreshVehicle(false);
            
            await axios.get(`https://vehicleapi-hldux24wua-el.a.run.app/driver/${viewId}`).then(async (res) => {
                console.log(res.data)
                if (res.data.length > 0) {
                    await axios.get(`https://vehicleapi-hldux24wua-el.a.run.app/${res.data[0].vehicle_id}`).then(res => {
                        setVehicles(res.data[0]);
                        setVehicleModel(res.data);
                    })
                }

            })

            setRefresh(false);
        }


    };

    const updateVehiclez = (eid: string) => {
        if (vehicleDetails.data.v_chassis_no.length <= 0 || vehicleDetails.data.v_engine_no.length <= 0 ||
            vehicleDetails.data.v_fc_expiry.length <= 0 || vehicleDetails.data.v_insurance_expiry.length <= 0 ||
            vehicleDetails.data.v_make.length <= 0 || vehicleDetails.data.v_manufacture.length <= 0 ||
            vehicleDetails.data.v_model.length <= 0 || vehicleDetails.data.v_permit_expiry.length <= 0 ||
            vehicleDetails.data.v_reg_no.length <= 0 || vehicleDetails.data.v_roadtax_expiry.length <= 0 ||
            vehicleDetails.data.v_type.length <= 0 ||
            vehicleDetails.valid.v_chassis_no == true ||
            vehicleDetails.valid.v_engine_no == true || vehicleDetails.valid.v_fc_expiry == true ||
            vehicleDetails.valid.v_insurance_expiry == true || vehicleDetails.valid.v_make == true ||
            vehicleDetails.valid.v_manufacture == true || vehicleDetails.valid.v_model == true ||
            vehicleDetails.valid.v_permit_expiry == true || vehicleDetails.valid.v_reg_no == true ||
            vehicleDetails.valid.v_roadtax_expiry == true || vehicleDetails.valid.v_type == true) { alert("Fill all the Fields") }


        else {
            axios.get(`https://vehicleapi-hldux24wua-el.a.run.app/driver/${eid}`).then(res => {
                console.log(res.data);
                if (res.data.length < 0) {
                    console.log(res.data[0].id)
                    axios.put(`https://vehicleapi-hldux24wua-el.a.run.app/driver/${eid}/${res.data[0].id}`).then(res => {
                        setVehicleModel(res.data);
                        setRefresh(false);
                    })
                }

                setAddVehicle(false);
                setEditVehicle(false);
                setRefresh(false);
            })

        }
    };

    const validateVehicle = (label: string, value: string) => {
        let date = new Date();

        switch (label) {
            case 'v_type':
                if (!value) {
                    return setVehicleDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, v_type: "Please select Vehicle Type" },
                            valid: {
                                ...prevState.valid, v_type: true
                            },
                        }
                    })
                }
                return setVehicleDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, v_type: "" },
                        valid: {
                            ...prevState.valid, v_type: false
                        },
                    }
                });
            case 'v_reg_no':
                if (!value) {
                    return setVehicleDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, v_reg_no: "Please enter Vehicle Registration Number" },
                            valid: {
                                ...prevState.valid, v_reg_no: true
                            },
                        }
                    })
                }
                return setVehicleDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, v_reg_no: "" },
                        valid: {
                            ...prevState.valid, v_reg_no: false
                        },
                    }
                });
            case 'v_engine_no':
                if (!value) {
                    return setVehicleDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, v_engine_no: "Please enter Vehicle Engine Number" },
                            valid: {
                                ...prevState.valid, v_engine_no: true
                            },
                        }
                    })
                }
                return setVehicleDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, v_engine_no: "" },
                        valid: {
                            ...prevState.valid, v_engine_no: false
                        },
                    }
                });
            case 'v_chassis_no':
                if (!value) {
                    return setVehicleDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, v_chassis_no: "Please enter Vehicle Chassis Number" },
                            valid: {
                                ...prevState.valid, v_chassis_no: true
                            },
                        }
                    })
                }
                return setVehicleDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, v_chassis_no: "" },
                        valid: {
                            ...prevState.valid, v_chassis_no: false
                        },
                    }
                });

            case 'v_model':
                if (!value) {
                    return setVehicleDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, v_model: "Vehicle Model should not be empty" },
                            valid: {
                                ...prevState.valid, v_model: true
                            },
                        }
                    })
                }
                return setVehicleDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, v_model: "" },
                        valid: {
                            ...prevState.valid, v_model: false
                        },
                    }
                });

            case 'v_make':
                if (!value) {
                    return setVehicleDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, v_make: "Vehicle Model should not be empty" },
                            valid: {
                                ...prevState.valid, v_make: true
                            },
                        }
                    })
                }
                return setVehicleDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, v_make: "" },
                        valid: {
                            ...prevState.valid, v_make: false
                        },
                    }
                });

            case 'v_roadtax_expiry':
                let a3 = new Date(value);
                if (!value) {
                    return setVehicleDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, v_roadtax_expiry: "Vehicle Road Tax should not be empty" },
                            valid: {
                                ...prevState.valid, v_roadtax_expiry: true
                            },
                        }
                    })
                }
                if (a3 < date) {
                    return setVehicleDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, v_roadtax_expiry: "Please select valid expiry date" },
                            valid: {
                                ...prevState.valid, v_roadtax_expiry: true
                            },
                        }
                    })
                }
                return setVehicleDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, v_roadtax_expiry: "" },
                        valid: {
                            ...prevState.valid, v_roadtax_expiry: false
                        },
                    }
                });
            case 'v_insurance_expiry':
                let a4 = new Date(value);
                if (!value) {
                    return setVehicleDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, v_insurance_expiry: "Vehicle Insurance Expiry should not be empty" },
                            valid: {
                                ...prevState.valid, v_insurance_expiry: true
                            },
                        }
                    })
                }
                if (a4 < date) {
                    return setVehicleDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, v_insurance_expiry: "Please select valid expiry date" },
                            valid: {
                                ...prevState.valid, v_insurance_expiry: true
                            },
                        }
                    })
                }
                return setVehicleDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, v_insurance_expiry: "" },
                        valid: {
                            ...prevState.valid, v_insurance_expiry: false
                        },
                    }
                });

            case 'v_permit_expiry':
                let a5 = new Date(value);
                if (!value) {
                    return setVehicleDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, v_permit_expiry: "Vehicle Permit Expiry should not be empty" },
                            valid: {
                                ...prevState.valid, v_permit_expiry: true
                            },
                        }
                    })
                }
                if (a5 < date) {
                    return setVehicleDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, v_permit_expiry: "Please select valid expiry date" },
                            valid: {
                                ...prevState.valid, v_permit_expiry: true
                            },
                        }
                    })
                }
                return setVehicleDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, v_permit_expiry: "" },
                        valid: {
                            ...prevState.valid, v_permit_expiry: false
                        },
                    }
                });
            case 'v_fc_expiry':
                let a6 = new Date(value);
                if (!value) {
                    return setVehicleDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, v_fc_expiry: "Vehicle FC Expiry should not be empty" },
                            valid: {
                                ...prevState.valid, v_fc_expiry: true
                            },
                        }
                    })
                }
                if (a6 < date) {
                    return setVehicleDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, v_fc_expiry: "Please select valid expiry date" },
                            valid: {
                                ...prevState.valid, v_fc_expiry: true
                            },
                        }
                    })
                }
                return setVehicleDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, v_fc_expiry: "" },
                        valid: {
                            ...prevState.valid, v_fc_expiry: false
                        },
                    }
                });
        }
    }

    const validateLicense = (label: string, value: string) => {
        let date = new Date();

        switch (label) {

            case 'l_no':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, l_no: "Please enter the license number" },
                            valid: {
                                ...prevState.valid, l_no: true
                            },
                        }
                    })
                }
                if (value.length < 16) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, l_no: "License Number Should not be less than 16 Digits" },
                            valid: {
                                ...prevState.valid, l_no: true
                            },
                        }
                    })
                }
                if (value.length > 16) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, l_no: "License Number Should not be more than 16 Digits" },
                            valid: {
                                ...prevState.valid, l_no: true
                            },
                        }
                    })
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, l_no: "" },
                        valid: {
                            ...prevState.valid, l_no: false
                        },
                    }
                });
            case 'l_expiry':
                let a1 = new Date(value);
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, l_expiry: "Please select expiry date" },
                            valid: {
                                ...prevState.valid, l_expiry: true
                            },
                        }
                    })
                }
                if (a1 < date) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, l_expiry: "Please select a valid expiry date" },
                            valid: {
                                ...prevState.valid, l_expiry: true
                            },
                        }
                    })
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, l_expiry: "" },
                        valid: {
                            ...prevState.valid, l_expiry: false
                        },
                    }
                });
            case 'l_badge':
                if (!value && vehicleDetails.data.v_type == "Car") {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, l_badge: "Please enter the Badge number" },
                            valid: {
                                ...prevState.valid, l_badge: true
                            },
                        }
                    })
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, l_badge: "" },
                        valid: {
                            ...prevState.valid, l_badge: false
                        },
                    }
                });
            case 'l_badge_expiry':
                let a2 = new Date(value);
                if (!value && vehicleDetails.data.v_type == "Car") {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, l_badge_expiry: "Please select badge expiry date" },
                            valid: {
                                ...prevState.valid, l_badge_expiry: true
                            },
                        }
                    })
                }
                if (a2 < date && vehicleDetails.data.v_type == "Car") {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, l_badge_expiry: "Please select valid badge expiry date" },
                            valid: {
                                ...prevState.valid, l_badge_expiry: true
                            },
                        }
                    })
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, l_badge_expiry: "" },
                        valid: {
                            ...prevState.valid, l_badge_expiry: false
                        },
                    }
                });


        }
    }

    const ValidateDriver = async (label: string, value: string) => {
        var em = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        let date = new Date();

        switch (label) {
            case 'name':
                if (!value) {
                    setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, name: "Name Should not be empty" },
                            valid: {
                                ...prevState.valid, name: true
                            },
                        }
                    })
                    break;
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, name: "" },
                        valid: {
                            ...prevState.valid, name: false
                        },
                    }
                });
            case 'mobile':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, mobile: "Please enter a Mobile Number" },
                            valid: {
                                ...prevState.valid, mobile: true
                            },
                        }
                    })
                }
                if (value.length < 10) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, mobile: "Mobile Number should not be less than 10 digits" },
                            valid: {
                                ...prevState.valid, mobile: true
                            },
                        }
                    })
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, mobile: "" },
                        valid: {
                            ...prevState.valid, mobile: false
                        },
                    }
                });
            case 'aadhar':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, aadhar: "Aadhaar Number should not be empty" },
                            valid: {
                                ...prevState.valid, aadhar: true
                            },
                        }
                    })
                    break;
                }
                if (value.length < 12) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, aadhar: "Aadhaar Number should not be less than 12 digits" },
                            valid: {
                                ...prevState.valid, aadhar: true
                            },
                        }
                    })
                    break;

                }
                if (!value.match(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/) && value.length == 12) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, aadhar: "Aadhaar Number should not Start with 1" },
                            valid: {
                                ...prevState.valid, aadhar: true
                            },
                        }
                    })

                }

                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, aadhar: "" },
                        valid: {
                            ...prevState.valid, aadhar: false
                        },
                    }
                });

            case 'father_name':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, father_name: "Father Name should not be empty" },
                            valid: {
                                ...prevState.valid, father_name: true
                            },
                        }
                    })
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, father_name: "" },
                        valid: {
                            ...prevState.valid, father_name: false
                        },
                    }
                });

            case 'email':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, email: "Email id should not be empty" },
                            valid: {
                                ...prevState.valid, email: true
                            },
                        }
                    })

                }
                if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, email: "Email id is not valid" },
                            valid: {
                                ...prevState.valid, email: true
                            },
                        }
                    })
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, email: "" },
                        valid: {
                            ...prevState.valid, email: false
                        },
                    }
                });
            case 'dob':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, dob: "Please select Date of Birth" },
                            valid: {
                                ...prevState.valid, dob: true
                            },
                        }
                    })
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, dob: "" },
                        valid: {
                            ...prevState.valid, dob: false
                        },
                    }
                });
            case 'gender':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, gender: "Please select Gender" },
                            valid: {
                                ...prevState.valid, gender: true
                            },
                        }
                    })
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, gender: "" },
                        valid: {
                            ...prevState.valid, gender: false
                        },
                    }
                });
            case 'marital_status':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, marital_status: "Please select Marital Status" },
                            valid: {
                                ...prevState.valid, marital_status: true
                            },
                        }
                    })
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, marital_status: "" },
                        valid: {
                            ...prevState.valid, marital_status: false
                        },
                    }
                });
            case 'blood_group':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, blood_group: "Please select Blood Group" },
                            valid: {
                                ...prevState.valid, blood_group: true
                            },
                        }
                    })
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, blood_group: "" },
                        valid: {
                            ...prevState.valid, blood_group: false
                        },
                    }
                });
            case 'qualification':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, qualification: "Qualification should not be empty" },
                            valid: {
                                ...prevState.valid, qualification: true
                            },
                        }
                    })
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, qualification: "" },
                        valid: {
                            ...prevState.valid, qualification: false
                        },
                    }
                });
            case 'experience':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, experience: "Experience should not be empty" },
                            valid: {
                                ...prevState.valid, experience: true
                            },
                        }
                    })

                }


                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, experience: "" },
                        valid: {
                            ...prevState.valid, experience: false
                        },
                    }
                });
            case 'previous_work':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, previous_work: "Previous Work should not be empty" },
                            valid: {
                                ...prevState.valid, previous_work: true
                            },
                        }
                    })

                }


                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, previous_work: "" },
                        valid: {
                            ...prevState.valid, previous_work: false
                        },
                    }
                });
            case 'c_address':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, c_address: "Communication Address should not be empty" },
                            valid: {
                                ...prevState.valid, c_address: true
                            },
                        }
                    })

                }


                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, c_address: "" },
                        valid: {
                            ...prevState.valid, c_address: false
                        },
                    }
                });
            case 'c_pincode':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, c_pincode: "Please enter the Pincode" },
                            valid: {
                                ...prevState.valid, c_pincode: true
                            },
                        }
                    })

                }
                if (value.length < 6) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, c_pincode: "Pincode should not be less than 6 digits" },
                            valid: {
                                ...prevState.valid, c_pincode: true
                            },
                        }
                    })
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, c_pincode: "" },
                        valid: {
                            ...prevState.valid, c_pincode: false
                        },
                    }
                });
            case 'c_state':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, c_state: "Please select the State" },
                            valid: {
                                ...prevState.valid, c_state: true
                            },
                        }
                    })
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, c_state: "" },
                        valid: {
                            ...prevState.valid, c_state: false
                        },
                    }
                });
            case 'c_country':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, c_country: "Please select the Country" },
                            valid: {
                                ...prevState.valid, c_country: true
                            },
                        }
                    })

                }


                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, c_country: "" },
                        valid: {
                            ...prevState.valid, c_country: false
                        },
                    }
                });
            case 'p_address':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, p_address: "Permanent Address should not be empty" },
                            valid: {
                                ...prevState.valid, p_address: true
                            },
                        }
                    })

                }


                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, p_address: "" },
                        valid: {
                            ...prevState.valid, p_address: false
                        },
                    }
                });
            case 'p_pincode':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, p_pincode: "Please enter the Pincode" },
                            valid: {
                                ...prevState.valid, p_pincode: true
                            },
                        }
                    })

                }
                if (!value.match(/^\d{6}$/)) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, p_pincode: "Pincode should not be less than 6 digits" },
                            valid: {
                                ...prevState.valid, p_pincode: true
                            },
                        }
                    })

                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, p_pincode: "" },
                        valid: {
                            ...prevState.valid, p_pincode: false
                        },
                    }
                });
            case 'p_state':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, p_state: "Please select the State" },
                            valid: {
                                ...prevState.valid, p_state: true
                            },
                        }
                    })
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, p_state: "" },
                        valid: {
                            ...prevState.valid, p_state: false
                        },
                    }
                });
            case 'p_country':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, p_country: "Please select the Country" },
                            valid: {
                                ...prevState.valid, p_country: true
                            },
                        }
                    })

                }


                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, p_country: "" },
                        valid: {
                            ...prevState.valid, p_country: false
                        },
                    }
                });
            case 'languages':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, languages: "Languages should not be empty" },
                            valid: {
                                ...prevState.valid, languages: true
                            },
                        }
                    })

                }


                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, languages: "" },
                        valid: {
                            ...prevState.valid, languages: false
                        },
                    }
                });
            case 'e_number':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, e_number: "Please enter Emergency Contact Number" },
                            valid: {
                                ...prevState.valid, e_number: true
                            },
                        }
                    })
                }
                else if (value.length < 10) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, e_number: "Mobile Number should not be less than 10 digits" },
                            valid: {
                                ...prevState.valid, e_number: true
                            },
                        }
                    })
                }

                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, e_number: "" },
                        valid: {
                            ...prevState.valid, e_number: false
                        },
                    }
                });
            case 'e_name':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, e_name: "Relation Name Should not be empty" },
                            valid: {
                                ...prevState.valid, e_name: true
                            },
                        }
                    })
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, e_name: "" },
                        valid: {
                            ...prevState.valid, e_name: false
                        },
                    }
                });
            case 'e_relation':
                if (!value) {
                    return setdriverDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, e_relation: "Relation Should not be empty" },
                            valid: {
                                ...prevState.valid, e_relation: true
                            },
                        }
                    })
                }
                return setdriverDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, e_relation: "" },
                        valid: {
                            ...prevState.valid, e_relation: false
                        },
                    }
                });





        }
    }
    const Validate_Driver = async () => {


        if (!driverDetails.data.name) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, name: "Name Should not be empty" },
                    valid: {
                        ...prevState.valid, name: true
                    },
                }
            })

        }

        if (!driverDetails.data.mobile) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, mobile: "Please enter a Mobile Number" },
                    valid: {
                        ...prevState.valid, mobile: true
                    },
                }
            })

        }

        if (!driverDetails.data.aadhar) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, aadhar: "Aadhaar Number should not be empty" },
                    valid: {
                        ...prevState.valid, aadhar: true
                    },
                }
            })

        }

        if (driverDetails.data.aadhar.length < 12) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, aadhar: "Aadhaar Number should not be less than 12 digits" },
                    valid: {
                        ...prevState.valid, aadhar: true
                    },
                }
            })

        }

        if (!driverDetails.data.aadhar.match(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/) && driverDetails.data.aadhar.length == 12) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, aadhar: "Aadhaar Number should not Start with 1" },
                    valid: {
                        ...prevState.valid, aadhar: true
                    },
                }
            })

        }


        if (!driverDetails.data.father_name) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, father_name: "Father Name should not be empty" },
                    valid: {
                        ...prevState.valid, father_name: true
                    },
                }
            })

        }

        if (!driverDetails.data.email) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, email: "Email id should not be empty" },
                    valid: {
                        ...prevState.valid, email: true
                    },
                }
            })

        }

        if (!driverDetails.data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, email: "Email id is not valid" },
                    valid: {
                        ...prevState.valid, email: true
                    },
                }
            })

        }

        if (!driverDetails.data.dob) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, dob: "Please select Date of Birth" },
                    valid: {
                        ...prevState.valid, dob: true
                    },
                }
            })

        }

        if (!driverDetails.data.gender) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, gender: "Please select Gender" },
                    valid: {
                        ...prevState.valid, gender: true
                    },
                }
            })

        }

        if (!driverDetails.data.marital_status) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, marital_status: "Please select Marital Status" },
                    valid: {
                        ...prevState.valid, marital_status: true
                    },
                }
            })

        }

        if (!driverDetails.data.blood_group) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, blood_group: "Please select Blood Group" },
                    valid: {
                        ...prevState.valid, blood_group: true
                    },
                }
            })

        }

        if (!driverDetails.data.qualification) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, qualification: "Qualification should not be empty" },
                    valid: {
                        ...prevState.valid, qualification: true
                    },
                }
            })

        }

        if (!driverDetails.data.experience) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, experience: "Experience should not be empty" },
                    valid: {
                        ...prevState.valid, experience: true
                    },
                }
            })

        }

        if (!driverDetails.data.previous_work) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, previous_work: "Previous Work should not be empty" },
                    valid: {
                        ...prevState.valid, previous_work: true
                    },
                }
            })

        }

        if (!driverDetails.data.c_address) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, c_address: "Communication Address should not be empty" },
                    valid: {
                        ...prevState.valid, c_address: true
                    },
                }
            })

        }

        if (!driverDetails.data.c_pincode) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, c_pincode: "Please enter the Pincode" },
                    valid: {
                        ...prevState.valid, c_pincode: true
                    },
                }
            })

        }

        if (!driverDetails.data.c_pincode.match(/^[0-9]{1,6}$/)) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, c_pincode: "Pincode should not be less than 6 digits" },
                    valid: {
                        ...prevState.valid, c_pincode: true
                    },
                }
            })

        }

        if (!driverDetails.data.c_state) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, c_state: "Please select the State" },
                    valid: {
                        ...prevState.valid, c_state: true
                    },
                }
            })

        }

        if (!driverDetails.data.c_country) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, c_country: "Please select the Country" },
                    valid: {
                        ...prevState.valid, c_country: true
                    },
                }
            })

        }

        if (!driverDetails.data.p_address) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, p_address: "Permanent Address should not be empty" },
                    valid: {
                        ...prevState.valid, p_address: true
                    },
                }
            })

        }

        if (!driverDetails.data.p_pincode) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, p_pincode: "Please enter the Pincode" },
                    valid: {
                        ...prevState.valid, p_pincode: true
                    },
                }
            })

        }

        if (!driverDetails.data.p_pincode.match(/^\d{6}$/)) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, p_pincode: "Pincode should not be less than 6 digits" },
                    valid: {
                        ...prevState.valid, p_pincode: true
                    },
                }
            })

        }


        if (!driverDetails.data.p_state) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, p_state: "Please select the State" },
                    valid: {
                        ...prevState.valid, p_state: true
                    },
                }
            })

        }

        if (!driverDetails.data.p_country) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, p_country: "Please select the Country" },
                    valid: {
                        ...prevState.valid, p_country: true
                    },
                }
            })

        }


        if (!driverDetails.data.languages) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, languages: "Languages should not be empty" },
                    valid: {
                        ...prevState.valid, languages: true
                    },
                }
            })

        } else { driverDetails.valid.languages = false }

        if (!driverDetails.data.e_number) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, e_number: "Please enter Emergency Contact Number" },
                    valid: {
                        ...prevState.valid, e_number: true
                    },
                }
            })

        }


        if (!driverDetails.data.e_name) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, e_name: "Relation Name Should not be empty" },
                    valid: {
                        ...prevState.valid, e_name: true
                    },
                }
            })

        }

        if (!driverDetails.data.e_relation) {
            setdriverDetails(prevState => {
                return {
                    ...prevState,
                    error: { ...prevState.error, e_relation: "Relation Should not be empty" },
                    valid: {
                        ...prevState.valid, e_relation: true
                    },
                }
            })

        }

    }


    return (
        <Card>
            <CardHeader title="Driver Details" action={
                <Button variant="contained" color="primary" onClick={() => setCreateModal(true)}>Create Driver</Button>
            } />


            <CardContent style={{ height: "700px" }}>
                <DataGrid rows={driverModel ?? []}
                    columns={DriverColumn}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    checkboxSelection
                    disableSelectionOnClick />
            </CardContent>
            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={addBadge}
                data-backdrop="static"
                
                aria-labelledby="create-license-title"
                aria-describedby="create-license-description"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="Add License" style={{ borderBottom: "1px solid #f2f2f2" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setAddBadge(false)
                            driverDetails.data.l_badge && driverDetails.data.l_badge_expiry ? <div></div> :
                        
                            setVehicleDetails(prevState => {
                                return {
                                    ...prevState, data: {
                                        ...prevState.data,
                                        v_type: ""
                                    }
                                }
                            })
                        }}>Close</Button>
                    } />
                    <CardContent>
                        <Grid container spacing={3}>

                            <Grid item xs={6}>
                                <TextField variant="outlined" label={label.l_badge} name={name.l_badge} value={driverDetails.data.l_badge} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setdriverDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                l_badge: val
                                            }
                                        }
                                    });
                                }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateLicense(label, val);
                                    }}
                                    error={driverDetails.valid.l_badge}
                                    helperText={driverDetails.valid.l_badge ? driverDetails.error.l_badge : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="date" variant="outlined" label={label.l_badge_expiry} name={name.l_badge_expiry} value={driverDetails.data.l_badge_expiry} style={{ width: "100%" }} onChange={(e: any) => {

                                    const val = e.target.value;
                                    setdriverDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                l_badge_expiry: val
                                            }
                                        }
                                    });
                                }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateLicense(label, val);
                                    }}
                                    error={driverDetails.valid.l_badge_expiry}
                                    helperText={driverDetails.valid.l_badge_expiry ? driverDetails.error.l_badge_expiry : ""}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                            <Button variant="contained" color="primary" onClick={() => updateBadge(viewId)}>Save</Button>
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>
            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={createModal || editModal}


                aria-labelledby="create-driver-title"
                aria-describedby="create-driver-description"
            >
                <Card style={{ width: "60%", height: "80%", overflow: "auto" }} >
                    <CardHeader title="Create Driver" style={{ display: "flex", borderBottom: "1px solid #f2f2f2", position: "fixed", zIndex: 3, backgroundColor: "white", justifyContent: "space-between", width: "60%" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setCreateModal(false)
                            setEditModal(false)
                        }}>Close</Button>
                    } />
                    <CardContent style={{ marginTop: 70 }}>
                        <form noValidate autoComplete="off">
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" name={name.name} label={label.name} value={driverDetails.data.name} style={{ width: "100%" }}
                                        onChange={(e: any) => {
                                            const val = e.target.value;
                                            setdriverDetails(prevState => {
                                                return {
                                                    ...prevState, data: {
                                                        ...prevState.data,
                                                        name: val
                                                    }
                                                }
                                            });
                                        }}
                                        onBlur={(e: any) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateDriver(label, val);
                                        }}
                                        error={driverDetails.valid.name}
                                        helperText={driverDetails.valid.name ? driverDetails.error.name : ""} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField type="number" variant="outlined" label={label.aadhar} name={name.aadhar} value={driverDetails.data.aadhar} style={{ width: "100%" }} onChange={(e: any) => {
                                        const val = e.target.value;
                                        if (!val.match(/[0][1-9]\d{9}$|^[1-9]\d{12}$/)) {
                                            setdriverDetails(prevState => {
                                                return {
                                                    ...prevState, data: {
                                                        ...prevState.data,
                                                        aadhar: val
                                                    }
                                                }
                                            });
                                        }
                                    }}

                                        onBlur={(e: { target: { name: any; value: any; }; }) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateDriver(label, val);
                                        }}
                                        error={driverDetails.valid.aadhar}
                                        helperText={driverDetails.valid.aadhar ? driverDetails.error.aadhar : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField type="number" variant="outlined" label={label.mobile} name={name.mobile} value={driverDetails.data.mobile} style={{ width: "100%" }} onChange={(e: any) => {
                                        const val = e.target.value;
                                        if (!val.match(/[0][1-9]\d{9}$|^[1-9]\d{10}$/)) {
                                            setdriverDetails(prevState => {
                                                return {
                                                    ...prevState, data: {
                                                        ...prevState.data,
                                                        mobile: val
                                                    }
                                                }
                                            });
                                        }

                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateDriver(label, val);
                                        }}
                                        error={driverDetails.valid.mobile}
                                        helperText={driverDetails.valid.mobile ? driverDetails.error.mobile : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={label.email} name={name.email} value={driverDetails.data.email} style={{ width: "100%" }} onChange={(e: any) => {
                                        const val = e.target.value;
                                        setdriverDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    email: val
                                                }
                                            }
                                        });
                                    }}

                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateDriver(label, val);
                                        }}
                                        error={driverDetails.valid.email}
                                        helperText={driverDetails.valid.email ? driverDetails.error.email : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={label.father_name} name={name.father_name} value={driverDetails.data.father_name} style={{ width: "100%" }} onChange={(e: any) => {
                                        const val = e.target.value;
                                        setdriverDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    father_name: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateDriver(label, val);
                                        }}
                                        error={driverDetails.valid.father_name}
                                        helperText={driverDetails.valid.father_name ? driverDetails.error.father_name : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField type="date" variant="outlined" label={label.dob} name={name.dob} value={driverDetails.data.dob} style={{ width: "100%" }} onChange={(e: any) => {

                                        const val = e.target.value;
                                        setdriverDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    dob: val
                                                }
                                            }
                                        });
                                    }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateDriver(label, val);

                                        }}
                                        error={driverDetails.valid.dob}
                                        helperText={driverDetails.valid.dob ? driverDetails.error.dob : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="gender" >Gender</InputLabel>
                                        <Select
                                            labelId="gender"
                                            id="genderselect"
                                            name={name.gender}
                                            error={driverDetails.valid.gender}
                                            onBlur={(e) => {
                                                const label = e.target.name;
                                                const val = e.target.value;
                                                ValidateDriver(label, val);

                                            }}
                                            value={driverDetails.data.gender}
                                            onChange={(e: SelectChangeEvent) => {
                                                const val = e.target.value;
                                                console.log(val)
                                                setdriverDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            gender: val
                                                        }
                                                    }
                                                });
                                            }}
                                            label={label.gender}
                                        >
                                            <MenuItem key="" value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem key="Male" value="Male">Male</MenuItem>
                                            <MenuItem key="Female" value="Female">Female</MenuItem>
                                            <MenuItem key="Others" value="Others">Others</MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: "#d32f2f" }}>{driverDetails.valid.gender ? driverDetails.error.gender : ""}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="marital">Marital Status</InputLabel>
                                        <Select
                                            labelId="marital"
                                            id="maritalselect"
                                            name={name.marital_status}
                                            value={driverDetails.data.marital_status}
                                            error={driverDetails.valid.marital_status}
                                            onChange={(e: SelectChangeEvent) => {
                                                const val = e.target.value as string;
                                                setdriverDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            marital_status: val
                                                        }
                                                    }
                                                });
                                            }}
                                            onBlur={(e) => {
                                                const label = e.target.name;
                                                const val = e.target.value;
                                                ValidateDriver(label, val);

                                            }}
                                            label={label.marital_status}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Single">Single</MenuItem>
                                            <MenuItem value="Married">Married</MenuItem>
                                            <MenuItem value="Divorced">Divorced</MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: "#d32f2f" }}>{driverDetails.valid.marital_status ? driverDetails.error.marital_status : ""}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="blood">Blood Group</InputLabel>
                                        <Select
                                            labelId="blood"
                                            id="bloodselect"
                                            name={name.blood_group}
                                            error={driverDetails.valid.blood_group}
                                            value={driverDetails.data.blood_group}
                                            onChange={(e: SelectChangeEvent) => {
                                                const val = e.target.value as string;
                                                setdriverDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            blood_group: val
                                                        }
                                                    }
                                                });
                                            }}
                                            onBlur={(e) => {
                                                const label = e.target.name;
                                                const val = e.target.value;
                                                ValidateDriver(label, val);

                                            }}
                                            label={label.blood_group}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="A+">A +ve</MenuItem>
                                            <MenuItem value="A-">A -ve</MenuItem>
                                            <MenuItem value="B+">B +ve</MenuItem>
                                            <MenuItem value="B-">B -ve</MenuItem>
                                            <MenuItem value="O+">O +ve</MenuItem>
                                            <MenuItem value="O-">O -ve</MenuItem>
                                            <MenuItem value="AB-ve">AB -ve</MenuItem>
                                            <MenuItem value="AB+ve">AB +ve</MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: "#d32f2f" }}>{driverDetails.valid.blood_group ? driverDetails.error.blood_group : ""}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="qualification">Qualification</InputLabel>
                                        <Select
                                            labelId="qualification"
                                            id="qualification"
                                            name={name.qualification}
                                            value={driverDetails.data.qualification}
                                            error={driverDetails.valid.qualification}
                                            onChange={(e: SelectChangeEvent) => {
                                                const val = e.target.value as string;
                                                setdriverDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            qualification: val
                                                        }
                                                    }
                                                });
                                            }}
                                            onBlur={(e) => {
                                                const label = e.target.name;
                                                const val = e.target.value;
                                                ValidateDriver(label, val);

                                            }}
                                            label={label.qualification}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="10th Std or Below">10th Std or Below</MenuItem>
                                            <MenuItem value="Diploma">Diploma</MenuItem>
                                            <MenuItem value="12th Std">12th Std</MenuItem>
                                            <MenuItem value="UG">UG</MenuItem>
                                            <MenuItem value="PG">PG</MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: "#d32f2f" }}>{driverDetails.valid.qualification ? driverDetails.error.qualification : ""}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="experience">Experience</InputLabel>
                                        <Select
                                            labelId="experience"
                                            id="experience"
                                            name={name.experience}
                                            value={driverDetails.data.experience}
                                            error={driverDetails.valid.experience}
                                            onChange={(e: SelectChangeEvent) => {
                                                const val = e.target.value as string;
                                                setdriverDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            experience: val
                                                        }
                                                    }
                                                });
                                            }}
                                            onBlur={(e) => {
                                                const label = e.target.name;
                                                const val = e.target.value;
                                                ValidateDriver(label, val);

                                            }}
                                            label={label.experience}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="1 or Below">1 or Below</MenuItem>
                                            <MenuItem value="1-5">1-5</MenuItem>
                                            <MenuItem value="6-8">6-8</MenuItem>
                                            <MenuItem value="9-10">9-10</MenuItem>
                                            <MenuItem value="10+">10+</MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: "#d32f2f" }}>{driverDetails.valid.experience ? driverDetails.error.experience : ""}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={label.previous_work} name={name.previous_work} value={driverDetails.data.previous_work} style={{ width: "100%" }} onChange={(e: any) => {
                                        const val = e.target.value;
                                        setdriverDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    previous_work: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateDriver(label, val);
                                        }}
                                        error={driverDetails.valid.previous_work}
                                        helperText={driverDetails.valid.previous_work ? driverDetails.error.previous_work : ""}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="button">
                                        Communication Address
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={label.c_address} name={name.c_address} value={driverDetails.data.c_address} style={{ width: "100%" }} onChange={(e: any) => {
                                        const val = e.target.value;
                                        setdriverDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    c_address: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateDriver(label, val);
                                        }}
                                        error={driverDetails.valid.c_address}
                                        helperText={driverDetails.valid.c_address ? driverDetails.error.c_address : ""}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={label.c_city} name={name.c_city} value={driverDetails.data.c_city} style={{ width: "100%" }} onChange={(e: any) => {
                                        const val = e.target.value;
                                        setdriverDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    c_city: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateDriver(label, val);
                                        }}
                                        error={driverDetails.valid.c_city}
                                        helperText={driverDetails.valid.c_city ? driverDetails.error.c_city : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField type="number" variant="outlined" label={label.c_pincode} name={name.c_pincode} value={driverDetails.data.c_pincode} style={{ width: "100%" }} onChange={(e: any) => {
                                        const val = e.target.value;
                                        if (!val.match(/[0][1-9]\d{9}$|^[1-9]\d{6}$/)) {
                                            setdriverDetails(prevState => {
                                                return {
                                                    ...prevState, data: {
                                                        ...prevState.data,
                                                        c_pincode: val
                                                    }
                                                }
                                            });
                                        }
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateDriver(label, val);
                                        }}
                                        error={driverDetails.valid.c_pincode}
                                        helperText={driverDetails.valid.c_pincode ? driverDetails.error.c_pincode : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="cstate">State</InputLabel>
                                        <Select
                                            labelId="cstate"
                                            id="cstateselect"
                                            name={name.c_state}
                                            value={driverDetails.data.c_state}
                                            error={driverDetails.valid.c_state}
                                            onChange={(e: SelectChangeEvent) => {
                                                const val = e.target.value;
                                                setdriverDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            c_state: val
                                                        }
                                                    }
                                                });
                                            }}
                                            onBlur={(e) => {
                                                const label = e.target.name;
                                                const val = e.target.value;
                                                ValidateDriver(label, val);

                                            }}
                                            label={label.c_state}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>

                                            <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                                            <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
                                            <MenuItem value="Assam">Assam</MenuItem>
                                            <MenuItem value="Bihar">Bihar</MenuItem>
                                            <MenuItem value="Chattisgarh">Chattisgarh</MenuItem>
                                            <MenuItem value="Goa">Goa</MenuItem>
                                            <MenuItem value="Gujarat">Gujarat</MenuItem>
                                            <MenuItem value="Haryana">Haryana</MenuItem>
                                            <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
                                            <MenuItem value="Jammu and Kashmir">Jammu and Kashmir</MenuItem>
                                            <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                                            <MenuItem value="Karnataka">Karnataka</MenuItem>
                                            <MenuItem value="Kerala">Kerala</MenuItem>
                                            <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                                            <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                                            <MenuItem value="Manipur">Manipur</MenuItem>
                                            <MenuItem value="Meghalaya">Meghalaya</MenuItem>
                                            <MenuItem value="Mizoram">Mizoram</MenuItem>
                                            <MenuItem value="Nagaland">Nagaland</MenuItem>
                                            <MenuItem value="Odisha">Odisha</MenuItem>
                                            <MenuItem value="Punjab">Punjab</MenuItem>
                                            <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                                            <MenuItem value="Sikkim">Sikkim</MenuItem>
                                            <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                                            <MenuItem value="Telangana">Telangana</MenuItem>
                                            <MenuItem value="Tripura">Tripura</MenuItem>
                                            <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                                            <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                                            <MenuItem value="West Bengal">West Bengal</MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: "#d32f2f" }}>{driverDetails.valid.c_state ? driverDetails.error.c_state : ""}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="ccountry">Country</InputLabel>
                                        <Select
                                            labelId="ccountry"
                                            id="ccountryselect"
                                            name={name.c_country}
                                            error={driverDetails.valid.c_country}
                                            value={driverDetails.data.c_country}
                                            onChange={(e: SelectChangeEvent) => {
                                                const val = e.target.value as string;
                                                setdriverDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            c_country: val
                                                        }
                                                    }
                                                });
                                            }}
                                            onBlur={(e) => {
                                                const label = e.target.name;
                                                const val = e.target.value;
                                                ValidateDriver(label, val);

                                            }}
                                            label={label.c_country}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="India">India</MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: "#d32f2f" }}>{driverDetails.valid.c_country ? driverDetails.error.c_country : ""}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="button">
                                        Permanent Address


                                    </Typography>
                                    <Typography>
                                        <input type="checkbox" name="addresss" id="myCheck" value="checked" checked={checked}
                                            onChange={handleChange}

                                        /> Same as Communication Address



                                    </Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={label.p_address} name={name.p_address} value={driverDetails.data.p_address} style={{ width: "100%" }} onChange={(e: any) => {
                                        const val = e.target.value;
                                        setdriverDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    p_address: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateDriver(label, val);
                                        }}
                                        error={driverDetails.valid.p_address}
                                        helperText={driverDetails.valid.p_address ? driverDetails.error.p_address : ""}
                                    />
                                </Grid>
                

                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={label.p_city} name={name.p_city} value={driverDetails.data.p_city} style={{ width: "100%" }} onChange={(e: any) => {
                                        const val = e.target.value;
                                        setdriverDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    p_city: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateDriver(label, val);
                                        }}
                                        error={driverDetails.valid.p_city}
                                        helperText={driverDetails.valid.p_city ? driverDetails.error.p_city : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField type="number" variant="outlined" label={label.p_pincode} name={name.p_pincode} value={driverDetails.data.p_pincode} style={{ width: "100%" }} onChange={(e: any) => {
                                        const val = e.target.value;
                                        if (!val.match(/[0][1-9]\d{9}$|^[1-9]\d{6}$/)) {
                                            setdriverDetails(prevState => {
                                                return {
                                                    ...prevState, data: {
                                                        ...prevState.data,
                                                        p_pincode: val
                                                    }
                                                }
                                            });
                                        }
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateDriver(label, val);
                                        }}
                                        error={driverDetails.valid.p_pincode}
                                        helperText={driverDetails.valid.p_pincode ? driverDetails.error.p_pincode : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="pstate">State</InputLabel>
                                        <Select
                                            labelId="pstate"
                                            id="pstateselect"
                                            name={name.p_state}
                                            value={driverDetails.data.p_state}
                                            error={driverDetails.valid.p_state}
                                            onChange={(e: SelectChangeEvent) => {
                                                const val = e.target.value as string;
                                                setdriverDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            p_state: val
                                                        }
                                                    }
                                                });
                                            }}
                                            onBlur={(e) => {
                                                const label = e.target.name;
                                                const val = e.target.value;
                                                ValidateDriver(label, val);

                                            }}
                                            label={label.p_state}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                                            <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
                                            <MenuItem value="Assam">Assam</MenuItem>
                                            <MenuItem value="Bihar">Bihar</MenuItem>
                                            <MenuItem value="Chattisgarh">Chattisgarh</MenuItem>
                                            <MenuItem value="Goa">Goa</MenuItem>
                                            <MenuItem value="Gujarat">Gujarat</MenuItem>
                                            <MenuItem value="Haryana">Haryana</MenuItem>
                                            <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
                                            <MenuItem value="Jammu and Kashmir">Jammu and Kashmir</MenuItem>
                                            <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                                            <MenuItem value="Karnataka">Karnataka</MenuItem>
                                            <MenuItem value="Kerala">Kerala</MenuItem>
                                            <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                                            <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                                            <MenuItem value="Manipur">Manipur</MenuItem>
                                            <MenuItem value="Meghalaya">Meghalaya</MenuItem>
                                            <MenuItem value="Mizoram">Mizoram</MenuItem>
                                            <MenuItem value="Nagaland">Nagaland</MenuItem>
                                            <MenuItem value="Odisha">Odisha</MenuItem>
                                            <MenuItem value="Punjab">Punjab</MenuItem>
                                            <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                                            <MenuItem value="Sikkim">Sikkim</MenuItem>
                                            <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                                            <MenuItem value="Telangana">Telangana</MenuItem>
                                            <MenuItem value="Tripura">Tripura</MenuItem>
                                            <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                                            <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                                            <MenuItem value="West Bengal">West Bengal</MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: "#d32f2f" }}>{driverDetails.valid.p_state ? driverDetails.error.p_state : ""}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="pcountry">Country</InputLabel>
                                        <Select
                                            labelId="pcountry"
                                            id="pcountryselect"
                                            name={name.p_country}
                                            value={driverDetails.data.p_country}
                                            error={driverDetails.valid.p_country}
                                            onChange={(e: SelectChangeEvent) => {
                                                const val = e.target.value as string;
                                                setdriverDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            p_country: val
                                                        }
                                                    }
                                                });
                                            }}
                                            onBlur={(e) => {
                                                const label = e.target.name;
                                                const val = e.target.value;
                                                ValidateDriver(label, val);

                                            }}
                                            label={label.p_country}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="India">India</MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: "#d32f2f" }}>{driverDetails.valid.p_country ? driverDetails.error.p_country : ""}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="button">
                                        Emergency Person Details
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={label.e_name} name={name.e_name} value={driverDetails.data.e_name} style={{ width: "100%" }} onChange={(e: any) => {
                                        const val = e.target.value;
                                        setdriverDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    e_name: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateDriver(label, val);
                                        }}
                                        error={driverDetails.valid.e_name}
                                        helperText={driverDetails.valid.e_name ? driverDetails.error.e_name : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField type="number" variant="outlined" label={label.e_number} name={name.e_number} value={driverDetails.data.e_number} style={{ width: "100%" }} onChange={(e: any) => {
                                        const val = e.target.value;
                                        if (!val.match(/[0][1-9]\d{9}$|^[1-9]\d{10}$/)) {
                                            setdriverDetails(prevState => {
                                                return {
                                                    ...prevState, data: {
                                                        ...prevState.data,
                                                        e_number: val
                                                    }
                                                }
                                            });
                                        }
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateDriver(label, val);
                                        }}
                                        error={driverDetails.valid.e_number}
                                        helperText={driverDetails.valid.e_number ? driverDetails.error.e_number : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="e_relation">Emergency Person Relation</InputLabel>
                                        <Select
                                            labelId="e_relation"
                                            id="e_relation"
                                            name={name.e_relation}
                                            value={driverDetails.data.e_relation}
                                            error={driverDetails.valid.e_relation}
                                            onChange={(e: SelectChangeEvent) => {
                                                const val = e.target.value as string;
                                                setdriverDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            e_relation: val
                                                        }
                                                    }
                                                });
                                            }}
                                            onBlur={(e) => {
                                                const label = e.target.name;
                                                const val = e.target.value;
                                                ValidateDriver(label, val);

                                            }}
                                            label={label.e_relation}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Father">Father</MenuItem>
                                            <MenuItem value="Mother">Mother</MenuItem>
                                            <MenuItem value="Spouse">Spouse</MenuItem>
                                            <MenuItem value="Relative">Relative</MenuItem>
                                            <MenuItem value="Friend">Friend</MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: "#d32f2f" }}>{driverDetails.valid.e_relation ? driverDetails.error.e_relation : ""}</FormHelperText>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="languagez">Languages Known</InputLabel>
                                        <Select
                                            labelId="languagez"
                                            id="languageselect"
                                            multiple
                                            value={lang}
                                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                            renderValue={(selected) => (
                                                <Box style={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            onChange={(e: SelectChangeEvent<typeof lang>) => {

                                                const {
                                                    target: { value },
                                                } = e;
                                                setLang(
                                                    typeof value === 'string' ? value.split(',') : value
                                                )
                                                console.log(lang);
                                                console.log(driverDetails.data.languages);
                                                setdriverDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            languages: lang.join(',')
                                                        }
                                                    }
                                                });
                                            }}
                                            onBlur={(e) => {
                                                const label = e.target.name;
                                                const val = e.target.value;
                                                ValidateDriver(label, val);

                                            }}
                                            label={label.languages}
                                            error={driverDetails.valid.languages}
                                        >
                                            <MenuItem disabled key="" value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Tamil" key="Tamil">Tamil</MenuItem>
                                            <MenuItem value="English" key="English">English</MenuItem>
                                            <MenuItem value="Malayalam" key="Malayalam">Malayalam</MenuItem>
                                            <MenuItem value="Kannada" key="Kannada">Kannada</MenuItem>
                                            <MenuItem value="Telugu" key="Telugu">Telugu</MenuItem>
                                            <MenuItem value="Hindi" key="Hindi">Hindi</MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: "#d32f2f" }}>{driverDetails.valid.languages ? driverDetails.error.languages : ""}</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">
                            <Button variant="contained" color="secondary" style={{ marginRight: "15px" }} onClick={() => {
                                setCreateModal(false)
                                setEditModal(false)
                            }}>Close</Button>

                            {editModal ?
                                <Button variant="contained" color="primary" onClick={updateDriver}>Update</Button>
                                :
                                <Button variant="contained" color="primary" onClick={saveDriver}>Next</Button>
                            }
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>
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
                    <CardContent style={{marginTop: 70}}>
                        <Grid container style={{ padding: "0 30px" }}>
                            <Grid item xs={12}>
                                <Typography variant="h6">                               
                                Basic Details
                                </Typography>                                
                                
                            </Grid>

                            
                            
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Name:</b> {driverDetails.data.name}

                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Mobile:</b> {driverDetails.data.mobile}
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                <Avatar alt="Photo"
                                src={`https://storage.googleapis.com/goaira-driver/${viewId}/${downloadDetails.data.profile_photo}`}
                                sx={{ width: 100, height: 100}} 
                                style={{ display: "flex", float: "right" }} />
                                </Typography>
                            </Grid>

                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Email:</b> {driverDetails.data.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Aadhar:</b> {driverDetails.data.aadhar}

                                </Typography>
                            </Grid>
                            
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Father Name:</b> {driverDetails.data.father_name}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        D.O.B:</b> {driverDetails.data.dob}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Gender:</b> {driverDetails.data.gender}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Marital Status:</b> {driverDetails.data.marital_status}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Blood Group:</b> {driverDetails.data.blood_group}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Qualification:</b> {driverDetails.data.qualification}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Experience:</b> {driverDetails.data.experience}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Previous Work:</b> {driverDetails.data.previous_work}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Languages Known:</b> {driverDetails.data.languages}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{ margin: "1rem 0" }}>
                                <Typography variant="h6">Communication Address</Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Communication Address:</b> {driverDetails.data.c_address}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        City:</b> {driverDetails.data.c_city}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Pincode:</b> {driverDetails.data.c_pincode}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        State:</b> {driverDetails.data.c_state}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Country:</b> {driverDetails.data.c_country}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{ margin: "1rem 0" }}>
                                <Typography variant="h6">Permanent Address</Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Permanent Address:</b> {driverDetails.data.p_address}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        City:</b> {driverDetails.data.c_city}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Pincode:</b> {driverDetails.data.p_pincode}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        State:</b> {driverDetails.data.p_state}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ padding: "1rem 1rem 0 0" }}>
                                <Typography>
                                    <b>
                                        Country:</b> {driverDetails.data.p_country}
                                </Typography>
                            </Grid>
                            <Grid container xs={12}>
                                <Grid item xs={6} style={{ marginTop: "1rem" }}>
                                    <Typography variant="h6">License Details</Typography>
                                </Grid>
                                <Grid item xs={6} style={{ marginTop: "1rem", }}>
                                    <Button variant="contained" color="primary" style={{ float: "right" }} onClick={() => setAddLicense(true)}>Add License</Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ margin: "1rem 0", height: "170px" }}>
                                <DataGrid rows={driverDetails.data.l_no ? licenseModel : []}
                                    columns={LicenseColumn}
                                    hideFooter
                                />
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
                                <DataGrid rows={vehicleModel || []}
                                    columns={VehicleColumn}
                                    hideFooter
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "1rem" }}>
                                <Typography variant="h6">Documents</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <table className={classes.dtable}>
                                    <thead>
                                        <tr>
                                            <th><Typography variant="h6">Documents</Typography></th>
                                            <th><Typography variant="h6">Download</Typography></th>
                                            <th><Typography variant="h6">Upload</Typography></th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        <tr>
                                            <td><Typography><b>Profile Photo</b>
                                            {downloadDetails.data.profile_photo_approved ?
                                            <img src="tick.png" alt="Logo" width={20} style={{  justifyContent: "right" }} />  
                                            : ''}
                                            </Typography>
                                            
                                            </td>
                                            <td style={{ textAlign: "center" }}>
                                                {downloadDetails.data.profile_photo ?
                                                    <Button variant="contained" onClick={() => {

                                                        setProfilePhoto(true);

                                                    }}>
                                                        Download
                                                    </Button>
                                                    : ''
                                                }
                                            </td>
                                            <td style={{ textAlign: "center" }}>

                                                <label htmlFor="contained-button-file1">
                                                    <Input id="contained-button-file1" type="file" onChange={(e: any) => {

                                                        const val = e.target.value;
                                                        const sz = e.currentTarget.files[0].size / 1024 / 1024;

                                                        var formData = new FormData();

                                                        formData.append('file', e.currentTarget.files[0]);

                                                        var allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.png)$/i;
                                                        if (!allowedExtensions.exec(val)) {
                                                            alert('Invalid file format');
                                                            e.target.value = '';
                                                            return false;
                                                        }
                                                        else if (sz > 1) {
                                                            alert('File Size should not exceed 1 Mb')
                                                        }
                                                        else {
                                                            axios.post(`https://driver-upload-api-hldux24wua-el.a.run.app/uploads/${viewId}/profile_photo`, formData, {
                                                                headers: {
                                                                    'Content-Type': 'multipart/form-data'
                                                                }
                                                            })
                                                                .then(res => {
                                                                    console.log("File uploaded");
                                                                    alert("File uploaded successfully");
                                                                    upload_refresh();
                                                                })
                                                        }
                                                    }} />

                                                    <Button variant="contained" component="span" color="primary"  >
                                                        Upload
                                                        <div className="loader"></div>
                                                    </Button>
                                                    
                                                    
                                                    
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><Typography><b>Aadhar Card</b></Typography></td>
                                            <td style={{ textAlign: "center" }}>
                                                {downloadDetails.data.aadhar_card ?
                                                   <Button variant="contained" onClick={() => {

                                                    setAadharCard(true);

                                                }}>
                                                    Download
                                                </Button>
                                                    : ''
                                                }
                                            </td>
                                            <td style={{ textAlign: "center" }}>

                                                <label htmlFor="contained-button-file2">
                                                    <Input id="contained-button-file2" type="file" onChange={(e: any) => {

                                                        const val = e.target.value;
                                                        const sz = e.currentTarget.files[0].size / 1024 / 1024;

                                                        var formData = new FormData();

                                                        formData.append('file', e.currentTarget.files[0]);

                                                        var allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.png)$/i;
                                                        if (!allowedExtensions.exec(val)) {
                                                            alert('Invalid file format');
                                                            e.target.value = '';
                                                            return false;
                                                        }
                                                        else if (sz > 1) {
                                                            alert('File Size should not exceed 1 Mb')
                                                        }
                                                        else {
                                                            axios.post(`https://driver-upload-api-hldux24wua-el.a.run.app/uploads/${viewId}/aadhar_card`, formData, {
                                                                headers: {
                                                                    'Content-Type': 'multipart/form-data'
                                                                }
                                                            })
                                                                .then(res => {
                                                                    console.log("File uploaded");
                                                                    alert("File uploaded successfully");
                                                                    upload_refresh();
                                                                })
                                                        }
                                                    }} />

                                                    <Button variant="contained" component="span" color="primary"  >
                                                        Upload
                                                    </Button>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><Typography><b>Pan Card</b></Typography></td>
                                            <td style={{ textAlign: "center" }}>
                                                {downloadDetails.data.pan_card ?
                                                    <Button variant="contained" onClick={() => {

                                                        setPanCard(true);

                                                    }}>
                                                        Download
                                                    </Button>
                                                    : ''
                                                }
                                            </td>
                                            <td style={{ textAlign: "center" }}><label htmlFor="contained-button-file3">
                                                <Input id="contained-button-file3" type="file" onChange={(e: any) => {
                                                    console.log("fhkafkdsgkfagds")
                                                    const val = e.target.value;
                                                    const sz = e.currentTarget.files[0].size / 1024 / 1024;
                                                    const extension3 = val.substring(val.lastIndexOf('.') + 1, val.length) || val;
                                                    var formData = new FormData();

                                                    formData.append('file', e.currentTarget.files[0]);

                                                    var allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.png)$/i;
                                                    if (!allowedExtensions.exec(val)) {
                                                        alert('Invalid file format');
                                                        e.target.value = '';
                                                        return false;
                                                    }
                                                    else if (sz > 1) {
                                                        alert('File Size should not exceed 1 Mb')
                                                    }
                                                    else {
                                                        axios.post(`https://driver-upload-api-hldux24wua-el.a.run.app/uploads/${viewId}/pan_card`, formData, {
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data'
                                                            }
                                                        }).then(res => {
                                                            console.log("File uploaded");
                                                            alert("File uploaded successfully");
                                                            upload_refresh();
                                                        })
                                                    }
                                                }} />


                                                <Button variant="contained" component="span" color="primary"  >
                                                    Upload
                                                </Button>
                                            </label></td>
                                        </tr>
                                        <tr>
                                            <td><Typography><b>License</b></Typography></td>
                                            <td style={{ textAlign: "center" }}>
                                                {downloadDetails.data.license ?
                                                    <Button variant="contained" onClick={() => {

                                                        setLicense(true);

                                                    }}>
                                                        Download
                                                    </Button>
                                                    : ''
                                                }
                                            </td>
                                            <td style={{ textAlign: "center" }}><label htmlFor="contained-button-file4">
                                                <Input id="contained-button-file4" type="file" onChange={(e: any) => {

                                                    const val = e.target.value;
                                                    const sz = e.currentTarget.files[0].size / 1024 / 1024;
                                                    const extension4 = val.substring(val.lastIndexOf('.') + 1, val.length) || val;

                                                    var formData = new FormData();

                                                    formData.append('file', e.currentTarget.files[0]);

                                                    var allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.png)$/i;
                                                    if (!allowedExtensions.exec(val)) {
                                                        alert('Invalid file format');
                                                        e.target.value = '';
                                                        return false;
                                                    }
                                                    else if (sz > 1) {
                                                        alert('File Size should not exceed 1 Mb')
                                                    }
                                                    else {
                                                        axios.post(`https://driver-upload-api-hldux24wua-el.a.run.app/uploads/${viewId}/license`, formData, {
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data'
                                                            }
                                                        })
                                                            .then(res => {
                                                                console.log("File uploaded");
                                                                alert("File uploaded successfully");
                                                                upload_refresh();
                                                            })
                                                    }
                                                }} />

                                                <Button variant="contained" component="span" color="primary"  >
                                                    Upload

                                                </Button>
                                                <div className="loader"></div>
                                            </label></td>
                                        </tr>
                                        <tr>
                                            <td><Typography><b>Road Tax</b></Typography></td>
                                            <td style={{ textAlign: "center" }}>
                                                {downloadDetails.data.road_tax ?
                                                    <Button variant="contained" onClick={() => {

                                                        setRoadTax(true);

                                                    }}>
                                                        Download
                                                    </Button>
                                                    : ''
                                                }
                                            </td>
                                            <td style={{ textAlign: "center" }}><label htmlFor="contained-button-file5">
                                                <Input id="contained-button-file5" type="file" onChange={(e: any) => {

                                                    const val = e.target.value;
                                                    const sz = e.currentTarget.files[0].size / 1024 / 1024;
                                                    const extension5 = val.substring(val.lastIndexOf('.') + 1, val.length) || val;
                                                    var formData = new FormData();

                                                    formData.append('file', e.currentTarget.files[0]);

                                                    var allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.png)$/i;
                                                    if (!allowedExtensions.exec(val)) {
                                                        alert('Invalid file format');
                                                        e.target.value = '';
                                                        return false;
                                                    }
                                                    else if (sz > 1) {
                                                        alert('File Size should not exceed 1 Mb')
                                                    }
                                                    else {
                                                        axios.post(`https://driver-upload-api-hldux24wua-el.a.run.app/uploads/${viewId}/road_tax`, formData, {
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data'
                                                            }
                                                        })
                                                            .then(res => {
                                                                console.log("File uploaded");
                                                                alert("File uploaded successfully");
                                                                upload_refresh();
                                                            })
                                                    }
                                                }} />

                                                <Button variant="contained" component="span" color="primary"  >
                                                    Upload
                                                </Button>
                                            </label></td>
                                        </tr>
                                        <tr>
                                            <td><Typography><b>Permit</b></Typography></td>
                                            <td style={{ textAlign: "center" }}>
                                                {downloadDetails.data.permit ?
                                                    <Button variant="contained" onClick={() => {

                                                        setPermit(true);

                                                    }}>
                                                        Download
                                                    </Button>
                                                    : ''
                                                }
                                            </td>
                                            <td style={{ textAlign: "center" }}><label htmlFor="contained-button-file6">
                                                <Input id="contained-button-file6" type="file" onChange={(e: any) => {

                                                    const val = e.target.value;
                                                    const sz = e.currentTarget.files[0].size / 1024 / 1024;
                                                    const extension6 = val.substring(val.lastIndexOf('.') + 1, val.length) || val;
                                                    var formData = new FormData();

                                                    formData.append('file', e.currentTarget.files[0]);

                                                    var allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.png)$/i;
                                                    if (!allowedExtensions.exec(val)) {
                                                        alert('Invalid file format');
                                                        e.target.value = '';
                                                        return false;
                                                    }
                                                    else if (sz > 1) {
                                                        alert('File Size should not exceed 1 Mb')
                                                    }
                                                    else {
                                                        axios.post(`https://driver-upload-api-hldux24wua-el.a.run.app/uploads/${viewId}/permit`, formData, {
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data'
                                                            }
                                                        })
                                                            .then(res => {
                                                                console.log("File uploaded");
                                                                alert("File uploaded successfully");
                                                                upload_refresh();
                                                            })
                                                    }
                                                }} />

                                                <Button variant="contained" component="span" color="primary"  >
                                                    Upload
                                                </Button>
                                            </label></td>
                                        </tr>
                                        <tr>
                                            <td><Typography><b>FC Certificate</b></Typography></td>
                                            <td style={{ textAlign: "center" }}>
                                                {downloadDetails.data.fc_certificate ?
                                                    <Button variant="contained" onClick={() => {

                                                        setFcCertificate(true);

                                                    }}>
                                                        Download
                                                    </Button>
                                                    : ''
                                                }
                                            </td>
                                            <td style={{ textAlign: "center" }}><label htmlFor="contained-button-file7">
                                                <Input id="contained-button-file7" type="file" onChange={(e: any) => {

                                                    const val = e.target.value;
                                                    const sz = e.currentTarget.files[0].size / 1024 / 1024;
                                                    const extension7 = val.substring(val.lastIndexOf('.') + 1, val.length) || val;
                                                    var formData = new FormData();

                                                    formData.append('file', e.currentTarget.files[0]);

                                                    var allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.png)$/i;
                                                    if (!allowedExtensions.exec(val)) {
                                                        alert('Invalid file format');
                                                        e.target.value = '';
                                                        return false;
                                                    }
                                                    else if (sz > 1) {
                                                        alert('File Size should not exceed 1 Mb')
                                                    }
                                                    else {
                                                        axios.post(`https://driver-upload-api-hldux24wua-el.a.run.app/uploads/${viewId}/fc_certificate`, formData, {
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data'
                                                            }
                                                        })
                                                            .then(res => {
                                                                console.log("File uploaded");
                                                                alert("File uploaded successfully");
                                                                upload_refresh();
                                                            })
                                                    }
                                                }} />

                                                <Button variant="contained" component="span" color="primary"  >
                                                    Upload
                                                </Button>
                                            </label></td>
                                        </tr>
                                        <tr>
                                            <td><Typography><b>Insurance</b></Typography></td>
                                            <td style={{ textAlign: "center" }}>
                                                {downloadDetails.data.insurance ?
                                                    <Button variant="contained" onClick={() => {

                                                        setInsurance(true);

                                                    }}>
                                                        Download
                                                    </Button>
                                                    : ''
                                                }
                                            </td>
                                            <td style={{ textAlign: "center" }}><label htmlFor="contained-button-file8">
                                                <Input id="contained-button-file8" type="file" onChange={(e: any) => {

                                                    const val = e.target.value;
                                                    const sz = e.currentTarget.files[0].size / 1024 / 1024;
                                                    const extension8 = val.substring(val.lastIndexOf('.') + 1, val.length) || val;
                                                    var formData = new FormData();

                                                    formData.append('file', e.currentTarget.files[0]);

                                                    var allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.png)$/i;
                                                    if (!allowedExtensions.exec(val)) {
                                                        alert('Invalid file format');
                                                        e.target.value = '';
                                                        return false;
                                                    }
                                                    else if (sz > 1) {
                                                        alert('File Size should not exceed 1 Mb')
                                                    }
                                                    else {
                                                        axios.post(`https://driver-upload-api-hldux24wua-el.a.run.app/uploads/${viewId}/insurance`, formData, {
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data'
                                                            }
                                                        })
                                                            .then(res => {
                                                                console.log("File uploaded");
                                                                alert("File uploaded successfully");
                                                                upload_refresh();
                                                            })
                                                    }
                                                }} />

                                                <Button variant="contained" component="span" color="primary"  >
                                                    Upload
                                                </Button>
                                            </label></td>
                                        </tr>
                                        <tr>
                                            <td><Typography><b>Lease Copy</b></Typography></td>
                                            <td style={{ textAlign: "center" }}>
                                                {downloadDetails.data.lease_copy ?
                                                    <Button variant="contained" onClick={() => {

                                                        setLeaseCopy(true);

                                                    }}>
                                                        Download
                                                    </Button>
                                                    : ''
                                                }
                                            </td>
                                            <td style={{ textAlign: "center" }}><label htmlFor="contained-button-file9">
                                                <Input id="contained-button-file9" type="file" onChange={(e: any) => {

                                                    const val = e.target.value;
                                                    const sz = e.currentTarget.files[0].size / 1024 / 1024;
                                                    const extension9 = val.substring(val.lastIndexOf('.') + 1, val.length) || val;
                                                    var formData = new FormData();

                                                    formData.append('file', e.currentTarget.files[0]);

                                                    var allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.png)$/i;
                                                    if (!allowedExtensions.exec(val)) {
                                                        alert('Invalid file format');
                                                        e.target.value = '';
                                                        return false;
                                                    }
                                                    else if (sz > 1) {
                                                        alert('File Size should not exceed 1 Mb')
                                                    }
                                                    else {
                                                        axios.post(`https://driver-upload-api-hldux24wua-el.a.run.app/uploads/${viewId}/lease_copy`, formData, {
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data'
                                                            }
                                                        })
                                                            .then(res => {
                                                                console.log("File uploaded");
                                                                alert("File uploaded successfully");
                                                                upload_refresh();
                                                            })
                                                    }
                                                }} />

                                                <Button variant="contained" component="span" color="primary"  >
                                                    Upload
                                                </Button>
                                            </label></td>
                                        </tr>
                                        <tr>
                                            <td><Typography><b>NOC</b></Typography></td>
                                            <td style={{ textAlign: "center" }}>
                                                {downloadDetails.data.noc ?
                                                    <Button variant="contained" onClick={() => {

                                                        setNoc(true);

                                                    }}>
                                                        Download
                                                    </Button>
                                                    : ''
                                                }
                                            </td>
                                            <td style={{ textAlign: "center" }}><label htmlFor="contained-button-file10">
                                                <Input id="contained-button-file10" type="file" onChange={(e: any) => {

                                                    const val = e.target.value;
                                                    const sz = e.currentTarget.files[0].size / 1024 / 1024;
                                                    const extension10 = val.substring(val.lastIndexOf('.') + 1, val.length) || val;
                                                    var formData = new FormData();

                                                    formData.append('file', e.currentTarget.files[0]);

                                                    var allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.png)$/i;
                                                    if (!allowedExtensions.exec(val)) {
                                                        alert('Invalid file format');
                                                        e.target.value = '';
                                                        return false;
                                                    }
                                                    else if (sz > 1) {
                                                        alert('File Size should not exceed 1 Mb')
                                                    }
                                                    else {
                                                        axios.post(`https://driver-upload-api-hldux24wua-el.a.run.app/uploads/${viewId}/noc`, formData, {
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data'
                                                            }
                                                        }).then(res => {
                                                            console.log("File uploaded");
                                                            alert("File uploaded successfully");
                                                            upload_refresh();
                                                        })
                                                    }
                                                }} />

                                                <Button variant="contained" component="span" color="primary"  >
                                                    Upload
                                                </Button>
                                            </label></td>
                                        </tr>
                                        <tr>
                                            <td><Typography><b>RC Book</b></Typography></td>
                                            <td style={{ textAlign: "center" }}>
                                                {downloadDetails.data.rc_book ?
                                                    <Button variant="contained" onClick={() => {

                                                        setRcBook(true);

                                                    }}>
                                                        Download
                                                    </Button>
                                                    : ''
                                                }
                                            </td>
                                            <td style={{ textAlign: "center" }}><label htmlFor="contained-button-file11">
                                                <Input id="contained-button-file11" type="file" onChange={(e: any) => {

                                                    const val = e.target.value;
                                                    const sz = e.currentTarget.files[0].size / 1024 / 1024;
                                                    const extension11 = val.substring(val.lastIndexOf('.') + 1, val.length) || val;
                                                    var formData = new FormData();

                                                    formData.append('file', e.currentTarget.files[0]);

                                                    var allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.png)$/i;
                                                    if (!allowedExtensions.exec(val)) {
                                                        alert('Invalid file format');
                                                        e.target.value = '';
                                                        return false;
                                                    }
                                                    else if (sz > 1) {
                                                        alert('File Size should not exceed 1 Mb')
                                                    }
                                                    else {
                                                        axios.post(`https://driver-upload-api-hldux24wua-el.a.run.app/uploads/${viewId}/rc_book`, formData, {
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data'
                                                            }
                                                        })
                                                            .then(res => {
                                                                console.log("File uploaded");
                                                                alert("File uploaded successfully");
                                                                upload_refresh();
                                                            })
                                                    }
                                                }} />

                                                <Button variant="contained" component="span" color="primary"  >
                                                    Upload
                                                </Button>
                                            </label></td>
                                        </tr>
                                        <tr>
                                            <td><Typography><b>Vehicle Photo</b></Typography></td>
                                            <td style={{ textAlign: "center" }}>
                                                {downloadDetails.data.vehicle_photo ?
                                                    <Button variant="contained" onClick={() => {

                                                        setVehiclePhoto(true);

                                                    }}>
                                                        Download
                                                    </Button>
                                                    : ''
                                                }
                                            </td>
                                            <td style={{ textAlign: "center" }}><label htmlFor="contained-button-file12">
                                                <Input id="contained-button-file12" type="file" onChange={(e: any) => {

                                                    const val = e.target.value;
                                                    const sz = e.currentTarget.files[0].size / 1024 / 1024;
                                                    const extension12 = val.substring(val.lastIndexOf('.') + 1, val.length) || val;
                                                    var formData = new FormData();

                                                    formData.append('file', e.currentTarget.files[0]);

                                                    var allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.png)$/i;
                                                    if (!allowedExtensions.exec(val)) {
                                                        alert('Invalid file format');
                                                        e.target.value = '';
                                                        return false;
                                                    }
                                                    else if (sz > 1) {
                                                        alert('File Size should not exceed 1 Mb')
                                                    }
                                                    else {
                                                        axios.post(`https://driver-upload-api-hldux24wua-el.a.run.app/uploads/${viewId}/vehicle_photo`, formData, {
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data'
                                                            }
                                                        })
                                                            .then(res => {
                                                                console.log("File uploaded");
                                                                alert("File uploaded successfully");
                                                                upload_refresh();
                                                            })
                                                    }

                                                }} />

                                                <Button variant="contained" component="span" color="primary"  >
                                                    Upload
                                                </Button>
                                            </label></td>
                                        </tr>
                                        <tr>
                                            <td><Typography><b>Has your driving license been suspended ? <br/>If Yes, Please
                                             attach details</b></Typography></td>
                                            <td style={{ textAlign: "center" }}>
                                                {downloadDetails.data.license_suspend ?
                                                    <Button variant="contained" onClick={() => {

                                                        setLicenseSuspend(true);

                                                    }}>
                                                        Download
                                                    </Button>
                                                    : ''
                                                }
                                            </td>
                                            <td style={{ textAlign: "center" }}><label htmlFor="contained-button-file13">
                                                <Input id="contained-button-file13" type="file" onChange={(e: any) => {

                                                    const val = e.target.value;
                                                    const sz = e.currentTarget.files[0].size / 1024 / 1024;
                                                    const extension12 = val.substring(val.lastIndexOf('.') + 1, val.length) || val;
                                                    var formData = new FormData();

                                                    formData.append('file', e.currentTarget.files[0]);

                                                    var allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.png)$/i;
                                                    if (!allowedExtensions.exec(val)) {
                                                        alert('Invalid file format');
                                                        e.target.value = '';
                                                        return false;
                                                    }
                                                    else if (sz > 1) {
                                                        alert('File Size should not exceed 1 Mb')
                                                    }
                                                    else {
                                                        axios.post(`https://driver-upload-api-hldux24wua-el.a.run.app/uploads/${viewId}/license_suspend`, formData, {
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data'
                                                            }
                                                        })
                                                            .then(res => {
                                                                console.log("File uploaded");
                                                                alert("File uploaded successfully");
                                                                upload_refresh();
                                                            })
                                                    }

                                                }} />

                                                <Button variant="contained" component="span" color="primary"  >
                                                    Upload
                                                </Button>
                                            </label></td>
                                        </tr>
                                        <tr>
                                            <td><Typography><b>Do you have any penalities for <br/> traffic/criminal convictions
                in past 3 years? <br/> If yes, Please attach details</b></Typography></td>
                                            <td style={{ textAlign: "center" }}>
                                                {downloadDetails.data.license_penalty ?
                                                    <Button variant="contained" onClick={() => {

                                                        setLicensePenalty(true);

                                                    }}>
                                                        Download
                                                    </Button>
                                                    : ''
                                                }
                                            </td>
                                            <td style={{ textAlign: "center" }}><label htmlFor="contained-button-file14">
                                                <Input id="contained-button-file14" type="file" onChange={(e: any) => {

                                                    const val = e.target.value;
                                                    const sz = e.currentTarget.files[0].size / 1024 / 1024;
                                                    const extension12 = val.substring(val.lastIndexOf('.') + 1, val.length) || val;
                                                    var formData = new FormData();

                                                    formData.append('file', e.currentTarget.files[0]);

                                                    var allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.png)$/i;
                                                    if (!allowedExtensions.exec(val)) {
                                                        alert('Invalid file format');
                                                        e.target.value = '';
                                                        return false;
                                                    }
                                                    else if (sz > 1) {
                                                        alert('File Size should not exceed 1 Mb')
                                                    }
                                                    else {
                                                        axios.post(`https://driver-upload-api-hldux24wua-el.a.run.app/uploads/${viewId}/license_penalty`, formData, {
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data'
                                                            }
                                                        })
                                                            .then(res => {
                                                                console.log("File uploaded");
                                                                alert("File uploaded successfully");
                                                                upload_refresh();
                                                            })
                                                    }

                                                }} />

                                                <Button variant="contained" component="span" color="primary"  >
                                                    Upload
                                                </Button>
                                            </label></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Modal>

            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={addLicense || editLicense}


                aria-labelledby="create-license-title"
                aria-describedby="create-license-description"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="Add License" style={{ display: "flex", borderBottom: "1px solid #f2f2f2", position: "fixed", zIndex: 3, backgroundColor: "white", justifyContent: "space-between", width: "40%" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setAddLicense(false);                             
                            setEditVehicle(false);
                            setEditLicense(false);
                            license_refresh();                         
                            
                        }}>Close</Button>
                    } />
                    <CardContent style={{marginTop: 70}}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField variant="outlined" label={label.l_no} name={name.l_no} value={driverDetails.data.l_no} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    if (!val.match(/[0][1-9]\d{9}$|^[1-9]\d{16}$/)) {
                                    setdriverDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                l_no: val
                                            }
                                        }
                                    });
                                }

                                }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateLicense(label, val);
                                    }}
                                    error={driverDetails.valid.l_no}
                                    helperText={driverDetails.valid.l_no ? driverDetails.error.l_no : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="date" variant="outlined" label={label.l_expiry} name={name.l_expiry} value={driverDetails.data.l_expiry} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setdriverDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                l_expiry: val
                                            }
                                        }
                                    });

                                }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateLicense(label, val);
                                    }}
                                    error={driverDetails.valid.l_expiry}
                                    helperText={driverDetails.valid.l_expiry ? driverDetails.error.l_expiry : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                    <InputLabel id="ltype">License Type</InputLabel>
                                    <Select
                                        labelId="ltype"
                                        id="ltypeselect"
                                        name={name.l_type}
                                        value={driverDetails.data.l_type}
                                        onChange={(e: SelectChangeEvent) => {
                                            console.log("changed")
                                            const val = e.target.value as string;
                                            setdriverDetails(prevState => {
                                                return {
                                                    ...prevState, data: {
                                                        ...prevState.data,
                                                        l_type: val
                                                    }
                                                }
                                            });
                                        }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            validateLicense(label, val);
                                        }}
                                        label={label.l_type}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="HMV">HMV</MenuItem>
                                        <MenuItem value="LMV">LMV</MenuItem>
                                    </Select>
                                    <FormHelperText style={{ color: "#d32f2f" }}>{driverDetails.valid.l_type ? driverDetails.error.l_type : ""}</FormHelperText>
                                </FormControl>
                            </Grid>


                            <Grid item xs={6}>
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                    <InputLabel id="lstate">License Issued State</InputLabel>
                                    <Select
                                        labelId="lstate"
                                        id="lstateselect"
                                        name={name.l_state}
                                        value={driverDetails.data.l_state}
                                        onChange={(e: SelectChangeEvent) => {
                                            console.log("changed")
                                            const val = e.target.value as string;
                                            setdriverDetails(prevState => {
                                                return {
                                                    ...prevState, data: {
                                                        ...prevState.data,
                                                        l_state: val
                                                    }
                                                }
                                            });
                                        }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            validateLicense(label, val);
                                        }}
                                        label={label.l_state}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                                        <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
                                        <MenuItem value="Assam">Assam</MenuItem>
                                        <MenuItem value="Bihar">Bihar</MenuItem>
                                        <MenuItem value="Chattisgarh">Chattisgarh</MenuItem>
                                        <MenuItem value="Goa">Goa</MenuItem>
                                        <MenuItem value="Gujarat">Gujarat</MenuItem>
                                        <MenuItem value="Haryana">Haryana</MenuItem>
                                        <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
                                        <MenuItem value="Jammu and Kashmir">Jammu and Kashmir</MenuItem>
                                        <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                                        <MenuItem value="Karnataka">Karnataka</MenuItem>
                                        <MenuItem value="Kerala">Kerala</MenuItem>
                                        <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                                        <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                                        <MenuItem value="Manipur">Manipur</MenuItem>
                                        <MenuItem value="Meghalaya">Meghalaya</MenuItem>
                                        <MenuItem value="Mizoram">Mizoram</MenuItem>
                                        <MenuItem value="Nagaland">Nagaland</MenuItem>
                                        <MenuItem value="Odisha">Odisha</MenuItem>
                                        <MenuItem value="Punjab">Punjab</MenuItem>
                                        <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                                        <MenuItem value="Sikkim">Sikkim</MenuItem>
                                        <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                                        <MenuItem value="Telangana">Telangana</MenuItem>
                                        <MenuItem value="Tripura">Tripura</MenuItem>
                                        <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                                        <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                                        <MenuItem value="West Bengal">West Bengal</MenuItem>
                                    </Select>
                                    <FormHelperText style={{ color: "#d32f2f" }}>{driverDetails.valid.l_state ? driverDetails.error.l_state : ""}</FormHelperText>
                                </FormControl>
                            </Grid>
                             
                            <Grid item xs={6}>
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                    <InputLabel id="ltype">Service Type</InputLabel>
                                    <Select
                                        labelId="stype"
                                        id="stypeselect"
                                        name={LicenseData.name.s_type}
                                        value={serviceType.data.s_type}
                                        onChange={(e: SelectChangeEvent) => {
                                            console.log("changed")
                                            const val = e.target.value as string;
                                            setServiceType(prevState => {
                                                return {
                                                    ...prevState, data: {
                                                        ...prevState.data,
                                                        s_type: val
                                                    }
                                                }
                                            });
                                        }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            validateLicense(label, val);
                                        }}
                                        label={LicenseData.label.s_type}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Driver">Driver with Vehicle</MenuItem>
                                        <MenuItem value="chauffeur">chauffeur</MenuItem>
                                    </Select>
                                    <FormHelperText style={{ color: "#d32f2f" }}>{serviceType.valid.s_type ? serviceType.error.s_type : ""}</FormHelperText>
                                </FormControl>
                            </Grid>                           
                            


                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">
                            <Button variant="contained" color="secondary" style={{ marginRight: "15px" }} onClick={() => {
                                setAddLicense(false);                             
                                setEditVehicle(false);
                                setEditLicense(false);
                                license_refresh();    
                            }}>Close</Button>
                            <Button variant="contained" color="primary" onClick={() => { updatelicensez(viewId) }}>Add</Button>
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>
            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={editVehicle}

                aria-labelledby="create-vehicle-title"
                aria-describedby="create-vehicle-description"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="Edit Vehicle" style={{ display: "flex", borderBottom: "1px solid #f2f2f2", position: "fixed", zIndex: 3, backgroundColor: "white", justifyContent: "space-between", width: "40%" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setEditVehicle(false);
                            setAddLicense(false);
                        }}>Close</Button>
                    } />
                    <CardContent style={{marginTop: 70}}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                    <InputLabel id="vtype">Vehicle Type</InputLabel>
                                    <Select
                                        labelId="vtype"
                                        id="vtypeselect"
                                        name={vehicleDetails.name.v_type}
                                        value={vehicleDetails.data.v_type}
                                        onChange={vehicleSelect}  


                                        label={vehicleDetails.label.v_type}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Car">Car</MenuItem>
                                        <MenuItem value="Bike">Bike</MenuItem>
                                        <MenuItem value="Auto">Auto</MenuItem>
                                        <MenuItem value="Ambulance">Ambulance</MenuItem>
                                    </Select>
                                    <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_type ? vehicleDetails.error.v_type : ""}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField variant="outlined" label={vehicleDetails.label.v_reg_no} name={vehicleDetails.name.v_reg_no} value={vehicleDetails.data.v_reg_no} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_reg_no: val,
                                            }
                                        }
                                    });

                                }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_reg_no}
                                    helperText={vehicleDetails.valid.v_reg_no ? vehicleDetails.error.v_reg_no : ""}
                                />
                            </Grid>
                             
                            {
                               vehicleDetails.data.v_type == "Car" ?
                            <Grid item xs={6}>
                                
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="v_make" >Vehicle Make</InputLabel>
                                       
                                        <Select
                                            labelId="v_make"
                                            id="v_make select"
                                            name={vehicleDetails.name.v_make}
                                            error={vehicleDetails.valid.v_make}
                                            onBlur={(e) => {
                                                const label = e.target.name;
                                                const val = e.target.value;
                                                ValidateDriver(label, val);

                                            }}
                                            value={vehicleDetails.data.v_make}
                                            onChange={(e: SelectChangeEvent) => {
                                                const val = e.target.value;
                                                console.log(val)
                                                setVehicleDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            v_make: val
                                                        }
                                                    }
                                                });
                                            }}
                                            label={vehicleDetails.label.v_make}
                                        >
                                        
                                            <MenuItem key="" value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem key="Chevrolet" value="Chevrolet">Chevrolet</MenuItem>
                                            <MenuItem key="Datsun" value="Datsun">Datsun</MenuItem>
                                            <MenuItem key="Ford" value="Ford">Ford</MenuItem>
                                            <MenuItem key="Hyndai" value="Hyndai">Hyndai</MenuItem>
                                            <MenuItem key="Mahindra" value="Mahindra">Mahindra</MenuItem>
                                            <MenuItem key="Nissan" value="Nissan">Nissan</MenuItem>
                                            <MenuItem key="Renault" value="Renault">Renault</MenuItem>
                                            <MenuItem key="Tata" value="Tata">Tata</MenuItem>
                                            <MenuItem key="Toyota" value="Toyota">Toyota</MenuItem>
                                            <MenuItem key="Others" value="Others">Others</MenuItem>                                          
                                            </Select>                                                                                    
                                                                                                                               
                                                 
                                       <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_make ? vehicleDetails.error.v_make : ""}</FormHelperText>
                                    </FormControl>
                                     
                                </Grid>
                                :
                                  <Grid item xs={6}>
                                      <TextField variant="outlined" label={vehicleDetails.label.v_make} name={vehicleDetails.name.v_make} value={vehicleDetails.data.v_make} style={{ width: "100%" }} onChange={(e: any) => {
                                          const val = e.target.value;
                                          setVehicleDetails(prevState => {
                                              return {
                                                  ...prevState, data: {
                                                      ...prevState.data,
                                                      v_make: val
                                                  }
                                              }
                                          });
      
                                      }}
                                          onBlur={(e) => {
                                              const label = e.target.name;
                                              const val = e.target.value;
                                              validateVehicle(label, val);
                                          }}
                                          error={vehicleDetails.valid.v_make}
                                          helperText={vehicleDetails.valid.v_make ? vehicleDetails.error.v_make : ""}
                                      />
                                  </Grid>
                                 }
                               {
                               vehicleDetails.data.v_make == "Maruti Suzuki" ?
                                  <Grid item xs={6}>
                                
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                    <InputLabel id="v_model" >Vehicle Model</InputLabel>
                                   
                                    <Select
                                        labelId="v_model"
                                        id="v_model"
                                        name={vehicleDetails.name.v_model}
                                        error={vehicleDetails.valid.v_model}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateDriver(label, val);

                                        }}
                                        value={vehicleDetails.data.v_model}
                                        onChange={(e: SelectChangeEvent) => {
                                            const val = e.target.value;
                                            console.log(val)
                                            setVehicleDetails(prevState => {
                                                return {
                                                    ...prevState, data: {
                                                        ...prevState.data,
                                                        v_model: val
                                                    }
                                                }
                                            });
                                        }}
                                        label={vehicleDetails.label.v_model}
                                    >
                                    
                                        <MenuItem key="" value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem key="Swift Dzire" value="Swift Dzire">Swift Dzire</MenuItem>
                                        <MenuItem key="Ertiga" value="Ertiga">Ertiga</MenuItem>
                                        <MenuItem key="Ritz" value="Ritz">Ritz</MenuItem>                                       
                                        <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                                               
                                    </Select>
                                         
                                    <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
                                </FormControl>
                                 
                            </Grid>
                              
                            :
                            
                           ( vehicleDetails.data.v_make == "Mahindra" ?
                            <Grid item xs={6}>
                          
                          <FormControl variant="outlined" style={{ width: "100%" }}>
                              <InputLabel id="v_model" >Vehicle Model</InputLabel>
                             
                              <Select
                                  labelId="v_model"
                                  id="v_model"
                                  name={vehicleDetails.name.v_model}
                                  error={vehicleDetails.valid.v_model}
                                  onBlur={(e) => {
                                      const label = e.target.name;
                                      const val = e.target.value;
                                      ValidateDriver(label, val);

                                  }}
                                  value={vehicleDetails.data.v_model}
                                  onChange={(e: SelectChangeEvent) => {
                                      const val = e.target.value;
                                      console.log(val)
                                      setVehicleDetails(prevState => {
                                          return {
                                              ...prevState, data: {
                                                  ...prevState.data,
                                                  v_model: val
                                              }
                                          }
                                      });
                                  }}
                                  label={vehicleDetails.label.v_model}
                              >
                              
                                  <MenuItem key="" value="">
                                      <em>None</em>
                                  </MenuItem>
                                  <MenuItem key="Swift Dzire" value="Swift Dzire">XUV 100</MenuItem>
                                  <MenuItem key="Ertiga" value="Ertiga">Xylo</MenuItem>
                                  <MenuItem key="Ritz" value="Ritz">Ritz</MenuItem>
                                  <MenuItem key="Alto" value="Alto">Alto</MenuItem> 
                                  <MenuItem key="Celerio" value="Celerio">Celerio</MenuItem> 
                                  <MenuItem key="WagonR" value="WagonR">WagonR</MenuItem>                                        
                                  <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                                         
                              </Select>
                                   
                              <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
                          </FormControl>
                           
                      </Grid>: 
                    
                    ( vehicleDetails.data.v_make == "Toyota" ?
                            <Grid item xs={6}>
                          
                          <FormControl variant="outlined" style={{ width: "100%" }}>
                              <InputLabel id="v_model" >Vehicle Model</InputLabel>
                             
                              <Select
                                  labelId="v_model"
                                  id="v_model"
                                  name={vehicleDetails.name.v_model}
                                  error={vehicleDetails.valid.v_model}
                                  onBlur={(e) => {
                                      const label = e.target.name;
                                      const val = e.target.value;
                                      ValidateDriver(label, val);

                                  }}
                                  value={vehicleDetails.data.v_model}
                                  onChange={(e: SelectChangeEvent) => {
                                      const val = e.target.value;
                                      console.log(val)
                                      setVehicleDetails(prevState => {
                                          return {
                                              ...prevState, data: {
                                                  ...prevState.data,
                                                  v_model: val
                                              }
                                          }
                                      });
                                  }}
                                  label={vehicleDetails.label.v_model}
                              >
                              
                                  <MenuItem key="" value="">
                                      <em>None</em>
                                  </MenuItem>
                                  <MenuItem key="Innova" value="Innova">Innova</MenuItem>
                                  <MenuItem key="Etios" value="Ertiga">Etios</MenuItem>                                                                        
                                  <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                                         
                              </Select>
                                   
                              <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
                          </FormControl>
                           
                      </Grid>:
                             ( vehicleDetails.data.v_make == "Hyndai" ?
                             <Grid item xs={6}>
                           
                           <FormControl variant="outlined" style={{ width: "100%" }}>
                               <InputLabel id="v_model" >Vehicle Model</InputLabel>
                              
                               <Select
                                   labelId="v_model"
                                   id="v_model"
                                   name={vehicleDetails.name.v_model}
                                   error={vehicleDetails.valid.v_model}
                                   onBlur={(e) => {
                                       const label = e.target.name;
                                       const val = e.target.value;
                                       ValidateDriver(label, val);
 
                                   }}
                                   value={vehicleDetails.data.v_model}
                                   onChange={(e: SelectChangeEvent) => {
                                       const val = e.target.value;
                                       console.log(val)
                                       setVehicleDetails(prevState => {
                                           return {
                                               ...prevState, data: {
                                                   ...prevState.data,
                                                   v_model: val
                                               }
                                           }
                                       });
                                   }}
                                   label={vehicleDetails.label.v_model}
                               >
                               
                                   <MenuItem key="" value="">
                                       <em>None</em>
                                   </MenuItem>
                                   <MenuItem key="Xcent" value="Xcent">Xcent</MenuItem>
                                   <MenuItem key="i 10" value="i 10">i 10</MenuItem>                                                                         
                                   <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                                          
                               </Select>
                                    
                               <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
                           </FormControl>
                            
                       </Grid>:
                    
                       ( vehicleDetails.data.v_make == "Tata" ?
                       <Grid item xs={6}>
                     
                     <FormControl variant="outlined" style={{ width: "100%" }}>
                         <InputLabel id="v_model" >Vehicle Model</InputLabel>
                        
                         <Select
                             labelId="v_model"
                             id="v_model"
                             name={vehicleDetails.name.v_model}
                             error={vehicleDetails.valid.v_model}
                             onBlur={(e) => {
                                 const label = e.target.name;
                                 const val = e.target.value;
                                 ValidateDriver(label, val);

                             }}
                             value={vehicleDetails.data.v_model}
                             onChange={(e: SelectChangeEvent) => {
                                 const val = e.target.value;
                                 console.log(val)
                                 setVehicleDetails(prevState => {
                                     return {
                                         ...prevState, data: {
                                             ...prevState.data,
                                             v_model: val
                                         }
                                     }
                                 });
                             }}
                             label={vehicleDetails.label.v_model}
                         >
                         
                             <MenuItem key="" value="">
                                 <em>None</em>
                             </MenuItem>
                             <MenuItem key="Indica" value="Indica">Indica</MenuItem>
                             <MenuItem key="Zest" value="Indica">Zest</MenuItem>
                             <MenuItem key="Bolt" value="Bolt">Bolt</MenuItem>                                                                                                   
                             <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                                    
                         </Select>
                              
                         <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
                     </FormControl>
                      
                 </Grid>:
                 ( vehicleDetails.data.v_make == "Datsun" ?
                 <Grid item xs={6}>
               
               <FormControl variant="outlined" style={{ width: "100%" }}>
                   <InputLabel id="v_model" >Vehicle Model</InputLabel>
                  
                   <Select
                       labelId="v_model"
                       id="v_model"
                       name={vehicleDetails.name.v_model}
                       error={vehicleDetails.valid.v_model}
                       onBlur={(e) => {
                           const label = e.target.name;
                           const val = e.target.value;
                           ValidateDriver(label, val);

                       }}
                       value={vehicleDetails.data.v_model}
                       onChange={(e: SelectChangeEvent) => {
                           const val = e.target.value;
                           console.log(val)
                           setVehicleDetails(prevState => {
                               return {
                                   ...prevState, data: {
                                       ...prevState.data,
                                       v_model: val
                                   }
                               }
                           });
                       }}
                       label={vehicleDetails.label.v_model}
                   >
                   
                       <MenuItem key="" value="">
                           <em>None</em>
                       </MenuItem>
                       <MenuItem key="GO" value="GO">GO</MenuItem>
                       <MenuItem key="GO+" value="GO+">GO+</MenuItem>                                                                                                  
                       <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                              
                   </Select>
                        
                   <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
               </FormControl>
                
           </Grid>:
           ( vehicleDetails.data.v_make == "Nissan" ?
           <Grid item xs={6}>
         
         <FormControl variant="outlined" style={{ width: "100%" }}>
             <InputLabel id="v_model" >Vehicle Model</InputLabel>
            
             <Select
                 labelId="v_model"
                 id="v_model"
                 name={vehicleDetails.name.v_model}
                 error={vehicleDetails.valid.v_model}
                 onBlur={(e) => {
                     const label = e.target.name;
                     const val = e.target.value;
                     ValidateDriver(label, val);

                 }}
                 value={vehicleDetails.data.v_model}
                 onChange={(e: SelectChangeEvent) => {
                     const val = e.target.value;
                     console.log(val)
                     setVehicleDetails(prevState => {
                         return {
                             ...prevState, data: {
                                 ...prevState.data,
                                 v_model: val
                             }
                         }
                     });
                 }}
                 label={vehicleDetails.label.v_model}
             >
             
                 <MenuItem key="" value="">
                     <em>None</em>
                 </MenuItem>
                 <MenuItem key="Micra" value="Micra">Micra</MenuItem>
                 <MenuItem key="Sunny" value="Sunny">Sunny</MenuItem>                                                                                                  
                 <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                        
             </Select>
                  
             <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
         </FormControl>
                    
               </Grid>:
               ( vehicleDetails.data.v_make == "Chevrolet" ?
               <Grid item xs={6}>
             
             <FormControl variant="outlined" style={{ width: "100%" }}>
                 <InputLabel id="v_model" >Vehicle Model</InputLabel>
                
                 <Select
                     labelId="v_model"
                     id="v_model"
                     name={vehicleDetails.name.v_model}
                     error={vehicleDetails.valid.v_model}
                     onBlur={(e) => {
                         const label = e.target.name;
                         const val = e.target.value;
                         ValidateDriver(label, val);
          
                     }}
                     value={vehicleDetails.data.v_model}
                     onChange={(e: SelectChangeEvent) => {
                         const val = e.target.value;
                         console.log(val)
                         setVehicleDetails(prevState => {
                             return {
                                 ...prevState, data: {
                                     ...prevState.data,
                                     v_model: val
                                 }
                             }
                         });
                     }}
                     label={vehicleDetails.label.v_model}
                 >
                 
                     <MenuItem key="" value="">
                         <em>None</em>
                     </MenuItem>
                     <MenuItem key="Micra" value="Micra">Enjoy</MenuItem>                                                                                                                       
                     <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                            
                 </Select>
                      
                 <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
             </FormControl>
              
             </Grid>:
                  ( vehicleDetails.data.v_make == "Ford" ?
                   <Grid item xs={6}>
                 
                 <FormControl variant="outlined" style={{ width: "100%" }}>
                     <InputLabel id="v_model" >Vehicle Model</InputLabel>
                    
                     <Select
                         labelId="v_model"
                         id="v_model"
                         name={vehicleDetails.name.v_model}
                         error={vehicleDetails.valid.v_model}
                         onBlur={(e) => {
                             const label = e.target.name;
                             const val = e.target.value;
                             ValidateDriver(label, val);
              
                         }}
                         value={vehicleDetails.data.v_model}
                         onChange={(e: SelectChangeEvent) => {
                             const val = e.target.value;
                             console.log(val)
                             setVehicleDetails(prevState => {
                                 return {
                                     ...prevState, data: {
                                         ...prevState.data,
                                         v_model: val
                                     }
                                 }
                             });
                         }}
                         label={vehicleDetails.label.v_model}
                     >
                     
                         <MenuItem key="" value="">
                             <em>None</em>
                         </MenuItem>
                         <MenuItem key="Figo" value="Figo">Figo</MenuItem>
                         <MenuItem key="Aspire" value="Aspire">Aspire</MenuItem>                                                                                                                       
                         <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                                
                     </Select>
                          
                     <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
                 </FormControl>
                  
                 </Grid>:
                           ( vehicleDetails.data.v_make == "Renault" ?
                           <Grid item xs={6}>
                         
                         <FormControl variant="outlined" style={{ width: "100%" }}>
                             <InputLabel id="v_model" >Vehicle Model</InputLabel>
                            
                             <Select
                                 labelId="v_model"
                                 id="v_model"
                                 name={vehicleDetails.name.v_model}
                                 error={vehicleDetails.valid.v_model}
                                 onBlur={(e) => {
                                     const label = e.target.name;
                                     const val = e.target.value;
                                     ValidateDriver(label, val);
                      
                                 }}
                                 value={vehicleDetails.data.v_model}
                                 onChange={(e: SelectChangeEvent) => {
                                     const val = e.target.value;
                                     console.log(val)
                                     setVehicleDetails(prevState => {
                                         return {
                                             ...prevState, data: {
                                                 ...prevState.data,
                                                 v_model: val
                                             }
                                         }
                                     });
                                 }}
                                 label={vehicleDetails.label.v_model}
                             >
                             
                                 <MenuItem key="" value="">
                                     <em>None</em>
                                 </MenuItem>
                                 <MenuItem key="Lodgy" value="Lodgy">Lodgy</MenuItem>
                                 <MenuItem key="Kwid" value="Kwid">Kwid</MenuItem>                                                                                                                       
                                 <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                                        
                             </Select>
                                  
                             <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
                         </FormControl>
                          
                         </Grid>:
                               ( vehicleDetails.data.v_make == "Others" ?
                               <Grid item xs={6}>
                                <TextField variant="outlined" label={vehicleDetails.label.v_model} name={vehicleDetails.name.v_model} value={vehicleDetails.data.v_model} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_model: val,
                                            }
                                        }
                                    });

                                }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_model}
                                    helperText={vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}
                                />
                            </Grid>:
                                (vehicleDetails.data.v_make == null ?
                                    <Grid item xs={6}>
                                <TextField variant="outlined" label={vehicleDetails.label.v_model} name={vehicleDetails.name.v_model} value={vehicleDetails.data.v_model} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_model: val,
                                            }
                                        }
                                    });

                                }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_model}
                                    helperText={vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}
                                />
                            </Grid>:
                             <Grid item xs={6}>
                            <TextField variant="outlined" label={vehicleDetails.label.v_model} name={vehicleDetails.name.v_model} value={vehicleDetails.data.v_model} style={{ width: "100%" }} onChange={(e: any) => {
                                const val = e.target.value;
                                setVehicleDetails(prevState => {
                                    return {
                                        ...prevState, data: {
                                            ...prevState.data,
                                            v_model: val,
                                        }
                                    }
                                });

                            }}
                                onBlur={(e) => {
                                    const label = e.target.name;
                                    const val = e.target.value;
                                    validateVehicle(label, val);
                                }}
                                error={vehicleDetails.valid.v_model}
                                helperText={vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}
                            />
                        </Grid>      
                                                                                                            
                                           
                           )))))))))))}             
                                                                                         
                                              
                                         
                            <Grid item xs={6}>
                                <TextField variant="outlined" label={vehicleDetails.label.v_engine_no} name={vehicleDetails.name.v_engine_no} value={vehicleDetails.data.v_engine_no} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_engine_no: val
                                            }
                                        }
                                    });

                                }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_engine_no}
                                    helperText={vehicleDetails.valid.v_engine_no ? vehicleDetails.error.v_engine_no : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField variant="outlined" label={vehicleDetails.label.v_chassis_no} name={vehicleDetails.name.v_chassis_no} value={vehicleDetails.data.v_chassis_no} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_chassis_no: val
                                            }
                                        }
                                    });

                                }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_chassis_no}
                                    helperText={vehicleDetails.valid.v_chassis_no ? vehicleDetails.error.v_chassis_no : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="month" variant="outlined" label={vehicleDetails.label.v_manufacture} name={vehicleDetails.name.v_manufacture} value={vehicleDetails.data.v_manufacture} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_manufacture: val
                                            }
                                        }
                                    });

                                }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_manufacture}
                                    helperText={vehicleDetails.valid.v_manufacture ? vehicleDetails.error.v_manufacture : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="date" variant="outlined" label={vehicleDetails.label.v_roadtax_expiry} name={vehicleDetails.name.v_roadtax_expiry} value={vehicleDetails.data.v_roadtax_expiry} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_roadtax_expiry: val
                                            }
                                        }
                                    });

                                }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_roadtax_expiry}
                                    helperText={vehicleDetails.valid.v_roadtax_expiry ? vehicleDetails.error.v_roadtax_expiry : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="date" variant="outlined" label={vehicleDetails.label.v_insurance_expiry} name={vehicleDetails.name.v_insurance_expiry} value={vehicleDetails.data.v_insurance_expiry} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_insurance_expiry: val
                                            }
                                        }
                                    });

                                }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_insurance_expiry}
                                    helperText={vehicleDetails.valid.v_insurance_expiry ? vehicleDetails.error.v_insurance_expiry : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="date" variant="outlined" label={vehicleDetails.label.v_permit_expiry} name={vehicleDetails.name.v_permit_expiry} value={vehicleDetails.data.v_permit_expiry} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_permit_expiry: val
                                            }
                                        }
                                    });

                                }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_permit_expiry}
                                    helperText={vehicleDetails.valid.v_permit_expiry ? vehicleDetails.error.v_permit_expiry : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="date" variant="outlined" label={vehicleDetails.label.v_fc_expiry} name={vehicleDetails.name.v_fc_expiry} value={vehicleDetails.data.v_fc_expiry} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_fc_expiry: val
                                            }
                                        }
                                    });
                                }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_fc_expiry}
                                    helperText={vehicleDetails.valid.v_fc_expiry ? vehicleDetails.error.v_fc_expiry : ""}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">
                            <Button variant="contained" color="secondary" style={{ marginRight: "15px" }} onClick={() => {
                                setAddVehicle(true)
                                setEditVehicle(false)
                            }}>Close</Button>
                            <Button variant="contained" color="primary" onClick={() => { addVehiclez(viewId) }}>Add</Button>
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>
            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={addVehicle}

                aria-labelledby="create-vehicle-title"
                aria-describedby="create-vehicle-description"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="Add Vehicle" style={{ display: "flex", borderBottom: "1px solid #f2f2f2", position: "fixed", zIndex: 3, backgroundColor: "white", justifyContent: "space-between", width: "40%" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setAddVehicle(false)
                            
                        }}>Close</Button>
                    } />
                   <CardContent style={{marginTop: 70}}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                    <InputLabel id="vtype">Vehicle Type</InputLabel>
                                    <Select
                                        labelId="vtype"
                                        id="vtypeselect"
                                        name={vehicleDetails.name.v_type}
                                        value={vehicleDetails.data.v_type}
                                        onChange={vehicleSelect}  


                                        label={vehicleDetails.label.v_type}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Car">Car</MenuItem>
                                        <MenuItem value="Bike">Bike</MenuItem>
                                        <MenuItem value="Auto">Auto</MenuItem>
                                        <MenuItem value="Ambulance">Ambulance</MenuItem>
                                    </Select>
                                    <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_type ? vehicleDetails.error.v_type : ""}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField variant="outlined" label={vehicleDetails.label.v_reg_no} name={vehicleDetails.name.v_reg_no} value={vehicleDetails.data.v_reg_no} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_reg_no: val,
                                            }
                                        }
                                    });

                                }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_reg_no}
                                    helperText={vehicleDetails.valid.v_reg_no ? vehicleDetails.error.v_reg_no : ""}
                                />
                            </Grid>
                             
                            {
                               vehicleDetails.data.v_type == "Car" ?
                            <Grid item xs={6}>
                                
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="v_make" >Vehicle Make</InputLabel>
                                       
                                        <Select
                                            labelId="v_make"
                                            id="v_make select"
                                            name={vehicleDetails.name.v_make}
                                            error={vehicleDetails.valid.v_make}
                                            onBlur={(e) => {
                                                const label = e.target.name;
                                                const val = e.target.value;
                                                ValidateDriver(label, val);

                                            }}
                                            value={vehicleDetails.data.v_make}
                                            onChange={(e: SelectChangeEvent) => {
                                                const val = e.target.value;
                                                console.log(val)
                                                setVehicleDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            v_make: val
                                                        }
                                                    }
                                                });
                                            }}
                                            label={vehicleDetails.label.v_make}
                                        >
                                        
                                            <MenuItem key="" value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem key="Chevrolet" value="Chevrolet">Chevrolet</MenuItem>
                                            <MenuItem key="Datsun" value="Datsun">Datsun</MenuItem>
                                            <MenuItem key="Ford" value="Ford">Ford</MenuItem>
                                            <MenuItem key="Hyndai" value="Hyndai">Hyndai</MenuItem>
                                            <MenuItem key="Mahindra" value="Mahindra">Mahindra</MenuItem>
                                            <MenuItem key="Nissan" value="Nissan">Nissan</MenuItem>
                                            <MenuItem key="Renault" value="Renault">Renault</MenuItem>
                                            <MenuItem key="Tata" value="Tata">Tata</MenuItem>
                                            <MenuItem key="Toyota" value="Toyota">Toyota</MenuItem>
                                            <MenuItem key="Others" value="Others">Others</MenuItem>                                          
                                            </Select>                                                                                    
                                                                                                                               
                                                 
                                       <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_make ? vehicleDetails.error.v_make : ""}</FormHelperText>
                                    </FormControl>
                                     
                                </Grid>
                                :
                                  <Grid item xs={6}>
                                      <TextField variant="outlined" label={vehicleDetails.label.v_make} name={vehicleDetails.name.v_make} value={vehicleDetails.data.v_make} style={{ width: "100%" }} onChange={(e: any) => {
                                          const val = e.target.value;
                                          setVehicleDetails(prevState => {
                                              return {
                                                  ...prevState, data: {
                                                      ...prevState.data,
                                                      v_make: val
                                                  }
                                              }
                                          });
      
                                      }}
                                          onBlur={(e) => {
                                              const label = e.target.name;
                                              const val = e.target.value;
                                              validateVehicle(label, val);
                                          }}
                                          error={vehicleDetails.valid.v_make}
                                          helperText={vehicleDetails.valid.v_make ? vehicleDetails.error.v_make : ""}
                                      />
                                  </Grid>
                                 }
                               {
                               vehicleDetails.data.v_make == "Maruti Suzuki" ?
                                  <Grid item xs={6}>
                                
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                    <InputLabel id="v_model" >Vehicle Model</InputLabel>
                                   
                                    <Select
                                        labelId="v_model"
                                        id="v_model"
                                        name={vehicleDetails.name.v_model}
                                        error={vehicleDetails.valid.v_model}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateDriver(label, val);

                                        }}
                                        value={vehicleDetails.data.v_model}
                                        onChange={(e: SelectChangeEvent) => {
                                            const val = e.target.value;
                                            console.log(val)
                                            setVehicleDetails(prevState => {
                                                return {
                                                    ...prevState, data: {
                                                        ...prevState.data,
                                                        v_model: val
                                                    }
                                                }
                                            });
                                        }}
                                        label={vehicleDetails.label.v_model}
                                    >
                                    
                                        <MenuItem key="" value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem key="Swift Dzire" value="Swift Dzire">Swift Dzire</MenuItem>
                                        <MenuItem key="Ertiga" value="Ertiga">Ertiga</MenuItem>
                                        <MenuItem key="Ritz" value="Ritz">Ritz</MenuItem>                                       
                                        <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                                               
                                    </Select>
                                         
                                    <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
                                </FormControl>
                                 
                            </Grid>
                              
                            :
                            
                           ( vehicleDetails.data.v_make == "Mahindra" ?
                            <Grid item xs={6}>
                          
                          <FormControl variant="outlined" style={{ width: "100%" }}>
                              <InputLabel id="v_model" >Vehicle Model</InputLabel>
                             
                              <Select
                                  labelId="v_model"
                                  id="v_model"
                                  name={vehicleDetails.name.v_model}
                                  error={vehicleDetails.valid.v_model}
                                  onBlur={(e) => {
                                      const label = e.target.name;
                                      const val = e.target.value;
                                      ValidateDriver(label, val);

                                  }}
                                  value={vehicleDetails.data.v_model}
                                  onChange={(e: SelectChangeEvent) => {
                                      const val = e.target.value;
                                      console.log(val)
                                      setVehicleDetails(prevState => {
                                          return {
                                              ...prevState, data: {
                                                  ...prevState.data,
                                                  v_model: val
                                              }
                                          }
                                      });
                                  }}
                                  label={vehicleDetails.label.v_model}
                              >
                              
                                  <MenuItem key="" value="">
                                      <em>None</em>
                                  </MenuItem>
                                  <MenuItem key="Swift Dzire" value="Swift Dzire">XUV 100</MenuItem>
                                  <MenuItem key="Ertiga" value="Ertiga">Xylo</MenuItem>
                                  <MenuItem key="Ritz" value="Ritz">Ritz</MenuItem>
                                  <MenuItem key="Alto" value="Alto">Alto</MenuItem> 
                                  <MenuItem key="Celerio" value="Celerio">Celerio</MenuItem> 
                                  <MenuItem key="WagonR" value="WagonR">WagonR</MenuItem>                                        
                                  <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                                         
                              </Select>
                                   
                              <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
                          </FormControl>
                           
                      </Grid>: 
                    
                    ( vehicleDetails.data.v_make == "Toyota" ?
                            <Grid item xs={6}>
                          
                          <FormControl variant="outlined" style={{ width: "100%" }}>
                              <InputLabel id="v_model" >Vehicle Model</InputLabel>
                             
                              <Select
                                  labelId="v_model"
                                  id="v_model"
                                  name={vehicleDetails.name.v_model}
                                  error={vehicleDetails.valid.v_model}
                                  onBlur={(e) => {
                                      const label = e.target.name;
                                      const val = e.target.value;
                                      ValidateDriver(label, val);

                                  }}
                                  value={vehicleDetails.data.v_model}
                                  onChange={(e: SelectChangeEvent) => {
                                      const val = e.target.value;
                                      console.log(val)
                                      setVehicleDetails(prevState => {
                                          return {
                                              ...prevState, data: {
                                                  ...prevState.data,
                                                  v_model: val
                                              }
                                          }
                                      });
                                  }}
                                  label={vehicleDetails.label.v_model}
                              >
                              
                                  <MenuItem key="" value="">
                                      <em>None</em>
                                  </MenuItem>
                                  <MenuItem key="Innova" value="Innova">Innova</MenuItem>
                                  <MenuItem key="Etios" value="Ertiga">Etios</MenuItem>                                                                        
                                  <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                                         
                              </Select>
                                   
                              <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
                          </FormControl>
                           
                      </Grid>:
                             ( vehicleDetails.data.v_make == "Hyndai" ?
                             <Grid item xs={6}>
                           
                           <FormControl variant="outlined" style={{ width: "100%" }}>
                               <InputLabel id="v_model" >Vehicle Model</InputLabel>
                              
                               <Select
                                   labelId="v_model"
                                   id="v_model"
                                   name={vehicleDetails.name.v_model}
                                   error={vehicleDetails.valid.v_model}
                                   onBlur={(e) => {
                                       const label = e.target.name;
                                       const val = e.target.value;
                                       ValidateDriver(label, val);
 
                                   }}
                                   value={vehicleDetails.data.v_model}
                                   onChange={(e: SelectChangeEvent) => {
                                       const val = e.target.value;
                                       console.log(val)
                                       setVehicleDetails(prevState => {
                                           return {
                                               ...prevState, data: {
                                                   ...prevState.data,
                                                   v_model: val
                                               }
                                           }
                                       });
                                   }}
                                   label={vehicleDetails.label.v_model}
                               >
                               
                                   <MenuItem key="" value="">
                                       <em>None</em>
                                   </MenuItem>
                                   <MenuItem key="Xcent" value="Xcent">Xcent</MenuItem>
                                   <MenuItem key="i 10" value="i 10">i 10</MenuItem>                                                                         
                                   <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                                          
                               </Select>
                                    
                               <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
                           </FormControl>
                            
                       </Grid>:
                    
                       ( vehicleDetails.data.v_make == "Tata" ?
                       <Grid item xs={6}>
                     
                     <FormControl variant="outlined" style={{ width: "100%" }}>
                         <InputLabel id="v_model" >Vehicle Model</InputLabel>
                        
                         <Select
                             labelId="v_model"
                             id="v_model"
                             name={vehicleDetails.name.v_model}
                             error={vehicleDetails.valid.v_model}
                             onBlur={(e) => {
                                 const label = e.target.name;
                                 const val = e.target.value;
                                 ValidateDriver(label, val);

                             }}
                             value={vehicleDetails.data.v_model}
                             onChange={(e: SelectChangeEvent) => {
                                 const val = e.target.value;
                                 console.log(val)
                                 setVehicleDetails(prevState => {
                                     return {
                                         ...prevState, data: {
                                             ...prevState.data,
                                             v_model: val
                                         }
                                     }
                                 });
                             }}
                             label={vehicleDetails.label.v_model}
                         >
                         
                             <MenuItem key="" value="">
                                 <em>None</em>
                             </MenuItem>
                             <MenuItem key="Indica" value="Indica">Indica</MenuItem>
                             <MenuItem key="Zest" value="Indica">Zest</MenuItem>
                             <MenuItem key="Bolt" value="Bolt">Bolt</MenuItem>                                                                                                   
                             <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                                    
                         </Select>
                              
                         <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
                     </FormControl>
                      
                 </Grid>:
                 ( vehicleDetails.data.v_make == "Datsun" ?
                 <Grid item xs={6}>
               
               <FormControl variant="outlined" style={{ width: "100%" }}>
                   <InputLabel id="v_model" >Vehicle Model</InputLabel>
                  
                   <Select
                       labelId="v_model"
                       id="v_model"
                       name={vehicleDetails.name.v_model}
                       error={vehicleDetails.valid.v_model}
                       onBlur={(e) => {
                           const label = e.target.name;
                           const val = e.target.value;
                           ValidateDriver(label, val);

                       }}
                       value={vehicleDetails.data.v_model}
                       onChange={(e: SelectChangeEvent) => {
                           const val = e.target.value;
                           console.log(val)
                           setVehicleDetails(prevState => {
                               return {
                                   ...prevState, data: {
                                       ...prevState.data,
                                       v_model: val
                                   }
                               }
                           });
                       }}
                       label={vehicleDetails.label.v_model}
                   >
                   
                       <MenuItem key="" value="">
                           <em>None</em>
                       </MenuItem>
                       <MenuItem key="GO" value="GO">GO</MenuItem>
                       <MenuItem key="GO+" value="GO+">GO+</MenuItem>                                                                                                  
                       <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                              
                   </Select>
                        
                   <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
               </FormControl>
                
           </Grid>:
           ( vehicleDetails.data.v_make == "Nissan" ?
           <Grid item xs={6}>
         
         <FormControl variant="outlined" style={{ width: "100%" }}>
             <InputLabel id="v_model" >Vehicle Model</InputLabel>
            
             <Select
                 labelId="v_model"
                 id="v_model"
                 name={vehicleDetails.name.v_model}
                 error={vehicleDetails.valid.v_model}
                 onBlur={(e) => {
                     const label = e.target.name;
                     const val = e.target.value;
                     ValidateDriver(label, val);

                 }}
                 value={vehicleDetails.data.v_model}
                 onChange={(e: SelectChangeEvent) => {
                     const val = e.target.value;
                     console.log(val)
                     setVehicleDetails(prevState => {
                         return {
                             ...prevState, data: {
                                 ...prevState.data,
                                 v_model: val
                             }
                         }
                     });
                 }}
                 label={vehicleDetails.label.v_model}
             >
             
                 <MenuItem key="" value="">
                     <em>None</em>
                 </MenuItem>
                 <MenuItem key="Micra" value="Micra">Micra</MenuItem>
                 <MenuItem key="Sunny" value="Sunny">Sunny</MenuItem>                                                                                                  
                 <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                        
             </Select>
                  
             <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
         </FormControl>
                    
               </Grid>:
               ( vehicleDetails.data.v_make == "Chevrolet" ?
               <Grid item xs={6}>
             
             <FormControl variant="outlined" style={{ width: "100%" }}>
                 <InputLabel id="v_model" >Vehicle Model</InputLabel>
                
                 <Select
                     labelId="v_model"
                     id="v_model"
                     name={vehicleDetails.name.v_model}
                     error={vehicleDetails.valid.v_model}
                     onBlur={(e) => {
                         const label = e.target.name;
                         const val = e.target.value;
                         ValidateDriver(label, val);
          
                     }}
                     value={vehicleDetails.data.v_model}
                     onChange={(e: SelectChangeEvent) => {
                         const val = e.target.value;
                         console.log(val)
                         setVehicleDetails(prevState => {
                             return {
                                 ...prevState, data: {
                                     ...prevState.data,
                                     v_model: val
                                 }
                             }
                         });
                     }}
                     label={vehicleDetails.label.v_model}
                 >
                 
                     <MenuItem key="" value="">
                         <em>None</em>
                     </MenuItem>
                     <MenuItem key="Micra" value="Micra">Enjoy</MenuItem>                                                                                                                       
                     <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                            
                 </Select>
                      
                 <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
             </FormControl>
              
             </Grid>:
                  ( vehicleDetails.data.v_make == "Ford" ?
                   <Grid item xs={6}>
                 
                 <FormControl variant="outlined" style={{ width: "100%" }}>
                     <InputLabel id="v_model" >Vehicle Model</InputLabel>
                    
                     <Select
                         labelId="v_model"
                         id="v_model"
                         name={vehicleDetails.name.v_model}
                         error={vehicleDetails.valid.v_model}
                         onBlur={(e) => {
                             const label = e.target.name;
                             const val = e.target.value;
                             ValidateDriver(label, val);
              
                         }}
                         value={vehicleDetails.data.v_model}
                         onChange={(e: SelectChangeEvent) => {
                             const val = e.target.value;
                             console.log(val)
                             setVehicleDetails(prevState => {
                                 return {
                                     ...prevState, data: {
                                         ...prevState.data,
                                         v_model: val
                                     }
                                 }
                             });
                         }}
                         label={vehicleDetails.label.v_model}
                     >
                     
                         <MenuItem key="" value="">
                             <em>None</em>
                         </MenuItem>
                         <MenuItem key="Figo" value="Figo">Figo</MenuItem>
                         <MenuItem key="Aspire" value="Aspire">Aspire</MenuItem>                                                                                                                       
                         <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                                
                     </Select>
                          
                     <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
                 </FormControl>
                  
                 </Grid>:
                           ( vehicleDetails.data.v_make == "Renault" ?
                           <Grid item xs={6}>
                         
                         <FormControl variant="outlined" style={{ width: "100%" }}>
                             <InputLabel id="v_model" >Vehicle Model</InputLabel>
                            
                             <Select
                                 labelId="v_model"
                                 id="v_model"
                                 name={vehicleDetails.name.v_model}
                                 error={vehicleDetails.valid.v_model}
                                 onBlur={(e) => {
                                     const label = e.target.name;
                                     const val = e.target.value;
                                     ValidateDriver(label, val);
                      
                                 }}
                                 value={vehicleDetails.data.v_model}
                                 onChange={(e: SelectChangeEvent) => {
                                     const val = e.target.value;
                                     console.log(val)
                                     setVehicleDetails(prevState => {
                                         return {
                                             ...prevState, data: {
                                                 ...prevState.data,
                                                 v_model: val
                                             }
                                         }
                                     });
                                 }}
                                 label={vehicleDetails.label.v_model}
                             >
                             
                                 <MenuItem key="" value="">
                                     <em>None</em>
                                 </MenuItem>
                                 <MenuItem key="Lodgy" value="Lodgy">Lodgy</MenuItem>
                                 <MenuItem key="Kwid" value="Kwid">Kwid</MenuItem>                                                                                                                       
                                 <MenuItem key="Others" value="Others">Others</MenuItem>                                         
                                        
                             </Select>
                                  
                             <FormHelperText style={{ color: "#d32f2f" }}>{vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}</FormHelperText>
                         </FormControl>
                          
                         </Grid>:
                               ( vehicleDetails.data.v_make == "Others" ?
                               <Grid item xs={6}>
                                <TextField variant="outlined" label={vehicleDetails.label.v_model} name={vehicleDetails.name.v_model} value={vehicleDetails.data.v_model} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_model: val,
                                            }
                                        }
                                    });

                                }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_model}
                                    helperText={vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}
                                />
                            </Grid>:
                                (vehicleDetails.data.v_make == null ?
                                    <Grid item xs={6}>
                                <TextField variant="outlined" label={vehicleDetails.label.v_model} name={vehicleDetails.name.v_model} value={vehicleDetails.data.v_model} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_model: val,
                                            }
                                        }
                                    });

                                }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_model}
                                    helperText={vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}
                                />
                            </Grid>:
                             <Grid item xs={6}>
                            <TextField variant="outlined" label={vehicleDetails.label.v_model} name={vehicleDetails.name.v_model} value={vehicleDetails.data.v_model} style={{ width: "100%" }} onChange={(e: any) => {
                                const val = e.target.value;
                                setVehicleDetails(prevState => {
                                    return {
                                        ...prevState, data: {
                                            ...prevState.data,
                                            v_model: val,
                                        }
                                    }
                                });

                            }}
                                onBlur={(e) => {
                                    const label = e.target.name;
                                    const val = e.target.value;
                                    validateVehicle(label, val);
                                }}
                                error={vehicleDetails.valid.v_model}
                                helperText={vehicleDetails.valid.v_model ? vehicleDetails.error.v_model : ""}
                            />
                        </Grid>      
                                                                                                            
                                           
                           )))))))))))}             
                                                                                         
                                              
                                         
                            <Grid item xs={6}>
                                <TextField variant="outlined" label={vehicleDetails.label.v_engine_no} name={vehicleDetails.name.v_engine_no} value={vehicleDetails.data.v_engine_no} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_engine_no: val
                                            }
                                        }
                                    });

                                }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_engine_no}
                                    helperText={vehicleDetails.valid.v_engine_no ? vehicleDetails.error.v_engine_no : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField variant="outlined" label={vehicleDetails.label.v_chassis_no} name={vehicleDetails.name.v_chassis_no} value={vehicleDetails.data.v_chassis_no} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_chassis_no: val
                                            }
                                        }
                                    });

                                }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_chassis_no}
                                    helperText={vehicleDetails.valid.v_chassis_no ? vehicleDetails.error.v_chassis_no : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="month" variant="outlined" label={vehicleDetails.label.v_manufacture} name={vehicleDetails.name.v_manufacture} value={vehicleDetails.data.v_manufacture} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_manufacture: val
                                            }
                                        }
                                    });

                                }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_manufacture}
                                    helperText={vehicleDetails.valid.v_manufacture ? vehicleDetails.error.v_manufacture : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="date" variant="outlined" label={vehicleDetails.label.v_roadtax_expiry} name={vehicleDetails.name.v_roadtax_expiry} value={vehicleDetails.data.v_roadtax_expiry} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_roadtax_expiry: val
                                            }
                                        }
                                    });

                                }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_roadtax_expiry}
                                    helperText={vehicleDetails.valid.v_roadtax_expiry ? vehicleDetails.error.v_roadtax_expiry : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="date" variant="outlined" label={vehicleDetails.label.v_insurance_expiry} name={vehicleDetails.name.v_insurance_expiry} value={vehicleDetails.data.v_insurance_expiry} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_insurance_expiry: val
                                            }
                                        }
                                    });

                                }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_insurance_expiry}
                                    helperText={vehicleDetails.valid.v_insurance_expiry ? vehicleDetails.error.v_insurance_expiry : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="date" variant="outlined" label={vehicleDetails.label.v_permit_expiry} name={vehicleDetails.name.v_permit_expiry} value={vehicleDetails.data.v_permit_expiry} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_permit_expiry: val
                                            }
                                        }
                                    });

                                }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_permit_expiry}
                                    helperText={vehicleDetails.valid.v_permit_expiry ? vehicleDetails.error.v_permit_expiry : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="date" variant="outlined" label={vehicleDetails.label.v_fc_expiry} name={vehicleDetails.name.v_fc_expiry} value={vehicleDetails.data.v_fc_expiry} style={{ width: "100%" }} onChange={(e: any) => {
                                    const val = e.target.value;
                                    setVehicleDetails(prevState => {
                                        return {
                                            ...prevState, data: {
                                                ...prevState.data,
                                                v_fc_expiry: val
                                            }
                                        }
                                    });
                                }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        validateVehicle(label, val);
                                    }}
                                    error={vehicleDetails.valid.v_fc_expiry}
                                    helperText={vehicleDetails.valid.v_fc_expiry ? vehicleDetails.error.v_fc_expiry : ""}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">
                            <Button variant="contained" color="secondary" style={{ marginRight: "15px" }} onClick={() => {
                                setAddVehicle(false)
                            }}>Close</Button>
                            <Button variant="contained" color="primary" onClick={() => { addVehiclez(viewId) }}>Add</Button>
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>
            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={profilePhoto}
                data-backdrop="static"
                
                aria-labelledby="Profile photo"
                aria-describedby="Profile photo"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="Profile photo" style={{ borderBottom: "1px solid #f2f2f2" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setProfilePhoto(false)
                    
                        
                           
                        }}>Close</Button>
                    } />
                    <CardContent>
                        <Grid container spacing={3} style={{ display: "flex",justifyContent: "center",paddingTop: 30 }}>

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${viewId}/${downloadDetails.data.profile_photo}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                            <Button variant="contained" color="primary" onClick={() =>{
                                
                                let profile_photo_approve = {
                                      "profile_photo_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, profile_photo_approve).then(res=> setProfilePhoto(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let profile_photo_reject = {
                                    "profile_photo_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, profile_photo_reject).then(res=> setProfilePhoto(false))                   
                            
                            }}>Reject</Button>
                            
                            
                            
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>
            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={aadharCard}
                data-backdrop="static"
                
                aria-labelledby="Aadhar Card"
                aria-describedby="Aadhar Card"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="Aadhar Card" style={{ borderBottom: "1px solid #f2f2f2" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setAadharCard(false)
                    
                        
                           
                        }}>Close</Button>
                    } />
                    <CardContent>
                        <Grid container spacing={3} style={{ display: "flex",justifyContent: "center",paddingTop: 30 }}>

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${viewId}/${downloadDetails.data.aadhar_card}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let aadhar_card_approve = {
                                      "aadhar_card_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, aadhar_card_approve).then(res=> setAadharCard(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let aadhar_card_reject = {
                                    "aadhar_card_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, aadhar_card_reject).then(res=> setAadharCard(false))                   
                            
                            }}>Reject</Button>
                            
                            
                            
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>
            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={panCard}
                data-backdrop="static"
                
                aria-labelledby="Pan Card"
                aria-describedby="Pan Card"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="Pan Card" style={{ borderBottom: "1px solid #f2f2f2" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setPanCard(false)
                    
                        
                           
                        }}>Close</Button>
                    } />
                    <CardContent>
                        <Grid container spacing={3} style={{ display: "flex",justifyContent: "center",paddingTop: 30 }}>

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${viewId}/${downloadDetails.data.pan_card}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let pan_card_approve = {
                                      "pan_card_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, pan_card_approve).then(res=> setPanCard(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let pan_card_reject = {
                                    "pan_card_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, pan_card_reject).then(res=> setPanCard(false))                   
                            
                            }}>Reject</Button>
                            
                            
                            
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>
            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={license}
                data-backdrop="static"
                
                aria-labelledby="License"
                aria-describedby="License"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="License" style={{ borderBottom: "1px solid #f2f2f2" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setLicense(false)
                    
                        
                           
                        }}>Close</Button>
                    } />
                    <CardContent>
                        <Grid container spacing={3} style={{ display: "flex",justifyContent: "center",paddingTop: 30 }}>

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${viewId}/${downloadDetails.data.license}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let license_approve = {
                                      "license_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, license_approve).then(res=> setLicense(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let license_reject = {
                                    "license_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, license_reject).then(res=> setLicense(false))                   
                            
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

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${viewId}/${downloadDetails.data.road_tax}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let road_tax_approve = {
                                      "road_tax_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, road_tax_approve).then(res=> setRoadTax(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let road_tax_reject = {
                                    "road_tax_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, road_tax_reject).then(res=> setRoadTax(false))                   
                            
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

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${viewId}/${downloadDetails.data.permit}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let permit_approve = {
                                      "permit_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, permit_approve).then(res=> setPermit(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let permit_reject = {
                                    "permit_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, permit_reject).then(res=> setPermit(false))                   
                            
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

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${viewId}/${downloadDetails.data.fc_certificate}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let fc_certificate_approve = {
                                      "fc_certificate_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, fc_certificate_approve).then(res=> setFcCertificate(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let fc_certificate_reject = {
                                    "fc_certificate_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, fc_certificate_reject).then(res=> setFcCertificate(false))                   
                            
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

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${viewId}/${downloadDetails.data.insurance}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let insurance_approve = {
                                      "insurance_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, insurance_approve).then(res=> setInsurance(false))
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
                open={noc}
                data-backdrop="static"
                
                aria-labelledby="Noc"
                aria-describedby="Noc"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="Noc" style={{ borderBottom: "1px solid #f2f2f2" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setNoc(false)
                    
                        
                           
                        }}>Close</Button>
                    } />
                    <CardContent>
                        <Grid container spacing={3} style={{ display: "flex",justifyContent: "center",paddingTop: 30 }}>

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${viewId}/${downloadDetails.data.noc}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let noc_approve = {
                                      "noc_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, noc_approve).then(res=> setNoc(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let noc_reject = {
                                    "noc_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, noc_reject).then(res=> setNoc(false))                   
                            
                            }}>Reject</Button>
                            
                            
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>
            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={leaseCopy}
                data-backdrop="static"
                
                aria-labelledby="Lease Copy"
                aria-describedby="Lease Copy"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="Lease Copy" style={{ borderBottom: "1px solid #f2f2f2" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setLeaseCopy(false)
                    
                        
                           
                        }}>Close</Button>
                    } />
                    <CardContent>
                        <Grid container spacing={3} style={{ display: "flex",justifyContent: "center",paddingTop: 30 }}>

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${viewId}/${downloadDetails.data.lease_copy}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let lease_copy_approve = {
                                      "lease_copy_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, lease_copy_approve).then(res=> setLeaseCopy(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let lease_copy_reject = {
                                    "lease_copy_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, lease_copy_reject).then(res=> setLeaseCopy(false))                   
                            
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

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${viewId}/${downloadDetails.data.rc_book}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let rc_book_approve = {
                                      "rc_book_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, rc_book_approve).then(res=> setRcBook(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let rc_book_reject = {
                                    "rc_book_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, rc_book_reject).then(res=> setRcBook(false))                   
                            
                            }}>Reject</Button>
                            
                            
                            
                        </Grid>
                    </CardActions>
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

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${viewId}/${downloadDetails.data.vehicle_photo}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let vehicle_photo_approve = {
                                      "vehicle_photo_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, vehicle_photo_approve).then(res=> setVehiclePhoto(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let vehicle_photo_reject = {
                                    "vehicle_photo_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, vehicle_photo_reject).then(res=> setVehiclePhoto(false))                   
                            
                            }}>Reject</Button>
                            
                            
                            
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>
            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={licenseSuspend}
                data-backdrop="static"
                
                aria-labelledby="License Suspended Document"
                aria-describedby="License Suspended Document"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="License Suspended Document" style={{ borderBottom: "1px solid #f2f2f2" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setLicenseSuspend(false)
                    
                        
                           
                        }}>Close</Button>
                    } />
                    <CardContent>
                        <Grid container spacing={3} style={{ display: "flex",justifyContent: "center",paddingTop: 30 }}>

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${viewId}/${downloadDetails.data.license_suspend}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let license_suspend_approve = {
                                      "license_suspend_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, license_suspend_approve).then(res=> setLicenseSuspend(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let license_suspend_reject = {
                                    "license_suspend_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, license_suspend_reject).then(res=> setLicenseSuspend(false))                   
                            
                            }}>Reject</Button>
                            
                            
                            
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>
            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={licensePenalty}
                data-backdrop="static"
                
                aria-labelledby="License Penalty Document"
                aria-describedby="License Penalty Document"
            >
                <Card style={{ width: "40%", overflow: "auto" }} >
                    <CardHeader title="License Penalty Document" style={{ borderBottom: "1px solid #f2f2f2" }} action={
                        <Button variant="contained" color="secondary" onClick={() => {
                            setLicensePenalty(false)
                    
                        
                           
                        }}>Close</Button>
                    } />
                    <CardContent>
                        <Grid container spacing={3} style={{ display: "flex",justifyContent: "center",paddingTop: 30 }}>

                            
                            <img src={`https://storage.googleapis.com/goaira-driver/${viewId}/${downloadDetails.data.license_penalty}`} alt="Profile pic" width={300}  />
                            
                            
                        </Grid>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">

                        <Button variant="contained" color="primary" onClick={() =>{
                                
                                let license_penalty_approve = {
                                      "license_penalty_approved": "Approved"
                                }
                                
                             axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, license_penalty_approve).then(res=> setLicensePenalty(false))
                            }}>Approve</Button>
                            <Button variant="contained" color="primary" onClick={() =>{
                                let license_penalty_reject = {
                                    "license_penalty_approved": "Rejected"
                              }
                                 axios.put(`https://driver-upload-api-hldux24wua-el.a.run.app/${viewId}/`, license_penalty_reject).then(res=> setLicensePenalty(false))                   
                            
                            }}>Reject</Button>
                            
                            
                            
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>
        </Card>
    )

}

export default DriverPage;




