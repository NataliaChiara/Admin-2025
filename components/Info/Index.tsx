import { useRef } from 'react';
import Image from 'next/image';
import { InfoType } from '@/types/model';
import s from './Info.module.css';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const Info = ({ info, isUpdate }: { info: InfoType[], isUpdate?: boolean }) => {

  const dataToUpdate = {
    name: info[0].name,
    image: info[0].logo
  }

  const [newData, setNewData] = useState(dataToUpdate)
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'file' && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0];
      if (file) {
        const validTypes = ['image/jpeg', 'image/png'];
        const maxSize = 400 * 1024; // 400 KB

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
          // Aca se tendria que subir al storage, obtener la url y esa url meterla a newData.image
          setNewData(prev => ({ ...prev, image: reader.result as string }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setNewData({ ...newData, [name]: value });
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setNewData(dataToUpdate);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(newData)

  };

  return (
    <div className={s.container}>
      <Toaster />
      {isUpdate ? (
        <form onSubmit={handleUpdate}>
          <div className={s.container__img_container}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleInputChange}
            />
            {imagePreview ? (
              <>
                <button type='button' onClick={clearImage}>Eliminar</button>
                <Image
                  src={imagePreview}
                  alt="Preview Product Image"
                  width={200}
                  height={200}
                  aria-label='Preview Product Image'
                />
              </>
            ) : (
              <Image
                src={dataToUpdate.image}
                width={200}
                height={200}
                alt="Upload Icon"
                aria-label="Upload Icon"
              />
            )}
          </div>

          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={newData.name}
            onChange={handleInputChange}
          />
          <button type='submit'>Enviar</button>
        </form>
      ) : (
        <>
          <Image src={info[0].logo} width={200} height={200} alt="Logo" aria-label="Logo" />
          <h1>{info[0].name}</h1>
        </>
      )}
    </div>
  );
};

export default Info;