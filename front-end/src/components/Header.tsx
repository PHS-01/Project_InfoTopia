import "preline/preline"

import { IStaticMethods } from "preline/preline"
import HamburguerMenu from "./HamburguerMenu"
import { AuthOptions } from "./AuthOptions"
import GuestOptions from "./GuestOptions"

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods
  }
}

interface Props {
  isLogged?: boolean | undefined
  page?: string | undefined
}

export default function Header({isLogged}: Props): JSX.Element {
    return (
        <HamburguerMenu isLogged={isLogged}>
          {isLogged ? <AuthOptions /> : <GuestOptions /> }
        </HamburguerMenu>
        // <header className="border-b border-dark-gray bg-lime-500">
        //     <div className="flex justify-between px-16 py-6">
        //         <Link to={isLogged ? "/dashboard" : "/"}>
        //             <img src="/ifrn.jpg" alt="Logo IFRN" className="w-12" />
        //         </Link>
        //         {isLogged && <h2 className="bg-lime-100 text-cgray-800 text-xl font-semibold p-2 max-h-[3rem] rounded-lg">{page}</h2>}
        //         <div className="flex gap-x-4 items-center">
        //             {isLogged ? <AuthOptions /> : <GuestOptions /> }
        //         </div>
        //         <HamburguerMenu />
        //     </div>
        // </header>
    )
}