import PropTypes from "prop-types"

export default function InputComp({type,description,label,placeholder,name,required = false,stateVar,setStatevar,descriptionControlFunc}) {
    return (
      <div className="input lg:h-[95px] h-[108px] flex flex-col space-y-2 py-1 px-2">
          <label htmlFor={name} className={"text-xs   w-full font-kalam "}>
              {
                  label
              }
              {
                  required?" *":""
              }
          </label>
          <input type={type} placeholder={placeholder} id={name} name={name} className={`w-full bg-inherit text-inherit font-kalam p-3 text-xs outline-none border-slate-500 border-b focus:border-b-[2px] ${description !=="" && "border-b-red-500 border-b-[2px]"}`} required={false} value={stateVar} onChange={(e)=>{setStatevar(e.target.value)}} onFocus={()=>descriptionControlFunc("")} autoComplete="off"/>
          {
              description!== "" && <span className={"description text-xs text-red-500"}>{description}</span>
          }
      </div>
    )
  }

InputComp.propTypes = {
    type : PropTypes.string,
    description : PropTypes.string,
    label : PropTypes.string,
    placeholder : PropTypes.string,
    name : PropTypes.string,
    required : PropTypes.bool,
    stateVar : PropTypes.string,
    setStatevar : PropTypes.func,
    descriptionControlFunc : PropTypes.func,
}  