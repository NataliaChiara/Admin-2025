import { ProductType } from "@/types/model";

export async function getProducts(){
  const res = await fetch("http://localhost:4000/")
  const resJson = await res.json()
  return resJson
}

export const addProduct = async (productToAdd: ProductType): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:4000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productToAdd),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Producto agregado con éxito:', data);
      return true;
    } else {
      console.log('Error al agregar producto:', data.error);
      return false;
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
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