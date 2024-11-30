interface Props {
    children: string | JSX.Element | JSX.Element[]
    style: string
    type?: 'button' | 'submit' | 'reset' | undefined
    onClick?: ((e: React.SyntheticEvent) => void) | (() => void)
}

export default function Button({ children, style, type, onClick }: Props): JSX.Element {
    return (
        <button className={style} onClick={(e) => onClick(e)} type={type}>
            {children}
        </button>
    )
}