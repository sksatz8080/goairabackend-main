import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Button, Modal, TextField, Grid, CardActions, InputLabel, FormControl, MenuItem, Select, Typography, SelectChangeEvent } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { adminData } from "../models/admin";
import axios from "axios";

const AdminPage = () => {

    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [adminDetails, setAdminDetails] = useState(adminData);
    const [adminModel, setAdminModel] = useState();

    useEffect(() => {
        axios.get('https://adminapi-hldux24wua-el.a.run.app/').then(res => {
            setAdminModel(res.data);
        });
        setRefresh(false);
    }, [refresh])

    useEffect(() => {
        if (!createModal && !editModal) {
            setAdminDetails(adminData)
        }
    }, [createModal, editModal])

    const AdminColumn: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'firstname', headerName: 'First Name', width: 250 },
        { field: 'mobile', headerName: 'Mobile Number', width: 250, sortable: false },
        { field: 'emailid', headerName: 'Email Id', width: 250, sortable: false },
        { field: 'city', headerName: 'City', width: 250 },
        {
            field: 'Actions', headerName: 'Actions', width: 300, sortable: false, renderCell: (params) => {
                return (
                    <>
                        <Button variant="contained" color="primary" style={{ marginRight: "8px" }} onClick={() => {
                            setEditModal(true)
                            setEditId(params.row.id);
                            setAdminDetails(prevState => {
                                return {
                                    ...prevState,
                                    data: {
                                        ...prevState.data,
                                        firstname: params.row.firstname,
                                        lastname: params.row.lastname,
                                        mobile: params.row.mobile,
                                        emailid: params.row.emailid,
                                        username: params.row.username,
                                        password: params.row.password,
                                        dob: params.row.dob,
                                        jobtitle: params.row.jobtitle,
                                        address: params.row.address,
                                        location: params.row.address,
                                        city: params.row.city,
                                        pincode: params.row.pincode,
                                        state: params.row.state,
                                        country: params.row.country,
                                        status: params.row.status,
                                        aadhar: params.row.aadhar,
                                        pan: params.row.pan,
                                        qualification: params.row.qualification,
                                        father_spouse: params.row.father_spouse,
                                        ref_1: params.row.ref_1,
                                        ref_2: params.row.ref_2 
                                        
                                    }
                                }
                            })
                        }}>Edit</Button>
                        <Button variant="contained" color="secondary" onClick={() => {
                            axios.delete(`https://adminapi-hldux24wua-el.a.run.app/${params.row.id}`);
                            setRefresh(!refresh);
                        }}>Delete</Button>
                    </>
                )
            }
        }
    ]

    const saveData = () => {
        
        if(adminDetails.data.firstname.length <= 0 || adminDetails.data.lastname.length <= 0 || adminDetails.data.password.length <= 0 ||
            adminDetails.data.username.length <= 0 ||adminDetails.data.location.length <=0 ||adminDetails.data.jobtitle.length <=0 ||
            adminDetails.data.father_spouse.length <=0 ||adminDetails.data.emailid.length<=0||adminDetails.data.dob.length<=0||
            adminDetails.data.country.length<=0||adminDetails.data.city.length<=0||adminDetails.data.address.length<=0 ||
            adminDetails.data.aadhar.length<=0||adminDetails.data.mobile.length<=0||adminDetails.data.status.length<=0||
            adminDetails.data.state.length<=0||adminDetails.data.ref_2.length<=0||adminDetails.data.ref_1.length<=0||
            adminDetails.data.qualification.length<=0||adminDetails.data.pincode.length<=0||adminDetails.data.pan.length<=0||
            adminDetails.valid.aadhar==true||adminDetails.valid.address==true||adminDetails.valid.city==true||
            adminDetails.valid.country==true||adminDetails.valid.dob==true||adminDetails.valid.emailid==true||
            adminDetails.valid.father_spouse==true||adminDetails.valid.firstname==true||adminDetails.valid.jobtitle==true||
            adminDetails.valid.lastname==true||adminDetails.valid.location==true||adminDetails.valid.mobile==true||
            adminDetails.valid.pan==true||adminDetails.valid.password==true||adminDetails.valid.pincode==true||
            adminDetails.valid.qualification==true||adminDetails.valid.ref_1==true||adminDetails.valid.ref_2==true||
            adminDetails.valid.state==true||adminDetails.valid.status==true||adminDetails.valid.username==true
            ){alert("Fill all the Fields")}
            else{
        axios.post('https://adminapi-hldux24wua-el.a.run.app/', adminDetails.data);
        setCreateModal(false)
        setEditModal(false)
        setRefresh(true);
    }}

    const updateData = () => {
        if(adminDetails.data.firstname.length <= 0 || adminDetails.data.lastname.length <= 0 || adminDetails.data.password.length <= 0 ||
            adminDetails.data.username.length <= 0 ||adminDetails.data.location.length<=0||adminDetails.data.jobtitle.length<=0||
            adminDetails.data.father_spouse.length<=0||adminDetails.data.emailid.length<=0||adminDetails.data.dob.length<=0||
            adminDetails.data.country.length<=0||adminDetails.data.city.length<=0||adminDetails.data.address.length<=0 ||
            adminDetails.data.aadhar.length<=0||adminDetails.data.mobile.length<=0||adminDetails.data.status.length<=0||
            adminDetails.data.state.length<=0||adminDetails.data.ref_2.length<=0||adminDetails.data.ref_1.length<=0||
            adminDetails.data.qualification.length<=0||adminDetails.data.pincode.length<=0||adminDetails.data.pan.length<=0|| 
            adminDetails.valid.aadhar==true||adminDetails.valid.address==true||adminDetails.valid.city==true||
            adminDetails.valid.country==true||adminDetails.valid.dob==true||adminDetails.valid.emailid==true||
            adminDetails.valid.father_spouse==true||adminDetails.valid.firstname==true||adminDetails.valid.jobtitle==true||
            adminDetails.valid.lastname==true||adminDetails.valid.location==true||adminDetails.valid.mobile==true||
            adminDetails.valid.pan==true||adminDetails.valid.password==true||adminDetails.valid.pincode==true||
            adminDetails.valid.qualification==true||adminDetails.valid.ref_1==true||adminDetails.valid.ref_2==true||
            adminDetails.valid.state==true||adminDetails.valid.status==true||adminDetails.valid.username==true) {alert("Fill all the Fields")}
            else{
        axios.put(`https://adminapi-hldux24wua-el.a.run.app/${editId}`, adminDetails.data);
        setCreateModal(false)
        setEditModal(false)
        setRefresh(true);}
    }


    const ValidateAdmin = (label: string, value: string) => {
        switch (label) {
            case 'firstname':
                if (value.length <= 0) {
                    return setAdminDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, firstname: "First Name Should not be empty" },
                            valid: {
                                ...prevState.valid, firstname: true
                            },
                        }
                    })
                }
                return setAdminDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, firstname: "" },
                        valid: {
                            ...prevState.valid, firstname: false
                        },
                    }
                });
                case 'qualification':
                if (value.length <= 0) {
                    return setAdminDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, qualification: "Qualification Should not be empty" },
                            valid: {
                                ...prevState.valid, qualification: true
                            },
                        }
                    })
                }
                return setAdminDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, qualification: "" },
                        valid: {
                            ...prevState.valid, qualification: false
                        },
                    }
                });
                case 'lastname':
                    if (value.length <= 0) {
                        return setAdminDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, lastname: "Last Name Should not be null" },
                                valid: {
                                    ...prevState.valid, lastname: true
                                },
                            }
                        })
                    }
                    return setAdminDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, lastname: "" },
                            valid: {
                                ...prevState.valid, lastname: false
                            },
                        }
                    });
                    case 'mobile':
                        if (value.length <= 0) {
                            return setAdminDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, mobile: "Please enter Mobile Number" },
                                    valid: {
                                        ...prevState.valid, mobile: true
                                    },
                                }
                            });
                        }
                        else if (value.length < 10) {
                            return setAdminDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, mobile: "Please enter a valid Mobile Number" },
                                    valid: {
                                        ...prevState.valid, mobile: true
                                    },
                                }
                            })
                        }
                        else if (value.length > 10) {
                            return setAdminDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, mobile: "Please enter a valid Mobile Number" },
                                    valid: {
                                        ...prevState.valid, mobile: true
                                    },
                                }
                            })
                        }
                        return setAdminDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, mobile: "" },
                                valid: {
                                    ...prevState.valid, mobile: false
                                },
                            }
                        });
                 case 'emailid':
                    if (value.length <= 0) {
                        return setAdminDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, emailid: "Email id should not be empty" },
                                valid: {
                                    ...prevState.valid, emailid: true
                                },
                            }
                        })
                    
                    }
                    else if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                        return setAdminDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, emailid: "Email id is not valid" },
                                valid: {
                                    ...prevState.valid, emailid: true
                                },
                            }
                        })
                    
                    }
                   
                    return setAdminDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, emailid: "" },
                            valid: {
                                ...prevState.valid, emailid: false
                            },
                        }
                    }) ;
                    case 'dob':
                        if (value.length <= 0) {
                            return setAdminDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, dob: "Please select Date of Birth" },
                                    valid: {
                                        ...prevState.valid, dob: true
                                    },
                                }
                            })
                        
                        }
                       
                        return setAdminDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, dob: "" },
                                valid: {
                                    ...prevState.valid, dob: false
                                },
                            }
                        }); 
                        case 'jobtitle':
                            if (value.length <= 0) {
                                return setAdminDetails(prevState => {
                                    return {
                                        ...prevState,
                                        error: { ...prevState.error, jobtitle: "Please select Job Title" },
                                        valid: {
                                            ...prevState.valid, jobtitle: true
                                        },
                                    }
                                })
                            
                            }
                           
                            return setAdminDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, jobtitle: "" },
                                    valid: {
                                        ...prevState.valid, jobtitle: false
                                    },
                                }
                            }); 

                        case 'username':
                           if (value.length <= 0) {
                        return setAdminDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, username: "Username Should not be null" },
                            valid: {
                                ...prevState.valid, username: true
                            },
                        }
                    });
                }
                return setAdminDetails(prevState => {
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
                    return setAdminDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, password: "Password Should not be null" },
                            valid: {
                                ...prevState.valid, password: true
                            },
                        }
                    })
                }
                else if (value.length < 6) {
                    return setAdminDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, password: "Password Should be more than 6 characters" },
                            valid: {
                                ...prevState.valid, password: true
                            },
                        }
                    })
                }
                return setAdminDetails(prevState => {
                    return {
                        ...prevState,
                        error: { ...prevState.error, password: "" },
                        valid: {
                            ...prevState.valid, password: false
                        },
                    }
                });
                case 'address':
                    if (value.length <= 0) {
                        return setAdminDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, address: "Address should not be empty" },
                                valid: {
                                    ...prevState.valid, address: true
                                },
                            }
                        })
                    
                    }
                  
                   
                    return setAdminDetails(prevState => {
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
                            return setAdminDetails(prevState => {
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
                            return setAdminDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, pincode: "Pincode Should not be less than 6 numbers" },
                                    valid: {
                                        ...prevState.valid, pincode: true
                                    },
                                }
                            })
                           
                        } 
                        return setAdminDetails(prevState => {
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
                        return setAdminDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, state: "Please select the State" },
                                valid: {
                                    ...prevState.valid, state: true
                                },
                            }
                        })
                    
                    }
                  
                   
                    return setAdminDetails(prevState => {
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
                        return setAdminDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, country: "Please select the Country" },
                                valid: {
                                    ...prevState.valid, country: true
                                },
                            }
                        })
                    
                    }
                  
                   
                    return setAdminDetails(prevState => {
                        return {
                            ...prevState,
                            error: { ...prevState.error, country: "" },
                            valid: {
                                ...prevState.valid, country: false
                            },
                        }
                    });
                    case 'location':
                        if (value.length <= 0) {
                            return setAdminDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, location: "Please enter the Location" },
                                    valid: {
                                        ...prevState.valid, location: true
                                    },
                                }
                            })
                        
                        }
                      
                       
                        return setAdminDetails(prevState => {
                            return {
                                ...prevState,
                                error: { ...prevState.error, location: "" },
                                valid: {
                                    ...prevState.valid, location: false
                                },
                            }
                        });
                        case 'city':
                            if (value.length <= 0) {
                                return setAdminDetails(prevState => {
                                    return {
                                        ...prevState,
                                        error: { ...prevState.error, city: "Please enter the City" },
                                        valid: {
                                            ...prevState.valid, city: true
                                        },
                                    }
                                })
                            
                            }
                          
                           
                            return setAdminDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, city: "" },
                                    valid: {
                                        ...prevState.valid, city: false
                                    },
                                }
                            });
                            case 'father_spouse':
                            if (value.length <= 0) {
                                return setAdminDetails(prevState => {
                                    return {
                                        ...prevState,
                                        error: { ...prevState.error, father_spouse: "Please enter Father/Spouse Mobile Number" },
                                        valid: {
                                            ...prevState.valid, father_spouse: true
                                        },
                                    }
                                })
                            
                            }
                            else if (value.length < 10) {
                                return setAdminDetails(prevState => {
                                    return {
                                        ...prevState,
                                        error: { ...prevState.error, father_spouse: "Please enter a valid Mobile Number" },
                                        valid: {
                                            ...prevState.valid, father_spouse: true
                                        },
                                    }
                                })
                            }
                            else if (value.length > 10) {
                                return setAdminDetails(prevState => {
                                    return {
                                        ...prevState,
                                        error: { ...prevState.error, father_spouse: "Please enter a valid Mobile Number" },
                                        valid: {
                                            ...prevState.valid, father_spouse: true
                                        },
                                    }
                                })
                            }
                          
                           
                            return setAdminDetails(prevState => {
                                return {
                                    ...prevState,
                                    error: { ...prevState.error, father_spouse: "" },
                                    valid: {
                                        ...prevState.valid, father_spouse: false
                                    },
                                }
                            });

                            case 'ref_1':
                                if (value.length <= 0) {
                                    return setAdminDetails(prevState => {
                                        return {
                                            ...prevState,
                                            error: { ...prevState.error, ref_1: "Please enter Reference Mobile Number" },
                                            valid: {
                                                ...prevState.valid, ref_1: true
                                            },
                                        }
                                    })
                                
                                }
                                else if (value.length < 10) {
                                    return setAdminDetails(prevState => {
                                        return {
                                            ...prevState,
                                            error: { ...prevState.error, ref_1: "Please enter a valid Mobile Number" },
                                            valid: {
                                                ...prevState.valid, ref_1: true
                                            },
                                        }
                                    })
                                }
                                else if (value.length > 10) {
                                    return setAdminDetails(prevState => {
                                        return {
                                            ...prevState,
                                            error: { ...prevState.error, ref_1: "Please enter a valid Mobile Number" },
                                            valid: {
                                                ...prevState.valid, ref_1: true
                                            },
                                        }
                                    })
                                }
                              
                               
                                return setAdminDetails(prevState => {
                                    return {
                                        ...prevState,
                                        error: { ...prevState.error, ref_1: "" },
                                        valid: {
                                            ...prevState.valid, ref_1: false
                                        },
                                    }
                                });

                                case 'ref_2':
                                    if (value.length <= 0) {
                                        return setAdminDetails(prevState => {
                                            return {
                                                ...prevState,
                                                error: { ...prevState.error, ref_2: "Please enter Reference Mobile Number" },
                                                valid: {
                                                    ...prevState.valid, ref_2: true
                                                },
                                            }
                                        })
                                    
                                    }
                                    else if (value.length < 10) {
                                        return setAdminDetails(prevState => {
                                            return {
                                                ...prevState,
                                                error: { ...prevState.error, ref_2: "Please enter a valid Mobile Number" },
                                                valid: {
                                                    ...prevState.valid, ref_2: true
                                                },
                                            }
                                        })
                                    }
                                    else if (value.length > 10) {
                                        return setAdminDetails(prevState => {
                                            return {
                                                ...prevState,
                                                error: { ...prevState.error, ref_2: "Please enter a valid Mobile Number" },
                                                valid: {
                                                    ...prevState.valid, ref_2: true
                                                },
                                            }
                                        })
                                    }
                                  
                                   
                                    return setAdminDetails(prevState => {
                                        return {
                                            ...prevState,
                                            error: { ...prevState.error, ref_2: "" },
                                            valid: {
                                                ...prevState.valid, ref_2: false
                                            },
                                        }
                                    });
                            case 'aadhar':
                                if (value.length <= 0) {
                                    return setAdminDetails(prevState => {
                                        return {
                                            ...prevState,
                                            error: { ...prevState.error, aadhar: "Aadhaar Number should not be empty" },
                                            valid: {
                                                ...prevState.valid, aadhar: true
                                            },
                                        }
                                    })
                                
                                }
                                if (value.length < 12) {
                                    return setAdminDetails(prevState => {
                                        return {
                                            ...prevState,
                                            error: { ...prevState.error, aadhar: "Aadhaar Number Should not be less than 12 numbers" },
                                            valid: {
                                                ...prevState.valid, aadhar: true
                                            },
                                        }
                                    })
                                   
                                } 
                                else if (value.length > 12) {
                                    return setAdminDetails(prevState => {
                                        return {
                                            ...prevState,
                                            error: { ...prevState.error, aadhar: "Aadhaar Number Should not be more than 12 numbers" },
                                            valid: {
                                                ...prevState.valid, aadhar: true
                                            },
                                        }
                                    })
                                   
                                } 
                                
                                return setAdminDetails(prevState => {
                                    return {
                                        ...prevState,
                                        error: { ...prevState.error, aadhar: "" },
                                        valid: {
                                            ...prevState.valid, aadhar: false
                                        },
                                    }
                                }) ;
                                case 'pan':
                                    if (value.length <= 0) {
                                        return setAdminDetails(prevState => {
                                            return {
                                                ...prevState,
                                                error: { ...prevState.error, pan: "Pancard Number should not be empty" },
                                                valid: {
                                                    ...prevState.valid, pan: true
                                                },
                                            }
                                        })
                                    
                                    }
                                    else if (!value.match(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)) {
                                        return setAdminDetails(prevState => {
                                            return {
                                                ...prevState,
                                                error: { ...prevState.error, pan: "Pancard is not valid" },
                                                valid: {
                                                    ...prevState.valid, pan: true
                                                },
                                            }
                                        })
                                    
                                    }
                                   
                                    return setAdminDetails(prevState => {
                                        return {
                                            ...prevState,
                                            error: { ...prevState.error, pan: "" },
                                            valid: {
                                                ...prevState.valid, pan: false
                                            },
                                        }
                                    }) ;
                            
        }
    }

    return (
        <Card>
            <CardHeader title="Admin Details" action={
                <Button variant="contained" color="primary" onClick={() => setCreateModal(true)}>Create Admin</Button>
            } />
            <CardContent style={{ height: "700px" }}>
                    <DataGrid rows={adminModel ?? []}
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
                <Card style={{ width: "60%", height: "80%", overflow: "auto" }}>
                    <CardHeader title="Create Admin" style={{ borderBottom: "1px solid #f2f2f2" }} />
                    <CardContent>
                        <form noValidate autoComplete="off">
                            <Grid container spacing={3}>
                                
                                <Grid item xs={6}>
                                    <TextField variant="outlined" name={adminDetails.name.firstname} label={adminDetails.label.firstname} value={adminDetails.data.firstname} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setAdminDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    firstname: val
                                                }
                                            }
                                        });
                                    }} onBlur={(e) => {
                                        const label = e.target.name;
                                        const val = e.target.value;
                                        ValidateAdmin(label, val);
                                    }}
                                        error={adminDetails.valid.firstname}
                                        helperText={adminDetails.valid.firstname ? adminDetails.error.firstname : ""} />
                                </Grid>
            
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={adminDetails.label.lastname} name={adminDetails.name.lastname} value={adminDetails.data.lastname} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setAdminDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    lastname: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={adminDetails.valid.lastname}
                                        helperText={adminDetails.valid.lastname ? adminDetails.error.lastname : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={adminDetails.label.mobile} name={adminDetails.name.mobile} value={adminDetails.data.mobile} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setAdminDetails(prevState => {
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
                                            ValidateAdmin(label, val);
                                        }}
                                        error={adminDetails.valid.mobile}
                                        helperText={adminDetails.valid.mobile ? adminDetails.error.mobile : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={adminDetails.label.emailid} name={adminDetails.name.emailid} value={adminDetails.data.emailid} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setAdminDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    emailid: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={adminDetails.valid.emailid}
                                        helperText={adminDetails.valid.emailid ? adminDetails.error.emailid : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={adminDetails.label.username} name={adminDetails.name.username} value={adminDetails.data.username} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setAdminDetails(prevState => {
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
                                            ValidateAdmin(label, val);
                                        }}
                                        error={adminDetails.valid.username}
                                        helperText={adminDetails.valid.username ? adminDetails.error.username : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={adminDetails.label.password} name={adminDetails.name.password} value={adminDetails.data.password} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setAdminDetails(prevState => {
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
                                            ValidateAdmin(label, val);
                                        }}
                                        error={adminDetails.valid.password}
                                        helperText={adminDetails.valid.password ? adminDetails.error.password : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField type="date" variant="outlined" label={adminDetails.label.dob} name={adminDetails.name.dob} value={adminDetails.data.dob} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setAdminDetails(prevState => {
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
                                            ValidateAdmin(label, val);
                                        }}
                                        error={adminDetails.valid.dob}
                                        helperText={adminDetails.valid.dob ? adminDetails.error.dob : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="jobtitle">JoB Title</InputLabel>
                                        <Select
                                            labelId="jobtitle"
                                            id="jobselect"
                                            name={adminDetails.name.jobtitle}
                                            value={{name: adminDetails.data.jobtitle, value: adminDetails.data.jobtitle}}
                                            onChange={(e: SelectChangeEvent<{ name?: string, value: unknown }>) => {
                                                const val = e.target.value as string;
                                                setAdminDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            jobtitle: val
                                                        }
                                                    }
                                                });
                                            }}
                                            label={adminDetails.label.jobtitle}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Franchise">Franchise</MenuItem>
                                            <MenuItem value="Admin">Admin</MenuItem>
                                            <MenuItem value="Sub-Franchise">Sub-Franchise</MenuItem>
                                            <MenuItem value="Others">Others</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={adminDetails.label.address} name={adminDetails.name.address} value={adminDetails.data.address} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setAdminDetails(prevState => {
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
                                            ValidateAdmin(label, val);
                                        }}
                                        error={adminDetails.valid.address}
                                        helperText={adminDetails.valid.address ? adminDetails.error.address : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={adminDetails.label.location} name={adminDetails.name.location} value={adminDetails.data.location} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setAdminDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    location: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={adminDetails.valid.location}
                                        helperText={adminDetails.valid.location ? adminDetails.error.location : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={adminDetails.label.city} name={adminDetails.name.city} value={adminDetails.data.city} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setAdminDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    city: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={adminDetails.valid.city}
                                        helperText={adminDetails.valid.city ? adminDetails.error.city : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={adminDetails.label.pincode} name={adminDetails.name.pincode} value={adminDetails.data.pincode} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setAdminDetails(prevState => {
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
                                            ValidateAdmin(label, val);
                                        }}
                                        error={adminDetails.valid.pincode}
                                        helperText={adminDetails.valid.pincode ? adminDetails.error.pincode : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="state">State</InputLabel>
                                        <Select
                                            labelId="state"
                                            id="stateselect"
                                            name={adminDetails.name.state}
                                            value={{ name: adminDetails.data.state, value: adminDetails.data.state}}
                                            onChange={(e: SelectChangeEvent<{ name?: string, value: unknown }>) => {
                                                const val = e.target.value as string;
                                                setAdminDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            state: val
                                                        }
                                                    }
                                                });
                                            }}
                                            label={adminDetails.label.state}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
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
                                        <InputLabel id="country">Country</InputLabel>
                                        <Select
                                            labelId="country"
                                            id="countryselect"
                                            name={adminDetails.name.country}
                                            value={{ name: adminDetails.data.country, value: adminDetails.data.country}}
                                            onChange={(e: SelectChangeEvent<{ name?: string, value: unknown }>) => {
                                                const val = e.target.value as string;
                                                setAdminDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            country: val
                                                        }
                                                    }
                                                });
                                            }}
                                            label={adminDetails.label.country}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="India">India</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" style={{ width: "100%" }}>
                                        <InputLabel id="status">Status</InputLabel>
                                        <Select
                                            labelId="status"
                                            id="status"
                                            name={adminDetails.name.status}
                                            value={{ name: adminDetails.data.status, value: adminDetails.data.status}}
                                            onChange={(e: SelectChangeEvent<{ name?: string, value: unknown }>) => {
                                                const val = e.target.value as string;
                                                setAdminDetails(prevState => {
                                                    return {
                                                        ...prevState, data: {
                                                            ...prevState.data,
                                                            status: val
                                                        }
                                                    }
                                                });
                                            }}
                                            label={adminDetails.label.status}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Active">Active</MenuItem>
                                            <MenuItem value="Inactive">Inactive</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={adminDetails.label.aadhar} name={adminDetails.name.aadhar} value={adminDetails.data.aadhar} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setAdminDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    aadhar: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={adminDetails.valid.aadhar}
                                        helperText={adminDetails.valid.aadhar ? adminDetails.error.aadhar : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={adminDetails.label.pan} name={adminDetails.name.pan} value={adminDetails.data.pan} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setAdminDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    pan: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={adminDetails.valid.pan}
                                        helperText={adminDetails.valid.pan ? adminDetails.error.pan : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={adminDetails.label.qualification} name={adminDetails.name.qualification} value={adminDetails.data.qualification} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setAdminDetails(prevState => {
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
                                            ValidateAdmin(label, val);
                                        }}
                                        error={adminDetails.valid.qualification}
                                        helperText={adminDetails.valid.qualification ? adminDetails.error.qualification : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={adminDetails.label.father_spouse} name={adminDetails.name.father_spouse} value={adminDetails.data.father_spouse} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setAdminDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    father_spouse: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={adminDetails.valid.father_spouse}
                                        helperText={adminDetails.valid.father_spouse ? adminDetails.error.father_spouse : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={adminDetails.label.ref_1} name={adminDetails.name.ref_1} value={adminDetails.data.ref_1} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setAdminDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    ref_1: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={adminDetails.valid.ref_1}
                                        helperText={adminDetails.valid.ref_1 ? adminDetails.error.ref_1 : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant="outlined" label={adminDetails.label.ref_2} name={adminDetails.name.ref_2} value={adminDetails.data.ref_2} style={{ width: "100%" }} onChange={(e) => {
                                        const val = e.target.value;
                                        setAdminDetails(prevState => {
                                            return {
                                                ...prevState, data: {
                                                    ...prevState.data,
                                                    ref_2: val
                                                }
                                            }
                                        });
                                    }}
                                        onBlur={(e) => {
                                            const label = e.target.name;
                                            const val = e.target.value;
                                            ValidateAdmin(label, val);
                                        }}
                                        error={adminDetails.valid.ref_2}
                                        helperText={adminDetails.valid.ref_2 ? adminDetails.error.ref_2 : ""}
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

export default AdminPage;