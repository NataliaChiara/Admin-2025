import Image from 'next/image';
import s from './Schedule.module.css';
import { ScheduleType } from '@/types/model';
import { sortWeekdays } from '@/lib/sortWeekDays';

const Schedule = ({ schedule }: { schedule: ScheduleType[], }) => {

  // ordenar de lunes a domingo
  sortWeekdays(schedule)




  return (
    <div className={s.container}>
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
  );
};

export default Schedule;




