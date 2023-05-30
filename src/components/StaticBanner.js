import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import "../assets/styles/MaterialIcons.css";
import MaterialTable from 'material-table';
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
            fieldValue:"",
            clientHost:"",
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
    
    debouncedHandleFilterApi = this.debounce((columnValue) => {
      this.handleFilterApi(columnValue.toLowerCase());
    }, 300);

    componentDidMount(){
        var host = window.location.origin;
        console.log(host)
        this.setState({ clientHost: host });
        this.handleBannerList();
    }
    handleBannerList=()=>{
        let url=this.state.clientHost+'/content-svc/static-banner/get/banners-list?page=1';
        fetch(url,{
            method:'GET',
            headers:{
                "x-project": "mm-canary",
                "authorization": "ppWieJYvHdHawPdXrh7TTTuX56NXc3TT"
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

    handleFilterApi=(columnValue)=>{
        this.setState({isLoading:true})
        const v=columnValue;
        const url = this.state.clientHost+'/content-svc/static-banner/filter?filters='+v;
        fetch(url,{
            method:'GET',
            headers:{
                "x-project": "mm-canary",
                "authorization": "ppWieJYvHdHawPdXrh7TTTuX56NXc3TT"
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
    handleTextChange=(e)=>{
        this.setState({fieldValue:e.target.value},()=>{
            this.debouncedHandleFilterApi(this.state.fieldValue);
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
          <input  className='searchBox' type="text" value={this.state.fieldValue} onKeyDown={this.handleTextChange} onChange={this.handleTextChange} />
          <button 
  className='submitButton'
  onClick={(e) => {
    console.log(e.target.value);
    this.debouncedHandleFilterApi(this.state.fieldValue);
  }}
>
  Search
</button> 
<button
        className='refreshButton'
  onClick={(e)=>{
    this.setState({isLoading:true})
    // this.state.fieldValue="";
    this.setState({fieldValue:""})
    this.handleBannerList();
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
        pageSize: 20,
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