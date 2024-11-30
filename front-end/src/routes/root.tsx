import Header from "../components/Header"
import MainSection from "../components/MainSection"
// import PostSection from "../components/PostSection"
import Footer from "../components/Footer"

export default function Root() {
    return (
        <>
            <div className="min-h-screen border-b-4 border-gray-300">
                <Header isLogged={false}/>
                <MainSection />
                {/* <PostSection /> */}
            </div>
            <Footer />
        </>
    )
}