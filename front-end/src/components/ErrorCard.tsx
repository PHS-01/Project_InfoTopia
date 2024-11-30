interface Props {
    errors: Array<string>
}

export default function ErrorCard({errors}: Props): JSX.Element {
    return (
        <div className="rounded-lg bg-red-200 text-red-500 border border-red-500 p-2 w-96 flex flex-col gap-y-1">
            <span>Os seguintes erros foram encontrados:</span>
            <ul className="list-disc list-inside">
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
        </div>        
    )
}