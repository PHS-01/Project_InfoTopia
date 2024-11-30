import { useRouteError } from "react-router-dom"

export default function ErrorPage(): JSX.Element {
    const error: unknown = useRouteError()

    return (
        <div>
            <h1>Houve um erro</h1>
            <p>
                Um erro inesperado ocorreu: <i>{(error as Error)?.message || (error as { statusText?: string })?.statusText}</i>
            </p>
        </div>
    )
}