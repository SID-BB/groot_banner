import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import Loader from './Loading';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Delete from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './ComponentStyle/TemplateStyle';
import { apitimeout } from './api_timeout';
import 'froala-editor/css/froala_editor.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'font-awesome/css/font-awesome.css';
import videoPlaceholder from '../assets/images/video-placeholder.png';
import placeholderTwo from '../assets/images/placeholder-600x300.png';
import placeholderThree from '../assets/images/placeholder-350x350.jpg';
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import ErrorToast from './ErrorToast';
import WarningToast from '../components/WarningToast';
import DOMPurify from 'dompurify';
const ToolsPanel = React.lazy(() => import(/* webpackChunkName: "ToolsPanel" */"./ToolsPanel"));

const ActiveHeader = styled.div`
    box-sizing:${props => props.activeHead ? `border-box` : 'border-box'};
    border:${props => props.activeHead ? `3px dotted black` : 'none'};
`;

const ActiveHeaderTwo = styled.div`
    box-sizing:${props => props.activeHeadTwo ? `border-box` : 'border-box'};
    border:${props => props.activeHeadTwo ? `3px dotted black` : 'none'};
`;

const ActiveHeaderThree = styled.div`
    box-sizing:${props => props.activeHeadThree ? `border-box` : 'border-box'};
    border:${props => props.activeHeadThree ? `3px dotted black` : 'none'};
`;

const ActiveAnotherHeader = styled.div`
    box-sizing:${props => props.activeanotherHead ? `border-box` : 'border-box'};
    border:${props => props.activeanotherHead ? `3px dotted black` : 'none'};
`;

const ActiveAnotherHeaderTwo = styled.div`
    box-sizing:${props => props.activeanotherHeadTwo ? `border-box` : 'border-box'};
    border:${props => props.activeanotherHeadTwo ? `3px dotted black` : 'none'};
`;

const ActiveSubHeader = styled.div`
    box-sizing:${props => props.activeSubHead ? `border-box` : 'border-box'};
    border:${props => props.activeSubHead ? `3px dotted black` : 'none'};
`;

const ActiveSubHeaderTwo = styled.div`
    box-sizing:${props => props.activeSubHeadTwo ? `border-box` : 'border-box'};
    border:${props => props.activeSubHeadTwo ? `3px dotted black` : 'none'};
`;

const ActiveSubHeaderThree = styled.div`
    box-sizing:${props => props.activeSubHeadThree ? `border-box` : 'border-box'};
    border:${props => props.activeSubHeadThree ? `3px dotted black` : 'none'};
`;

const ActiveSubHeaderFour = styled.div`
    box-sizing:${props => props.activeSubHeadFour ? `border-box` : 'border-box'};
    border:${props => props.activeSubHeadFour ? `3px dotted black` : 'none'};
`;

const ActiveSubHeaderFive = styled.div`
    box-sizing:${props => props.activeSubHeadFive ? `border-box` : 'border-box'};
    border:${props => props.activeSubHeadFive ? `3px dotted black` : 'none'};
`;

const ActiveSubHeaderSix = styled.div`
    border:${props => props.activeSubHeadSix ? `3px dotted black` : 'none'};
    box-sizing:${props => props.activeSubHeadSix ? `border-box` : 'border-box'};
`;

const ActiveSubHeaderSeven = styled.div`
    box-sizing:${props => props.activeSubHeadSeven ? `border-box` : 'border-box'};
    border:${props => props.activeSubHeadSeven ? `3px dotted black` : 'none'};
`;

const ActiveSubHeaderEight = styled.div`
    box-sizing:${props => props.activeSubHeadEight ? `border-box` : 'border-box'};
    border:${props => props.activeSubHeadEight ? `3px dotted black` : 'none'};
`;

const ActiveVideo = styled.div`
    box-sizing:${props => props.activeVideo ? `border-box` : 'border-box'};
    border:${props => props.activeVideo ? `3px dotted black` : 'none'};
`;

const ActiveBannerTwo = styled.img`
    box-sizing:${props => props.activeBannerTwo ? `border-box` : 'border-box'};
    border:${props => props.activeBannerTwo ? `3px dotted black` : 'none'};
`;

const ActiveBannerThree = styled.img`
    box-sizing:${props => props.activeBannerThree ? `border-box` : 'border-box'};
    border:${props => props.activeBannerThree ? `3px dotted black` : 'none'};
`;

const ActiveBannerFour = styled.img`
    box-sizing:${props => props.activeBannerFour ? `border-box` : 'border-box'};
    border:${props => props.activeBannerFour ? `3px dotted black` : 'none'};
`;

const ActiveBannerFive = styled.img`
    box-sizing:${props => props.activeBannerFive ? `border-box` : 'border-box'};
    border:${props => props.activeBannerFive ? `3px dotted black` : 'none'};
`;

const ActiveBannerSix = styled.img`
    box-sizing:${props => props.activeBannerSix ? `border-box` : 'border-box'};
    border:${props => props.activeBannerSix ? `3px dotted black` : 'none'};
`;

const ActiveBannerSeven = styled.img`
    box-sizing:${props => props.activeBannerSeven ? `border-box` : 'border-box'};
    border:${props => props.activeBannerSeven ? `3px dotted black` : 'none'};
`;

const ActiveBannerEight = styled.img`
    box-sizing:${props => props.activeBannerEight ? `border-box` : 'border-box'};
    border:${props => props.activeBannerEight ? `3px dotted black` : 'none'};
`;

const ActiveBannerNine = styled.img`
    box-sizing:${props => props.activeBannerNine ? `border-box` : 'border-box'};
    border:${props => props.activeBannerNine ? `3px dotted black` : 'none'};
`;

const ActivePara = styled.div`
    box-sizing:${props => props.activeParagraph ? `border-box` : 'border-box'};
    border:${props => props.activeParagraph ? `3px dotted black` : 'none'};
`;

const ActiveParaTwo = styled.div`
    box-sizing:${props => props.activeParagraphTwo ? `border-box` : 'border-box'};
    border:${props => props.activeParagraphTwo ? `3px dotted black` : 'none'};
`;

const ActiveParaThree = styled.div`
    box-sizing:${props => props.activeParagraphThree ? `border-box` : 'border-box'};
    border:${props => props.activeParagraphThree ? `3px dotted black` : 'none'};
`;

const ActiveParaFour = styled.div`
    box-sizing:${props => props.activeParagraphFour ? `border-box` : 'border-box'};
    border:${props => props.activeParagraphFour ? `3px dotted black` : 'none'};
`;

