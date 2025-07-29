import * as yup from "yup";

export const productValidationSchema = yup.object({
  title: yup
    .string()
    .typeError("Title must be text")
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters")
    .trim(),
  description: yup
    .string()
    .typeError("Description must be text")
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters")
    .trim(),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be greater than zero")
    .min(0.01, "Price must be at least $0.01")
    .max(999999.99, "Price must not exceed $999,999.99"),
  img: yup
    .string()
    .typeError("Image URL must be text")
    .required("Image URL is required")
    .url("Please enter a valid URL")
    .matches(
      /\.(jpg|jpeg|png|webp|gif)$/i,
      "Image must be a valid format (.jpg, .jpeg, .png, .webp, .gif)"
    ),
  category: yup
    .string()
    .typeError("Category must be selected")
    .required("Category is required")
    .oneOf(
      ["headphones", "smartphones", "laptops", "tablets"],
      "Please select a valid category"
    ),
});
