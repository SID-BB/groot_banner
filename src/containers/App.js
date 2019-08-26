import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
const ChooseTemplate = React.lazy(() => import(/* webpackChunkName: "ChooseTemplate" */"../components/ChooseTemplate"));
const ManageAplusTemplate = React.lazy(() => import(/* webpackChunkName: "ManageAplusTemplate" */"../components/ManageAplusTemplate"));
const TemplateView = React.lazy(() => import(/* webpackChunkName: "TemplateView" */"./TemplateView"));
import Navbar from "../components/Navbar";
import Loader from '../components/Loading';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tempComponent: 'tc'
        }
    }

    componentDidMount() {
        var hours = ttl; // Reset when storage is more than 24 hours
        var now = new Date().getTime();
        var setupTime = localStorage.getItem('setupTime');
        if (setupTime == null) {
            localStorage.setItem('setupTime', now)
        } else {
            if (now - setupTime > hours * 60 * 60 * 1000) {
                localStorage.clear()
                localStorage.setItem('setupTime', now);
            }
        }
    }

    handleTemplateComponent = (tempVal) => {
        this.setState({ tempComponent: tempVal });
    }

    render() {
        return (
            <div>
                <ErrorBoundary>
                    <Navbar togglePerm={this.props.togglePerm} />
                    <Suspense fallback={Loader}>
                        <Switch>
                            <Route exact path={preUrl + "/apluscontent/"} render={() => <ManageAplusTemplate />} />

                            <Route exact path={preUrl + "/apluscontent/all"} render={() => <ManageAplusTemplate />} />

                            <Route exact path={preUrl + "/apluscontent/choosetemp"} render={(props) => <ChooseTemplate {...props} handleTemplateComponent={this.handleTemplateComponent} />} />

                            <Route exact path={preUrl + "/apluscontent/tempview"} render={() => <TemplateView tempComponent={this.state.tempComponent} />} />
                        </Switch>
                    </Suspense>
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;