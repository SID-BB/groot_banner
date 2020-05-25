import 'froala-editor/css/froala_editor.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'font-awesome/css/font-awesome.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FroalaEditor from "react-froala-wysiwyg";

class Paragraph extends Component {
  constructor(props) {
    super(props);
  }

  //sending paragraph value to App
  setPara = (model) => {
    let parag = model;
    this.props.updatePara(parag);
  }

  render() {
    return (
      <div style={{paddingTop: 10}}>
        <FroalaEditor tag='textarea'
          config={{
            placeholderText: 'Edit Your Content Here!',
            toolbarInline: false,
            charCounterMax: 705,
            height: 200,
            width: 300,
            enter: $.FroalaEditor.ENTER_BR,
            pastePlain: true,
            wordPasteKeepFormatting: false,
            quickInsertEnabled: false,
            key: FroalaKey,
            toolbarButtons: ['bold', 'italic', 'underline', '|', 'color', 'formatOL', 'formatUL'],
            colorsDefaultTab: 'text',
            colorsStep: 6
          }}
          model={this.props.paravalue}
          onModelChange={this.setPara}
        />
      </div>
    );
  }
}

//setting the prop types
Paragraph.propTypes = {
  paravalue: PropTypes.string
};

export default Paragraph;
