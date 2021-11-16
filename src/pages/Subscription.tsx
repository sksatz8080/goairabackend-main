import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Button, Modal, TextField, Grid, CardActions } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { subData, subModel } from "../models/subscription";
import axios from "axios";

const SubscriptionPage = () => {

    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [subDetails, setSubDetails] = useState(subData);
    
    useEffect(() => {
        if (!createModal && !editModal) {
            setSubDetails(subData)
        }
    }, [createModal, editModal])

    const AdminColumn: GridColDef[] = [
        { field: subDetails.name.sub_type, headerName: subDetails.label.sub_type, width: 250 },
        { field: subDetails.name.sub_amt, headerName: subDetails.label.sub_amt, width: 250 },
        { field: subDetails.name.commission, headerName: subDetails.label.commission, width: 250 },
        { field: subDetails.name.tax, headerName: subDetails.label.tax, width: 250 },
        { field: subDetails.name.discount, headerName: subDetails.label.discount, width: 250 },
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
            <CardHeader title="Subscription Details"/>
            <CardContent style={{ height: "700px" }}>
                <DataGrid rows={subModel}
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
                                    <TextField variant="outlined" name={subDetails.name.sub_type} label={subDetails.label.sub_type} value={subDetails.data.sub_type} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setSubDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    sub_type: val
                                                }
                                            }
                                        });
                                    }} onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        ValidateAdmin(label, val);
                                    }}
                                        error={subDetails.valid.sub_type}
                                        helperText={subDetails.valid.sub_type ? subDetails.error.sub_type : ""} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={subDetails.label.sub_amt} name={subDetails.name.sub_amt} value={subDetails.data.sub_amt} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setSubDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    sub_amt: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={subDetails.valid.sub_amt}
                                        helperText={subDetails.valid.sub_amt ? subDetails.error.sub_amt : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={subDetails.label.commission} name={subDetails.name.commission} value={subDetails.data.commission} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setSubDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    commission: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={subDetails.valid.commission}
                                        helperText={subDetails.valid.commission ? subDetails.error.commission : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={subDetails.label.tax} name={subDetails.name.tax} value={subDetails.data.tax} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setSubDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    tax: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={subDetails.valid.tax}
                                        helperText={subDetails.valid.tax ? subDetails.error.tax : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={subDetails.label.discount} name={subDetails.name.discount} value={subDetails.data.discount} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setSubDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    discount: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={subDetails.valid.discount}
                                        helperText={subDetails.valid.discount ? subDetails.error.discount : ""}
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

export default SubscriptionPage;