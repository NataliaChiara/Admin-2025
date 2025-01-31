import Image from 'next/image';
import s from './Schedule.module.css';
import { ScheduleType } from '@/types/model';
import { sortWeekdays } from '@/lib/sortWeekDays';
import { useState } from 'react';
import { updateSchedule } from '@/app/api/api';
import { toast, Toaster } from 'react-hot-toast';

type DayType = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';


const Schedule = ({ schedule, isUpdate, fetchInfo, changeModal }: { schedule: ScheduleType[], isUpdate?: boolean, fetchInfo?: () => void, changeModal?: () => void }) => {

  // ordenar de lunes a domingo
  sortWeekdays(schedule)


  const [formData, setFormData] = useState({
    lunes: schedule[0].hours,
    martes: schedule[1].hours,
    miercoles: schedule[2].hours,
    jueves: schedule[3].hours,
    viernes: schedule[4].hours,
    sabado: schedule[5].hours,
    domingo: schedule[6].hours
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name.toLowerCase() as DayType]: value
    }));
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>, day: string, hour: string) => {
    e.preventDefault();

    // tiene que ir si o si en formato JSON
    const hourJSON = {
      hours: hour
    }
    const success = await updateSchedule(day, hourJSON);
    if (success) {
      toast.success(`${day} actualizado con éxito`);
      fetchInfo!()
      changeModal!()
    } else {
      toast.error(`Hubo un error al actualizar ${day}`);
    }
  };


  return (
    <div className={s.container}>
      <Toaster />
      <h2>Horarios de Atención:</h2>
      <ul>
        {schedule.map((item) => {
          const { day, hours } = item
          return (
            <li key={day}>
              <span>
                {day}
              </span>
              {isUpdate ? (
                <form onSubmit={(e) => handleUpdate(e, day, formData[day.toLowerCase() as DayType])}>
                  <input
                    type="text"
                    name={day}
                    placeholder={hours}
                    value={formData[day.toLowerCase() as DayType]}
                    onChange={handleInputChange}
                  />
                  <button type='submit'>
                    Enviar
                  </button>
                </form>

              ) : (
                <span>
                  <Image src='/icons/clock.svg' alt="Clock icon" width={15} height={15} aria-label="Clock icon" />
                  {hours}
                </span>
              )}

            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default Schedule;




