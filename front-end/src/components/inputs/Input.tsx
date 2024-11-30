import { ChangeEvent, useEffect, useState } from "react"

interface Props {
    label: string
    inputName: string
    type: string
    placeholder?: string | undefined
    onChange: (value: string) => void
    classes?: string | undefined
    defaultValue?: string | number | undefined
}

export default function Input({label, inputName, type, placeholder, onChange, classes, defaultValue}: Props): JSX.Element {
    const [value, setValue] = useState(defaultValue || '')

    useEffect(() => {
        if (defaultValue !== undefined) {
            setValue(defaultValue);
        }
    }, [defaultValue]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        onChange(newValue)
    }

    return (
        <div className="flex flex-col gap-y-2">
            <label className="text-xl text-white" htmlFor={inputName}>{label}</label>
            <input type={type} id={inputName} name={inputName} placeholder={placeholder} onChange={handleChange} className={`rounded border border-cgray-100 placeholder:text-cgray-100 placeholder:p-2 pl-2 h-9 ${classes}`} value={value} />
        </div>
    )
}