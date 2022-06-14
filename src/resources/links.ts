const links = {
  index: "/",
  intermediaries: {
    index: "/intermediaries",
    create: "/intermediaries/add",
    details: (intermediaryId: string) => `/intermediaries/${intermediaryId}`,
    edit: (intermediaryId: string) => `/intermediaries/${intermediaryId}/edit`,
  },
  products: {
    index: "/products",
    create: "/products/add",
    details: (productId: string) => `/products/${productId}`,
    edit: (productId: string) => `/products/${productId}/edit`,
  },
};

export default links;
