import { Input } from "antd";
import {
  CurrStep,
  State,
  StepConfig,
  useQuestionnaireStore,
} from "../../store";
import {
  GetStepQuery,
  ReceiveInfoByEmailMutation,
} from "../../graphql/generated/graphql";
import { constant } from "../../styles/constants";
import rehypeSanitize from "rehype-sanitize";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Box from "../common/Box";
import ResponsiveImage from "../common/ResponsiveImage";
import InfoImage from "../../assets/images/info.svg";
import useStepImageWidth from "../../utils/hooks/useStepImageWidth";
import InfoButton from "../buttons/InfoButton";
import { useEffect, useState } from "react";
import TextStyle from "../common/Text";
import { commonSave } from "../../utils/save/save";
import { ReceiveInfoByEmail } from "../../graphql/queries/info.graphql";
import client from "../../graphql/client";

type InfoStepProps = {
  currStep: CurrStep;
  stepConfig: StepConfig | null;
};

const InfoStep = ({ currStep }: InfoStepProps) => {
  const { doctor } = useQuestionnaireStore();
  const setState = useQuestionnaireStore.setState;
  const width = useStepImageWidth();
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");
  const isReceiveByEmail = (
    currStep as Extract<CurrStep, { __typename: "QuestionnaireInfoStep" }>
  ).showReceiveByEmail;
  const text = (
    currStep as Extract<CurrStep, { __typename: "QuestionnaireInfoStep" }>
  ).text
    ?.replace("{{firstName}}", doctor?.firstName ?? "")
    .replace("{{lastName}}", doctor?.lastName ?? "")
    .replace(/\\n/g, "\n");

  useEffect(() => {
    if (!currStep || !email) return;

    setState((state) => ({
      stepConfig: {
        ...(state.stepConfig as StepConfig),
        save: async (state: State) => {
          await client.mutate<ReceiveInfoByEmailMutation>({
            mutation: ReceiveInfoByEmail,
            variables: {
              question: currStep.id,
              email: email,
            },
          });
          await commonSave(state);
        },
      },
    }));
  }, [email, currStep]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ResponsiveImage src={InfoImage} width={width} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Box
          style={{
            width: "90vw",
            maxWidth: "400px",
            height: "calc(100vh - 550px)",
            maxHeight: "min-content",
          }}
        >
          <div
            style={{
              ...constant.textInputStyle,
              height: "min-content",
              maxHeight: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ overflowY: "auto", flex: 1 }}>
              <Markdown
                rehypePlugins={[rehypeRaw, rehypeSanitize, remarkGfm]}
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {text}
              </Markdown>
            </div>
            <div
              style={{
                flexShrink: 0,
                display: "flex",
                justifyContent: "center",
                paddingTop: 8,
              }}
            >
              {isReceiveByEmail && (
                <div
                  style={{
                    marginTop: 16,
                    width: showEmailInput ? "100%" : undefined,
                  }}
                >
                  {!showEmailInput ? (
                    <InfoButton onClick={() => setShowEmailInput(true)} />
                  ) : (
                    <div>
                      <TextStyle style={{ fontWeight: 600 }}>Email</TextStyle>
                      <Input
                        placeholder="mon@email.com"
                        value={email}
                        variant="underlined"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        style={{ marginTop: 4 }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default InfoStep;
