'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import s from "./page.module.css";
import Link from "next/link";
import cs from "classnames";
import { getInfo } from "./api/api";
import { InformationType } from "@/types/model";

export default function Home() {
  const [data, setData] = useState<InformationType | undefined>(undefined);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getInfo();
        setData(res);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


  return (
    <div className={s.page}>
      <nav className={s.page__nav}>
        <Link href='/' className={s.page__nav__selected}>Homepage</Link>
        <Link href='/productos'>Productos</Link>
      </nav>
      <main className={s.page__main}>
        {data !== undefined && (
          <div className={s.page__main__info}>
            <div className={s.editable}>
              <Image className={s.edit_btn} src='/icons/edit.png' alt="Edit icon" aria-label="Ir a editar" width={20} height={20} />
              <Image src={data.info[0].logo} width={200} height={200} alt="Logo" aria-label="Logo" />
            </div>
            <div className={cs(s.page__main__info__contact, s.editable)}>
              <Image className={s.edit_btn} src='/icons/edit.png' alt="Edit icon" aria-label="Ir a editar" width={20} height={20} />
              <h1>{data.info[0].name}</h1>
              {data.contact.map((item) => {
                const { label, type, link, icon } = item
                return (
                  <a target="__blank" key={type} href={link}>
                    <Image src={icon} width={30} height={30} alt={`${type} icon`} aria-label={`Ir a ${type}`} />
                    <span>- {label && label}</span>
                  </a>
                )
              })}
            </div>
            <div className={cs(s.page__main__info__schedule, s.editable)}>
              <Image className={s.edit_btn} src='/icons/edit.png' alt="Edit icon" aria-label="Ir a editar" width={20} height={20} />
              <h2>Horarios de Atención:</h2>
              <ul>
                {data.schedule.map((item) => {
                  const { day, hours } = item
                  return (
                    <li key={day}>
                      <span>
                        {day}
                      </span>
                      <span>
                        <Image src='/icons/clock.svg' alt="Clock icon" width={15} height={15} aria-label="Clock icon" />
                        {hours === '' ? 'Cerrado' : hours}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
