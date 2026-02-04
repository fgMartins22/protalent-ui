import { useState } from "react"
import CurriculosList from "./CurriculosList"
import CurriculoCreate from "./CurriculoCreate"
import CurriculosHeader from "./CurriculoHeader"

import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Curriculos() {
    const [mode, setMode] = useState("list")
    // list | create

    return (
        <main>
            <div className="min-h-screen">
                <div>
                    <Header />
                </div>

                <div className="mb-12">
                    {/* Header */}
                     <CurriculosHeader mode={mode} setMode={setMode} />
                </div>

                <div className="max-w-7xl mx-auto mb-12">

                    {mode === "list" && <CurriculosList />}
                    {mode === "create" && <CurriculoCreate onBack={() => setMode("list")} />}

                </div>
            </div>
        <div>
            <Footer />
        </div>
        </main>
    )
}