const ActiveParaFive = styled.div`
    box-sizing:${props => props.activeParagraphFive ? `border-box` : 'border-box'};
    border:${props => props.activeParagraphFive ? `3px dotted black` : 'none'};
`;

const ActiveParaSix = styled.div`
    box-sizing:${props => props.activeParagraphSix ? `border-box` : 'border-box'};
    border:${props => props.activeParagraphSix ? `3px dotted black` : 'none'};
`;

const ActiveParaSeven = styled.div`
    box-sizing:${props => props.activeParagraphSeven ? `border-box` : 'border-box'};
    border:${props => props.activeParagraphSeven ? `3px dotted black` : 'none'};
`;

const ActiveParaEight = styled.div`
    box-sizing:${props => props.activeParagraphEight ? `border-box` : 'border-box'};
    border:${props => props.activeParagraphEight ? `3px dotted black` : 'none'};
`;

class TemplateTwo extends Component {
    constructor(props) {
        super(props);
        var url = window.location.href;
        var url_get = url.split("tempview?")[1];
        var url_tempname = url_get.split("&")[0];
        this.state = {
            loading: false,
            aplusname: url_tempname,
            taskId: 0,
            toggleComponent: 'tc',                      //value for every form component
            headingvalue: 'Rich Content',               //header value
            headingTwovalue: 'Rich Content',
            headingThreevalue: 'Rich Content',
            anotherHeadingvalue: 'H2 Feature 1 Heading',
            anotherHeadingTwovalue: 'H2 Feature 1 Heading',
            subheadingvalue: 'H3 Feature 1 Heading',     //sub header value
            subheadingTwovalue: 'H3 Feature 1 Heading',
            subheadingThreevalue: 'H3 Feature 1 Heading',
            subheadingFourvalue: 'H3 Feature 1 Heading',
            subheadingFivevalue: 'H3 Feature 1 Heading',
            subheadingSixvalue: 'H3 Feature 1 Heading',
            subheadingSevenvalue: 'H3 Feature 1 Heading',
            subheadingEightvalue: 'H3 Feature 1 Heading',
            videoSrcPlaceholder: videoPlaceholder,
            imgsrcTwovalue: placeholderTwo,
            imgsrcThreevalue: placeholderTwo,
            imgsrcFourvalue: placeholderThree,
            imgsrcFivevalue: placeholderThree,
            imgsrcSixvalue: placeholderThree,
            imgsrcSevenvalue: placeholderThree,
            imgsrcEightvalue: placeholderThree,
            imgsrcNinevalue: placeholderThree,
            paravalue: 'This juicy, delicious and mouth-watering fruit comes from Ratnagiri. Alphonso Mango, also known as “King of Mangoes” is a premium qualitymango in terms of sweetness, richness and flavour. It is famous for its unique fragrance. Product image shown is for representation purpose only, the actual product may vary based on season, produce &amp; availability.This juicy, delicious and mouth-watering fruit comes from Ratnagiri. Alphonso Mango, also known as “King of Mangoes” is a premium quality mango in terms of sweetness, richness and flavour. It is famous for its unique fragrance. Product image shown is for representation purpose only, the actual product may vary based on season, produce &amp; availability.',                              //paragraph value
            paraTwovalue: 'This juicy, delicious and mouth-watering fruit comes from Ratnagiri. Alphonso Mango, also known as “King of Mangoes” is a premium qualitymango in terms of sweetness, richness and flavour. It is famous for its unique fragrance. Product image shown is for representation purpose only, the actual product may vary based on season, produce &amp; availability.This juicy, delicious and mouth-watering fruit comes from Ratnagiri. Alphonso Mango, also known as “King of Mangoes” is a premium quality mango in terms of sweetness, richness and flavour. It is famous for its unique fragrance. Product image shown is for representation purpose only, the actual product may vary based on season, produce &amp; availability.',
            paraThreevalue: 'This juicy, delicious and mouth-watering fruit comes from Ratnagiri. Alphonso Mango, also known as “King of Mangoes” is a premium qualitymango in terms of sweetness, richness and flavour. It is famous for its unique fragrance. Product image shown is for representation purpose only, the actual product may vary based on season, produce &amp; availability.This juicy, delicious and mouth-watering fruit comes from Ratnagiri. Alphonso Mango, also known as “King of Mangoes” is a premium quality mango in terms of sweetness, richness and flavour. It is famous for its unique fragrance. Product image shown is for representation purpose only, the actual product may vary based on season, produce &amp; availability.',
            paraFourvalue: 'This juicy, delicious and mouth-watering fruit comes from Ratnagiri. Alphonso Mango, also known as “King of Mangoes” is a premium qualitymango in terms of sweetness, richness and flavour. It is famous for its unique fragrance. Product image shown is for representation purpose only, the actual product may vary based on season, produce &amp; availability.This juicy, delicious and mouth-watering fruit comes from Ratnagiri. Alphonso Mango, also known as “King of Mangoes” is a premium quality mango in terms of sweetness, richness and flavour. It is famous for its unique fragrance. Product image shown is for representation purpose only, the actual product may vary based on season, produce &amp; availability.',
            paraFivevalue: 'This juicy, delicious and mouth-watering fruit comes from Ratnagiri. Alphonso Mango, also known as “King of Mangoes” is a premium qualitymango in terms of sweetness, richness and flavour. It is famous for its unique fragrance. Product image shown is for representation purpose only, the actual product may vary based on season, produce &amp; availability.This juicy, delicious and mouth-watering fruit comes from Ratnagiri. Alphonso Mango, also known as “King of Mangoes” is a premium quality mango in terms of sweetness, richness and flavour. It is famous for its unique fragrance. Product image shown is for representation purpose only, the actual product may vary based on season, produce &amp; availability.',
            paraSixvalue: 'This juicy, delicious and mouth-watering fruit comes from Ratnagiri. Alphonso Mango, also known as “King of Mangoes” is a premium qualitymango in terms of sweetness, richness and flavour. It is famous for its unique fragrance. Product image shown is for representation purpose only, the actual product may vary based on season, produce &amp; availability.This juicy, delicious and mouth-watering fruit comes from Ratnagiri. Alphonso Mango, also known as “King of Mangoes” is a premium quality mango in terms of sweetness, richness and flavour. It is famous for its unique fragrance. Product image shown is for representation purpose only, the actual product may vary based on season, produce &amp; availability.',
            paraSevenvalue: 'This juicy, delicious and mouth-watering fruit comes from Ratnagiri. Alphonso Mango, also known as “King of Mangoes” is a premium qualitymango in terms of sweetness, richness and flavour. It is famous for its unique fragrance. Product image shown is for representation purpose only, the actual product may vary based on season, produce &amp; availability.This juicy, delicious and mouth-watering fruit comes from Ratnagiri. Alphonso Mango, also known as “King of Mangoes” is a premium quality mango in terms of sweetness, richness and flavour. It is famous for its unique fragrance. Product image shown is for representation purpose only, the actual product may vary based on season, produce &amp; availability.',
            paraEightvalue: 'This juicy, delicious and mouth-watering fruit comes from Ratnagiri. Alphonso Mango, also known as “King of Mangoes” is a premium qualitymango in terms of sweetness, richness and flavour. It is famous for its unique fragrance. Product image shown is for representation purpose only, the actual product may vary based on season, produce &amp; availability.This juicy, delicious and mouth-watering fruit comes from Ratnagiri. Alphonso Mango, also known as “King of Mangoes” is a premium quality mango in terms of sweetness, richness and flavour. It is famous for its unique fragrance. Product image shown is for representation purpose only, the actual product may vary based on season, produce &amp; availability.',
            videoStr: '',
            activeHead: false,
            activeHeadTwo: false,
            activeHeadThree: false,
            activeanotherHead: false,
            activeanotherHeadTwo: false,
            activeSubHead: false,
            activeSubHeadTwo: false,
            activeSubHeadThree: false,
            activeSubHeadFour: false,
            activeSubHeadFive: false,
            activeSubHeadSix: false,
            activeSubHeadSeven: false,
            activeSubHeadEight: false,
            activeVideo: false,
            activeBannerTwo: false,
            activeBannerThree: false,
            activeBannerFour: false,
            activeBannerFive: false,
            activeBannerSix: false,
            activeBannerSeven: false,
            activeBannerEight: false,
            activeBannerNine: false,
            activeParagraph: false,
            activeParagraphTwo: false,
            activeParagraphThree: false,
            activeParagraphFour: false,
            activeParagraphFive: false,
            activeParagraphSix: false,
            activeParagraphSeven: false,
            activeParagraphEight: false,
            errorSnack: false,
            errorSnackTwo: false,
            errorSnackThree: false,
            toggleSectionZero: true,
            toggleSectionOne: true,
            toggleSectionTwo: true,
            toggleSectionThree: true,
            toggleSectionFour: true,
            toggleSectionFive: true,
            toggleSectionSix: true,
            toggleSectionSeven: true,
            toggleSectionEight: true,
        };
    }

