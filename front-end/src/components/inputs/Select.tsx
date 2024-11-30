import { ChangeEvent, useEffect, useState } from "react"

interface Props {
    label: string
    inputName: string
    onChange: (value: string) => void
    children: string | JSX.Element | JSX.Element[]
    defaultValue: number|string|undefined
}

export default function Select({inputName, label, onChange, children, defaultValue}: Props): JSX.Element {
    const [value, setValue] = useState(defaultValue || '')

    useEffect(() => {
        if (defaultValue !== undefined) {
            setValue(defaultValue);
        }
    }, [defaultValue]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        onChange(newValue)
    }
    return (
        <div className="flex flex-col gap-y-2">
            <label className="text-xl text-white" htmlFor={inputName}>{label}</label>
            <select id={inputName} name={inputName} onChange={handleChange} className="rounded border border-cgray-100 placeholder:text-cgray-100 placeholder:p-2 pl-2 h-9" value={value}>
                {children}
            </select>
        </div>
    )
}