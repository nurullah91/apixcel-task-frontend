export interface ILoginPageProps {}
export default function LoginPage({}: ILoginPageProps) {
  return (
    <div>
      <h1
        style={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#f43f5e",
          fontSize: "1.875rem",
        }}
      >
        This is LoginPage component
      </h1>
    </div>
  );
}
