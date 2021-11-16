import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Button, Modal, TextField, Grid, CardActions, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FranchiseData } from "../models/franchise";
import axios from "axios";

const UserPage = () => {

    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [franchiseDetails, setFranchiseDetails] = useState(FranchiseData);
    const [refresh, setRefresh] = useState(false);
    const [franchiseModel, setFranchiseModel] = useState();

    useEffect(() => {
        axios.get('http://34.70.51.2/').then(res => {
            setFranchiseModel(res.data);
        });
        setRefresh(false);
    }, [refresh])

    useEffect(() => {
        if (!createModal && !editModal) {
            setFranchiseDetails(FranchiseData)
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
                            setEditModal(true)
                            setFranchiseDetails(prevState => {
                                return {
                                    ...prevState,
                                    data: {
                                        ...prevState.data,
                                        name: params.row.name,
                                        username: params.row.username,
                                        password: params.row.password,
                                        email: params.row.email,
                                        mobile: params.row.mobile,
                                        address: params.row.address,
                                        pincode: params.row.pincode,
                                        state: params.row.state,
                                        pan_no: params.row.pan_no,
                                        aadhar_no: params.row.aadhar_no,
                                        bank_ac_no: params.row.bank_ac_no,
                                        bank_ac_type: params.row.bank_ac_type,
                                        bank_name: params.row.bank_name,
                                        bank_branch: params.row.bank_branch,
                                        bank_ifsc: params.row.bank_ifsc,
                                        status: params.row.status,
                                    }
                                }
                            })
                        }}>Edit</Button>
                        <Button variant="contained" color="secondary" onClick={() => {
                            axios.delete(`http://34.70.51.2/${params.row.id}`);
                            setRefresh(!refresh);
                        }}>Delete</Button>
                    </>
                )
            }
        }
    ];

    const saveData = () => {
        if(franchiseDetails.data.username.length <= 0 || franchiseDetails.data.state.length <= 0 ||
            franchiseDetails.data.pincode.length <= 0 || franchiseDetails.data.password.length <= 0 ||
            franchiseDetails.data.pan_no.length <= 0 || franchiseDetails.data.name.length <= 0 ||
            franchiseDetails.data.mobile.length <= 0 || franchiseDetails.data.email.length <= 0 ||
            franchiseDetails.data.country.length <= 0 || franchiseDetails.data.bank_name.length <= 0 ||
            franchiseDetails.data.bank_ifsc.length <= 0 || franchiseDetails.data.bank_branch.length <= 0 ||
            franchiseDetails.data.bank_ac_type.length <= 0 || franchiseDetails.data.bank_ac_no.length <= 0 ||
            franchiseDetails.data.address.length <= 0 || franchiseDetails.data.aadhar_no.length <= 0 ||
            franchiseDetails.data.status.length <= 0 || franchiseDetails.valid.name == true ||
            franchiseDetails.valid.mobile == true || franchiseDetails.valid.email == true ||
            franchiseDetails.valid.country == true || franchiseDetails.valid.bank_name == true ||
            franchiseDetails.valid.bank_ifsc == true || franchiseDetails.valid.pan_no == true ||
            franchiseDetails.valid.password == true || franchiseDetails.valid.pincode == true || 
            franchiseDetails.valid.state == true || franchiseDetails.valid.status == true ||
            franchiseDetails.valid.username == true || franchiseDetails.valid.aadhar_no == true ||
            franchiseDetails.valid.address == true || franchiseDetails.valid.bank_ac_no == true ||
            franchiseDetails.valid.bank_ac_type == true || franchiseDetails.valid.bank_branch == true) {alert("Fill all the Fields")}
            
            else{
        
        console.log(franchiseDetails.data);
        axios.post('http://34.70.51.2/', franchiseDetails.data);
        setCreateModal(false)
        setEditModal(false)
        setRefresh(true);}
    }

    const updateData = () => {

        if(franchiseDetails.data.username.length <= 0 || franchiseDetails.data.state.length <= 0 ||
            franchiseDetails.data.pincode.length <= 0 || franchiseDetails.data.password.length <= 0 ||
            franchiseDetails.data.pan_no.length <= 0 || franchiseDetails.data.name.length <= 0 ||
            franchiseDetails.data.mobile.length <= 0 || franchiseDetails.data.email.length <= 0 ||
            franchiseDetails.data.country.length <= 0 || franchiseDetails.data.bank_name.length <= 0 ||
            franchiseDetails.data.bank_ifsc.length <= 0 || franchiseDetails.data.bank_branch.length <= 0 ||
            franchiseDetails.data.bank_ac_type.length <= 0 || franchiseDetails.data.bank_ac_no.length <= 0 ||
            franchiseDetails.data.address.length <= 0 || franchiseDetails.data.aadhar_no.length <= 0 ||
            franchiseDetails.data.status.length <= 0 || franchiseDetails.valid.name == true ||
            franchiseDetails.valid.mobile == true || franchiseDetails.valid.email == true ||
            franchiseDetails.valid.country == true || franchiseDetails.valid.bank_name == true ||
            franchiseDetails.valid.bank_ifsc == true || franchiseDetails.valid.pan_no == true ||
            franchiseDetails.valid.password == true || franchiseDetails.valid.pincode == true || 
            franchiseDetails.valid.state == true || franchiseDetails.valid.status == true ||
            franchiseDetails.valid.username == true || franchiseDetails.valid.aadhar_no == true ||
            franchiseDetails.valid.address == true || franchiseDetails.valid.bank_ac_no == true ||
            franchiseDetails.valid.bank_ac_type == true || franchiseDetails.valid.bank_branch == true) {alert("Fill all the Fields")}
            else {
        axios.put(`http://34.70.51.2/${editId}`, franchiseDetails.data);
        setCreateModal(false)
        setEditModal(false)
        setRefresh(true);}
    }



    const ValidateFranchise = (label: string, value: string) => {
        switch (label) {
            case 'name':
                if (value.length <= 0) {
                    return setFranchiseDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, name: "Name Should not be empty" },
                            valid: {
                                ...prevState.valid, name: true
                            },
                        }
                    })
                }
                return setFranchiseDetails(prevState => {
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
                    return setFranchiseDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, username: "Username Should not be empty" },
                            valid: {
                                ...prevState.valid, username: true
                            },
                        }
                    })
                }
                return setFranchiseDetails(prevState => {
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
                    return setFranchiseDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, password: "Password Should not be empty" },
                            valid: {
                                ...prevState.valid, password: true
                            },
                        }
                    })
                }
                if (value.length < 6) {
                    return setFranchiseDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, password: "Password Should be more than 6 characters" },
                            valid: {
                                ...prevState.valid, password: true
                            },
                        }
                    })
                }
                return setFranchiseDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, password: "" },
                        valid: {
                            ...prevState.valid, password: false
                        },
                    }
                });
                case 'mobile':
                    if (value.length <= 0) {
                        return setFranchiseDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, mobile: "Please enter Mobile Number" },
                                valid: {
                                    ...prevState.valid, mobile: true
                                },
                            }
                        })
                    }
                    if (value.length < 10) {
                        return setFranchiseDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, mobile: "Mobile Number Should be less than 10 numbers" },
                                valid: {
                                    ...prevState.valid, mobile: true
                                },
                            }
                        })
                    }
                    if (value.length > 10) {
                        return setFranchiseDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, password: "Mobile Number Should be more than 10 numbers" },
                                valid: {
                                    ...prevState.valid, password: true
                                },
                            }
                        })
                    }
                    return setFranchiseDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, mobile: "" },
                            valid: {
                                ...prevState.valid, mobile: false
                            },
                        }
                    });  
                    case 'email':
                    if (value.length <= 0) {
                        return setFranchiseDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, email: "Email id should not be empty" },
                                valid: {
                                    ...prevState.valid, email: true
                                },
                            }
                        })
                    
                    }
                   
                    return setFranchiseDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, email: "" },
                            valid: {
                                ...prevState.valid, email: false
                            },
                        }
                    }) ;
                    case 'address':
                        if (value.length <= 0) {
                            return setFranchiseDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, address: "Address should not be empty" },
                                    valid: {
                                        ...prevState.valid, address: true
                                    },
                                }
                            })
                        
                        }
                      
                       
                        return setFranchiseDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, address: "" },
                                valid: {
                                    ...prevState.valid, address: false
                                },
                            }
                        });
                        case 'pincode':
                            if (value.length <= 0) {
                                return setFranchiseDetails(prevState => {
                                    return {
                                        ...prevState,
                                        error: { ...prevState.error, pincode: "Please enter the Pincode" },
                                        valid: {
                                            ...prevState.valid, pincode: true
                                        },
                                    }
                                })
                            
                            }
                            if (value.length < 6 ) {
                                return setFranchiseDetails(prevState => {
                                    return {
                                        ...prevState,
                                        error: { ...prevState.error, pincode: "Pincode Should not be less than 6 numbers" },
                                        valid: {
                                            ...prevState.valid, pincode: true
                                        },
                                    }
                                })
                               
                            } 
                            return setFranchiseDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, pincode: "" },
                                    valid: {
                                        ...prevState.valid, pincode: false
                                    },
                                }
                            }) ; 
                        case 'state':
                        if (value.length <= 0) {
                            return setFranchiseDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, state: "Please select the State" },
                                    valid: {
                                        ...prevState.valid, state: true
                                    },
                                }
                            })
                        
                        }
                      
                       
                        return setFranchiseDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, state: "" },
                                valid: {
                                    ...prevState.valid, state: false
                                },
                            }
                        });
                        case 'country':
                        if (value.length <= 0) {
                            return setFranchiseDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, country: "Please select the Country" },
                                    valid: {
                                        ...prevState.valid, country: true
                                    },
                                }
                            })
                        
                        }
                      
                       
                        return setFranchiseDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, country: "" },
                                valid: {
                                    ...prevState.valid, country: false
                                },
                            }
                        });
                        case 'bank_ac_no':
                        if (value.length <= 0) {
                            return setFranchiseDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, bank_ac_no: "Please enter the Bank Account Number" },
                                    valid: {
                                        ...prevState.valid, bank_ac_no: true
                                    },
                                }
                            })
                        
                        }
                      
                       
                        return setFranchiseDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, bank_ac_no: "" },
                                valid: {
                                    ...prevState.valid, bank_ac_no: false
                                },
                            }
                        });
                        case 'bank_name':
                        if (value.length <= 0) {
                            return setFranchiseDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, bank_name: "Please enter the Bank Name" },
                                    valid: {
                                        ...prevState.valid, bank_name: true
                                    },
                                }
                            })
                        
                        }
                      
                       
                        return setFranchiseDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, bank_name: "" },
                                valid: {
                                    ...prevState.valid, bank_name: false
                                },
                            }
                        });
                        case 'bank_branch':
                        if (value.length <= 0) {
                            return setFranchiseDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, bank_branch: "Please enter the Bank Branch" },
                                    valid: {
                                        ...prevState.valid, bank_branch: true
                                    },
                                }
                            })
                        
                        }
                      
                       
                        return setFranchiseDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, bank_branch: "" },
                                valid: {
                                    ...prevState.valid, bank_branch: false
                                },
                            }
                        });
                        case 'bank_ac_type':
                        if (value.length <= 0) {
                            return setFranchiseDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, bank_ac_type: "Account Type should not be empty" },
                                    valid: {
                                        ...prevState.valid, bank_ac_type: true
                                    },
                                }
                            })
                        
                        }
                      
                       
                        return setFranchiseDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, bank_ac_type: "" },
                                valid: {
                                    ...prevState.valid, bank_ac_type: false
                                },
                            }
                        });
                        case 'bank_ifsc':
                        if (value.length <= 0) {
                            return setFranchiseDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, bank_ifsc: "Please enter the Bank IFSC Code" },
                                    valid: {
                                        ...prevState.valid, bank_ifsc: true
                                    },
                                }
                            })
                        
                        }
                      
                       
                        return setFranchiseDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, bank_ifsc: "" },
                                valid: {
                                    ...prevState.valid, bank_ifsc: false
                                },
                            }
                        });
        }
    }

    return (
        <Card>
            <CardHeader title="Franchise Details" action={
                <Button variant="contained" color="primary" onClick={() => setCreateModal(true)}>Create Franchise</Button>
            } />
            <CardContent style={{ height: "700px" }}>
                <DataGrid rows={franchiseModel || []}
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
                aria-labelledby="create-franchise-title"
                aria-describedby="create-franchise-description"
            >
                <Card style={{ width: "40%" }}>
                    <CardHeader title="Create Franchise" style={{ borderBottom: "1px solid #f2f2f2" }} />
                    <CardContent>
                        <form noValidate autoComplete="off">
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" name={franchiseDetails.name.name} label={franchiseDetails.label.name} value={franchiseDetails.data.name} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setFranchiseDetails(prevState => {
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
                                        ValidateFranchise(label, val);
                                    }}
                                        error={franchiseDetails.valid.name}
                                        helperText={franchiseDetails.valid.name ? franchiseDetails.error.name : ""} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={franchiseDetails.label.username} name={franchiseDetails.name.username} value={franchiseDetails.data.username} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setFranchiseDetails(prevState => {
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
                                            ValidateFranchise(label, val);
                                        }}
                                        error={franchiseDetails.valid.username}
                                        helperText={franchiseDetails.valid.username ? franchiseDetails.error.username : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={franchiseDetails.label.password} name={franchiseDetails.name.password} value={franchiseDetails.data.password} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setFranchiseDetails(prevState => {
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
                                            ValidateFranchise(label, val);
                                        }}
                                        error={franchiseDetails.valid.password}
                                        helperText={franchiseDetails.valid.password ? franchiseDetails.error.password : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={franchiseDetails.label.email} name={franchiseDetails.name.email} value={franchiseDetails.data.email} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setFranchiseDetails(prevState => {
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
                                            ValidateFranchise(label, val);
                                        }}
                                        error={franchiseDetails.valid.email}
                                        helperText={franchiseDetails.valid.email ? franchiseDetails.error.email : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={franchiseDetails.label.mobile} name={franchiseDetails.name.mobile} value={franchiseDetails.data.mobile} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setFranchiseDetails(prevState => {
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
                                            ValidateFranchise(label, val);
                                        }}
                                        error={franchiseDetails.valid.mobile}
                                        helperText={franchiseDetails.valid.mobile ? franchiseDetails.error.mobile : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={franchiseDetails.label.address} name={franchiseDetails.name.address} value={franchiseDetails.data.address} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setFranchiseDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    address: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateFranchise(label, val);
                                        }}
                                        error={franchiseDetails.valid.address}
                                        helperText={franchiseDetails.valid.address ? franchiseDetails.error.address : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={franchiseDetails.label.pincode} name={franchiseDetails.name.pincode} value={franchiseDetails.data.pincode} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setFranchiseDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    pincode: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateFranchise(label, val);
                                        }}
                                        error={franchiseDetails.valid.pincode}
                                        helperText={franchiseDetails.valid.pincode ? franchiseDetails.error.pincode : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="fstate">State</InputLabel>
                                        <Select
                                            labelId="fstate"
                                            id="fstateselect"
                                            name={franchiseDetails.name.state}
                                            value={{ name: franchiseDetails.data.state, value: franchiseDetails.data.state}}
                                            onChange={(e: SelectChangeEvent<{ name?: string, value: unknown }>) => {
                                                const val = e.target.value as string;
                                                setFranchiseDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            state: val
                                                        }
                                                    }
                                                });
                                            }}
                                            label={franchiseDetails.label.state}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                                            <MenuItem value="Kerala">Kerala</MenuItem>
                                            <MenuItem value="Karnataka">Karnataka</MenuItem>
                                            <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                                            <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                                            <MenuItem value="Kerala">Kerala</MenuItem>
                                            <MenuItem value="Karnataka">Karnataka</MenuItem>
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
                                            <MenuItem value="Telangana">Telangana</MenuItem>
                                            <MenuItem value="Tripura">Tripura</MenuItem>
                                            <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                                            <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                                            <MenuItem value="West Bengal">West Bengal</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="ccountry">Country</InputLabel>
                                        <Select
                                            labelId="ccountry"
                                            id="ccountryselect"
                                            name={franchiseDetails.name.country}
                                            value={{ name: franchiseDetails.data.country, value: franchiseDetails.data.country}}
                                            onChange={(e: SelectChangeEvent<{ name?: string, value: unknown }>) => {
                                                const val = e.target.value as string;
                                                setFranchiseDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            country: val
                                                        }
                                                    }
                                                });
                                            }}
                                            label={franchiseDetails.label.country}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="India">India</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={franchiseDetails.label.bank_ac_no} name={franchiseDetails.name.bank_ac_no} value={franchiseDetails.data.bank_ac_no} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setFranchiseDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    bank_ac_no: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateFranchise(label, val);
                                        }}
                                        error={franchiseDetails.valid.bank_ac_no}
                                        helperText={franchiseDetails.valid.bank_ac_no ? franchiseDetails.error.bank_ac_no : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={franchiseDetails.label.bank_ac_type} name={franchiseDetails.name.bank_ac_type} value={franchiseDetails.data.bank_ac_type} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setFranchiseDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    bank_ac_type: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateFranchise(label, val);
                                        }}
                                        error={franchiseDetails.valid.bank_ac_type}
                                        helperText={franchiseDetails.valid.bank_ac_type ? franchiseDetails.error.bank_ac_type : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={franchiseDetails.label.bank_branch} name={franchiseDetails.name.bank_branch} value={franchiseDetails.data.bank_branch} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setFranchiseDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    bank_branch: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateFranchise(label, val);
                                        }}
                                        error={franchiseDetails.valid.bank_branch}
                                        helperText={franchiseDetails.valid.bank_branch ? franchiseDetails.error.bank_branch : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={franchiseDetails.label.bank_ifsc} name={franchiseDetails.name.bank_ifsc} value={franchiseDetails.data.bank_ifsc} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setFranchiseDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    bank_ifsc: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateFranchise(label, val);
                                        }}
                                        error={franchiseDetails.valid.bank_ifsc}
                                        helperText={franchiseDetails.valid.bank_ifsc ? franchiseDetails.error.bank_ifsc : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={franchiseDetails.label.bank_name} name={franchiseDetails.name.bank_name} value={franchiseDetails.data.bank_name} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setFranchiseDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    bank_name: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateFranchise(label, val);
                                        }}
                                        error={franchiseDetails.valid.bank_name}
                                        helperText={franchiseDetails.valid.bank_name ? franchiseDetails.error.bank_name : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={franchiseDetails.label.status} name={franchiseDetails.name.status} value={franchiseDetails.data.status} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setFranchiseDetails(prevState => {
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
                                            ValidateFranchise(label, val);
                                        }}
                                        error={franchiseDetails.valid.status}
                                        helperText={franchiseDetails.valid.status ? franchiseDetails.error.status : ""}
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