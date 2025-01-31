import Image from 'next/image';
import { ChangeEvent } from 'react';
import { ContactType } from '@/types/model';
import s from './Contact.module.css';
import { useState, FormEvent } from 'react';
import { updateContact } from '@/app/api/api';
import { Toaster, toast } from 'react-hot-toast';

const Contact = ({ contact, isUpdate, fetchInfo, changeModal }: { contact: ContactType[], isUpdate?: boolean, fetchInfo?: () => void, changeModal?: () => void }) => {

  const location = contact.filter(item => item.type == 'location')[0]
  const instagram = contact.filter(item => item.type == 'instagram')[0]
  const whatsapp = contact.filter(item => item.type == 'whatsapp')[0]

  const [newLocation, setNewLocation] = useState({ label: location.label, link: location.link });
  const [newInstagram, setNewInstagram] = useState({ label: instagram.label, link: instagram.link });
  const [newWhatsapp, setNewWhatsapp] = useState({ label: whatsapp.label, link: whatsapp.link });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const { name, value } = e.target;
    if (type === 'location') setNewLocation({ ...newLocation, [name]: value });
    if (type === 'instagram') setNewInstagram({ ...newInstagram, [name]: value });
    if (type === 'whatsapp') setNewWhatsapp({ ...newWhatsapp, [name]: value });
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>, type: string, data: { label: string, link: string }) => {
    e.preventDefault();
    const success = await updateContact(type, data);
    if (success) {
      toast.success(`${type} actualizado con éxito`);
      fetchInfo!()
      changeModal!()
    } else {
      toast.error(`Hubo un error al actualizar ${type}`);
    }
  };

  return (
    <>
      {isUpdate ? (
        <div>
          <Toaster />
          <form onSubmit={(e) => handleUpdate(e, 'location', newLocation)}>
            <input
              type="text"
              name="label"
              placeholder={newLocation.label}
              value={newLocation.label}
              onChange={(e) => handleInputChange(e, 'location')}
            />
            <input
              type="text"
              name="link"
              placeholder={newLocation.link}
              value={newLocation.link}
              onChange={(e) => handleInputChange(e, 'location')}
            />
            <button type='submit'>Actualizar Location</button>
          </form>
          <form onSubmit={(e) => handleUpdate(e, 'instagram', newInstagram)}>
            <input
              type="text"
              name="label"
              placeholder={newInstagram.label}
              value={newInstagram.label}
              onChange={(e) => handleInputChange(e, 'instagram')}
            />
            <input
              type="text"
              name="link"
              placeholder={newInstagram.link}
              value={newInstagram.link}
              onChange={(e) => handleInputChange(e, 'instagram')}
            />
            <button type='submit'>Actualizar Instagram</button>
          </form>
          <form onSubmit={(e) => handleUpdate(e, 'whatsapp', newWhatsapp)}>
            <input
              type="text"
              name="label"
              placeholder={newWhatsapp.label}
              value={newWhatsapp.label}
              onChange={(e) => handleInputChange(e, 'whatsapp')}
            />
            <input
              type="text"
              name="link"
              placeholder={newWhatsapp.link}
              value={newWhatsapp.link}
              onChange={(e) => handleInputChange(e, 'whatsapp')}
            />
            <button type='submit'>Actualizar WhatsApp</button>
          </form>
        </div>
      ) : (
        <div className={s.default}>
          <h2>Contacto</h2>
          <a target="__blank" key={location.type} href={location.link}>
            <Image src='/icons/location.svg' width={30} height={30} alt={`location icon`} aria-label={`Ir a location`} />
            <span>- {location.label}</span>
          </a>
          <a target="__blank" key={whatsapp.type} href={whatsapp.link}>
            <Image src='/icons/whatsapp.svg' width={30} height={30} alt={`whatsapp icon`} aria-label={`Ir a whatsapp`} />
            <span>- {whatsapp.label}</span>
          </a>
          <a target="__blank" key={instagram.type} href={instagram.link}>
            <Image src='/icons/instagram.svg' width={30} height={30} alt={`instagram icon`} aria-label={`Ir a instagram`} />
            <span>- {instagram.label}</span>
          </a>
        </div>
      )}
    </>
  );
};

export default Contact;