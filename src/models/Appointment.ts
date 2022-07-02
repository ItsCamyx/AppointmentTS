/* Setado moment para transformar as datas */
const moment = require("moment");
/* Estrutura para recebimento de dados feita em
componente de classe */
export default class Appointment {
    public id?: number;
    public title?: string;
    public description?:string;
    public createdDate?:Date;
    public startDate?:Date;
    public endDate?:Date;
    startDateFormatted() {
        const day = moment(this.startDate)
        .locale("pt-br")
        .format("dddd, DD/MM/YYYY");
        const time = moment(this.startDate)
        .locale("pt-br")
        .format("HH:mm")
        return day + " ás " + time;
    }
    endDateFormatted() {
        const day = moment(this.endDate)
        .locale("pt-br")
        .format("dddd, DD/MM/YYYY");
        const time = moment(this.endDate)
        .locale("pt-br")
        .format("HH:mm")
        return day + " ás " + time;
    }
    createDateFormatted() {
        const day = moment(this.createdDate)
        .locale("pt-br")
        .format("dddd, DD/MM/YYYY");
        const time = moment(this.createdDate)
        .locale("pt-br")
        .format("HH:mm")
        return day + " ás " + time;
    }
    public constructor(appointment?: Appointment);
    public constructor(appointment?: Partial<Appointment>){
        Object.assign(this, appointment);
    }


}