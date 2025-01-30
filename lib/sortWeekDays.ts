import { ScheduleType } from "@/types/model";

// Definimos un tipo literal para los días de la semana
type WeekDay =
  | "lunes"
  | "martes"
  | "miercoles"
  | "jueves"
  | "viernes"
  | "sabado"
  | "domingo";

// Aseguramos que orderMap use el tipo WeekDay como clave
const orderMap: Record<WeekDay, number> = {
  lunes: 1,
  martes: 2,
  miercoles: 3,
  jueves: 4,
  viernes: 5,
  sabado: 6,
  domingo: 7,
};

export const sortWeekdays = (array: ScheduleType[]) => {
  return array.sort(
    (a: ScheduleType, b: ScheduleType) =>
      orderMap[a.day as WeekDay] - orderMap[b.day as WeekDay]
  );
};
