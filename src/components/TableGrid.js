import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './ComponentStyle/TableStyle';
import { apitimeout } from './api_timeout';
import { slugify } from './slugifystring';
import MaterialTable from "material-table";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import Loader from './Loading';
import {
    MuiThemeProvider,
    createMuiTheme
} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SuccessToast from './SuccessToast';
import ErrorToast from './ErrorToast';
import WarningToast from './WarningToast';

const longText = `
The name must be unique and should not contain any capital letters! 
`;

const theme = createMuiTheme({
    overrides: {
        MuiTableCell: {
            root: {
                padding: 10
            }
        }
    }
});

const themeDialog = createMuiTheme({
    overrides: {
        MuiDialog: {
            paperWidthSm: {
                width: 600
            }
        }
    }
});

const themeDialogMobile = createMuiTheme({
    overrides: {
        MuiDialog: {
            paperWidthSm: {
                maxWidth: 600,
                maxHeight: 650
            }
        }
    }
});

class TableGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            open: false,
            successCloneSnack: false,
            errorCloneSnack: false,
            warningCloneSnack: false,
            warningCloneSnackTwo: false,
            warningCloneSnackThree: false,
            warningFileUpload: false,
            successUnpublishSnack: false,
            errorUnpublishSnack: false,
            successUpload: false,
            errorUpload: false,
            errorDownload: false,
            overallErrorThree: false,
            overallErrorFour: false,
            overallErrorFive: false,
            openUnpublish: false,
            openMobile: false,
            openUpload: false,
            htmlLocation: '',
            name: '',
            productAction: 'override',
            excelFile: null,
            loading: false
        };

    }

    componentDidMount = () => {
        var url = window.location.href;
        var url_get = url.split("apluscontent/")[1];
        var table_url = '';
        this.setState({ loading: true, overallErrorFive: false });

        if (url_get.includes('all'))
            table_url = templateAPI + "/all";
        else
            table_url = templateAPI + "/";

        apitimeout(pendingTimeout, fetch(table_url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                [AuthKey]: localStorage.getItem('token')
            }
        }).then(response => {
            if (response.status == 200)
                return response.json();
            else {
                throw Error(response.statusText);
            }
        }))
            .then(result => {
                this.setState({ loading: false });
                if (result) {
                    this.setState({ tableData: result.data });
                }
                else {
                    this.setState({ tableData: [] });
                }
            })
            .catch((error) => {
                this.setState({ overallErrorFive: true, loading: false });
                setTimeout(() => {
                    this.setState({
                        overallErrorFive: false
                    })
                }, timeout)
                console.log('Looks like there was a problem in finding table data \n');
            });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleDialogOpen = () => {
        this.setState({ openUnpublish: true });
    }

    handleUploadOpen = () => {
        this.setState({ openUpload: true, excelFile: null });
    }

    handleMobileOpen = (relativeLoc) => {
        this.setState({ openMobile: true, htmlLocation: relativeLoc });
    }

    handleDialogClose = () => {
        this.setState({ openUnpublish: false, openMobile: false, open: false, openUpload: false });
    }

    handleProductAction = (e) => {
        this.setState({ productAction: e.target.value });
    }

    countUpperCaseChars = (str) => {
        var count = 0, len = str.length;
        for (var i = 0; i < len; i++) {
            if (/[A-Z]/.test(str.charAt(i))) count++;
        }
        return count;
    }

    readExcel = (e) => {
        e.preventDefault();

        this.setState({ excelFile: e.target.files[0] });
    }

    handleUnpublish = () => {
        var url = window.location.href;
        var tempid = url.split("#")[1];
        this.setState({ loading: true, successUnpublishSnack: false, errorUnpublishSnack: false, openUnpublish: false });

        apitimeout(pendingTimeout, fetch(templateAPI + '/deactivate/' + tempid, {
            method: "POST",
            headers: {
                [AuthKey]: localStorage.getItem('token')
            }
        })).then(response => {
            this.setState({ loading: false });
            if (response.status == 200) {
                this.setState({ successUnpublishSnack: true });
                setTimeout(() => {
                    this.setState({
                        successUnpublishSnack: false
                    });
                    window.location.replace(clientHost + 'all');
                }, timeout);
            }
            else {
                throw Error(response.status);
            }
        })
            .catch((error) => {
                this.setState({ loading: false });
                this.setState({ errorUnpublishSnack: true });
                setTimeout(() => {
                    this.setState({
                        errorUnpublishSnack: false
                    })
                }, timeout);
                console.log('Looks like there was a problem in Deactivating \n');
            });
    }

    handleExcelUpload = () => {
        if (this.state.excelFile != null) {
            var url = window.location.href;
            var xslfile = this.state.excelFile;
            var tempid = url.split("#")[1];
            var excelData = new FormData();
            excelData.append('file', xslfile);
            excelData.append("metaData", JSON.stringify({
                "templateId": tempid,
                "action": this.state.productAction
            }));
            this.setState({ loading: true, successUpload: false, errorUpload: false });
            apitimeout(pendingTimeout, fetch(templateAPI + "/upload/sku", {
                method: "POST",
                headers: {
                    [AuthKey]: localStorage.getItem('token')
                },
                body: excelData
            })).
                then(res => {
                    this.setState({ loading: false });
                    if (res.status == 200) {
                        this.setState({ successUpload: true, openUpload: false });
                        setTimeout(() => {
                            this.setState({
                                successUpload: false
                            });
                            window.location.replace(clientHost + 'all');
                        }, timeout);
                    }
                    else {
                        throw Error(res.statusText);
                    }
                })
                .catch((error) => {
                    this.setState({ loading: false });
                    this.setState({ errorUpload: true });
                    setTimeout(() => {
                        this.setState({
                            errorUpload: false
                        })
                    }, timeout);
                    console.log('Looks like there was a problem in uploading excel file \n');
                });
        }
        else {
            this.setState({ warningFileUpload: true });
            setTimeout(() => {
                this.setState({
                    warningFileUpload: false
                })
            }, timeout);
        }
    }

    handleUploadedExcelDownload = (tempid) => {
        this.setState({ loading: true, errorDownload: false });
        apitimeout(pendingTimeout, fetch(templateAPI + "/download/" + tempid, {
            method: "GET",
            headers: {
                [AuthKey]: localStorage.getItem('token')
            }
        })).
            then(res => {
                if (res.status == 200) {
                    return res.blob();
                }
                else {
                    throw Error(res.statusText);
                }
            })
            .then(result => {
                const url = window.URL.createObjectURL(new Blob([result]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `uploaded_sku.xlsx`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                this.setState({ loading: false });
            })
            .catch((error) => {
                this.setState({ loading: false });
                this.setState({ errorDownload: true });
                setTimeout(() => {
                    this.setState({
                        errorDownload: false
                    })
                }, timeout);
                console.log('Looks like there was a problem in downloading excel file \n');
            });
    }

    handleClose = () => {
        this.setState({ successCloneSnack: false, errorCloneSnack: false, overallErrorThree: false, overallErrorFour: false, warningCloneSnack: false, warningCloneSnackTwo: false, warningCloneSnackThree: false });

        var url = window.location.href;
        var tempid = url.split("#")[1];
        let valid = "";
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        if (this.state.name == '') {
            this.setState({ warningCloneSnackThree: true });
            setTimeout(() => {
                this.setState({
                    warningCloneSnackThree: false
                })
            }, timeout);
        }

        else if (this.countUpperCaseChars(this.state.name) == 0) {
            this.setState({ loading: true });
            let slugName = slugify(this.state.name);
            apitimeout(pendingTimeout, fetch(templateAPI + "/" + slugName + "-" + dd + "-" + mm + "-" + yyyy + "/is-unique", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    [AuthKey]: localStorage.getItem('token')
                }
            })).then(response => {
                if (response.status == 200) {
                    valid = true;
                }
                else if (response.status == 409) {
                    this.setState({ loading: false });
                    valid = false;
                }
                else {
                    this.setState({ loading: false });
                    throw Error(response.status);
                }
                if (valid == true) {
                    apitimeout(pendingTimeout, fetch(templateAPI + '/clone/' + tempid + '/' + slugName + "-" + dd + "-" + mm + "-" + yyyy, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            "X-Requested-With": "XMLHttpRequest",
                            [AuthKey]: localStorage.getItem('token')
                        }
                    })).then(response => {
                        if (response.status == 200)
                            return response.json();
                        else {
                            this.setState({ loading: false });
                            throw Error(response.statusText);
                        }
                    })
                        .then(result => {
                            this.setState({ loading: false });
                            if (Object.keys(result).length > 0) {
                                this.setState({ open: false, successCloneSnack: true });
                                setTimeout(() => {
                                    this.setState({
                                        successCloneSnack: false
                                    });
                                    window.location.replace(clientHost);
                                }, timeout);
                            }
                            else {
                                this.setState({ open: false, errorCloneSnack: true });
                                setTimeout(() => {
                                    this.setState({
                                        errorCloneSnack: false
                                    })
                                }, timeout);
                            }
                        })
                        .catch((error) => {
                            this.setState({ loading: false, overallErrorThree: true });
                            setTimeout(() => {
                                this.setState({
                                    overallErrorThree: false
                                })
                            }, timeout)
                            console.log('Looks like there was a problem in cloning \n');
                        });
                }
                else if (valid == false) {
                    this.setState({ warningCloneSnack: true });
                    setTimeout(() => {
                        this.setState({
                            warningCloneSnack: false
                        })
                    }, timeout);
                }
            })
                .catch((error) => {
                    this.setState({ loading: false, overallErrorFour: true });
                    setTimeout(() => {
                        this.setState({
                            overallErrorFour: false
                        })
                    }, timeout)
                    console.log('Looks like there was a problem in finding unique name \n');
                });
        }
        else {
            this.setState({ warningCloneSnackTwo: true });
            setTimeout(() => {
                this.setState({
                    warningCloneSnackTwo: false
                })
            }, timeout);
        }
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        const { classes } = this.props;
        let dateObj = new Date();

        return (
            <div>
                {this.state.loading && <Loader />}
                <MuiThemeProvider theme={theme}>
                    <MaterialTable
                        title={<span className={classes.tableHeader}>Manage A+ Content</span>}
                        columns={[
                            // { title: 'SNo.', field: 'id', type: 'numeric' },
                            {
                                title: 'Name of File', field: 'templateName',
                                render: rowData => {
                                    const val = rowData.templateName;
                                    const id = rowData.id;
                                    const statusid = rowData.status.id;
                                    const statusname = rowData.status.name;
                                    let block = null;
                                    if (this.props.tabValue === 1) {
                                        block = val;
                                    }
                                    else {
                                        block = <NavLink exact to={preUrl + "/apluscontent/tempview?" + val + "&tid=" + id + "&sid=" + statusid + "&sname=" + statusname}>
                                            <span>
                                                {val}
                                            </span>
                                        </NavLink>;
                                    }
                                    return (
                                        <span>
                                            {block}
                                        </span>
                                    )
                                }
                            },
                            { title: 'Status', field: 'status.displayName' },
                            { title: 'Reviewer', field: 'approvedBy' },
                            { title: 'Manufacturer', field: 'manufacturer' },
                            { title: 'Created By', field: 'createdBy' },
                            { title: 'Created On', field: 'createdOn', type: 'datetime', sorting: false },
                            { title: 'Modified On', field: 'updatedOn', type: 'datetime', sorting: false },
                            {
                                title: 'Action', field: 'action', sorting: false,
                                render: rowData => {
                                    const val = rowData.templateName;
                                    const id = rowData.id;
                                    const statusid = rowData.status.id;
                                    let block = '';
                                    const statusname = rowData.status.name;
                                    var permActions = new Set();
                                    var permissionActionMap = new Map([
                                        [creatorPermission, ["Clone"]],
                                        [reviewerPermission, ["Clone"]],
                                        [publisherPermission, ["Clone", "Republish", "UploadPid"]],
                                        [unpublisherPermission, ["Clone", "Unpublish"]]
                                    ]);
                                    if (localStorage.getItem('userPermission')) {
                                        var permissionArr = localStorage.getItem('userPermission').split(',');
                                        permissionArr.forEach(function (permVal) {
                                            var tempVal = permissionActionMap.get(permVal);
                                            if(tempVal !== undefined) {
                                                tempVal.forEach(function (element) {
                                                    permActions.add(element)
                                                });
                                            }
                                        });
                                        if (statusname === statusActive) {
                                            if (permActions.has('Unpublish') && permActions.has('UploadPid')) {
                                                block = <span><a href={'#' + rowData.id} onClick={this.handleDialogOpen}>Unpublish</a>/<a href={'#' + rowData.id} onClick={this.handleUploadOpen}>Upload</a>/<a href={'#' + rowData.id} onClick={this.handleClickOpen} >Clone</a></span>
                                            }
                                            else if (permActions.has('Unpublish')) {
                                                block = <span><a href={'#' + rowData.id} onClick={this.handleDialogOpen}>Unpublish</a>/<a href={'#' + rowData.id} onClick={this.handleClickOpen} >Clone</a></span>
                                            }
                                            else if (permActions.has('UploadPid')) {
                                                block = <span><a href={'#' + rowData.id} onClick={this.handleUploadOpen}>Upload</a>/<a href={'#' + rowData.id} onClick={this.handleClickOpen} >Clone</a></span>
                                            }
                                            else {
                                                block = <span><a href={'#' + rowData.id} onClick={this.handleClickOpen} >Clone</a></span>
                                            }
                                        }
                                        else if (statusname === statusSentForPublish || statusname === statusPending) {
                                            if (permActions.has('Republish')) {
                                                block = <span><NavLink exact to={preUrl + "/apluscontent/tempview?" + val + "&tid=" + id + "&sid=" + statusid + "&sname=" + statusname}>Republish</NavLink>/<a href={'#' + rowData.id} onClick={this.handleClickOpen} >Clone</a></span>
                                            }
                                            else {
                                                block = <span><a href={'#' + rowData.id} onClick={this.handleClickOpen} >Clone</a></span>
                                            }

                                        }
                                        else if (statusname === statusDraft || statusname === statusReview) {
                                            block = ''
                                        }
                                        else {
                                            block = <a href={'#' + rowData.id} onClick={this.handleClickOpen} >Clone</a>
                                        }
                                    }
                                    return (
                                        <span>
                                            {block}
                                        </span>
                                    )
                                },
                            },
                            {
                                title: 'Preview', field: 'location', sorting: false,
                                render: rowData => {
                                    const app = "App";
                                    const web = "Web";
                                    const templateId = rowData.id;
                                    const dwnld = "Download SKU";
                                    const htmlloc = rowData.location;
                                    const statusname = rowData.status.name;
                                    let block = false;
                                    if (!htmlloc) {
                                        block = '';
                                    }
                                    else if (statusname === statusActive) {
                                        block = <span><a href='#' onClick={() => this.handleMobileOpen(htmlloc)}>{app}</a>/<a href={imageHost + htmlloc} target="_blank">{web}</a>/<a href={'#'} onClick={() => this.handleUploadedExcelDownload(templateId)}>{dwnld}</a></span>;
                                    }
                                    else {
                                        block = <span><a href='#' onClick={() => this.handleMobileOpen(htmlloc)}>{app}</a>/<a href={imageHost + htmlloc} target="_blank">{web}</a></span>;
                                    }
                                    return (
                                        <span>
                                            {block}
                                        </span>
                                    )
                                }
                            },
                        ]}
                        data={this.state.tableData}
                        options={{
                            pageSize: pageListSize,
                            search: false,
                            paging: false,
                            headerStyle: {
                                fontFamily: "ProximaNova-Regular"
                            },
                            rowStyle: {
                                fontFamily: "ProximaNova-Regular"
                            }
                        }}
                    />
                </MuiThemeProvider>
                <MuiThemeProvider theme={themeDialog}>
                    <Dialog open={this.state.open} onClose={this.handleDialogClose} aria-labelledby="form-dialog-title" >
                        <DialogTitle id="form-dialog-title">Name of A+ Content</DialogTitle>
                        <DialogContent>
                            <Tooltip title={longText} placement="right">
                                <TextField
                                    id="standard-name"
                                    label={<span className={classes.labelStyle}>Name</span>}
                                    className={classes.textField}
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                    autoComplete="off"
                                    InputProps={{
                                        classes: {
                                            input: classes.inputStyle
                                        }
                                    }}
                                    required
                                />
                            </Tooltip>
                        </DialogContent>
                        <DialogActions>
                            <Button className={classes.buttonCloseStyle} onClick={this.handleDialogClose}>
                                Close
                            </Button>
                            <Button className={classes.buttonCreateStyle} onClick={this.handleClose} >
                                Clone
                            </Button>
                        </DialogActions>
                    </Dialog>
                </MuiThemeProvider>

                <MuiThemeProvider theme={themeDialog}>
                    <Dialog open={this.state.openUpload} onClose={this.handleDialogClose} aria-labelledby="form-dialog-title" >
                        <DialogTitle id="form-dialog-title">Upload Product Id File</DialogTitle>
                        <DialogContent>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="paction-simple" className={classes.labelStyle}>Select Action for Product</InputLabel>
                                <Select
                                    value={this.state.productAction}
                                    onChange={this.handleProductAction}
                                    required
                                    InputProps={{
                                        name: 'paction',
                                        id: 'paction-simple',
                                        classes: {
                                            root: classes.inputContainer,
                                            input: classes.inputStyle
                                        }
                                    }}
                                >
                                    <MenuItem value="append">append</MenuItem>
                                    <MenuItem value="override">override</MenuItem>
                                </Select>
                            </FormControl>
                            <span className={classes.uploadLabelStyle} >Upload Sku:</span><br />
                            <input
                                type="file"
                                id="uploadExcel"
                                className={classes.uploadInputStyle}
                                accept=".csv,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={this.readExcel}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button className={classes.buttonCloseStyle} onClick={this.handleDialogClose}>
                                Close
                            </Button>
                            <Button className={classes.buttonCreateStyle} onClick={this.handleExcelUpload} >
                                Upload
                            </Button>
                        </DialogActions>
                    </Dialog>
                </MuiThemeProvider>

                <MuiThemeProvider theme={themeDialog}>
                    <Dialog open={this.state.openUnpublish} onClose={this.handleDialogClose} aria-labelledby="form-dialog-title" >
                        <DialogTitle id="form-dialog-title">Do you want to unpublish this Aplus content?</DialogTitle>
                        <DialogActions>
                            <Button className={classes.buttonCloseStyle} onClick={this.handleDialogClose}>
                                No
                            </Button>
                            <Button className={classes.buttonCreateStyle} onClick={this.handleUnpublish}>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </MuiThemeProvider>

                <MuiThemeProvider theme={themeDialogMobile}>
                    <Dialog open={this.state.openMobile} onClose={this.handleDialogClose} aria-labelledby="form-dialog-title" >
                        <DialogTitle id="form-dialog-title">Mobile Preview</DialogTitle>
                        <DialogContent>
                            <div className={classes.rootFrame}>
                                <div className={classes.frame}>
                                    <div className={classes.inner}>
                                        <iframe src={imageHost + this.state.htmlLocation} height="500" width="263" name={dateObj.getSeconds()} className={classes.iframeStyle}>
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button className={classes.buttonCloseStyle} onClick={this.handleDialogClose}>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </MuiThemeProvider>
                {this.state.overallErrorThree && <ErrorToast message="Error in Processing" />}
                {this.state.overallErrorFour && <ErrorToast message="Error in Processing" />}
                {this.state.overallErrorFive && <ErrorToast message="Error in Processing" />}
                {this.state.successUnpublishSnack && <SuccessToast message="Aplus Template is Sucessfully Unpublished" />}
                {this.state.errorUnpublishSnack && <ErrorToast message="Unsucessfull while Unpublishing" />}
                {this.state.successCloneSnack && <SuccessToast message="Aplus Template is Sucessfully Cloned" />}
                {this.state.errorCloneSnack && <ErrorToast message="Unsucessfull while Cloning" />}
                {this.state.successUpload && <SuccessToast message="Excel file upload Successfully" />}
                {this.state.errorUpload && <ErrorToast message="Unsucessfull while Uploading" />}
                {this.state.warningFileUpload && <WarningToast message="Please select a excel file" />}
                {this.state.warningCloneSnack && <WarningToast message="The AplusTemplate Name Exists" />}
                {this.state.warningCloneSnackTwo && <WarningToast message="The Name Contains Capital Letters" />}
                {this.state.warningCloneSnackThree && <WarningToast message="The Name Cannot be Empty" />}
                {this.state.errorDownload && <ErrorToast message="Error while downloading" />}
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(TableGrid));