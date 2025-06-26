import { create } from "zustand";
import { GetQuestionnaire } from "./../graphql/queries/questionnaire.graphql";
import { GetInstitutionDoctors } from "./../graphql/queries/institution.graphql";
import {
  CreateSession,
  CompleteInterview,
  ThirdPartySession,
} from "./../graphql/queries/interview.graphql";
import {
  EvaluateStep,
  GetNextStep,
} from "./../graphql/queries/next_step.graphql";
import { GetStep } from "./../graphql/queries/step.graphql";
import { GetDoctor } from "./../graphql/queries/doctor.graphql";
import { authPatient } from "./../graphql/queries/patient.graphql";
import client from "../graphql/client";
import {
  AuthPatientMutation,
  CompleteInterviewMutation,
  Doctor,
  GetDoctorQuery,
  GetNextStepQuery,
  Institution,
  InterviewFragment,
  QuestionnaireInterview,
  ThirdPartySessionQuery,
  type CreateSessionMutation,
  type EvaluateStepQuery,
  type GetInstitutionDoctorsQuery,
  type GetQuestionnaireQuery,
  type GetStepQuery,
} from "../graphql/generated/graphql";
import { jwtDecode } from "jwt-decode";
import { getQueryParam } from "../utils/queryParams";
import Child from "../components/Child";
import { commonSave } from "../utils/save/save";

type ClientJWTToken = {
  sid: string;
  aud: string;
};

export type StepConfig = {
  persist: boolean;
  expandLogo?: boolean;
  fieldName: string;
  innerSteps: number;
  isRequired: boolean;
  stepName: string;
  save?: (state: State) => Promise<void>;
};

type Visit = {
  substep: number;
  resumeToStep?: string;
  interview?: InterviewFragment | null;
  step: CurrStep;
};

type StateValues = Omit<
  State,
  | "reset"
  | "startWorkflow"
  | "openDoctorSelection"
  | "openStep"
  | "advance"
  | "openInnerStep"
  | "close"
  | "canAdvance"
  | "back"
  | "setFormValues"
>;

export type CurrStep =
  | GetStepQuery["questionnaireSteps"][number]
  | null
  | { __typename: "NotFoundStep"; id: string }
  | { __typename: "DoctorSelectionStep"; id: string }
  | { __typename: "ThanksStep"; id: string };

export type State = {
  reset: () => void;
  startWorkflow: (firstStepId: string | null, doctors: Array<Doctor>) => void;
  openDoctorSelection: (doctors: Array<Doctor>, nexStepId: string) => void;
  openStep: (firstStepId: string, substep?: number) => Promise<boolean>;
  advance: (skipSave?: boolean, skipLoadingCheck?: boolean) => Promise<void>;
  openInnerStep: (substep: number) => Promise<void>;
  close: () => Promise<void>;
  canAdvance: () => boolean;
  back: () => Promise<void>;
  setFormValues: (values: Record<string, unknown>) => void;

  doctor: Doctor | null;
  sessionId: string | null;
  shortId: string | null;
  token: string | null;
  isThirdParty: boolean;
  currStep: CurrStep;
  currSubStep: number | null;
  isLoading: boolean;
  institution: Institution | null;
  linkToken: string | null;
  child: React.ReactNode | null;
  resumeToStep: string | null;
  stepConfig: StepConfig | null;
  visitedSteps: Array<Visit>;
  transitionDirection: "forward" | "backward";
  nextInterviews: Array<InterviewFragment>;
  hasDoctorSelectionScreen: boolean;
  isReady: boolean;
  formValues: Record<string, unknown>;
};

const initialState: StateValues = {
  doctor: null,
  sessionId: null,
  shortId: null,
  child: null,
  token: null,
  isThirdParty: false,
  currStep: null,
  currSubStep: null,
  isLoading: true,
  institution: null,
  linkToken: getQueryParam("auth"),
  resumeToStep: null,
  stepConfig: null,
  visitedSteps: [],
  transitionDirection: "forward",
  nextInterviews: [],
  hasDoctorSelectionScreen: false,
  isReady: false,
  formValues: {},
};

