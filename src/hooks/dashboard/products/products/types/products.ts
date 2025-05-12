export interface ProductsContent {
  id?: string;
  title: string;
  description: string;
  category: string;
  rating: number;
  price: number;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: ProductsContent;
  setFormData: (data: ProductsContent) => void;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export interface DeleteModalProps {
  onDelete: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}
