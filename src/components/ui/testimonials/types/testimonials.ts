export interface Testimonials {
  id: string;
  name: string;
  message: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface TestimonialCardProps {
  item: Testimonials;
  index: number;
}