export const useQuestionnaireStore = create<State>((set, get) => ({
  ...initialState,

  reset: async () => {
    //@Todo Ajouter le systeme de failure

    set(() => initialState);

    const linkCode = window.location.pathname.split("/")[1];
    set(() => ({ shortId: linkCode }));

    try {
      const { data } = await client.query<GetQuestionnaireQuery>({
        query: GetQuestionnaire,
        variables: { linkCode },
      });
      set(() => ({
        institution: data.workflowLinks?.[0]?.institution as Institution | null,
      }));
      get().startWorkflow(
        data.workflowLinks?.[0]?.workflow.latest.firstStepId,
        data.workflowLinks?.[0]?.doctors as Array<Doctor>
      );
    } catch {
      get().startWorkflow(null, []);
    }
  },
  startWorkflow: async (firstStepId, doctors) => {
    console.log("start workflow");
    set(() => ({ isReady: true }));
    if (!firstStepId) {
      set((state) => ({
        currStep: { __typename: "NotFoundStep", id: "NOT_FOUND" },
        child: <Child state={state} />,
      }));
      return;
    }

    const linkToken = get().linkToken;

    if (linkToken) {
      const decodedLinkToken = jwtDecode<ClientJWTToken>(linkToken);

      const doctorId = decodedLinkToken.aud;
      const { data: getDoctorData } = await client.query<GetDoctorQuery>({
        query: GetDoctor,
        variables: { id: doctorId },
      });
      set(() => ({ doctor: getDoctorData.doctors?.[0] as Doctor }));

      get().openStep(firstStepId);
      return;
    }
    if (doctors.length === 0) {
      set(() => ({ isReady: false }));
      const { data: getInstitutionDoctorData } =
        await client.query<GetInstitutionDoctorsQuery>({
          query: GetInstitutionDoctors,
          variables: { id: get()?.institution?.id },
        });
      set(() => ({ isReady: true }));
      get().openDoctorSelection(
        getInstitutionDoctorData.institutions?.[0]?.doctors as Array<Doctor>,
        firstStepId
      );
      return;
    }
    if (doctors.length !== 1) {
      get().openDoctorSelection(doctors, firstStepId);
      return;
    }

    set(() => ({ doctor: doctors?.[0] as Doctor }));
    try {
      get().openStep(firstStepId);
    } catch {
      get()?.reset();
    }
  },
  openDoctorSelection: () => {
    set((state) => ({
      currStep: { __typename: "DoctorSelectionStep", id: "DOCTOR_SELECTION" },
      child: <Child state={state} />,
      isLoading: false,
    }));
  },
  openStep: async (stepId, substep = 1) => {
    const savedStep = get().currStep;

    console.log("openStep");
    if (!get().sessionId) {
      const { data: createSessionData } =
        await client.mutate<CreateSessionMutation>({
          mutation: CreateSession,
          variables: {
            doctorId: get().doctor?.id,
            isDeviceLink: false,
            linkId: get().shortId,
          },
        });
      const token = createSessionData?.createSession;
      set(() => ({ token }));

      if (get().linkToken) {
        const { data: authPatientData } =
          await client.mutate<AuthPatientMutation>({
            mutation: authPatient,
            variables: { token: get().linkToken },
          });

        if (authPatientData?.authPatient) {
          set(() => ({ token: authPatientData.authPatient }));
        }
      }

      set((state) => ({
        sessionId: jwtDecode<ClientJWTToken>(state.token ?? "").sid,
      })); //@Todo find better way than '?? ""'

      if (!get().sessionId) {
        throw "Unable to create session";
      }
    }

    const { data: getStepData } = await client.query<GetStepQuery>({
      query: GetStep,
      variables: { id: stepId, session: get().sessionId },
    });

    set(() => ({ currStep: getStepData.questionnaireSteps?.[0] }));

    if (!get().currStep) {
      console.log("error no currStep");
      set(() => ({ currStep: savedStep }));
      return false;
    }

    set(() => ({ isThirdParty: getStepData.isThirdPartySession ?? false }));

    if (get().currStep?.__typename === "QuestionnaireRouter") {
      // This can happen when the router is the first node of an interview
      const { data: nextStepData, errors: nextStepErrors } =
        await client.query<EvaluateStepQuery>({
          query: EvaluateStep,
          variables: { question: get().currStep?.id, session: get().sessionId },
        });

      if (nextStepErrors?.length !== 0) {
        console.log("error nextStep");
        set(() => ({ currStep: savedStep }));
        return false;
      }

      const nextStep = nextStepData.evaluateStep;

      if (nextStep) {
        return get().openStep(nextStep);
      }

      // Router resolve to dead end meaning it's either end of questionnaire or end of interview,
      // can happen if the interview starts with a router that resolves to nothing
      // For example, the router acts as a condition to run the interview or not
      set(() => ({ currStep: null }));
      get().advance();
      return false;
    }

    if (
      get().linkToken != null &&
      (get().currStep?.__typename == "QuestionnaireIdentity" ||
        get().currStep?.__typename == "QuestionnaireThirdParty")
    ) {
      await get().advance();
    }

    set(() => ({ currSubStep: substep }));

    // Important to keep child creation even for non visible widget such as Interview because it holds configuration such as innerSteps count
    // @todo consider using null instead for non visible widgets
    console.log("2");
    set((state) => ({ child: <Child state={state} /> }));

    if (get().currStep?.__typename === "QuestionnaireInterview") {
      console.log(
        "entering questionnaire, saving resume to step : ${resumeToStep}"
      );
      set((state) => ({ resumeToStep: state.currStep?.id }));

      const isFirstStepOnCooldown = (get().currStep as QuestionnaireInterview)
        .questionnaire?.latest.isFirstStepOnCooldown;

      const isOpenStepSuccess = get().openStep(
        (get().currStep as QuestionnaireInterview).questionnaire?.latest
          .firstStepId ?? ""
      );

      if (
        !isOpenStepSuccess &&
        get().currStep?.__typename === "QuestionnaireInterview"
      ) {
        set(() => ({ currStep: savedStep }));
      }

      if (isFirstStepOnCooldown) {
        get().advance();
      }

      return isOpenStepSuccess;
    }

    set(() => ({ isLoading: false }));
    return true;
  },
  openInnerStep: async (substep) => {
    set(() => ({ currSubStep: substep }));
    console.log("3");
    set((state) => ({
      child: <Child state={state} />,
      isLoading: false,
    }));
  },
  advance: async (skipSave = false, skipLoadingCheck = false) => {
    const { currStep, currSubStep, isLoading, sessionId, stepConfig } = get();
    if (currStep?.__typename === "ThanksStep") {
      get().reset();
      return;
    }

    if (isLoading && !skipLoadingCheck) return;

    // Form validation
    if (!skipSave) {
      // if (!formKey.currentState!.saveAndValidate()) {
      //   console.error("Saisie invalide"); // ou votre toast
      //   return;
      // }
    }

    if (!isLoading) {
      set({ isLoading: true });
    }

    let nextStepId: string | null = null;
    let interviewToVisit: InterviewFragment | null = null;

    try {
      if (!skipSave) {
        console.log("stepConfig");
        console.log(stepConfig);
        await (stepConfig?.save?.(get()) ?? commonSave(get()));
      }

      set({ transitionDirection: "forward" });

      // console.log("innerSteps")
      // console.log(currSubStep, stepConfig?.innerSteps)
      if ((currSubStep ?? 0) < (stepConfig?.innerSteps ?? 0)) {
        await get().openInnerStep((currSubStep ?? 0) + 1);
        return;
      }

      if (currStep?.__typename === "QuestionnaireSelectMenu") {
        // If the previous step was an interview selector, then insert selected interviews before the next step
        // @todo Find a way to handle this case on server side
        set(() => ({ resumeToStep: currStep.id })); // Save this step to resume from it after all sub questionnaires have been completed

        // const entries =
        //   form.currentState!.value[stepConfig!.fieldName] as Array<{
        //     questionnaires: Interview[];
        //   }>;
        // const interviews = Array.from(
        //   new Set(entries.flatMap((e) => e.questionnaires))
        // );
        // set((s) => ({
        //   nextInterviews: [...s.nextInterviews, ...interviews],
        //   resumeToStep: s.currStep!.id,
        // }));
      }

      if (!nextStepId && currStep) {
        const { data: nextStepData, errors: nextStepErrors } =
          await client.query<GetNextStepQuery>({
            query: GetNextStep,
            variables: { question: currStep.id, session: sessionId },
          });
        if (nextStepErrors?.length) {
          set({ isLoading: false });
          return;
        }
        nextStepId = nextStepData.nextStep!;
      }

      if (!nextStepId) {
        // Special case when we are hitting the end of a subquestionnaire
        // @todo this case should be handled on the backend but it actually does not know which questionnaires we want to travel from SelectMenuNode
        if (get().nextInterviews.length !== 0) {
          interviewToVisit = get().nextInterviews[0];
          set((state) => ({
            nextInterviews: state.nextInterviews.slice(1),
          }));
          nextStepId = interviewToVisit?.latest.firstStepId;
        } else if (get().resumeToStep) {
          console.log("resume to step ${resumeToStep}");
          const rid = get().resumeToStep;
          const { data: nextStepData, errors: nextStepErrors } =
            await client.query<GetNextStepQuery>({
              query: GetNextStep,
              variables: { question: rid, session: sessionId! },
            });
          if (nextStepErrors?.length) {
            set({ isLoading: false });
            return;
          }
          nextStepId = nextStepData.nextStep!;
          set({ resumeToStep: null });
        }
      }

      if (nextStepId) {
        const opened = await get().openStep(nextStepId);
        if (!opened) {
          set({ isLoading: false });
          return;
        }
      } else {
        await get().close();
      }
    } catch (e) {
      console.error(e);
      // affichez un toast d’erreur ici si vous en avez un
      set({ isLoading: false });
      return;
    }

    if (currStep && currStep.__typename !== "QuestionnaireInterview") {
      set((state) => ({
        visitedSteps: [
          ...state.visitedSteps,
          {
            step: state.currStep,
            substep: state.currSubStep!,
            interview: interviewToVisit,
            resumeToStep: state.resumeToStep?.toString(),
          },
        ],
      }));
    }
  },
  close: async () => {
    const { sessionId } = get();

    client
      .mutate<CompleteInterviewMutation>({
        mutation: CompleteInterview,
        variables: { session: sessionId! },
      })
      .catch(() => {
        console.log("error on complete interview");
      });

    try {
      const { data } = await client.query<ThirdPartySessionQuery>({
        query: ThirdPartySession,
        variables: { session: sessionId! },
      });
      set({ isThirdParty: data.isThirdPartySession ?? false });
    } catch {
      console.log("error on thirdPartySession");
    }
    console.log("thanks");
    set(() => ({
      currStep: { __typename: "ThanksStep", id: "THANKS" },
    }));
    set((state) => ({
      child: <Child state={state} />,
      isLoading: false,
    }));

    // set({ failureCounter: 0 });
  },
  back: async () => {
    set(() => ({ transitionDirection: "backward" }));
    const current = get().visitedSteps.pop();

    if (get().visitedSteps.length === 0) {
      get().reset();
      return;
    }

    const newStep = get().visitedSteps[get().visitedSteps.length - 1];

    set({ resumeToStep: newStep.resumeToStep });

    if (
      current?.interview != null &&
      newStep.interview?.id !== current.interview.id
    ) {
      set((state) => ({
        nextInterviews: [current.interview!, ...state.nextInterviews],
      }));
    }

    if (newStep?.step?.id === current?.step?.id) {
      await get().openInnerStep(newStep.substep);
    } else {
      const opened = await get().openStep(newStep.step!.id, newStep.substep);
      if (!opened) {
        set((state) => ({
          visitedSteps: [...state.visitedSteps, current!],
        }));
      }
    }
  },
  canAdvance: () => {
    const canAdvance =
      !get().isLoading &&
      (!(get()?.stepConfig?.isRequired ?? false) ||
        !!get().formValues[get().stepConfig!.fieldName]);
    // console.log("canAdvance")
    // console.log(canAdvance)
    // console.log(get().isLoading, get()?.stepConfig)
    return canAdvance;
  },
  setFormValues: (values) =>
    set((state) => ({ formValues: { ...state.formValues, ...values } })),
}));
