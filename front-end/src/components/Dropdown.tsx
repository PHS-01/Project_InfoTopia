interface Props {
    children: string | JSX.Element | JSX.Element[]
    icon: string | JSX.Element | JSX.Element[]
}

export default function Dropdown({children, icon}: Props): JSX.Element {
    return (
        <>
            <div className="hs-dropdown relative inline-flex z-10">
                <button id="hs-dropdown-default" type="button" className="hs-dropdown-toggle py-3 inline-flex items-center gap-x-2" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                    {icon}
                </button>
                <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-ifrn-800 shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-default">
                    <div className="p-1 space-y-0.5">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}