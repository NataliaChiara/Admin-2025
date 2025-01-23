'use client';

import { useState } from 'react';
import Image from 'next/image';
import s from './FormProduct.module.css';
import { Toaster, toast } from 'react-hot-toast';

const FormProduct = () => {
  const emptyProduct = {
    name: '',
    price: '',
    description: '',
    section: '', // Nuevo campo para la sección
  };

  const secciones = ['Wraps', 'Entradas', 'Hamburguesas', 'Bebidas'];

  const [formData, setFormData] = useState(emptyProduct);
  const [error, setError] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, price, description, section } = formData;

    // Validaciones básicas
    if (!name || !price || !section) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (Number(price) <= 0) {
      setError('El precio debe ser un número mayor a 0');
      return;
    }

    setError('');

    // Simulación del envío de datos
    console.log('Enviando datos:', formData);
    toast.success(
      `Producto enviado correctamente: Nombre: ${name}, Precio: ${price}, Sección: ${section}, Descripcion: ${description.slice(0.20)}...`,
      { duration: 3000 }
    );

    // Limpiar el formulario
    setFormData(emptyProduct);
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
            <Image
              src="/icons/upload.svg"
              width={50}
              height={50}
              alt="Upload Icon"
              aria-label="Upload Icon"
            />
          </div>
          <div className={s.container__form__down__texts}>
            <select
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              aria-label="Seleccionar sección"
            >
              <option value="">Sección</option>
              {secciones.map((seccion) => (
                <option value={seccion} key={seccion}>
                  {seccion}
                </option>
              ))}
            </select>
            <textarea
              name="description"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {error && <p className={s.error}>{error}</p>}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormProduct;