    componentDidMount() {

        var url = window.location.href;
        var url_get = url.split("tempview?")[1];
        var url_tid = url_get.split("&")[1];
        var url_sid = url_get.split("&")[2];
        this.setState({ loading: true });

        if (url_tid) {
            var getSid = url_sid.split("=")[1];
            var getTid = url_tid.split("=")[1];

            apitimeout(pendingTimeout, fetch(templateAPI + '/' + getTid + '/' + getSid, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    [AuthKey]: localStorage.getItem('token')
                }
            })).then(res => {
                if (res.status == 200) {
                    return res.json();
                }
                else {
                    this.setState({ loading: false });
                    throw Error(res.statusText);
                }
            })
                .then(result => {
                    this.setState({ loading: false });
                    if (result) {
                        this.setState({
                            headingvalue: result.data.hvT.heading,
                            videoStr: result.data.hvT.videoSrc,
                            toggleSectionZero: result.data.hvT.visible,
                            headingTwovalue: result.data.hihspM.heading,
                            imgsrcTwovalue: result.data.hihspM.imageSrc,
                            anotherHeadingvalue: result.data.hihspM.anotherHeading,
                            subheadingvalue: result.data.hihspM.subHeading,
                            paravalue: result.data.hihspM.paragraph,
                            toggleSectionOne: result.data.hihspM.visible,
                            headingThreevalue: result.data.hspihB.heading,
                            imgsrcThreevalue: result.data.hspihB.imageSrc,
                            anotherHeadingTwovalue: result.data.hspihB.anotherHeading,
                            subheadingTwovalue: result.data.hspihB.subHeading,
                            paraTwovalue: result.data.hspihB.paragraph,
                            toggleSectionTwo: result.data.hspihB.visible,
                            imgsrcFourvalue: result.data.ispLT.imageSrc,
                            subheadingThreevalue: result.data.ispLT.subHeading,
                            paraThreevalue: result.data.ispLT.paragraph,
                            toggleSectionThree: result.data.ispLT.visible,
                            imgsrcFivevalue: result.data.ispMT.imageSrc,
                            subheadingFourvalue: result.data.ispMT.subHeading,
                            paraFourvalue: result.data.ispMT.paragraph,
                            toggleSectionFour: result.data.ispMT.visible,
                            imgsrcSixvalue: result.data.ispRT.imageSrc,
                            subheadingFivevalue: result.data.ispRT.subHeading,
                            paraFivevalue: result.data.ispRT.paragraph,
                            toggleSectionFive: result.data.ispRT.visible,
                            imgsrcSevenvalue: result.data.ispLB.imageSrc,
                            subheadingSixvalue: result.data.ispLB.subHeading,
                            paraSixvalue: result.data.ispLB.paragraph,
                            toggleSectionSix: result.data.ispLB.visible,
                            imgsrcEightvalue: result.data.ispMB.imageSrc,
                            subheadingSevenvalue: result.data.ispMB.subHeading,
                            paraSevenvalue: result.data.ispMB.paragraph,
                            toggleSectionSeven: result.data.ispMB.visible,
                            imgsrcNinevalue: result.data.ispRB.imageSrc,
                            subheadingEightvalue: result.data.ispRB.subHeading,
                            paraEightvalue: result.data.ispRB.paragraph,
                            toggleSectionEight: result.data.ispRB.visible,
                            taskId: result.metaData.taskId
                        });

                        this.handleDeleteSection("initial-mount")
                    }
                    else {
                        this.setState({ errorSnack: true });
                        setTimeout(() => {
                            this.setState({
                                errorSnack: false
                            })
                        }, timeout);
                    }
                })
                .catch((error) => {
                    this.setState({ errorSnackTwo: true, loading: false });
                    setTimeout(() => {
                        this.setState({
                            errorSnackTwo: false
                        })
                    }, timeout);
                    console.log('Problem in fetching template data in TemplateTwo \n', error);
                });
        }
        else {
            this.setState({ loading: false });
        }
    }

    //setting the value of header
    updateHead = (head) => {
        this.setState({ headingvalue: head });
    }

    updateHeadTwo = (head) => {
        this.setState({ headingTwovalue: head });
    }

    updateHeadThree = (head) => {
        this.setState({ headingThreevalue: head });
    }

    updateAnotherHead = (head) => {
        this.setState({ anotherHeadingvalue: head });
    }

    updateAnotherHeadTwo = (head) => {
        this.setState({ anotherHeadingTwovalue: head });
    }

    //setting the value of sub header
    updateSubHead = (subhead) => {
        this.setState({ subheadingvalue: subhead });
    }

    updateSubHeadTwo = (subhead) => {
        this.setState({ subheadingTwovalue: subhead });
    }

    updateSubHeadThree = (subhead) => {
        this.setState({ subheadingThreevalue: subhead });
    }

    updateSubHeadFour = (subhead) => {
        this.setState({ subheadingFourvalue: subhead });
    }

    updateSubHeadFive = (subhead) => {
        this.setState({ subheadingFivevalue: subhead });
    }

    updateSubHeadSix = (subhead) => {
        this.setState({ subheadingSixvalue: subhead });
    }

    updateSubHeadSeven = (subhead) => {
        this.setState({ subheadingSevenvalue: subhead });
    }

    updateSubHeadEight = (subhead) => {
        this.setState({ subheadingEightvalue: subhead });
    }

    //setting the value of paragraph
    updatePara = (parag) => {
        this.setState({ paravalue: parag });
    }

    updateParaTwo = (parag) => {
        this.setState({ paraTwovalue: parag });
    }

    updateParaThree = (parag) => {
        this.setState({ paraThreevalue: parag });
    }

    updateParaFour = (parag) => {
        this.setState({ paraFourvalue: parag });
    }

    updateParaFive = (parag) => {
        this.setState({ paraFivevalue: parag });
    }

    updateParaSix = (parag) => {
        this.setState({ paraSixvalue: parag });
    }

    updateParaSeven = (parag) => {
        this.setState({ paraSevenvalue: parag });
    }

    updateParaEight = (parag) => {
        this.setState({ paraEightvalue: parag });
    }

    updateBannerTwo = (srcval) => {
        this.setState({ imgsrcTwovalue: srcval });
    }

    updateBannerThree = (srcval) => {
        this.setState({ imgsrcThreevalue: srcval });
    }

    updateBannerFour = (srcval) => {
        this.setState({ imgsrcFourvalue: srcval });
    }

    updateBannerFive = (srcval) => {
        this.setState({ imgsrcFivevalue: srcval });
    }

    updateBannerSix = (srcval) => {
        this.setState({ imgsrcSixvalue: srcval });
    }

    updateBannerSeven = (srcval) => {
        this.setState({ imgsrcSevenvalue: srcval });
    }

    updateBannerEight = (srcval) => {
        this.setState({ imgsrcEightvalue: srcval });
    }

    updateBannerNine = (srcval) => {
        this.setState({ imgsrcNinevalue: srcval });
    }

    updateVideo = (strval) => {
        this.setState({ videoStr: strval });
    }

    handleFormComponent = (toggleMode) => {
        this.setState({ toggleComponent: toggleMode });
    }

    //drag and drop image
    allowDrop = (e) => {
        e.preventDefault();
    }

    dropTwo = (e) => {
        e.preventDefault();
        var data = e.dataTransfer.getData("bmd");
        var source = document.getElementById(data).src;
        document.getElementById("placedImageTwo").src = source;

        this.updateBannerTwo(source);
    }

    dropThree = (e) => {
        e.preventDefault();
        var data = e.dataTransfer.getData("bmd");
        var source = document.getElementById(data).src;
        document.getElementById("placedImageThree").src = source;

        this.updateBannerThree(source);
    }

    dropFour = (e) => {
        e.preventDefault();
        var data = e.dataTransfer.getData("bsm");
        var source = document.getElementById(data).src;
        document.getElementById("placedImageFour").src = source;

        this.updateBannerFour(source);
    }

    dropFive = (e) => {
        e.preventDefault();
        var data = e.dataTransfer.getData("bsm");
        var source = document.getElementById(data).src;
        document.getElementById("placedImageFive").src = source;

        this.updateBannerFive(source);
    }

    dropSix = (e) => {
        e.preventDefault();
        var data = e.dataTransfer.getData("bsm");
        var source = document.getElementById(data).src;
        document.getElementById("placedImageSix").src = source;

        this.updateBannerSix(source);
    }

    dropSeven = (e) => {
        e.preventDefault();
        var data = e.dataTransfer.getData("bsm");
        var source = document.getElementById(data).src;
        document.getElementById("placedImageSeven").src = source;

        this.updateBannerSeven(source);
    }

    dropEight = (e) => {
        e.preventDefault();
        var data = e.dataTransfer.getData("bsm");
        var source = document.getElementById(data).src;
        document.getElementById("placedImageEight").src = source;

        this.updateBannerEight(source);
    }

    dropNine = (e) => {
        e.preventDefault();
        var data = e.dataTransfer.getData("bsm");
        var source = document.getElementById(data).src;
        document.getElementById("placedImageNine").src = source;

        this.updateBannerNine(source);
    }

    //sending the edit mode and the form component header to App
    editHeader = () => {
        const toggleMode = 'header';

        this.handleFormComponent(toggleMode);
        this.setState({ activeHead: true });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editHeaderTwo = () => {
        const toggleMode = 'headerTwo';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: true });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editHeaderThree = () => {
        const toggleMode = 'headerThree';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: true });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editAnotherHead = () => {
        const toggleMode = 'anotherHead';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: true });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editAnotherHeadTwo = () => {
        const toggleMode = 'anotherHeadTwo';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: true });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    //sending the edit mode and the form component banner to App
    editVideo = () => {
        const toggleMode = 'video';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: true });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editBannerTwo = () => {
        const toggleMode = 'bannerTwo';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: true });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editBannerThree = () => {
        const toggleMode = 'bannerThree';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: true });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editBannerFour = () => {
        const toggleMode = 'bannerFour';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: true });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editBannerFive = () => {
        const toggleMode = 'bannerFive';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: true });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editBannerSix = () => {
        const toggleMode = 'bannerSix';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: true });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editBannerSeven = () => {
        const toggleMode = 'bannerSeven';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: true });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editBannerEight = () => {
        const toggleMode = 'bannerEight';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: true });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editBannerNine = () => {
        const toggleMode = 'bannerNine';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: true });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editSubHead = () => {
        const toggleMode = 'subheader';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: true });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editSubHeadTwo = () => {
        const toggleMode = 'subheaderTwo';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: true });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editSubHeadThree = () => {
        const toggleMode = 'subheaderThree';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: true });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editSubHeadFour = () => {
        const toggleMode = 'subheaderFour';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: true });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editSubHeadFive = () => {
        const toggleMode = 'subheaderFive';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: true });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editSubHeadSix = () => {
        const toggleMode = 'subheaderSix';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: true });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editSubHeadSeven = () => {
        const toggleMode = 'subheaderSeven';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: true });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editSubHeadEight = () => {
        const toggleMode = 'subheaderEight';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: true });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }


    //sending the edit mode and the form component paragraph to App
    editPara = () => {
        const toggleMode = 'para';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: true });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editParaTwo = () => {
        const toggleMode = 'paraTwo';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: true });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editParaThree = () => {
        const toggleMode = 'paraThree';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: true });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editParaFour = () => {
        const toggleMode = 'paraFour';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: true });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editParaFive = () => {
        const toggleMode = 'paraFive';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: true });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editParaSix = () => {
        const toggleMode = 'paraSix';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: true });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: false });
    }

    editParaSeven = () => {
        const toggleMode = 'paraSeven';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: true });
        this.setState({ activeParagraphEight: false });
    }

    editParaEight = () => {
        const toggleMode = 'paraEight';
        this.handleFormComponent(toggleMode);

        this.setState({ activeHead: false });
        this.setState({ activeHeadTwo: false });
        this.setState({ activeHeadThree: false });
        this.setState({ activeanotherHead: false });
        this.setState({ activeanotherHeadTwo: false });
        this.setState({ activeVideo: false });
        this.setState({ activeBannerTwo: false });
        this.setState({ activeBannerThree: false });
        this.setState({ activeBannerFour: false });
        this.setState({ activeBannerFive: false });
        this.setState({ activeBannerSix: false });
        this.setState({ activeBannerSeven: false });
        this.setState({ activeBannerEight: false });
        this.setState({ activeBannerNine: false });
        this.setState({ activeSubHead: false });
        this.setState({ activeSubHeadTwo: false });
        this.setState({ activeSubHeadThree: false });
        this.setState({ activeSubHeadFour: false });
        this.setState({ activeSubHeadFive: false });
        this.setState({ activeSubHeadSix: false });
        this.setState({ activeSubHeadSeven: false });
        this.setState({ activeSubHeadEight: false });
        this.setState({ activeParagraph: false });
        this.setState({ activeParagraphTwo: false });
        this.setState({ activeParagraphThree: false });
        this.setState({ activeParagraphFour: false });
        this.setState({ activeParagraphFive: false });
        this.setState({ activeParagraphSix: false });
        this.setState({ activeParagraphSeven: false });
        this.setState({ activeParagraphEight: true });
    }

    handleDefault = () => {
        setTimeout(() => {
            this.setState({ activeHead: false });
            this.setState({ activeHeadTwo: false });
            this.setState({ activeHeadThree: false });
            this.setState({ activeanotherHead: false });
            this.setState({ activeanotherHeadTwo: false });
            this.setState({ activeVideo: false });
            this.setState({ activeBannerTwo: false });
            this.setState({ activeBannerThree: false });
            this.setState({ activeBannerFour: false });
            this.setState({ activeBannerFive: false });
            this.setState({ activeBannerSix: false });
            this.setState({ activeBannerSeven: false });
            this.setState({ activeBannerEight: false });
            this.setState({ activeBannerNine: false });
            this.setState({ activeSubHead: false });
            this.setState({ activeSubHeadTwo: false });
            this.setState({ activeSubHeadThree: false });
            this.setState({ activeSubHeadFour: false });
            this.setState({ activeSubHeadFive: false });
            this.setState({ activeSubHeadSix: false });
            this.setState({ activeSubHeadSeven: false });
            this.setState({ activeSubHeadEight: false });
            this.setState({ activeParagraph: false });
            this.setState({ activeParagraphTwo: false });
            this.setState({ activeParagraphThree: false });
            this.setState({ activeParagraphFour: false });
            this.setState({ activeParagraphFive: false });
            this.setState({ activeParagraphSix: false });
            this.setState({ activeParagraphSeven: false });
            this.setState({ activeParagraphEight: false });
        }, pendingTimeout);
    }

    handleDelete = (section) => {
        var parent = document.getElementById(section);
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    handleDeleteSection = (section) => {
        if (section === "initial-mount") {
            if (!this.state.toggleSectionZero) {
                this.handleDelete("section-zero")
            }
            if (!this.state.toggleSectionOne) {
                this.handleDelete("section-one")
            }
            if (!this.state.toggleSectionTwo) {
                this.handleDelete("section-two")
            }
            if (!this.state.toggleSectionThree) {
                this.handleDelete("section-three")
            }
            if (!this.state.toggleSectionSix) {
                this.handleDelete("section-four")
            }
        }
        else {
            let count = 0;
            if (!this.state.toggleSectionZero) {
                count = count + 1;
            }
            if (!this.state.toggleSectionOne) {
                count = count + 1;
            }
            if (!this.state.toggleSectionTwo) {
                count = count + 1;
            }
            if (!this.state.toggleSectionThree) {
                count = count + 1;
            }
            if (!this.state.toggleSectionSix) {
                count = count + 1;
            }

            if (count === 4) {
                this.setState({ errorSnackThree: true });
                setTimeout(() => {
                    this.setState({
                        errorSnackThree: false
                    })
                }, timeout);
            }
            else {
                switch (section) {
                    case "section-zero":
                        this.setState({ toggleSectionZero: false });
                        break;
                    case "section-one":
                        this.setState({ toggleSectionOne: false });
                        break;
                    case "section-two":
                        this.setState({ toggleSectionTwo: false });
                        break;
                    case "section-three":
                        this.setState({ toggleSectionThree: false, toggleSectionFour: false, toggleSectionFive: false });
                        break;
                    case "section-four":
                        this.setState({ toggleSectionSix: false, toggleSectionSeven: false, toggleSectionEight: false });
                        break;
                };
                this.handleDelete(section);
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} >
                {this.state.errorSnack && <ErrorToast message="Error in Processing" />}
                {this.state.errorSnackTwo && <ErrorToast message="Error in Processing" />}
                {this.state.errorSnackThree && <WarningToast message="Section cannot be deleted!" />}
                {this.state.loading && <Loader />}
                <Grid container >
                    <Grid item xs={3}>
                        <Paper className={classes.toolspaper} onClick={this.handleDefault} >
                            <Suspense fallback={Loader}>
                                <ToolsPanel
                                    toggleComponent={this.state.toggleComponent}
                                    aplusname={this.state.aplusname}
                                    headingvalue={this.state.headingvalue}
                                    updateHead={this.updateHead}
                                    headingTwovalue={this.state.headingTwovalue}
                                    updateHeadTwo={this.updateHeadTwo}
                                    headingThreevalue={this.state.headingThreevalue}
                                    updateHeadThree={this.updateHeadThree}
                                    anotherHeadingvalue={this.state.anotherHeadingvalue}
                                    updateAnotherHead={this.updateAnotherHead}
                                    anotherHeadingTwovalue={this.state.anotherHeadingTwovalue}
                                    updateAnotherHeadTwo={this.updateAnotherHeadTwo}
                                    subheadingvalue={this.state.subheadingvalue}
                                    updateSubHead={this.updateSubHead}
                                    subheadingTwovalue={this.state.subheadingTwovalue}
                                    updateSubHeadTwo={this.updateSubHeadTwo}
                                    subheadingThreevalue={this.state.subheadingThreevalue}
                                    updateSubHeadThree={this.updateSubHeadThree}
                                    subheadingFourvalue={this.state.subheadingFourvalue}
                                    updateSubHeadFour={this.updateSubHeadFour}
                                    subheadingFivevalue={this.state.subheadingFivevalue}
                                    updateSubHeadFive={this.updateSubHeadFive}
                                    subheadingSixvalue={this.state.subheadingSixvalue}
                                    updateSubHeadSix={this.updateSubHeadSix}
                                    subheadingSevenvalue={this.state.subheadingSevenvalue}
                                    updateSubHeadSeven={this.updateSubHeadSeven}
                                    subheadingEightvalue={this.state.subheadingEightvalue}
                                    updateSubHeadEight={this.updateSubHeadEight}
                                    paravalue={this.state.paravalue}
                                    updatePara={this.updatePara}
                                    paraTwovalue={this.state.paraTwovalue}
                                    updateParaTwo={this.updateParaTwo}
                                    paraThreevalue={this.state.paraThreevalue}
                                    updateParaThree={this.updateParaThree}
                                    paraFourvalue={this.state.paraFourvalue}
                                    updateParaFour={this.updateParaFour}
                                    paraFivevalue={this.state.paraFivevalue}
                                    updateParaFive={this.updateParaFive}
                                    paraSixvalue={this.state.paraSixvalue}
                                    updateParaSix={this.updateParaSix}
                                    paraSevenvalue={this.state.paraSevenvalue}
                                    updateParaSeven={this.updateParaSeven}
                                    paraEightvalue={this.state.paraEightvalue}
                                    updateParaEight={this.updateParaEight}
                                    imgsrcTwovalue={this.state.imgsrcTwovalue}
                                    updateBannerTwo={this.updateBannerTwo}
                                    imgsrcThreevalue={this.state.imgsrcThreevalue}
                                    updateBannerThree={this.updateBannerThree}
                                    imgsrcFourvalue={this.state.imgsrcFourvalue}
                                    updateBannerFour={this.updateBannerFour}
                                    imgsrcFivevalue={this.state.imgsrcFivevalue}
                                    updateBannerFive={this.updateBannerFive}
                                    imgsrcSixvalue={this.state.imgsrcSixvalue}
                                    updateBannerSix={this.updateBannerSix}
                                    imgsrcSevenvalue={this.state.imgsrcSevenvalue}
                                    updateBannerSeven={this.updateBannerSeven}
                                    imgsrcEightvalue={this.state.imgsrcEightvalue}
                                    updateBannerEight={this.updateBannerEight}
                                    imgsrcNinevalue={this.state.imgsrcNinevalue}
                                    updateBannerNine={this.updateBannerNine}
                                    videoStr={this.state.videoStr}
                                    updateVideo={this.updateVideo}
                                    tempComponent={this.props.tempComponent}
                                    taskId={this.state.taskId}
                                    toggleSectionZero={this.state.toggleSectionZero}
                                    toggleSectionOne={this.state.toggleSectionOne}
                                    toggleSectionTwo={this.state.toggleSectionTwo}
                                    toggleSectionThree={this.state.toggleSectionThree}
                                    toggleSectionFour={this.state.toggleSectionFour}
                                    toggleSectionFive={this.state.toggleSectionFive}
                                    toggleSectionSix={this.state.toggleSectionSix}
                                    toggleSectionSeven={this.state.toggleSectionSeven}
                                    toggleSectionEight={this.state.toggleSectionEight}
                                />
                            </Suspense>
                        </Paper>
                    </Grid>
                    <Grid item xs={9} className={classes.gridStyle}>
                        <div id="template" className={classes.paper}>
                            <Paper >
                                <style dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize("\n      * {\n        box-sizing: border-box;\n      }\n      .main-template {\n        line-height: 20px;\n        font-size: 20px;\n      }\n           .main-video {\n       text-align: center;\n    }\n    .video-style {\n    display: flex;\n    justify-content: center;\n    }\n      img {\n        max-width: 100%;\n        max-height: 100%;\n      }\n           .main-heading {\n        font-family: ProximaNova-Semibold;\n        color: #110f0f;\n        margin: 10px 0 20px;\n      }\n      .feature-heading,\n      .feature-sub-heading,\n      p {\n        margin: 10px 0;\n        line-height: 20px;\n      }\n      .feature-heading {\n        color: #222222;\n        font-size: 18px;\n        font-family: ProximaNova-Semibold;\n      }\n      .feature-sub-heading {\n        font-size: 16px;\n        font-family: ProximaNova-Semibold;\n        color: #444444;\n      }\n      .para-1 {\n        color: #666666;\n        font-size: 14px;\n         font-family: ProximaNova-Regular;\n      }\n\n      .full-view-img,\n      .half-view-img,\n      .small-view-img {\n        display: block;\n      }\n      .full-view-img,\n      .half-view-img {\n        margin: 0 auto;\n        height: 300px;\n      }\n      .small-view-img {\n        height: 350px;\n      }\n      .flex-block-2 {\n        display: flex;\n        margin: 20px 0;\n        align-items: flex-start;\n        justify-content: space-evenly;\n      }\n      .flex-block-2 div {\n        flex-basis: 50%;\n        flex-grow: 0;\n        flex-shrink: 0;\n      }\n      .flex-block-3 {\n        display: flex;\n        margin: 20px 0;\n        align-items: flex-start;\n        justify-content: space-between;\n      }\n      .flex-block-3 div {\n        flex-basis: 30%;\n      }\n      .flex-block div.mar-20-left {\n        margin-left: 20px;\n      }\n      .flex-block div.mar-20-right {\n        margin-right: 20px;\n      }\n      ul {\n        padding-left: 18px;\n      }\n     @media (max-width: 700px) {\n        .flex-block-2 {\n          display: block;\n        }\n        .flex-block-3 {\n          display: block;\n        }\n        .reverse {\n          flex-direction: row-reverse;\n        }\n        .half-view-img {\n          margin: 0 auto;\n        }\n        .flex-block-3 img {\n          margin: 0 auto;\n        }\n        .full-view-img {\n          max-height: 85px;\n        }\n        .half-view-img {\n          margin: 0 auto;\n          max-height: 170px;\n        }\n        .small-view-img {\n          max-height: 200px;\n        } \n      }\n    ") }} />
                                <div className="main-template">
                                    <div id="section-zero">
                                        <div id="delete-button">
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => this.handleDeleteSection("section-zero")}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </div>
                                        <ActiveHeader
                                            className="main-heading"
                                            activeHead={this.state.activeHead}
                                            onClick={this.editHeader}
                                        >
                                            <FroalaEditorView
                                                config={{
                                                    key: FroalaKey
                                                }}
                                                model={this.state.headingvalue}
                                            />
                                        </ActiveHeader>
                                        <ActiveVideo
                                            className="main-video"
                                            activeVideo={this.state.activeVideo}
                                            onClick={this.editVideo}
                                        >
                                            {this.state.videoStr ? <div className="video-style" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.state.videoStr, { ALLOWED_TAGS: ['iframe'], ALLOWED_ATTR: ['width', 'height', 'src'] }) }} /> : <img src={this.state.videoSrcPlaceholder} />}
                                        </ActiveVideo>
                                    </div>
                                    <div id="section-one">
                                        <div id="delete-button">
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => this.handleDeleteSection("section-one")}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </div>
                                        <ActiveHeaderTwo
                                            className="main-heading"
                                            activeHeadTwo={this.state.activeHeadTwo}
                                            onClick={this.editHeaderTwo}
                                        >
                                            <FroalaEditorView
                                                config={{
                                                    key: FroalaKey
                                                }}
                                                model={this.state.headingTwovalue}
                                            />
                                        </ActiveHeaderTwo>
                                        <div className="flex-block flex-block-2">
                                            <ActivePara
                                                onDrop={this.dropTwo}
                                                onDragOver={this.allowDrop}
                                            >
                                                <ActiveBannerTwo
                                                    src={this.state.imgsrcTwovalue}
                                                    id="placedImageTwo"
                                                    width="600"
                                                    activeBannerTwo={this.state.activeBannerTwo}
                                                    onClick={this.editBannerTwo}
                                                    className="half-view-img"
                                                    alt
                                                />
                                            </ActivePara>
                                            <div>
                                                <ActiveAnotherHeader
                                                    activeanotherHead={this.state.activeanotherHead}
                                                    onClick={this.editAnotherHead}
                                                    className="feature-heading"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.anotherHeadingvalue}
                                                    />
                                                </ActiveAnotherHeader>
                                                <ActiveSubHeader
                                                    activeSubHead={this.state.activeSubHead}
                                                    onClick={this.editSubHead}
                                                    className="feature-sub-heading"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.subheadingvalue}
                                                    />
                                                </ActiveSubHeader>
                                                <ActivePara
                                                    activeParagraph={this.state.activeParagraph}
                                                    onClick={this.editPara}
                                                    className="para-1"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.paravalue}
                                                    />
                                                </ActivePara>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="section-two">
                                        <div id="delete-button">
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => this.handleDeleteSection("section-two")}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </div>
                                        <div className="flex-block flex-block-2 reverse">
                                            <div>
                                                <ActiveAnotherHeaderTwo
                                                    activeanotherHeadTwo={this.state.activeanotherHeadTwo}
                                                    onClick={this.editAnotherHeadTwo}
                                                    className="feature-heading"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.anotherHeadingTwovalue}
                                                    />
                                                </ActiveAnotherHeaderTwo>
                                                <ActiveSubHeaderTwo
                                                    activeSubHeadTwo={this.state.activeSubHeadTwo}
                                                    onClick={this.editSubHeadTwo}
                                                    className="feature-sub-heading"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.subheadingTwovalue}
                                                    />
                                                </ActiveSubHeaderTwo>
                                                <ActiveParaTwo
                                                    activeParagraphTwo={this.state.activeParagraphTwo}
                                                    onClick={this.editParaTwo}
                                                    className="para-1"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.paraTwovalue}
                                                    />
                                                </ActiveParaTwo>
                                            </div>
                                            <ActivePara
                                                onDrop={this.dropThree}
                                                onDragOver={this.allowDrop}
                                            >
                                                <ActiveBannerThree
                                                    src={this.state.imgsrcThreevalue}
                                                    id="placedImageThree"
                                                    width="600"
                                                    activeBannerThree={this.state.activeBannerThree}
                                                    onClick={this.editBannerThree}
                                                    className="half-view-img"
                                                    alt
                                                />
                                            </ActivePara>
                                        </div>
                                        <ActiveHeaderThree
                                            className="main-heading"
                                            activeHeadThree={this.state.activeHeadThree}
                                            onClick={this.editHeaderThree}
                                        >
                                            <FroalaEditorView
                                                config={{
                                                    key: FroalaKey
                                                }}
                                                model={this.state.headingThreevalue}
                                            />
                                        </ActiveHeaderThree>
                                    </div>
                                    <div id="section-three">
                                        <div id="delete-button">
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => this.handleDeleteSection("section-three")}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </div>
                                        <div className="flex-block flex-block-3">
                                            <div>
                                                <ActivePara
                                                    onDrop={this.dropFour}
                                                    onDragOver={this.allowDrop}
                                                >
                                                    <ActiveBannerFour
                                                        src={this.state.imgsrcFourvalue}
                                                        id="placedImageFour"
                                                        width="350"
                                                        activeBannerFour={this.state.activeBannerFour}
                                                        onClick={this.editBannerFour}
                                                        className="small-view-img"
                                                        alt
                                                    />
                                                </ActivePara>
                                                <ActiveSubHeaderThree
                                                    activeSubHeadThree={this.state.activeSubHeadThree}
                                                    onClick={this.editSubHeadThree}
                                                    className="feature-sub-heading"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.subheadingThreevalue}
                                                    />
                                                </ActiveSubHeaderThree>
                                                <ActiveParaThree
                                                    activeParagraphThree={this.state.activeParagraphThree}
                                                    onClick={this.editParaThree}
                                                    className="para-1"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.paraThreevalue}
                                                    />
                                                </ActiveParaThree>
                                            </div>
                                            <div>
                                                <ActivePara
                                                    onDrop={this.dropFive}
                                                    onDragOver={this.allowDrop}
                                                >
                                                    <ActiveBannerFive
                                                        src={this.state.imgsrcFivevalue}
                                                        id="placedImageFive"
                                                        width="350"
                                                        activeBannerFive={this.state.activeBannerFive}
                                                        onClick={this.editBannerFive}
                                                        className="small-view-img"
                                                        alt
                                                    />
                                                </ActivePara>
                                                <ActiveSubHeaderFour
                                                    activeSubHeadFour={this.state.activeSubHeadFour}
                                                    onClick={this.editSubHeadFour}
                                                    className="feature-sub-heading"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.subheadingFourvalue}
                                                    />
                                                </ActiveSubHeaderFour>
                                                <ActiveParaFour
                                                    activeParagraphFour={this.state.activeParagraphFour}
                                                    onClick={this.editParaFour}
                                                    className="para-1"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.paraFourvalue}
                                                    />
                                                </ActiveParaFour>
                                            </div>
                                            <div>
                                                <ActivePara
                                                    onDrop={this.dropSix}
                                                    onDragOver={this.allowDrop}
                                                >
                                                    <ActiveBannerSix
                                                        src={this.state.imgsrcSixvalue}
                                                        id="placedImageSix"
                                                        width="350"
                                                        activeBannerSix={this.state.activeBannerSix}
                                                        onClick={this.editBannerSix}
                                                        className="small-view-img"
                                                        alt
                                                    />
                                                </ActivePara>
                                                <ActiveSubHeaderFive
                                                    activeSubHeadFive={this.state.activeSubHeadFive}
                                                    onClick={this.editSubHeadFive}
                                                    className="feature-sub-heading"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.subheadingFivevalue}
                                                    />
                                                </ActiveSubHeaderFive>
                                                <ActiveParaFive
                                                    activeParagraphFive={this.state.activeParagraphFive}
                                                    onClick={this.editParaFive}
                                                    className="para-1"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.paraFivevalue}
                                                    />
                                                </ActiveParaFive>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="section-four">
                                        <div id="delete-button">
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => this.handleDeleteSection("section-four")}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </div>
                                        <div className="flex-block flex-block-3">
                                            <div>
                                                <ActivePara
                                                    onDrop={this.dropSeven}
                                                    onDragOver={this.allowDrop}
                                                >
                                                    <ActiveBannerSeven
                                                        src={this.state.imgsrcSevenvalue}
                                                        id="placedImageSeven"
                                                        width="350"
                                                        activeBannerSeven={this.state.activeBannerSeven}
                                                        onClick={this.editBannerSeven}
                                                        className="small-view-img"
                                                        alt
                                                    />
                                                </ActivePara>
                                                <ActiveSubHeaderSix
                                                    activeSubHeadSix={this.state.activeSubHeadSix}
                                                    onClick={this.editSubHeadSix}
                                                    className="feature-sub-heading"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.subheadingSixvalue}
                                                    />
                                                </ActiveSubHeaderSix>
                                                <ActiveParaSix
                                                    activeParagraphSix={this.state.activeParagraphSix}
                                                    onClick={this.editParaSix}
                                                    className="para-1"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.paraSixvalue}
                                                    />
                                                </ActiveParaSix>
                                            </div>
                                            <div>
                                                <ActivePara
                                                    onDrop={this.dropEight}
                                                    onDragOver={this.allowDrop}
                                                >
                                                    <ActiveBannerEight
                                                        src={this.state.imgsrcEightvalue}
                                                        id="placedImageEight"
                                                        width="350"
                                                        activeBannerEight={this.state.activeBannerEight}
                                                        onClick={this.editBannerEight}
                                                        className="small-view-img"
                                                        alt
                                                    />
                                                </ActivePara>
                                                <ActiveSubHeaderSeven
                                                    activeSubHeadSeven={this.state.activeSubHeadSeven}
                                                    onClick={this.editSubHeadSeven}
                                                    className="feature-sub-heading"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.subheadingSevenvalue}
                                                    />
                                                </ActiveSubHeaderSeven>
                                                <ActiveParaSeven
                                                    activeParagraphSeven={this.state.activeParagraphSeven}
                                                    onClick={this.editParaSeven}
                                                    className="para-1"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.paraSevenvalue}
                                                    />
                                                </ActiveParaSeven>
                                            </div>
                                            <div>
                                                <ActivePara
                                                    onDrop={this.dropNine}
                                                    onDragOver={this.allowDrop}
                                                >
                                                    <ActiveBannerNine
                                                        src={this.state.imgsrcNinevalue}
                                                        id="placedImageNine"
                                                        width="350"
                                                        activeBannerNine={this.state.activeBannerNine}
                                                        onClick={this.editBannerNine}
                                                        className="small-view-img"
                                                        alt
                                                    />
                                                </ActivePara>
                                                <ActiveSubHeaderEight
                                                    activeSubHeadEight={this.state.activeSubHeadEight}
                                                    onClick={this.editSubHeadEight}
                                                    className="feature-sub-heading"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.subheadingEightvalue}
                                                    />
                                                </ActiveSubHeaderEight>
                                                <ActiveParaEight
                                                    activeParagraphEight={this.state.activeParagraphEight}
                                                    onClick={this.editParaEight}
                                                    className="para-1"
                                                >
                                                    <FroalaEditorView
                                                        config={{
                                                            key: FroalaKey
                                                        }}
                                                        model={this.state.paraEightvalue}
                                                    />
                                                </ActiveParaEight>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

TemplateTwo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemplateTwo);