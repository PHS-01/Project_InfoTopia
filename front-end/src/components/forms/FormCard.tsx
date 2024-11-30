interface Props {
    children: string | JSX.Element | JSX.Element[]
}

export default function FormCard({children}: Props): JSX.Element {
    return (
        <div className="rounded-lg border border-cgray-800 w-96 bg-ifrn-800">
            <div className="flex flex-col gap-y-8 m-6">
                {children}
            </div>
        </div>
    )
}