import { useState } from "react";
import "./toggle.css";

const OnOffToggle = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isOn}
        onChange={() => setIsOn(!isOn)}
      />
      <span className="slider"></span>
    </label>
  );
};

export default OnOffToggle;
