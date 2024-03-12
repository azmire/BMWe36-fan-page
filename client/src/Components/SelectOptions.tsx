import Form from "react-bootstrap/Form";

function SelectProductionYear() {
  return (
    <>
      <Form.Select aria-label="Variant">
        <option>Select model</option>
        <option value="Coupe">Coupe</option>
        <option value="Cabrio">Cabrio</option>
        <option value="Sedan">Sedan</option>
        <option value="Compact">Compact</option>
        <option value="Combi">Combi</option>
      </Form.Select>
      <Form.Select aria-label="Year">
        <option>Select production year</option>
        <option value="1990">1990</option>
        <option value="1991">1991</option>
        <option value="1992">1992</option>
        <option value="1994">1994</option>
        <option value="1995">1995</option>
        <option value="1996">1996</option>
        <option value="1997">1997</option>
        <option value="1998">1998</option>
        <option value="1999">1999</option>
        <option value="2000">2000</option>
      </Form.Select>
      <Form.Select aria-label="Code">
        <option>Select engine type</option>
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

export default SelectProductionYear;
