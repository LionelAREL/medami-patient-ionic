import { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { constant } from "../styles/constants";
import { useQuestionnaireStore } from "../store";
import Question from "./Question";
import loadingAnimation from "../assets/lottie/loading.json";
import Lottie from "lottie-react";
import { startSync } from "../utils/syncAndroidDevice";
import { isPlatform } from "@ionic/react";
import { useInactivityTimer } from "../utils/hooks/useInactivityTimer";
import Inactivity from "./common/Inactivity";

const App = () => {
  const { reset, isReady, needSync, visitedSteps } = useQuestionnaireStore();
  const inactivityCount = useInactivityTimer({
    onExpire: () => isPlatform("android") && reset(),
  });
  const setState = useQuestionnaireStore.setState;
  const isFirstStep = visitedSteps.length === 0;

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (needSync) {
      startSync().then((isSync) => {
        if (isSync) {
          setState({
            needSync: false,
          });
          reset();
        }
      });
    }
  }, [needSync]);

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
      {isPlatform("android") && inactivityCount <= 15 && !isFirstStep && (
        <Inactivity count={inactivityCount} />
      )}
      <Question />
      <Footer />
    </div>
  );
};

export default App;
