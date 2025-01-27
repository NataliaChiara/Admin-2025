'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import s from './FormProduct.module.css';
import { Toaster, toast } from 'react-hot-toast';
import { sections } from '@/lib/data';
import { addProduct } from '@/app/api/api';

const FormProduct = () => {
  const emptyProduct = {
    name: '',
    slug: '',
    price: 0,
    description: '',
    section: '',
    image: ''
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState(emptyProduct);
  const [newSection, setNewSection] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'file' && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0];
      if (file) {
        const validTypes = ['image/jpeg', 'image/png'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
          toast.error('Solo se permiten imágenes JPG o PNG');
          return;
        }

        if (file.size > maxSize) {
          toast.error('La imagen no debe superar los 5MB');
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          // Aca se tendria que subir al storage, obtener la url y esa url meterla a formData.image
          setFormData(prev => ({ ...prev, image: reader.result as string }));
        };
        reader.readAsDataURL(file);
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

    const productToAdd = {
      name: formData.name,
      slug: formData.name.toLowerCase().replaceAll(' ', '-'),
      price: formData.price,
      description: formData.description,
      sectionSlug: formData.section.toLowerCase().replaceAll(' ', '-'),
      image: '/images/americana.webp'
    }

    const success = await addProduct(productToAdd);

    if (success) {
      toast.success(`Producto '${formData.name}' agregado con éxito`);
    } else {
      toast.error('Hubo un error al agregar el producto');
    }

    // Restablecer los datos del formulario y otros estados
    setFormData(emptyProduct);
    clearImage();
    setNewSection(false);
  };

  return (
    <div className={s.container}>
      <Toaster position="top-center" reverseOrder={false} />
      <button className={s.container__close}>x</button>
      <form className={s.container__form} onSubmit={handleSubmit}>
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
                  {sections.map((seccion) => (
                    <option value={seccion.name} key={seccion.slug}>
                      {seccion.name}
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