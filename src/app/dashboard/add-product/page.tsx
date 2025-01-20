export interface IAddProductProps {}
export default function AddProduct({}: IAddProductProps) {
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
        This is AddProduct component
      </h1>
    </div>
  );
}
