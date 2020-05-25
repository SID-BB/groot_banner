import 'froala-editor/css/froala_editor.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'font-awesome/css/font-awesome.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FroalaEditor from "react-froala-wysiwyg";

class SubHeader extends Component {
  constructor(props) {
    super(props);
  }

  //sending sub head value to App
  setsubheading = (model) => {
    let subhead = model;
    this.props.updateSubHead(subhead);
  }

  render() {
    return(
      <div style={{paddingTop: 10}}>
        <FroalaEditor tag='textarea' 
          config={{
            placeholderText: 'Edit Your Content Here!',
            toolbarInline: false,
            charCounterMax: 80, 
            height:200,
            width:300,
            enter: $.FroalaEditor.ENTER_BR,
            pastePlain: true,
            wordPasteKeepFormatting: false,
            quickInsertEnabled: false,
            key:FroalaKey, 
            toolbarButtons: ['bold', 'italic', 'underline','|','color'],      
            colorsDefaultTab: 'text',
            colorsStep: 6
          }} 
          model={this.props.subheadingvalue} 
          onModelChange={this.setsubheading}
        />
      </div>
    );
  }
}

//setting the prop types
SubHeader.propTypes = {
  subheadingvalue: PropTypes.string
};

export default SubHeader;
