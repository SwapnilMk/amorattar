export type Review = {
  id: string;
  name: string;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateReviewInput = {
  name: string;
  rating: number;
  content: string;
};

export type UpdateReviewInput = {
  name: string;
  rating: number;
  content: string;
};
