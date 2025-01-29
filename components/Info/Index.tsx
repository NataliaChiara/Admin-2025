import Image from 'next/image';
import { InfoType } from '@/types/model';
import s from './Info.module.css';

const Info = ({ info }: { info: InfoType[] }) => {
  return (
    <div className={s.container}>
      <Image src={info[0].logo} width={200} height={200} alt="Logo" aria-label="Logo" />
      <h1>{info[0].name}</h1>
    </div>
  );
};

export default Info;