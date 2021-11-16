import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Button, Modal, TextField, Grid, CardActions } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { paymentData, paymentModel } from "../models/payment";
import axios from "axios";

const PaymentPage = () => {

    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [subDetails, setSubDetails] = useState(paymentData);
    
    useEffect(() => {
        if (!createModal && !editModal) {
            setSubDetails(paymentData)
        }
    }, [createModal, editModal])

    const AdminColumn: GridColDef[] = [
        { field: subDetails.name.driver_id, headerName: subDetails.label.driver_id, width: 250 },
        { field: subDetails.name.payment_id, headerName: subDetails.label.payment_id, width: 250 },
        { field: subDetails.name.payment_type, headerName: subDetails.label.payment_type, width: 250 },
        { field: subDetails.name.payment_amount, headerName: subDetails.label.payment_amount, width: 250 },
        { field: subDetails.name.payment_date, headerName: subDetails.label.payment_date, width: 250 },
        { field: subDetails.name.status, headerName: subDetails.label.status, width: 250 },
        {
            field: 'Actions', headerName: 'Actions', width: 300, sortable: false, renderCell: (params) => {
                return (
                    <>
                        <Button variant="contained" color="primary" style={{ marginRight: "8px" }} onClick={() => {
                            setEditModal(true)
                            setEditId(params.row.id);
                            setSubDetails(prevState => {
                                return {
                                    ...prevState,
                                    data: {
                                        ...prevState.data,
                                        name: params.row.name,
                                        username: params.row.username,
                                        password: params.row.password,
                                        status: params.row.status
                                    }
                                }
                            })
                        }}>Edit</Button>
                        <Button variant="contained" color="secondary" onClick={() => {
                            axios.delete(`http://35.239.96.145/${params.row.id}`);
                            setRefresh(!refresh);
                        }}>Delete</Button>
                    </>
                )
            }
        }
    ]

    const saveData = () => {
        axios.post('http://35.239.96.145/', subDetails.data);
        setCreateModal(false)
        setEditModal(false)
        setRefresh(true);
    }

    const updateData = () => {
        axios.put(`http://35.239.96.145/${editId}`, subDetails.data);
        setCreateModal(false)
        setEditModal(false)
        setRefresh(true);
    }


    const ValidateAdmin = (label: string, value: string) => {
        switch (label) {
            case 'name':
                if (value.length <= 0) {
                    return setSubDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, name: "Name Should not be null" },
                            valid: {
                                ...prevState.valid, name: true
                            },
                        }
                    })
                }
                return setSubDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, name: "" },
                        valid: {
                            ...prevState.valid, name: false
                        },
                    }
                });
            case 'username':
                if (value.length <= 0) {
                    return setSubDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, username: "Username Should not be null" },
                            valid: {
                                ...prevState.valid, username: true
                            },
                        }
                    })
                }
                return setSubDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, username: "" },
                        valid: {
                            ...prevState.valid, username: false
                        },
                    }
                });
            case 'password':
                if (value.length <= 0) {
                    return setSubDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, password: "Password Should not be null" },
                            valid: {
                                ...prevState.valid, password: true
                            },
                        }
                    })
                }
                if (value.length < 6) {
                    return setSubDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, password: "Password Should be more than 6 characters" },
                            valid: {
                                ...prevState.valid, password: true
                            },
                        }
                    })
                }
                return setSubDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, password: "" },
                        valid: {
                            ...prevState.valid, password: false
                        },
                    }
                })
        }
    }

    return (
        <Card>
            <CardHeader title="Payment Details"/>
            <CardContent style={{ height: "700px" }}>
                <DataGrid rows={paymentModel}
                    columns={AdminColumn}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick />
            </CardContent>
            <Modal
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                open={createModal || editModal}
                onClose={() => {
                    setCreateModal(false)
                    setEditModal(false)
                }}
                aria-labelledby="create-admin-title"
                aria-describedby="create-admin-description"
            >
                <Card style={{ width: "40%" }}>
                    <CardHeader title="Create Admin" style={{ borderBottom: "1px solid #f2f2f2" }} />
                    <CardContent>
                        <form noValidate autoComplete="off">
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" name={subDetails.name.driver_id} label={subDetails.label.driver_id} value={subDetails.data.driver_id} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setSubDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    driver_id: val
                                                }
                                            }
                                        });
                                    }} onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        ValidateAdmin(label, val);
                                    }}
                                        error={subDetails.valid.driver_id}
                                        helperText={subDetails.valid.driver_id ? subDetails.error.driver_id : ""} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={subDetails.label.payment_id} name={subDetails.name.payment_id} value={subDetails.data.payment_id} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setSubDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    payment_id: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={subDetails.valid.payment_id}
                                        helperText={subDetails.valid.payment_id ? subDetails.error.payment_id : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={subDetails.label.payment_type} name={subDetails.name.payment_type} value={subDetails.data.payment_type} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setSubDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    payment_type: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={subDetails.valid.payment_type}
                                        helperText={subDetails.valid.payment_type ? subDetails.error.payment_type : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={subDetails.label.payment_amount} name={subDetails.name.payment_amount} value={subDetails.data.payment_amount} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setSubDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    payment_amount: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={subDetails.valid.payment_amount}
                                        helperText={subDetails.valid.payment_amount ? subDetails.error.payment_amount : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={subDetails.label.payment_date} name={subDetails.name.payment_date} value={subDetails.data.payment_date} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setSubDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    payment_date: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={subDetails.valid.payment_date}
                                        helperText={subDetails.valid.payment_date ? subDetails.error.payment_date : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={subDetails.label.status} name={subDetails.name.status} value={subDetails.data.status} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setSubDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    status: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={subDetails.valid.status}
                                        helperText={subDetails.valid.status ? subDetails.error.status : ""}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                    <CardActions style={{ borderTop: "1px solid #f2f2f2", width: "100%" }}>
                        <Grid container justifyContent="flex-end">
                            <Button variant="contained" style={{ marginRight: "15px" }} onClick={() => {
                                setCreateModal(false)
                                setEditModal(false)
                            }}>Close</Button>
                            {editModal ?
                                <Button variant="contained" color="primary" onClick={updateData}>Update</Button>
                                :
                                <Button variant="contained" color="primary" onClick={saveData}>Create</Button>
                            }
                        </Grid>
                    </CardActions>
                </Card>
            </Modal>
        </Card>
    )
}

export default PaymentPage;