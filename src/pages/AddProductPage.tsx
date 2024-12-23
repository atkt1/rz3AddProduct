import { AddProductForm } from '@/components/products/AddProductForm';

export function AddProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Add New Product</h1>
        <p className="text-gray-400">
          Add your product details to start collecting and managing reviews.
        </p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <AddProductForm />
      </div>
    </div>
  );
}