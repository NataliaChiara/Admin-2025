'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import s from './FormProduct.module.css';
import { useEffect } from 'react';
import { getSections, updateProduct, uploadFileToGitHub } from '@/app/api/api';
import { Toaster, toast } from 'react-hot-toast';
import { addProduct } from '@/app/api/api';
import { ProductType } from '@/types/model';

const FormProduct = ({ productToUpdate }: { productToUpdate?: ProductType }) => {

  const emptyProduct = {
    name: '',
    slug: '',
    price: 1,
    description: '',
    section: '',
    image: ''
  };

  const [sections, setSections] = useState<{ section: string }[]>([])
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState(productToUpdate ? productToUpdate : emptyProduct);
  const [newSection, setNewSection] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const s = await getSections()
      setSections(s.sections)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'file' && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0];
      if (file) {
        const validTypes = ['image/jpeg', 'image/png'];
        const maxSize = 1000 * 1024; // 1MB

        if (!validTypes.includes(file.type)) {
          toast.error('Solo se permiten imágenes JPG o PNG');
          return;
        }

        if (file.size > maxSize) {
          toast.error('La imagen no debe superar el MB');
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          setFormData(prev => ({ ...prev, image: reader.result as string }));
        };
        reader.readAsDataURL(file);
        setImageFile(file)
      }
    } else if (value === "Crear nueva") {
      setNewSection(true)
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isFormValid = () => {
    const { name, price, section, image, description } = formData;
    return name.trim() !== '' &&
      section.trim() !== '' &&
      image !== '' &&
      description !== '' &&
      price > 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadFileToGitHub(imageFile!);

      if (!imageUrl) {
        toast.error("No se pudo subir la imagen.");
        return;
      }

      const productToAdd = {
        name: formData.name,
        slug: formData.name.toLowerCase().replaceAll(" ", "-"),
        price: formData.price,
        description: formData.description,
        section: formData.section,
        image: imageUrl,
      };

      const success = await addProduct(productToAdd);

      if (success) {
        toast.success(`Producto '${formData.name}' agregado con éxito`);
        fetchProducts();
        setFormData(emptyProduct);
        clearImage();
        setNewSection(false);
      } else {
        toast.error("El producto ya esta agregado.");
      }
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      toast.error("Ocurrió un error inesperado. Inténtalo nuevamente.");
    }
  };


  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedProduct = {
      name: formData.name,
      slug: formData.name.toLowerCase().replaceAll(' ', '-'),
      price: formData.price,
      description: formData.description,
      section: formData.section,
      image: '/images/hamburguesas/americana.webp'
    }

    const success = await updateProduct(productToUpdate!.slug, updatedProduct);

    if (success) {
      toast.success(`Producto '${formData.name}' actualizado con éxito`);

    } else {
      toast.error('Hubo un error al actualizar el producto');
    }

  };

  return (
    <div className={s.container}>
      <Toaster position="top-center" reverseOrder={false} />
      <button className={s.container__close}>x</button>
      <form className={s.container__form} onSubmit={productToUpdate ? handleUpdate : handleSubmit}>
        <div className={s.container__form__up}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            min="1"
            placeholder="Precio"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className={s.container__form__down}>
          <div className={s.container__form__down__img}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              className={s.container__form__down__img__input}
              onChange={handleInputChange}
            />
            {imagePreview ? (
              <>
                <button
                  type='button'
                  className={s.container__form__down__img__btn_close}
                  onClick={clearImage}
                >x</button>
                <Image
                  src={imagePreview}
                  alt="Preview Product Image"
                  width={150}
                  height={150}
                  aria-label='Preview Product Image'
                />
              </>
            ) : (
              <Image
                className={s.container__form__down__img__upload_img}
                src="/icons/upload.svg"
                width={50}
                height={50}
                alt="Upload Icon"
                aria-label="Upload Icon"
              />
            )}
          </div>
          <div className={s.container__form__down__texts}>
            {newSection || sections.length === 0 ? (
              <div className={s.container__form__down__texts__new_input}>
                <input
                  type="text"
                  name="section"
                  placeholder="Seccion nueva"
                  value={formData.section}
                  onChange={handleInputChange}
                />
                {sections.length >= 1 && <button type='button' onClick={() => setNewSection(false)}>&lt;</button>}
              </div>
            ) : (
              <select
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                aria-label="Seleccionar sección"
              >
                {formData.section === '' && <option value="">Sección</option>}
                <optgroup label="Secciones">
                  {sections.map((item) => (
                    <option value={item.section} key={item.section}>
                      {item.section}
                    </option>
                  ))}
                </optgroup>
                <option value="Crear nueva">Crear nueva</option>
              </select>
            )}
            <textarea
              name="description"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleInputChange}
              maxLength={135}
            />
          </div>
        </div>
        <button
          className={s.container__form__btn_submit}
          type="submit"
          disabled={!isFormValid()}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default FormProduct;