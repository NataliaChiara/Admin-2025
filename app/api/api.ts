import { ProductType } from "@/types/model";

// productos

export async function getProducts() {
  const res = await fetch("http://localhost:4000/products");
  const resJson = await res.json();
  return resJson;
}

export const getProduct = async (slug: string): Promise<ProductType> => {
  const response = await fetch(`http://localhost:4000/products/${slug}`, {
    method: "GET",
  });
  const data = await response.json();
  console.log("Producto encontrado", data);
  return data.product[0];
};

export const addProduct = async (
  productToAdd: ProductType
): Promise<boolean> => {
  try {
    const response = await fetch("http://localhost:4000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToAdd),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Producto agregado con éxito:", data);
      return true;
    } else {
      console.log("Error al agregar producto:", data.error);
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const deleteProduct = async (slug: string): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:4000/products/${slug}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Producto eliminado con éxito:", data);
      return true;
    } else {
      console.log("Error al eliminar producto:", data.error);
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const updateProduct = async (
  slug: string,
  updatedProduct: ProductType
): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:4000/products/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Producto actualizado con éxito:", data);
      return true;
    } else {
      console.log("Error al actualizar producto:", data.error);
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

// secciones

export async function getSections() {
  const res = await fetch("http://localhost:4000/products/sections");
  const resJson = await res.json();
  return resJson;
}

// info

export async function getInfo() {
  const res = await fetch("http://localhost:4000/information");
  const resJson = await res.json();
  return resJson;
}
