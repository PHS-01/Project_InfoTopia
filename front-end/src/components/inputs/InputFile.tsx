interface Props {
    label: string
    inputName: string
    placeholder?: string | undefined
    onChange: (value: File|null) => void
    classes?: string | undefined
}

export default function InputFile({label, inputName, placeholder, onChange, classes}: Props): JSX.Element {
    return (
        <div className="flex flex-col gap-y-2">
            <label className="text-xl text-white" htmlFor={inputName}>{label}</label>
            <input type="file" id={inputName} name={inputName} placeholder={placeholder} onChange={(e) => onChange(e.target.files[0])} className={`rounded border border-cgray-100 placeholder:text-cgray-100 placeholder:p-2 pl-2 h-9 ${classes}`} />
        </div>
    )
}