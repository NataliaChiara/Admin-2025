import { ProductType } from "@/types/model";

// ${type}s

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
  console.log("${type} encontrado", data);
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
      console.log("${type} agregado con éxito:", data);
      return true;
    } else {
      console.log("Error al agregar ${type}:", data.error);
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
      console.log("${type} eliminado con éxito:", data);
      return true;
    } else {
      console.log("Error al eliminar ${type}:", data.error);
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
      console.log("${type} actualizado con éxito:", data);
      return true;
    } else {
      console.log("Error al actualizar ${type}:", data.error);
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

// actualizar contacto
export const updateContact = async (
  type: string,
  updatedLocation: { label: string; link: string }
): Promise<boolean> => {
  try {
    const response = await fetch(
      `http://localhost:4000/information/contact/${type}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLocation),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log(`${type} actualizado con éxito:`, data);
      return true;
    } else {
      console.log(`Error al actualizar ${type}:`, data.error);
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

// actualizar schedule
export const updateSchedule = async (
  day: string,
  hours: { hours: string }
): Promise<boolean> => {
  try {
    const response = await fetch(
      `http://localhost:4000/information/schedule/${day}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hours),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log(`${day} actualizado con éxito:`, data);
      return true;
    } else {
      console.log(`Error al actualizar ${day}:`, data.error, response);
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};
