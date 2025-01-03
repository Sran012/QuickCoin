export function InputBox({label,placeholder, onChange}){
    return (
        <div>
            <div className="text-left">{label}</div>
            <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-400"></input>
        </div>
    )
}