import ProductTable from "@/src/components/Table/ProductTable";

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center">All Products</h2>
      <ProductTable />
    </div>
  );
}
