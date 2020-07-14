import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product

//About Auth
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";

import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import VideoUploadPage from './views/VideoUploadPage/VideoUploadPage';
import VideoDetailPage from './views/VideoDetailPage/VideoDetailPage';
import SubscriptionPage from './views/SubscriptionPage/SubscriptionPage';

//About User
import NotFoundPage from './views/NotFoundPage/NotFoundPage';


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div className="wrapper">
        <NavBar />
        <div className="contentsWrapSpacer" />
        <Switch>
          <div className="contentsWrap">
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
            <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />
            <Route exact path="/subscription" component={Auth(SubscriptionPage, null)} />
          </div>
          <Route component={Auth(NotFoundPage, null)} />
        </Switch>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
