import moment from "moment";
import 'moment/locale/fr'

export const dformat = (date, format) => {
    return moment(date).format(format)
}