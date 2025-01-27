import Image from "next/image";
import s from "./page.module.css";
import Link from "next/link";
import { info } from "@/lib/data";

export default function Home() {
  const { name, logo, contact, schedule } = info
  return (
    <div className={s.page}>
      <nav className={s.page__nav}>
        <Link href='/' className={s.page__nav__selected}>Homepage</Link>
        <Link href='/productos'>Productos</Link>
      </nav>
      <main className={s.page__main}>
        <div className={s.page__main__info}>
          <Image src={logo} width={150} height={150} alt="Logo" aria-label="Logo" />
          <h1>{name}</h1>
          <div className={s.page__main__info__contact}>
            {contact.map((item) => {
              const { label, type, link, icon } = item
              return (
                <a target="__blank" key={type} href={link}>
                  <Image src={icon} width={30} height={30} alt={`${type} icon`} aria-label={`Ir a ${type}`} />
                  <span>- {label && label}</span>
                </a>
              )
            })}
          </div>
          <div className={s.page__main__info__schedule}>
            <h2>Horarios de Atención:</h2>
            <ul>
              {schedule.map((item) => {
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

      </main>
    </div>
  );
}
