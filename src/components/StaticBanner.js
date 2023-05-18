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
import Button from "@material-ui/core";
import AddCircle from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import '../assets/styles/staticbanner.css';

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

class StaticBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabValue: 0,
            data:[],
			      isLoading: true,
            fieldName:"bannerType",
            fieldValue:"",
        }
    }
    debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            func.apply(this, args);
          }, timeout);
        };
      }
    debouncedHandleFilterApi = this.debounce((field, filterTerm) => {
        
        this.handleFilterApi(field, filterTerm.toLowerCase());
      }, 300);

    componentDidMount = () => {
        // hotst + url n/both shoi/uld be from config
        let url='https://qas16.bigbasket.com/content-svc/static-banner/get/banners-list?page=1';
        fetch(url,{
            method:'GET',
            headers:{
                "x-project": "mm-canary",
                "authorization": "eEEM7k78fGfyfy7XQJcyAeekCdeV3u5x"
            }
        }).then(response=>response.json()).then(response=>response.banners)
        .then(response=>{
            for(var i = 0; i < response.length; i++) {
                response[i]['bannerType']=<a href={grootHost +'/bannerdetails/'+response[i]['id']}>{response[i]['bannerType']}</a>
                delete response[i]['id'];
                delete response[i]['contentType'];
                delete response[i]['createdById'];
                delete response[i]['description'];
                delete response[i]['fileName'];
                delete response[i]['internalName'];
                delete response[i]['s3Path'];
                var arrayToString = response[i]['ecGroupNames'].join(' ');
                console.log(arrayToString);
                response[i]['ecGroupNames']=arrayToString;
                for (const key in response[i]) {  
                    if (response[i][key]==null){
                        response[i][key]='';
                    }
                  }
                  if (response[i]['createdDate']!=null){
                    response[i]['createdDate']=new Date(response[i]['createdDate']).toLocaleString();
                  }
                  if (response[i]['updatedDate']!=null){
                    response[i]['updatedDate']=new Date(response[i]['updatedDate']).toLocaleString();
                  }
            }
            this.setState({data:response,isLoading:false})     

        }).catch(error=>console.log(error))
    }
    handleButtonClick = (e) => {
        var url = window.location.href;
        var host = url.split("apluscontent/");
        var form_url = host[0] + "apluscontent/form";
        window.location.href = form_url;
      }

    handleFilterApi=(columnName,columnValue)=>{
        this.setState({isLoading:true})
        let k=columnName;
        const v=columnValue;
        const url = 'https://qas16.bigbasket.com/content-svc/static-banner/filter?filters=[{"' + k + '": "' + v + '" }]';
        console.log(url);
        fetch(url,{
            method:'GET',
            headers:{
                "x-project": "mm-canary",
                "authorization": "eEEM7k78fGfyfy7XQJcyAeekCdeV3u5x"
            }
        }).then(response=>response.json()).then(response=>response.banners)
        .then(response=>{
            
            for(var i = 0; i < response.length; i++) {
                response[i]['bannerType']=<a href={grootHost +'/bannerdetails/'+response[i]['id']}>{response[i]['bannerType']}</a>
                delete response[i]['id'];
                delete response[i]['contentType'];
                delete response[i]['createdById'];
                delete response[i]['description'];
                delete response[i]['fileName'];
                delete response[i]['internalName'];
                delete response[i]['s3Path'];
                var arrayToString = response[i]['ecGroupNames'].join(' ');
                console.log(arrayToString);
                response[i]['ecGroupNames']=arrayToString;
                for (const key in response[i]) {  
                    if (response[i][key]==null){
                        // if (key=='createdDate' ||key=='updatedDate'){
                        //     response[i][key]='';
                        // }
                        response[i][key]='';
                    }
                  }
                  if (response[i]['createdDate']!=null){
                    response[i]['createdDate']=new Date(response[i]['createdDate']).toLocaleString();
                  }
                  if (response[i]['updatedDate']!=null){
                    response[i]['updatedDate']=new Date(response[i]['updatedDate']).toLocaleString();
                  }
                  
                  
            }
            this.setState({data:response,isLoading:false})      

        }).catch(error=>console.log(error))
    }

    handleDropdownChange=(e)=>{
      this.setState({fieldName:e.target.value})
    }
    handleTextChange=(e)=>{
        this.setState({fieldValue:e.target.value},()=>{
            this.debouncedHandleFilterApi(this.state.fieldName, this.state.fieldValue);
        });
    }

    render() {
        const { classes } = this.props;
        const data=this.state.data;
        console.log(data);
        return (
            <div className={classes.root}>

<div className='iconButton'>
<IconButton  aria-label="Add" onClick={this.handleButtonClick} style={{cursor:"pointer"}}>
      <AddIcon />
      <label style={{cursor:"pointer"}}>Create new</label>
  </IconButton>
</div >
        
        <select className='selectBox' value={this.state.fieldName} onChange={this.handleDropdownChange}>
            <option value="bannerType">Banner Type</option>
            <option value="deviceType">Device Type</option>
            <option value="displayName">Display Name</option>
            <option value="ecGroupNames">EC Group Names</option>
            <option value="isActive">Is Active</option>
            <option value="status">Status</option>
            <option value="createdBy">Created By</option>
            <option value="createdDate">Created Date</option>
            <option value="reviewComment">Review Comment</option>
            <option value="reviewedBy">Reviewed By</option>
            <option value="updatedDate">Updated Date</option>
          </select>
          <input  className='searchBox' type="text" value={this.state.fieldValue} onKeyDown={this.handleTextChange} onChange={this.handleTextChange} />
          <button 
  className='submitButton'
  onClick={(e) => {
    console.log(e.target.value);
    this.debouncedHandleFilterApi(this.state.fieldName, this.state.fieldValue);
  }}
>
  Search
</button>
        <button
        className='refreshButton'
  onClick={(e)=>{
    this.state.fieldValue="";
    this.componentDidMount();
}}
>
    refresh
</button> 
<div className='materialTable'>
<MaterialTable
      title="List of banners"
      columns={[
        { title: 'Banner Type', field: 'bannerType'},
          {
            title: 'Device Type',
            field: 'deviceType'
          },
          { title: 'Display Name', field: 'displayName'},
          { title: 'Ec Group Names', field: 'ecGroupNames'},
          { title: 'is Active', field: 'isActive', type: 'numeric'},
          { title: 'Status', field: 'status',tabValue:'term'},
        { title: 'Created By', field: 'createdBy'},
        { title: 'Created Date', field: 'createdDate', type: 'numeric'},
        { title: 'Review Comment', field: 'reviewComment'},
        { title: 'Reviewed By', field: 'reviewedBy'},
        { title: 'Updated Date', field: 'updatedDate', type:'numeric'},
      ]}
      data={this.state.data}        
      options={{
        filtering: false,
        search:false,
        pageSize: 10
      }}    
	  isLoading={this.state.isLoading}
    />
</div>

            </div>
        );
    }
}

StaticBanner.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(StaticBanner));