import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import "../assets/styles/MaterialIcons.css";
import Table from './TableGrid';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ paddingLeft: 23 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: '70px'
    },
    tableStyle: {
        width: '100%',
    },
    buttonStyle: {
        margin: theme.spacing.unit,
    },
    IconStyle: {
        marginRight: theme.spacing.unit,
    },
    tabStyle: {
        marginLeft: '23px'
    },
    tabNameStyle: {
        fontSize: 14,
        fontFamily: "ProximaNova-SemiBold",
        textTransform: "none",
        textDecoration: "none"
    }
});

class ManageAplusTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            tabValue: 0
        }
    }

    componentDidMount = () => {
        var url = window.location.href;
        var url_get = url.split("apluscontent/")[1];

        if (url_get.includes('all'))
            this.setState({ tabValue: 1 });
        else
            this.setState({ tabValue: 0 });
    }

    handleChangeTab = (event, value) => {
        if (value === 0) {
            this.setState({ tabValue: 0 });
        }
        else {
            this.setState({ tabValue: 1 });
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={8}>
                    <Grid item className={classes.tabStyle} xs>
                        <Tabs value={this.state.tabValue} onChange={this.handleChangeTab}>
                            <Tab
                                component={NavLink}
                                to={grootHost + "/"}
                                disableRipple
                                label={<span className={classes.tabNameStyle}>On-Going AplusContent</span>}
                            />
                            <Tab component={NavLink}
                                to={grootHost + "/all"}
                                disableRipple
                                label={<span className={classes.tabNameStyle}>All AplusContent</span>}
                            />
                        </Tabs>
                    </Grid>
                </Grid>
                {<TabContainer>
                    <div className={classes.tableStyle} >
                        <Table tabValue={this.state.tabValue} />
                    </div>
                </TabContainer>
                }
                {this.state.tabValue === 1 && <TabContainer>
                    <div className={classes.tableStyle} >
                        <Table tabValue={this.state.tabValue} />
                    </div>
                </TabContainer>
                }
            </div>
        );
    }
}

ManageAplusTemplate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ManageAplusTemplate));
