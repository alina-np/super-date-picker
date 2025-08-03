import { useState } from "react";
import { SuperDatePicker, type DateRange } from "@/widgets/super-date-picker";

import "./main-page.scss";

export function MainPage() {
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const handleDateChange = (range: DateRange) => {
    setSelectedRange(range);
  };

  return (
    <section className="page">
      <h1>Super Date Picker. Demo</h1>
      <SuperDatePicker
        value={selectedRange}
        onChange={handleDateChange}
        dateFormat="dd.MM.yyyy"
        timeFormat="HH:mm"
        className="superDatePicker-margin"
      />
      <div className="info">
        <h2>Пропсы и их значения</h2>
        <div className="infoTable">
          <div className="infoTable__header">
            <p>Пропс</p>
            <p>Принимаемые значения</p>
            <p>Дефолтное значение</p>
          </div>
          <div className="infoTable__data">
            <p>value - значение для выбранных дат</p>
            <p>{"{ startDate, endDate }"}</p>
            <p>Обязательный пропс</p>
          </div>
          <div className="infoTable__data">
            <p>singleDate - выбор одиночной даты</p>
            <p>boolean</p>
            <p>false</p>
          </div>
          <div className="infoTable__data">
            <p>
              isCommonUsedDate - показать блок диапазонов дат "Обычно
              используют"
            </p>
            <p>boolean</p>
            <p>true</p>
          </div>
          <div className="infoTable__data">
            <p>onChange - функция для управления выбранными датами</p>
            <p>{"(value: DateRange) => void"}</p>
            <p></p>
          </div>
          <div className="infoTable__data">
            <p>id</p>
            <p>string | number</p>
            <p></p>
          </div>
          <div className="infoTable__data">
            <p>dateFormat - формат даты</p>
            <p>string</p>
            <p>yyyy-MM-dd</p>
          </div>
          <div className="infoTable__data">
            <p>timeFormat - формат времени</p>
            <p>string</p>
            <p>HH:mm</p>
          </div>
          <div className="infoTable__data">
            <p>className - классы для управления стилями компонента</p>
            <p>string</p>
            <p></p>
          </div>
          <div className="infoTable__data">
            <p>width - ширина компонента</p>
            <p>"auto" | "full"</p>
            <p>full</p>
          </div>
          <div className="infoTable__data">
            <p>isAllowClear - очистка выбранной даты по клику</p>
            <p>boolean</p>
            <p>false</p>
          </div>
        </div>
      </div>
    </section>
  );
}
