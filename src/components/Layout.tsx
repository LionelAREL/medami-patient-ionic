import { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { constant } from "../styles/constants";
import { useQuestionnaireStore } from "../store";
import Question from "./Question";
import loadingAnimation from "../assets/lottie/loading.json";
import Lottie from "lottie-react";

const App = () => {
  const { reset, isReady, transitionDirection } = useQuestionnaireStore();

  useEffect(() => {
    reset();
  }, []);
  if (!isReady) {
    return (
      <div
        key={0}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          backgroundColor: constant.lightBackground,
        }}
      >
        <Lottie
          animationData={loadingAnimation}
          loop
          style={{ width: 150, height: 150 }}
        />
      </div>
    );
  }

  return (
    <div
      key={1}
      style={{
        backgroundColor: constant.background,
        height: "100%",
        ...constant.textInputStyle,
      }}
    >
      <Header />
      <Question />
      <Footer />
    </div>
  );
};

export default App;
