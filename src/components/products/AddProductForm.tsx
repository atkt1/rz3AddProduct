import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/context/AuthContext';
import { useEnumStore } from '@/lib/stores/enumStore';
import { productSchema, type ProductFormData } from '@/lib/types/product';
import { createProduct } from '@/lib/services/productService';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/auth/ui/form-input';
import { ImageUpload } from './ImageUpload';
import { FormSelect } from '../ui/form-select';

export function AddProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const enums = useEnumStore((state) => state.enums);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema)
  });
   //console.log('Current enums:', enums);

const [error, setError] = useState<string | null>(null);

const onSubmit = async (data: ProductFormData) => {
  if (!user) return;
  
  try {
    setError(null);
    setIsSubmitting(true);
    await createProduct(data, user.id);
    navigate('/dashboard/products');
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to create product');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
       {error && (
      <div className="rounded-md bg-red-500/10 border border-red-500/50 p-4">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    )}
      <FormInput
        label="Product Name"
        {...register('name')}
        error={errors.name?.message}
        placeholder="Enter product name"
      />

      <FormSelect
        label="Marketplace"
        {...register('marketplace')}
        error={errors.marketplace?.message}
        options={enums?.marketplace || []}
        placeholder="Select marketplace"
      />

      <FormInput
        label="Marketplace Product ID"
        {...register('marketplace_product_id')}
        error={errors.marketplace_product_id?.message}
        placeholder="Enter marketplace product ID"
      />

      <ImageUpload
        onImageSelect={(file) => setValue('image', file)}
        error={errors.image?.message}
      />

      <FormSelect
        label="Giveaway Amount"
        {...register('giveaway')}
        error={errors.giveaway?.message}
        options={enums?.giveaway || []}
        placeholder="Select giveaway amount"
      />

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/dashboard/products')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? 'Adding Product...' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
}