import { useEffect } from "react";
import { app } from "./utils/firebase";
import { Signin } from "./components/signin";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { RecoilRoot, useRecoilState } from "recoil";
import { userAtom } from "./store/atom/user";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionList from "./components/questionList";
import Activity from "./components/activity";
import About from "./components/about";
import { Topbar } from "./components/topbar";
import Question from "./components/question";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <StoreApp />
      </Router>
    </RecoilRoot>
  );
}

function StoreApp() {
  const auth = getAuth(app);
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    onAuthStateChanged(auth, function (user) {
      if (user && user.email) {
        setUser({
          Loading: false,
          user: {
            email: user.email,
          },
        });
        console.log("This is the user: ", user);
      } else {
        setUser({
          Loading: false,
        });
        // No user is signed in.
        console.log("There is no logged in user");
      }
    });
  }, []);

  if (user.Loading) {
    return <div>Loading</div>;
  }

  if (!user.user) {
    return (
      <div className="">
        <Signin />
      </div>
    );
  }

  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/questionList" element={<QuestionList />} />
        <Route path="/question/:id" element={<Question />} />
      </Routes>
    </>
  );
}

export default App;
