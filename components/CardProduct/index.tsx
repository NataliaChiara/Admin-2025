import Image from 'next/image';
import { ProductType } from '@/types/model';
import s from './CardProduct.module.css';

const CardProduct = (product: ProductType) => {
  const { name, slug, price, description, image } = product

  return (
    <div className={s.container}>
      <a className={s.container__update} href={`/productos/${slug}`}><Image src='/icons/update.svg' width={15} height={15} alt='Update' aria-label='Ir a actualizar' /></a>
      <a className={s.container__delete} href={`/productos/${slug}`}><Image src='/icons/delete.svg' width={15} height={15} alt='Delete' aria-label='Ir a eliminar' /></a>
      <Image src={image} alt="Product picture" aria-label="Foto del producto" width={200} height={200} />
      <div>
        <h1>{name}</h1>
        <span>${price}</span>
        <div className={s.container__description}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;