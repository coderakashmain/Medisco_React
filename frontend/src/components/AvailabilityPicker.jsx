import React, { useState, useEffect } from "react";

const CustomTimePicker = ({ value, onChange }) => {
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [startAMPM, setStartAMPM] = useState("AM");

  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const [endAMPM, setEndAMPM] = useState("PM");

  // Parse initial value
  useEffect(() => {
    if (value && value.includes(" - ")) {
      const [start, end] = value.split(" - ");
      const [sHour, sMinAMPM] = start.split(":");
      setStartHour(sHour);
      setStartMinute(sMinAMPM.slice(0, 2));
      setStartAMPM(sMinAMPM.slice(3));

      const [eHour, eMinAMPM] = end.split(":");
      setEndHour(eHour);
      setEndMinute(eMinAMPM.slice(0, 2));
      setEndAMPM(eMinAMPM.slice(3));
    }
  }, [value]);


useEffect(() => {
 
  if (startHour !== "" || startMinute !== "" || endHour !== "" || endMinute !== "") {
    const formattedStart = startHour && startMinute ? `${startHour}:${startMinute} ${startAMPM}` : "";
    const formattedEnd = endHour && endMinute ? `${endHour}:${endMinute} ${endAMPM}` : "";
    const availability = formattedStart && formattedEnd ? `${formattedStart} - ${formattedEnd}` : "";
    onChange(availability);
  }
}, [startHour, startMinute, startAMPM, endHour, endMinute, endAMPM]);



  const handleNumberInput = (value, max) => {
    let num = parseInt(value);
    if (isNaN(num)) return "";
    if (num < 0) num = 0;
    if (num > max) num = max;
    return String(num).padStart(2, "0");
  };

  return (
    <div className="flex gap-10 items-center mt-10">
      
      <input
        type="number"
        style={{margin : 0 , background : 'var(--bg-white)' , boxShadow : 'none'}}
        placeholder="HH"
        value={startHour}
        onChange={e => setStartHour(handleNumberInput(e.target.value, 12))}
        className=" px-2 py-5 w-12 text-center outline-none text-sm border border-lightgary rounded"
      />
      :
      <input
        type="number"
        style={{margin : 0 , background : 'var(--bg-white)' , boxShadow : 'none'}}
        placeholder="MM"
        value={startMinute}
        onChange={e => setStartMinute(handleNumberInput(e.target.value, 59))}
       className=" px-2 py-5 w-12 text-center outline-none text-sm border border-lightgary rounded"
      />
      <select value={startAMPM} onChange={e => setStartAMPM(e.target.value)} className=" border border-lightgary outline-none rounded px-5 py-5 text-sm">
        <option className="text-sm">AM</option>
        <option className="text-sm">PM</option>
      </select>

      <span className="mx-2">-</span>

      {/* End Time */}
      <input

        type="number"
        style={{margin : 0 , background : 'var(--bg-white)' , boxShadow : 'none'}}
        placeholder="HH"
        value={endHour}
        onChange={e => setEndHour(handleNumberInput(e.target.value, 12))}
        className=" px-2 py-5 w-12 text-center outline-none text-sm border border-lightgary rounded"
      />
      :
      <input
        type="number"
        style={{margin : 0 , background : 'var(--bg-white)' , boxShadow : 'none'}}
        placeholder="MM"
        value={endMinute}
        onChange={e => setEndMinute(handleNumberInput(e.target.value, 59))}
        className=" px-2 py-5 w-12 text-center outline-none text-sm border border-lightgary rounded"
      />
      <select value={endAMPM} onChange={e => setEndAMPM(e.target.value)} className="border border-lightgary outline-none rounded px-5 py-5 text-sm">
        <option className="text-sm">AM</option>
        <option className="text-sm">PM</option>
      </select>
    </div>
  );
};

export default CustomTimePicker;
