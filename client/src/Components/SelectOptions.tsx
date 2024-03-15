import { Dispatch } from "react";
import Form from "react-bootstrap/Form";

declare type SelectOptionType = {
  setYear: Dispatch<string>;
  setEngine: Dispatch<string>;
  setModel: Dispatch<string>;
};

function SelectOptions({ setYear, setEngine, setModel }: SelectOptionType) {
  return (
    <>
      {/* <button onClick={() => setModel("clicked")}>Click me</button> */}

      <Form.Select
        aria-label="Variant"
        onChange={(e) => setModel(e.target.value)}
        defaultValue="unknown"
      >
        <option>Choose car model</option>
        <option value="Coupe">Coupe</option>
        <option value="Cabrio">Cabrio</option>
        <option value="Sedan">Sedan</option>
        <option value="Compact">Compact</option>
        <option value="Combi">Combi</option>
      </Form.Select>

      <Form.Select
        aria-label="Year"
        onChange={(e) => setYear(e.target.value)}
        defaultValue="unknown"
      >
        <option>Choose production year</option>
        <option value="1990">1990</option>
        <option value="1991">1991</option>
        <option value="1992">1992</option>
        <option value="1993">1993</option>
        <option value="1994">1994</option>
        <option value="1995">1995</option>
        <option value="1996">1996</option>
        <option value="1997">1997</option>
        <option value="1998">1998</option>
        <option value="1999">1999</option>
        <option value="2000">2000</option>
      </Form.Select>
      <Form.Select
        aria-label="Code"
        onChange={(e) => setEngine(e.target.value)}
        defaultValue="unknown"
      >
        <option>Choose engine code</option>
        <option value="M43B16">M43B16</option>
        <option value="M44B19">M44B19</option>
        <option value="M42B18">M42B18</option>
        <option value="M50B20">M50B20</option>
        <option value="M52B25">M52B25</option>
        <option value="M50B25">M50B25</option>
        <option value="M52B28">M52B28</option>
        <option value="S50B30">S50B30</option>
        <option value="S50B32">S50B32</option>
      </Form.Select>
    </>
  );
}

export default SelectOptions;
