import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import "regenerator-runtime/runtime";
import Button from "@material-ui/core/Button";
import {
  FormControl,
  MenuItem,
  FormLabel,
  labelStyle,
  FormHelperText,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { json } from "body-parser";
import Axios from "axios";
import "../assets/styles/form.css";

const styles = (theme) => ({
  root: {
    backgroundColor: "#F6F6F6",
    padding: "32px",
    borderRadius: "8px",
  },
  heading: {
    color: "#444",
    marginBottom: "32px",
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  radioGroup: {
    flexDirection: "row",
  },
  button: {
    margin: theme.spacing.unit,
  },
});
const bannerTypes = [
  {
    "test-banner-type": "100X100",
    height: "100",
    width: "100",
  },
  {
    "app-pwa": "1360",
    height: "900",
    width: "1360",
  },
  {
    "test-banner-3": "153",
    height: "202",
    width: "153",
  },
  {
    "no-margin-banner-8": "153",
    height: "281",
    width: "153",
  },
  {
    "no-margin-banner-7": "256",
    height: "256",
    width: "256",
  },
  {
    "Banner Type 12": "1360",
    height: "250",
    width: "1360",
  },
  {
    "no-margin-banner-5": "680",
    height: "680",
    width: "680",
  },
  {
    "horizontal-carousel-background-banner": "1440",
    height: "744",
    width: "1440",
  },
  {
    "l1-grid-448x240": "448",
    height: "240",
    width: "448",
  },
  {
    bbstar_banner: "1125",
    height: "222",
    width: "1125",
  },
  {
    "bbstar-1360x350": "1360",
    height: "350",
    width: "1360",
  },
  {
    "bbstar-680x540": "680",
    height: "540",
    width: "680",
  },
  {
    "Banner Type 5": "1440",
    height: "892",
    width: "1440",
  },
  {
    "mobile-speciality-categories-1": "680",
    height: "600",
    width: "680",
  },
  {
    "Square Banner Category Page": "1360",
    height: "1360",
    width: "1360",
  },
  {
    "L1 Grid": "680",
    height: "600",
    width: "680",
  },
  {
    "Store front top banner": "1360",
    height: "640",
    width: "1360",
  },
  {
    "BB Category Promotions-8 (Mobile)": "1400",
    height: "450",
    width: "1400",
  },
  {
    "Mobile Square Marketing (Six)": "511",
    height: "661",
    width: "511",
  },
  {
    "bbplus-top-banner": "1600",
    height: "460",
    width: "1600",
  },
  {
    "Mobile BB Express": "1360",
    height: "600",
    width: "1360",
  },
  {
    "Member Referral Banner - Web": "700",
    height: "225",
    width: "700",
  },
  {
    "Category Navigation Square": "220",
    height: "220",
    width: "220",
  },
  {
    "Customizable home page Section 1 Full Banner": "1600",
    height: "460",
    width: "1600",
  },
];
const menuItems = bannerTypes.map((bannerType) => {
  const height = bannerType.height;
  const width = bannerType.width;
  const value = `${width}x${height}`;

  return (
    <MenuItem key={value} value={value}>
      {value}
    </MenuItem>
  );
});

const handleget = () => {
  Axios.get(
    `http://hqasvc-alb.bigbasket.com/config_svc/internal/v1/ec-group-type/?ec-group-type-slug=cart-v2`,
    {
      headers: {
        "X-Caller": "local",
        "X-Timestamp": "2021-09-01 10:10:00",
        "X-Tracker": "06973e47-df9d-42ce-80d9-8428020866ef",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      // Save the response to state
      this.setState({ responseData: response });
      console.log("This is running");
    })
    .catch((error) => {
      // Save the error to state
      this.setState({ error: error.message });
    });
};

class OldComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      image: "",
      options: [],
      loading: true,
      selectedOption: "",
      selectedRadio: "",
      checkboxChecked: 0,
      inputValue: "",
      multiline1Value: "",
      multiline2Value: "",
      imageFile: null,
      responseData: null,
      imageSize: "",
      ecNames: "",
      errorMessage: "",
    };

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMultiline1Change = this.handleMultiline1Change.bind(this);
    this.handleMultiline2Change = this.handleMultiline2Change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEcNames = this.handleEcNames.bind(this);
  }

  componentDidMount() {
    const url = window.location.href;
    const par = url.split("form/");
    const id = parseInt(par[1]);
    this.state.id= id;
    if (id) {
      fetch(
        "https://qas16.bigbasket.com/content-svc/static-banner/get/"+id,
        {
          method: "GET",
          headers: {
            "x-project": "mm-canary",
            authorization: "LMEUoIznXkQMJhutbEbVx6t3MGBCWgLo",
          },
        }
      )
      .then ((response) => response.json())
      .then ((response) => {
          
          this.setState({ecNames:response.ecGroupNames[0],selectedRadio:response.deviceType,checkboxChecked:response.isActive,inputValue:response.displayName,multiline1Value:response.description,imageSize:response.bannerType});
      })
    }
    fetch(
      "http://hqasvc-alb.bigbasket.com/config_svc/internal/v1/ec-group-type/?ec-group-type-slug=cart-v2",
      {
        method: "GET",
        headers: {
          "X-Caller": "local",
          "X-Timestamp": "2021-09-01 10:10:00",
          "X-Tracker": "06973e47-df9d-42ce-80d9-8428020866ef",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Save the response to state
        this.setState({ responseData: data });
        console.log("This is running");
      })
      .catch((error) => {
        // Save the error to state
        this.setState({ error: error.message });
      });
  }

  handleImageChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        image: file,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({
        image: "",
      });
    }
  }

  handleOptionChange(event) {
    this.setState({
      selectedOption: event.target.value,
    });
  }

  handleRadioChange(event) {
    this.setState({
      selectedRadio: event.target.value,
    });
  }

  handleCheckboxChange(event) {
    this.setState({
      checkboxChecked: event.target.checked,
    });
  }

  handleInputChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleMultiline1Change(event) {
    this.setState({
      multiline1Value: event.target.value,
    });
  }

  handleMultiline2Change(event) {
    this.setState({
      multiline2Value: event.target.value,
    });
  }

  handleImageChange(event) {
    this.setState({
      imageFile: event.target.files[0],
    });
  }

  handleEcNames(event) {
    this.setState({
      ecNames: event.target.value,
    });
  }

  handleSizeChange(event) {
    this.setState({
      imageSize: event.target.value,
    });
    const file = event.target.files[0];
    if (!file) {
      this.setState({ imageError: true });
    } else {
      this.setState({ image: file, imageError: false });
    }
  }

  async handleSubmit(event) {
    
    if (this.state.id) {
      event.preventDefault();
      const { imageFile, imageSize } = this.state;
      const sizeError = await this.validateSize(imageFile, imageSize);
      if (sizeError) {
        this.setState({ errorMessage: sizeError });
        return;
      }

      try {
        var excelData = new FormData();
        var arr = [];
        arr.push(this.state.ecNames);
        excelData.append("file", imageFile);
        excelData.append(
          "data",
          JSON.stringify({
            ecGroupNames: arr,
            deviceType: this.state.selectedRadio,
            isActive: this.state.checkboxChecked == true ? 1 : 0,
            displayName: this.state.inputValue,
            description: this.state.multiline1Value,
            contentType: "Banner",
            bannerType: this.state.imageSize,
          })
        );
        // Create a new FormData object from the form

        const response = await fetch(
          "https://qas16.bigbasket.com/content-svc/static-banner/update/"+this.state.id,
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
              authorization: "LMEUoIznXkQMJhutbEbVx6t3MGBCWgLo",
            },
            body: excelData, // Set the request body to the FormData object
          }
        );

        if (!response.ok) {
          console.log(response.body);
          throw new Error("Failed to update the data");
        }

        const data = await response.json(); // Parse the response JSON data
        console.log(data); // Log the response data to the console
        var url = window.location.href;
        var host = url.split("apluscontent/");
        var table_url = host[0] + "apluscontent/staticbanners";
        window.location.href = table_url;
      } catch (error) {
        console.error(error); // Log any errors to the console
      }

    } else {
      event.preventDefault();
      const { imageFile, imageSize } = this.state;
      const sizeError = await this.validateSize(imageFile, imageSize);
      if (sizeError) {
        this.setState({ errorMessage: sizeError });
        return;
      }

      try {
        var excelData = new FormData();
        var arr = [];
        arr.push(this.state.ecNames);
        excelData.append("file", imageFile);
        excelData.append(
          "data",
          JSON.stringify({
            ecGroupNames: arr,
            deviceType: this.state.selectedRadio,
            isActive: this.state.checkboxChecked == true ? 1 : 0,
            displayName: this.state.inputValue,
            description: this.state.multiline1Value,
            contentType: "Banner",
            bannerType: this.state.imageSize,
          })
        );
        // Create a new FormData object from the form

        const response = await fetch(
          "https://qas16.bigbasket.com/content-svc/static-banner/save",
          {
            method: "POST",
            headers: {
              "x-project": "mm-canary",
              authorization: "LMEUoIznXkQMJhutbEbVx6t3MGBCWgLo",
            },
            body: excelData, // Set the request body to the FormData object
          }
        );

        if (!response.ok) {
          console.log(response.body);
          throw new Error("Failed to save the data");
        }

        const data = await response.json(); // Parse the response JSON data
        console.log(data); // Log the response data to the console
        var url = window.location.href;
        var host = url.split("apluscontent/");
        var table_url = host[0] + "apluscontent/staticbanners";
        window.location.href = table_url;
      } catch (error) {
        console.error(error); // Log any errors to the console
      }
    }

    // Upload image logic
  }

  async validateSize(file, size) {
    const image = await this.getImage(file);
    const { width, height } = image;
    const [expectedWidth, expectedHeight] = size.split("x");
    if (
      width !== parseInt(expectedWidth) ||
      height !== parseInt(expectedHeight)
    ) {
      return `Image size should be ${size}px`;
    }
    return "";
  }

  getImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.onload = () => {
          resolve(image);
        };
        image.onerror = (error) => {
          reject(error);
        };
        image.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    const id = this.state.id;
    return (
      <div className="root">
        <h1 className="heading">Image Upload</h1>
        <div className="formItem">
          <label className="label">Select Group Names:</label>
          <Select
            className="select"
            value={this.state.ecNames}
            onChange={this.handleEcNames}
            required={true}
            error={this.state.ecNames === ""}
          >
            {/* {this.state.reponseData &&
              this.state.responseData.ec_groups.map((group) => (
                <MenuItem key={group.id} value={group.slug}>
                  {group.name}
                </MenuItem>
              ))} */}
            <MenuItem value={"mandi"}>mandi</MenuItem>
            <MenuItem value={"bbnow"}>bbnow</MenuItem>
            <MenuItem value={"meat-express"}>meat-express</MenuItem>
            <MenuItem value={"pb-fmcg"}>pb-fmcg</MenuItem>
          </Select>
        </div>

        <div className="formItem">
          <label className="label">Select size:</label>
          <Select
            className="select"
            value={this.state.imageSize}
            onChange={this.handleSizeChange}
            required={true}
            error={this.state.imageSize === ""}
          >
            {menuItems}
          </Select>
        </div>

        <div className="formItem">
          <label className="label">Upload Image:</label>
          <TextField
            className="fileInput"
            type="file"
            label="Upload Image:"
            onChange={this.handleImageChange}
            InputLabelProps={{ shrink: true }}
            required
            error={this.state.imageError}
            helperText={this.state.imageError && "Image is required"}
          />
        </div>

        <div className="formItem">
          <FormControl
            className="checkboxLabel"
            component="fieldset"
            required
            error={!this.state.selectedRadio}
          >
            <FormLabel component="legend" className="label">
              Device Types:
            </FormLabel>
            <RadioGroup
              className="select"
              row
              value={this.state.selectedRadio}
              onChange={this.handleRadioChange}
            >
              <FormControlLabel
                value="Web"
                control={<Radio />}
                label={
                  <Typography
                    style={{
                      color:
                        this.state.selectedRadio === "radio1" ? "black" : "",
                    }}
                  >
                    Web
                  </Typography>
                }
                style={{ marginRight: "24px" }}
              />
              <FormControlLabel
                value="app-pwa"
                control={<Radio />}
                label={
                  <Typography
                    style={{
                      color:
                        this.state.selectedRadio === "radio2" ? "black" : "",
                    }}
                  >
                    PWA
                  </Typography>
                }
                style={{ marginRight: "24px" }}
              />
            </RadioGroup>
            {!this.state.selectedRadio && (
              <FormHelperText>This field is required</FormHelperText>
            )}
          </FormControl>
        </div>
        <div className="formItem">
          <FormControlLabel
            className="checkboxLabel"
            control={
              <Checkbox
                checked={this.state.checkboxChecked}
                onChange={this.handleCheckboxChange}
                style={{ marginRight: "8px" }}
              />
            }
            label={
              <Typography
                style={{ color: this.state.checkboxChecked ? "black" : "" }}
              >
                Active
              </Typography>
            }
            required
          />
        </div>
        <div className="formItem">
          <TextField
            className="textInput"
            type="text"
            label="Display Name:"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            InputLabelProps={{ shrink: true }}
            // InputProps={{ style: inputStyle }}
            placeholder="Enter text here"
            required
            error={this.state.inputValue === ""}
            helperText={
              this.state.inputValue === "" ? "This field is required" : ""
            }
          />
        </div>
        <div className="formItem">
          <TextField
            className="textInput"
            multiline
            rows={4}
            label="Description:"
            value={this.state.multiline1Value}
            onChange={this.handleMultiline1Change}
            InputLabelProps={{ shrink: true }}
            // InputProps={{ style: inputStyle }}
            placeholder="Enter text here"
          />
        </div>
        <div className="formItem">
          <button className="button" onClick={this.handleSubmit} style={{backgroundColor:'#1565c0'}}>
          {this.state.id ? 'Update' : 'Save'}
          </button>
        </div>
        {this.state.errorMessage && (
          <p className="errorMessage">{this.state.errorMessage}</p>
        )}
      </div>
    );
  }
}

export default OldComponent;
