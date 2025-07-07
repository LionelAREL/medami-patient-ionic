import Title from "./Title";
import ResponsiveImage from "./ResponsiveImage";
import SandglassImage from "./../../assets/images/sandglass.svg";

type InactivityProps = {
  count: number;
};

const Inactivity = ({ count }: InactivityProps) => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            alignItems: "center",
          }}
        >
          <Title>Attention !</Title>
          <ResponsiveImage src={SandglassImage} width={400} />
          <Title type="h4">
            Le questionnaire va se réinitialiser automatiquement dans
          </Title>
          <Title type="h2">{count} secondes</Title>
          <Title type="h4">Appuyez n’importe où pour reprendre</Title>
        </div>
      </div>
    </>
  );
};

export default Inactivity;
