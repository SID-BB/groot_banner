import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { apitimeout } from './api_timeout';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircle from '@material-ui/icons/AddCircle';
import LogoIcon from '../assets/images/CMS_logo.svg';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import BookIcon from '@material-ui/icons/LibraryBooks';
import ErrorToast from './ErrorToast';
import Loader from './Loading';

const modalRoot = document.getElementById('modal-root');

const styles = theme => ({
    root: {
        width: '100%',
    },

    grow: {
        flexGrow: 1,
    },

    buttonStyle: {
        fontSize: 15,
        fontFamily: "ProximaNova-Regular",
        color: "white",
        margin: theme.spacing.unit,
    },

    menuButtonStyle: {
        fontSize: 15,
        fontFamily: "ProximaNova-Regular",
        color: "white",
        margin: 5,
    },

    IconStyle: {
        marginRight: theme.spacing.unit,
        marginTop: -3
    },

    appbarstyle: {
        position: "fixed",
        backgroundColor: "#009c50",
    },

    toolbarStyle: {
        display: 'flex',
        justifyContent: 'space-between'
    },

    logoStyle: {
        display: 'flex',
        justifyContent: 'flex-start'
    },

    navlinkStyle: {
        display: 'flex',
        justifyContent: 'flex-end'
    },

    link: {
        textDecoration: "none"
    }
});

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setAnchor: null,
            loading: false,
            errorDownload: false,
            clientHost: null,
        }
    }

    componentDidMount() {
        var url = window.location.href;
        var host = url.split('/content-svc')[0];
        this.setState({ clientHost: host });
    }

    handleMenuClick = (event) => {
        this.setState({ setAnchor: event.currentTarget });
    }

    handleMenuClose = () => {
        this.setState({ setAnchor: null });
    }

    handleExcelDownload = () => {
        this.setState({ loading: true, errorDownload: false });
        apitimeout(pendingTimeout, fetch(this.state.clientHost + templateAPI + "/sample/download", {
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
                link.setAttribute('download', `sample_sku.xlsx`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                this.setState({ loading: false, setAnchor: null });
            })
            .catch((error) => {
                this.setState({ loading: false });
                this.setState({ errorDownload: true });
                setTimeout(() => {
                    this.setState({
                        errorDownload: false
                    })
                }, timeout);
                console.log('Looks like there was a problem in downloading excel file \n', error);
            });
    }

    handleUserManualDownload = () => {
        this.setState({ loading: true, errorDownload: false });
        if (localStorage.getItem('token')) {
            apitimeout(pendingTimeout, fetch("/media/uploads/groot/pdfs/user_manual.pdf", {
                method: "GET"
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
                link.setAttribute('download', `user_manual.pdf`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                this.setState({ loading: false, setAnchor: null });
            })
            .catch((error) => {
                this.setState({ loading: false });
                this.setState({ errorDownload: true });
                setTimeout(() => {
                    this.setState({
                        errorDownload: false
                    })
                }, timeout);
                console.log('Looks like there was a problem in downloading manual \n', error);
            });
        }
    }

    handleLogout = () => {
        this.handleMenuClose;
        if (localStorage.getItem('source_host') === 'partner') {
            localStorage.clear();
            window.location.replace(this.state.clientHost + partnerLogoutUrl);
        }
        else {
            localStorage.clear();
            window.location.replace(this.state.clientHost + catalogHost);
        }
    }

    render() {
        const { classes } = this.props;
        const open = Boolean(this.state.setAnchor);
        let toggle = this.props.togglePerm;
        if (localStorage.getItem('userPermission') !== null) {
            if (localStorage.getItem('userPermission').includes(creatorPermission)) {
                toggle = true;
            }
            else {
                toggle = false;
            }
        }
        return (
            <div className={classes.root}>
                {this.state.loading && <Loader />}
                <AppBar className={classes.appbarstyle} >
                    <Toolbar className={classes.toolbarStyle}>
                        <div className={classes.logoStyle}>
                            <img src={LogoIcon} width="120px" height="40px" />
                        </div>
                        <div className={classes.navlinkStyle}>
                            <NavLink exact to={grootHost + "/"} className={classes.link} >
                                <Button color="primary" className={classes.buttonStyle}>
                                    <Home className={classes.IconStyle} />
                                    Home
                                </Button>
                            </NavLink>
                            {toggle && <NavLink exact to={grootHost + "/choosetemp"} className={classes.link}>
                                <Button color="primary" className={classes.buttonStyle} >
                                    <AddCircle className={classes.IconStyle} />
                                    Create New
                                </Button>
                            </NavLink>}
                            <IconButton
                                aria-label="More"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={this.handleMenuClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                anchorEl={this.state.setAnchor}
                                keepMounted
                                open={open}
                                onClose={this.handleMenuClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: 45 * 4.5,
                                        width: 215,
                                        backgroundColor: '#009c50'
                                    },
                                }}
                            >
                                <Button color="primary" className={classes.menuButtonStyle} onClick={this.handleLogout} >
                                    <AccountCircle className={classes.IconStyle} />
                                    Logout
                                </Button>
                                <Button color="primary" className={classes.menuButtonStyle} onClick={this.handleUserManualDownload} >
                                    <BookIcon className={classes.IconStyle} />
                                    User Manual
                                </Button>
                                <Button color="primary" className={classes.menuButtonStyle} onClick={this.handleExcelDownload} >
                                    <DownloadIcon className={classes.IconStyle} />
                                    Sample Download
                                </Button>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                {this.state.errorDownload && ReactDOM.createPortal(<ErrorToast message="Error while downloading" />, modalRoot)}
            </div>
        );
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Navbar);