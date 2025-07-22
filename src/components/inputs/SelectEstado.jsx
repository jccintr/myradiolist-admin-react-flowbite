import { Select } from "flowbite-react";
import { estados } from "../../util/util";

const SelectEstado = ({onChange,selected}) => {
  return (
    <div className="mt-1">
    <Select value={selected}  placeholder={"Selecione o estado"} onChange={(e)=>onChange(e.target.value)} >
         <option key={0} value={0} selected={selected==0?true:false}>{"Selecione o estado"}</option>
         {estados.map((estado,index)=><option key={index} value={estado} selected={selected==estado?true:false}>{estado}</option>)}
    </Select>
    </div>
  )
}

export default SelectEstado