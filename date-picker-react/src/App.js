import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarDatesRef = useRef(null);
  // new Date()의 년,월,일을 curDate에 저장해서 사용할거다.
  const data = new Date();
  const [curDate, setCurDate] = useState({
    year: data.getFullYear(),
    month: data.getMonth(),
    date: data.getDate(),
  });
  const [dateTagList, setDateTagList] = useState();

  // grid => sun = 1, getDay() => sun = 0
  const gridColumnStart = new Date(curDate.year, curDate.month, 1).getDay() + 1;
  const firstGridDateStyle = { gridColumnStart: gridColumnStart };
  // const saturdayStyle = () => {
  //   const calendarDatesEl = calendarDatesRef.current;
  //   console.log(calendarDatesEl);
  //   const saturdayEls = calendarDatesEl?.querySelectorAll(
  //     `.date:nth-child(7n+${7 - new Date().getDay()})`
  //   );

  //   for (let i = 0; i < saturdayEls?.length; i++) {
  //     saturdayEls[i].style.color = "blue";
  //   }
  // };

  // const sundayStyle = () => {};

  const numberDate = new Date(curDate.year, curDate.month + 1, 0).getDate();
  const dateTag = [];
  const updateCalendar = () => {
    for (let i = 1; i <= numberDate; i++) {
      i === 1
        ? dateTag.push(
            <p key={1} className="date" style={firstGridDateStyle}>
              {1}
            </p>
          )
        : dateTag.push(
            <p key={i} className="date">
              {i}
            </p>
          );
    }
    setDateTagList(dateTag);
  };

  const movePrevMonth = () => {
    setCurDate((state) => {
      const prevMonth = state.month - 1;
      const prevYear = state.year;
      if (state.month < 1) {
        return { ...state, month: 11, year: prevYear - 1 };
      }
      return { ...state, month: prevMonth };
    });
    updateCalendar();
  };

  const moveNextMonth = () => {
    setCurDate((state) => {
      const nextMonth = state.month + 1;
      const nextYear = state.year;
      if (state.month > 10) {
        return { ...state, month: 0, year: nextYear + 1 };
      }
      return { ...state, month: nextMonth };
    });
    updateCalendar();
  };

  return (
    <div className="App">
      <h1>Date-picker</h1>
      <div className="datePicker">
        <div
          className="dateBox"
          onClick={() => {
            setShowCalendar(!showCalendar);
            updateCalendar();
          }}
        >
          {`${curDate.year}년 ${curDate.month + 1}월 ${curDate.date}일`}
        </div>
        {showCalendar && (
          <div className="calendar">
            <div className="month">
              <button className="prev" onClick={movePrevMonth}>
                &#60;
              </button>
              <div>{`${curDate.year}년 ${curDate.month + 1}월`}</div>
              <button className="next" onClick={moveNextMonth}>
                &#62;
              </button>
            </div>
            <div className="days">
              <p className="day">SUN</p>
              <p className="day">MON</p>
              <p className="day">TUE</p>
              <p className="day">WED</p>
              <p className="day">THU</p>
              <p className="day">FRI</p>
              <p className="day">SAT</p>
            </div>
            <div className="dates" ref={calendarDatesRef}>
              {dateTagList}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
