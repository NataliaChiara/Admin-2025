'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import s from "./page.module.css";
import { getInfo } from "./api/api";
import { InformationType } from "@/types/model";
import Schedule from "@/components/Schedule";
import Contact from "@/components/Contact";
import Info from "@/components/Info/Index";
import FrontendLayout from "@/components/FrontendLayout";
import { generatePageTitle } from "@/lib/generatePageTitle";

export default function Home() {

  generatePageTitle('Homepage')

  const [data, setData] = useState<InformationType | undefined>(undefined);
  const [modal, setModal] = useState({
    state: false,
    key: ''
  })

  const fetchInfo = async () => {
    try {
      const res = await getInfo();
      setData(res);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const changeModal = (type?: string) => {
    if (type == undefined) {
      setModal({ state: false, key: '' })
    } else {
      setModal({ state: true, key: type })
    }
  }

  return (
    <FrontendLayout>
      <div className={s.container} style={modal.state ? { overflowY: "hidden" } : { overflowY: "scroll" }}>
        {data !== undefined && (
          <>
            <div className={s.editable} onClick={() => changeModal('info')}>
              <Image className={s.editable__edit_btn} src='/icons/edit.png' alt="Edit icon" aria-label="Ir a editar" width={20} height={20} />
              <Info info={data.info} />
            </div>
            <div className={s.editable} onClick={() => changeModal('contacto')}>
              <Image className={s.editable__edit_btn} src='/icons/edit.png' alt="Edit icon" aria-label="Ir a editar" width={20} height={20} />
              <Contact contact={data.contact} />
            </div>
            <div className={s.editable} onClick={() => changeModal('schedule')}>
              <Image className={s.editable__edit_btn} src='/icons/edit.png' alt="Edit icon" aria-label="Ir a editar" width={20} height={20} />
              <Schedule schedule={data.schedule} />
            </div>
          </>
        )}
        {modal.state && (
          <div className={s.modal_container}>
            <div className={s.modal}>
              <button onClick={() => changeModal()}>X</button>
              {modal.key === "info" && <Info info={data!.info} isUpdate />}
              {modal.key === "contacto" && <Contact contact={data!.contact} isUpdate fetchInfo={fetchInfo} changeModal={changeModal} />}
              {modal.key === "schedule" && <Schedule schedule={data!.schedule} isUpdate fetchInfo={fetchInfo} changeModal={changeModal} />}
            </div>
          </div>
        )}
      </div>
    </FrontendLayout>

  );
}
