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
        <main className="min-h-screen flex flex-col bg-slate-50">
            <Header />

            <CurriculosHeader mode={mode} setMode={setMode} />

            <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-10">
                {mode === "list" && <CurriculosList />}
                {mode === "create" && <CurriculoCreate onBack={() => setMode("list")} />}
            </div>

            <Footer />
        </main>
    )
}
