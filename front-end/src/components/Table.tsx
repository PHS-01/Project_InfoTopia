interface Props {
    headers: Array<string>
    children: string | JSX.Element | JSX.Element[]
}

export default function Table({children, headers}: Props): JSX.Element {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-[40rem] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-ifrn-800">
                    <tr>
                        {headers.map((header, index) => <th scope="col" className="px-6 py-3" key={index}>{header}</th>)}
                    </tr>
                </thead>
                <tbody className="odd:bg-white even:bg-cgray-800 border-b dark:border-gray-700">
                    {children}
                </tbody>
            </table>
        </div>
    )
}