export interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceCardProps {
  product: Service;
  index: number;
}
