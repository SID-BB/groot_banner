import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter, Link, Router } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import "../assets/styles/MaterialIcons.css";
import Table from "./TableGrid";
import MaterialTable from "material-table";
import { apitimeout } from "./api_timeout";
// import { Link } from '@material-ui/core';
import "../assets/styles/bannerdetails.css";
import Button from "@material-ui/core/Button";

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

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "70px",
  },
  tableStyle: {
    width: "100%",
  },
  buttonStyle: {
    margin: theme.spacing.unit,
  },
  IconStyle: {
    marginRight: theme.spacing.unit,
  },
  tabStyle: {
    marginLeft: "23px",
  },
  tabNameStyle: {
    fontSize: 14,
    fontFamily: "ProximaNova-SemiBold",
    textTransform: "none",
    textDecoration: "none",
  },
});

class BannerDetails extends Component {
  constructor(props) {
    super(props);
    // this.history = new Router();
    this.state = {
      data: [],
      searchText: "",
      isLoading: true,
      responseObject: [],
      isDraft: false,
      isReviewPending: false,
      reviewComment: "",
    };
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.handleBannerDetails(id);
  };

  handleDraft = () => {
    const { id } = this.props.match.params;
    let url =
      "https://qas16.bigbasket.com/content-svc/static-banner/send-for-review/" +
      id;
    fetch(url, {
      method: "PUT",
      headers: {
        authorization: "eEEM7k78fGfyfy7XQJcyAeekCdeV3u5x",
        "x-tracker": "manish-testing",
        "x-project": "mm-canary",
        Accept: "application/json",
      },
    }).then(()=>{
        this.props.history.push(grootHost + '/staticbanners'); 
      })
      .catch((error) => {
        // Handle error if needed
        console.error(error);
      });
    //   window.location.href = grootHost + '/staticbanners';
    //   window.location.reload();
  };

  handleReject=()=>{
    const {id}=this.props.match.params;
   let url='https://qas16.bigbasket.com/content-svc/static-banner/reject/'+id;
   var formdata = new FormData();
   formdata.append("reviewComment", this.state.reviewComment);
   fetch(
    url,
    {
      method: "PUT",
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'DNT': '1',
        'Pragma': 'no-cache',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'x-project': 'mm-canary',
        'authorization': 'eEEM7k78fGfyfy7XQJcyAeekCdeV3u5x'
      },
      body: formdata,
    }
  ).then(()=>{
    this.props.history.push(grootHost + '/staticbanners'); 
  })
  .catch((error) => {
    // Handle error if needed
    console.error(error);
  });
//   window.location.href = grootHost + '/staticbanners';
   
}
handleApprove=()=>{
    const {id}=this.props.match.params;
   let url='https://qas16.bigbasket.com/content-svc/static-banner/approve/'+id;
   fetch(
    url,
    {
      method: "PUT",
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'DNT': '1',
        'Pragma': 'no-cache',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'x-project': 'mm-canary',
        'authorization': 'eEEM7k78fGfyfy7XQJcyAeekCdeV3u5x'
      },
    }
  ).then(()=>{
    this.props.history.push(grootHost + '/staticbanners'); 
  })
  .catch((error) => {
    // Handle error if needed
    console.error(error);
  });
//   window.location.href = grootHost + '/staticbanners';  
//   setTimeout(this.props.history.push(grootHost + '/staticbanners'),2000);
   
}


  handleUpdateClick = () => {
    const { id } = this.props.match.params;
    var url = window.location.href;
    var host = url.split("apluscontent/");
    var table_url = host[0] + "apluscontent/form/" + id;
    window.location.href = table_url;
  };

  handleBannerDetails = (id) => {
    let url='https://qas16.bigbasket.com/content-svc/static-banner/get/'+id;
    fetch(url,{
        method:'GET',
        headers:{
            "x-project": "mm-canary",
            "authorization": "eEEM7k78fGfyfy7XQJcyAeekCdeV3u5x"
        }
    }).then(response=>response.json())
    .then(response=>{
        console.log(response);
        if(response['status']=='DRAFT'){
            this.setState({isDraft:true})
        }
        if(response['status']=='REVIEW PENDING'){
            this.setState({isReviewPending:true})
        }
        this.setState({responseObject:response,isLoading:false})
    }) 
    
}
  render() {
    const { classes } = this.props;
    console.log(this.state.responseObject);
    return (
      <div className={classes.root}>
        <p>Banner :</p>
        <img
          className="imageWidth"
          src={this.state.responseObject["s3Path"]}
        ></img>

        <MaterialTable
          title="Banner Details"
          columns={[
            { title: "Banner Details", field: "field" },
            { title: "Value", field: "value" },
          ]}
          data={[
            {
              field: "Banner Type",
              value: this.state.responseObject["bannerType"],
            },
            {
              field: "Content type",
              value: this.state.responseObject["contentType"],
            },
            {
              field: "created By",
              value: this.state.responseObject["createdBy"],
            },
            {
              field: "created By ID",
              value: this.state.responseObject["createdById"],
            },
            {
              field: "created Date",
              value: this.state.responseObject["createdDate"],
            },
            {
              field: "Description",
              value: this.state.responseObject["description"],
            },
            {
              field: "Device Type",
              value: this.state.responseObject["deviceType"],
            },
            {
              field: "Display Name",
              value: this.state.responseObject["displayName"],
            },
            {
              field: "Ec Group Names",
              value: this.state.responseObject["ecGroupNames"],
            },
            {
              field: "Internal Name",
              value: this.state.responseObject["internalName"],
            },
            {
              field: "is Active",
              value: this.state.responseObject["isActive"],
            },
            {
              field: "Review Comment",
              value: this.state.responseObject["reviewComment"],
            },
            {
              field: "Reviewed By",
              value: this.state.responseObject["reviewedBy"],
            },
            { field: "Status", value: this.state.responseObject["status"] },
            {
              field: "Updated Date",
              value: this.state.responseObject["updatedDate"],
            },
          ]}
          options={{
            filtering: false,
            search: false,
            pageSize: 20,
          }}
        />

        <Button variant="contained" onClick={this.handleUpdateClick}>
          Update
        </Button>
        {this.state.isDraft && (
          <div>
            <Button variant="contained" onClick={this.handleDraft}>
              Send for Review
            </Button>
          </div>
        )}
        {this.state.isReviewPending && (
          <div>
            <Button variant="contained" onClick={this.handleReject}>
              Reject
            </Button>
            <Button variant="contained" onClick={this.handleApprove}>
              Approve
            </Button>
            <br></br>
            Review Comment
            <input
              className="reviewComment"
              size="50"
              type="text"
              value={this.state.reviewComment}
              onChange={(e) => this.setState({ reviewComment: e.target.value })}
            />
          </div>
        )}
      </div>
    );
  }
}

BannerDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(BannerDetails));
