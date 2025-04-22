export class SharedLogic {
    public selectedGame :any=null;

}


const INTL_DATE_INPUT_FORMAT = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
  };


export const DATE_TIME_FORMAT = {
    parse: {
        dateInput: INTL_DATE_INPUT_FORMAT,
      },
      display: {
        dateInput: INTL_DATE_INPUT_FORMAT,
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
      },
}