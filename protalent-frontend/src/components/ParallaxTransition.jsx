import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ParallaxTransition() {
    const [show, setShow] = useState(true);
    const [impact, setImpact] = useState(false);
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const impactTimer = setTimeout(() => setImpact(true), 850);
        const activeTimer = setTimeout(() => setActive(true), 1000);

        const endTimer = setTimeout(() => {
            setShow(false);
            navigate("/home");
        }, 2200);

        return () => {
            clearTimeout(impactTimer);
            clearTimeout(activeTimer);
            clearTimeout(endTimer);
        };
    }, [navigate]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden bg-white"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{
                        opacity: { duration: 0.35, ease: "easeOut" },
                        scale: { duration: 0.45, ease: "easeOut" },
                    }}
                >

                    {/* CORTINA ESQUERDA */}
                    <motion.div
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{
                            x: "0%",
                            opacity: 1,
                        }}
                        transition={{ type: "spring", stiffness: 120, damping: 18 }}
                        className="fixed left-0 top-0 h-full w-1/2 bg-white z-10"
                    />

                    {/* CORTINA DIREITA */}
                    <motion.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{
                            x: "0%",
                            opacity: 1,
                        }}
                        transition={{ type: "spring", stiffness: 120, damping: 18 }}
                        className="fixed right-0 top-0 h-full w-1/2 bg-white z-10"
                    />

                    {/* LOGO */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="relative flex items-center">

                            {/* PRO */}
                            <motion.span
                                initial={{ x: -600 }}
                                animate={{
                                    x: impact ? -8 : 0,
                                    scaleX: impact ? 0.94 : 1,
                                }}
                                transition={{ type: "spring", stiffness: 160, damping: 14 }}
                                className="text-6xl font-black text-black"
                            >
                                Pro
                            </motion.span>

                            {/* TALENT */}
                            <motion.span
                                initial={{ x: 600 }}
                                animate={{
                                    x: impact ? 8 : 0,
                                    scaleX: impact ? 0.94 : 1,
                                    color: active ? "#7c3aed" : "#000000",
                                }}
                                transition={{ type: "spring", stiffness: 160, damping: 14 }}
                                className="text-6xl font-black"
                            >
                                Talent
                            </motion.span>

                            {/* GLOW */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: active ? 1.6 : 0,
                                    opacity: active ? 0.25 : 0,
                                }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0 rounded-full bg-purple-500 blur-3xl"
                            />

                            {/* FAÍSCAS */}
                            {active && (
                                <div className="absolute inset-0 pointer-events-none">
                                    {[...Array(10)].map((_, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 1, scale: 0, x: 40, y: 0 }}
                                            animate={{
                                                opacity: 0,
                                                scale: 1,
                                                x: 40 + (Math.random() - 0.5) * 200,
                                                y: (Math.random() - 0.5) * 140,
                                            }}
                                            transition={{ duration: 0.6 }}
                                            className="absolute w-1.5 h-1.5 bg-purple-500 rounded-full"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
