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
            open: false,
            tabValue: 0,
            filterText: "",
            filterValue:"",
            filterColumn:"",
            data:[],
            searchText:"",
			isLoading: true,
            fieldName:"bannerType",
            fieldValue:"",
            searchBarRef : React.createRef()
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
        this.handleFilterApi(field, filterTerm);
      }, 300);

    componentDidMount = () => {
        // hotst + url n/both shoi/uld be from config
        let url='https://qas16.bigbasket.com/content-svc/static-banner/get/banners-list?page=1';
        fetch(url,{
            method:'GET',
            headers:{
                "x-project": "mm-canary",
                "authorization": "7PnYSg1KgYQXVUEShRNtDicvJVZePwOS"
            }
        }).then(response=>response.json()).then(response=>response.banners)
        .then(response=>{
            const objectOrder = {
                'bannerType': null,
                'deviceType': null,
                'displayName':null,
                'ecGroupNames':null,
                'isActive':null,
                'status':null,
              }
            // response=Object.assign(objectOrder,response);
            for(var i = 0; i < response.length; i++) {
                response[i]['bannerType']=<a href={grootHost +'/bannerdetails/'+response[i]['id']}>{response[i]['bannerType']}</a>
                delete response[i]['id'];
                delete response[i]['contentType'];
                delete response[i]['createdById'];
                delete response[i]['description'];
                delete response[i]['fileName'];
                delete response[i]['internalName'];
                delete response[i]['s3Path'];
                var arrayToString='';
                for (var j=0;j<response[i]['ecGroupNames'].length;j++){
                    arrayToString+=response[i]['ecGroupNames'][j]+' ';
                }
                console.log(arrayToString);
                response[i]['ecGroupNames']=arrayToString;
                for (const key in response[i]) {  
                    if (response[i][key]==null){
                        if (key=='createdDate' ||key=='updatedDate'){
                            response[i][key]='';
                        }
                        response[i][key]='';
                    }
                  }
                response[i]['createdDate']=new Date(response[i]['createdDate']).toLocaleString();
                response[i]['updatedDate']=new Date(response[i]['updatedDate']).toLocaleString();
            }
            this.setState({data:response,isLoading:false})     
            this.searchBarRef='' 

        }).catch(error=>console.log(error))
    }
    handleButtonClick = (e) => {
        var url = window.location.href;
        var host = url.split("apluscontent/");
        var form_url = host[0] + "apluscontent/form";
        window.location.href = form_url;
      }

    handleFilterApi=(columnName,columnValue)=>{
        let k=columnName;
        const v=columnValue;
        const url = 'https://qas16.bigbasket.com/content-svc/static-banner/filter?filters=[{"' + k + '": "' + v + '" }]';
        console.log(url);
        fetch(url,{
            method:'GET',
            headers:{
                "x-project": "mm-canary",
                "authorization": "7PnYSg1KgYQXVUEShRNtDicvJVZePwOS"
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
                var arrayToString='';
                for (var j=0;j<response[i]['ecGroupNames'].length;j++){
                    arrayToString+=response[i]['ecGroupNames'][j]+' ';
                }
                console.log(arrayToString);
                response[i]['ecGroupNames']=arrayToString;
                for (const key in response[i]) {  
                    if (response[i][key]==null){
                        if (key=='createdDate' ||key=='updatedDate'){
                            response[i][key]='';
                        }
                        response[i][key]='';
                    }
                  }
                  response[i]['createdDate']=new Date(response[i]['createdDate']).toLocaleString();
                  response[i]['updatedDate']=new Date(response[i]['updatedDate']).toLocaleString();
            }
            this.setState({data:response,isLoading:false})      

        }).catch(error=>console.log(error))
    }

    handleSearchApi=(searchValue)=>{
        const s=searchValue;
        const url='https://qas16.bigbasket.com/content-svc/static-banner/search?searchQuery="'+s+'"';
        console.log(url);
        fetch(url,{
            method:'GET',
            headers:{
                "x-project": "mm-canary",
                "authorization": "7PnYSg1KgYQXVUEShRNtDicvJVZePwOS"
            }
        }).then(response=>response.json()).then(response=>response.banners)
        .then(response=>{
            
            for(var i = 0; i < response.length; i++) {

                delete response[i]['id'];
                delete response[i]['contentType'];
                delete response[i]['createdById'];
                delete response[i]['description'];
                delete response[i]['fileName'];
                delete response[i]['internalName'];
                delete response[i]['s3Path'];
                var arrayToString='';
                for (var j=0;j<response[i]['ecGroupNames'].length;j++){
                    arrayToString+=response[i]['ecGroupNames'][j]+' ';
                }
                console.log(arrayToString);
                response[i]['ecGroupNames']=arrayToString;
                for (const key in response[i]) {  
                    if (response[i][key]==null){
                        if (key=='createdDate' ||key=='updatedDate'){
                            response[i][key]='';
                        }
                        response[i][key]='';
                    }
                  }
                  response[i]['createdDate']=new Date(response[i]['createdDate']).toLocaleString();
                  response[i]['updatedDate']=new Date(response[i]['updatedDate']).toLocaleString();
            }
            this.setState({data:response,isLoading:false})
        }).catch(error=>console.log(error))
        return null;
    }
    // handleKeyEnter=(e)=>{
    //     if (e.keyCode === 13) {
    //         console.log('You pressed the enter key!')
    //         this.handleSearchApi(this.state.searchText);
    //       }
    // }
    handleDropdownChange=(e)=>{
      this.setState({fieldName:e.target.value})
    }
    handleTextChange=(e)=>{
        this.setState({fieldValue:e.target.value},()=>{
            this.debouncedHandleFilterApi(this.state.fieldName, this.state.fieldValue);
        });
    }

    // handleFilter = (column, value) => {
    //     console.log('inside the handle filter');
    //     this.handleFilterApi(column.field, value);
    //   };
    render() {
        const { classes } = this.props;
        const data=this.state.data;
        console.log(data);
        return (
            <div className={classes.root}>
{/* <button 
  className='filter-button'
  onClick={(e) => {
    //  setSearchMovie(searchFieldValue);
    let output = "";
    let currentChar = this.state.filterValue.charAt(0);
    let count = 1;
    for (let i = 1; i < this.state.filterValue.length; i++) {
        if (this.state.filterValue.charAt(i) === currentChar) {
          count++;
        } else {
          output += currentChar;
          currentChar = this.state.filterValue.charAt(i);
          count = 1;
        }
      }
      
      output += currentChar;
      console.log('the repeated words output');
      console.log(output);
      this.state.filterValue=output;
    //   this.setState({filterValue:output});
    console.log(e.target.value);
    // this.handleFilterApi("deviceType",this.state.searchText);
    this.handleFilterApi('deviceType',this.state.filterValue);
    //  this.handleFilterSearch(e.target.value,'bannerType');
    //  this.handleFilterApi("deviceType","e.target.value");
  }}
>
  Filter
</button> */}
<IconButton aria-label="Add" onClick={this.handleButtonClick} style={{cursor:"pointer"}}>
      <AddIcon />
      <label style={{cursor:"pointer"}}>Create new</label>
  </IconButton>

          <select value={this.state.fieldName} onChange={this.handleDropdownChange}>
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
        <br />
          <input type="text" value={this.state.fieldValue} onKeyDown={this.handleTextChange} onChange={this.handleTextChange} />
          <button 
  className='search-button'
  onClick={(e) => {
    //  setSearchMovie(searchFieldValue);
    console.log(e.target.value);
    // this.handleFilterApi("deviceType",this.state.searchText);
    this.debouncedHandleFilterApi(this.state.fieldName, this.state.fieldValue);
    //  this.handleFilterSearch(e.target.value,'bannerType');
    //  this.handleFilterApi("deviceType","e.target.value");
  }}
>
  Search
</button>
        <button
  onClick={(e)=>{
    this.state.fieldValue="";
    this.componentDidMount();
}}
>
    refresh
</button> 
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
        );
    }
}

StaticBanner.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(StaticBanner));