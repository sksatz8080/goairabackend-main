import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Button, Modal, TextField, Grid, CardActions } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { UserData } from "../models/user";
import axios from "axios";

const UserPage = () => {

    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [userDetails, setUserDetails] = useState(UserData);
    const [userModel, setUserModel] = useState();

    useEffect(() => {
        axios.get('http://localhost:7003/').then(res => {
            setUserModel(res.data);
        });
    }, [refresh])

    useEffect(() => {
        if (!createModal && !editModal) {
            setUserDetails(UserData)
        }
    }, [createModal, editModal])

    const AdminColumn: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'username', headerName: 'UserName', width: 200 },
        { field: 'password', headerName: 'Password', width: 200, sortable: false },
        { field: 'email', headerName: 'Email', width: 300, sortable: false },
        { field: 'mobile', headerName: 'Mobile', width: 200, sortable: false },
        {
            field: 'Actions', headerName: 'Actions', width: 200, sortable: false, renderCell: (params) => {
                return (
                    <>
                        <Button variant="contained" color="primary" style={{ marginRight: "8px" }} onClick={() => {
                            setEditModal(true);
                            setEditId(params.row.id);
                            setUserDetails(prevState => {
                                return {
                                    ...prevState,
                                    data: {
                                        ...prevState.data,
                                        name: params.row.name,
                                        username: params.row.username,
                                        password: params.row.password,
                                        email: params.row.email,
                                        mobile: params.row.mobile
                                    }
                                }
                            })
                        }}>Edit</Button>
                        <Button variant="contained" color="secondary" onClick={() => {
                            axios.delete(`http://localhost:7003/${params.row.id}`);
                            setRefresh(!refresh);
                        }}>Delete</Button>
                    </>
                )
            }
        }
    ];

    const saveData = () => {
        axios.post('http://localhost:7003', userDetails.data);
        setCreateModal(false)
        setEditModal(false)
        setRefresh(!refresh);
    }

    const updateData = () => {
        axios.put(`http://localhost:7003/${editId}`, userDetails.data);
        setCreateModal(false)
        setEditModal(false)
        setRefresh(!refresh);
    }


    const ValidateUser = (label: string, value: string) => {
        switch (label) {
            case 'name':
                if (value.length <= 0) {
                    return setUserDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, name: "Name Should not be null" },
                            valid: {
                                ...prevState.valid, name: true
                            },
                        }
                    })
                }
                return setUserDetails(prevState => {
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
                    return setUserDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, username: "Username Should not be null" },
                            valid: {
                                ...prevState.valid, username: true
                            },
                        }
                    })
                }
                return setUserDetails(prevState => {
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
                    return setUserDetails(prevState => {
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
                    return setUserDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, password: "Password Should be more than 6 characters" },
                            valid: {
                                ...prevState.valid, password: true
                            },
                        }
                    })
                }
                return setUserDetails(prevState => {
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
            <CardHeader title="User Details" action={
                <Button variant="contained" color="primary" onClick={() => setCreateModal(true)}>Create User</Button>
            } />
            <CardContent style={{ height: "700px" }}>
                <DataGrid rows={userModel ?? []}
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
                aria-labelledby="create-user-title"
                aria-describedby="create-user-description"
            >
                <Card style={{ width: "40%" }}>
                    <CardHeader title="Create User" style={{ borderBottom: "1px solid #f2f2f2" }} />
                    <CardContent>
                        <form noValidate autoComplete="off">
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" name={userDetails.name.name} label={userDetails.label.name} value={userDetails.data.name} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setUserDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    name: val
                                                }
                                            }
                                        });
                                    }} onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        ValidateUser(label, val);
                                    }}
                                        error={userDetails.valid.name}
                                        helperText={userDetails.valid.name ? userDetails.error.name : ""} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={userDetails.label.username} name={userDetails.name.username} value={userDetails.data.username} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setUserDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    username: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateUser(label, val);
                                        }}
                                        error={userDetails.valid.username}
                                        helperText={userDetails.valid.username ? userDetails.error.username : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={userDetails.label.password} name={userDetails.name.password} value={userDetails.data.password} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setUserDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    password: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateUser(label, val);
                                        }}
                                        error={userDetails.valid.password}
                                        helperText={userDetails.valid.password ? userDetails.error.password : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={userDetails.label.email} name={userDetails.name.email} value={userDetails.data.email} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setUserDetails(prevState => {
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
                                            ValidateUser(label, val);
                                        }}
                                        error={userDetails.valid.email}
                                        helperText={userDetails.valid.email ? userDetails.error.email : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={userDetails.label.mobile} name={userDetails.name.mobile} value={userDetails.data.mobile} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setUserDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    mobile: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateUser(label, val);
                                        }}
                                        error={userDetails.valid.mobile}
                                        helperText={userDetails.valid.mobile ? userDetails.error.mobile : ""}
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

export default UserPage;