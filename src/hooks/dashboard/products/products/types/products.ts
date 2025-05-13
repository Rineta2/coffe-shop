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
  isOpen: boolean;
  onClose: () => void;
  formData: ProductsContent;
  setFormData: (data: ProductsContent) => void;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isSubmitting: boolean;
}
