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
import MaterialTable from 'material-table';
import { apitimeout } from './api_timeout';
import { Link } from '@material-ui/core';



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

class BannerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            tabValue: 0,
            filterText: "",
            filterValue:"",
            filterColumn:"",
            data:[],
            searchText:"",
			isLoading: true,
            searchBarRef : React.createRef(),
            responseObject:[],
        }
    }
    
        componentDidMount = () => {
            const { id } = this.props.match.params;
        this.handleBannerDetails(id);
        }
    
    handleBannerDetails = (id) => {
        // hotst + url n/both shoi/uld be from config
        let url='https://qas16.bigbasket.com/content-svc/static-banner/get/'+id;
        fetch(url,{
            method:'GET',
            headers:{
                "x-project": "mm-canary",
                "authorization": "_x4dzSTlxTAg_CX34OK5ZJ8Fym4VJaCt"
            }
        }).then(response=>response.json())
        .then(response=>{
            console.log(response);

            this.setState({responseObject:response})
        }) 
        
        // return response;
    }
    render() {
        const { classes } = this.props;
        // const { id }= this.props.params;
        // console.log(id);
        
        // console.log(responseObject);
        // console.log('this is the valur of id ',id);
        console.log(this.state.responseObject);
        return (
            <div className={classes.root}>
<h1>BannerDetails</h1>
        <p>Image :</p>
        <img src={this.state.responseObject['s3Path']}></img>
       
        <MaterialTable
      title="List of banners"
      columns={[
        { title: 'Banner Details', field: 'field'},
        { title: 'Value', field: 'value' },
      ]}
      data={[{field:'Banner Type',value:this.state.responseObject["bannerType"]},
      {field:'Content type',value:this.state.responseObject['contentType']},
      {field:'created By',value:this.state.responseObject['createdBy']},
      {field:'created By ID',value:this.state.responseObject['createdById']},
      {field:'created Date',value:this.state.responseObject['createdDate']},
      {field:'Description',value:this.state.responseObject['description']},
      {field:'Device Type',value:this.state.responseObject['deviceType']},
      {field:'Display Name',value:this.state.responseObject['displayName']},
      {field:'Ec Group Names',value:this.state.responseObject['ecGroupNames']},
      {field:'Internal Name',value:this.state.responseObject['internalName']},
      {field:'is Active',value:this.state.responseObject['isActive']},
      {field:'Review Comment',value:this.state.responseObject['reviewComment']},
      {field:'Reviewed By',value:this.state.responseObject['reviewedBy']},
      {field:'Status',value:this.state.responseObject['status']},
      {field:'Updated Date',value:this.state.responseObject['updatedDate']},
    ]}       
      options={{
        filtering: false,
        search:false,
      }}    
	  
    />
            </div>
        );
    }
}
        //  <p>Banner type:{this.state.responseObject['bannerType']}</p>
        //  <p>Content type:{this.state.responseObject['contentType']}</p>
        //  <p>created By:{this.state.responseObject['createdBy']}</p>
        //  <p>created By ID:{this.state.responseObject['createdById']}</p>
        //  <p>created Date:{this.state.responseObject['createdDate']}</p>
        //  <p>Description:{this.state.responseObject['description']}</p>
        //  <p>Device Type:{this.state.responseObject['deviceType']}</p>
        //  <p>Display Name:{this.state.responseObject['displayName']}</p>
        //  <p>Ec Group Names:{this.state.responseObject['ecGroupNames']}</p>
        //  <p>Internal Name:{this.state.responseObject['internalName']}</p>
        //  <p>is Active:{this.state.responseObject['isActive']}</p>
        //  <p>Review Comment:{this.state.responseObject['reviewComment']}</p>
        //  <p>Reviewed By:{this.state.responseObject['reviewedBy']}</p>
        //  <p>Status:{this.state.responseObject['status']}</p>
        //  <p>Updated Date:{this.state.responseObject['updatedDate']}</p>
         
         
            // </div>
//         );
//     }
// }

BannerDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(BannerDetails));