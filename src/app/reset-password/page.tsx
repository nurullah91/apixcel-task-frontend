export interface IResetPasswordProps {}
export default function ResetPassword({}: IResetPasswordProps) {
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
        This is ResetPassword component
      </h1>
    </div>
  );
}
