import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage"
import VideoDetailPage from "./views/VideoDetailPage/VideoDetailPage";
import SubscriptionPage from './views/SubscriptionPage/SubscriptionPage';

//null   Anyone Can go inside (아무나 이 페이지에 들어갈 수 있음)
//true   only logged in user can go inside (로그인 한 사람만 해당 페이지에 들어갈 수 있음)
//false  logged in user can't go inside (로그인 한 사람은 다시 로그인 화면으로 갈 수 없음 )

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />  
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} /> 
          <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} /> {/* null: 누구든 접근 가능 */}
          <Route exact path="/subscription" component={Auth(SubscriptionPage, null)} />  
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
