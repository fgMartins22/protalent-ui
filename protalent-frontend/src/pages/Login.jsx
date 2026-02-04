import { useState, useEffect } from "react";
import { EyeClosed, Eye, Check, X, BicepsFlexed, LockOpen } from "lucide-react"
import { useNavigate } from "react-router-dom";

const GeometricCharacter = ({
    shape,
    color,
    size,
    focusedField,
    showPassword,
    index,
    isShaking,
    mousePos
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isBouncing, setIsBouncing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), index * 150);
        return () => clearTimeout(timer);
    }, [index]);

    // LÓGICA DE MOVIMENTO DO ROSTO ATUALIZADA
    // Se mostrar senha: vai para a esquerda (-20). Se focar campo: vai para a direita (18).
    const faceTranslateX = showPassword ? -20 : focusedField ? 18 : 0;

    // Se mostrar senha: sobe um pouco mais. Se focar: sobe levemente.
    const faceTranslateY = showPassword ? -12 : focusedField ? -8 : 0;

    // Se mostrar senha: vira para o outro lado (-8deg).
    const faceRotate = showPassword ? -8 : focusedField ? 5 : 0;

    const eyeScale = showPassword ? 0.6 : 1;
    const shakeClass = isShaking ? "animate-shake" : "";

    // Parallax desativado quando a senha aparece para manter o rosto "travado" na esquerda
    const parallaxX = !showPassword && mousePos ? (mousePos.x - 0.5) * (index + 1) * -2 : 0;
    const parallaxY = !showPassword && mousePos ? (mousePos.y - 0.5) * (index + 1) * -1.5 : 0;

    const bodyBase = `transition-all duration-700 ease-in-out origin-bottom ${color} relative flex items-center justify-center cursor-pointer`;
    const shadowIntensity = focusedField || showPassword ? "shadow-2xl drop-shadow-2xl" : "shadow-xl";

    // O corpo fica reto quando a senha aparece, mas inclina para a direita ao espiar
    const bodyTransform = (!showPassword && focusedField)
        ? "skew-x-[-8deg] translate-x-4 scale-105"
        : isBouncing
            ? "scale-105"
            : "skew-x-0 translate-x-0 scale-100";

    const shapeStyles = {
        rect: "rounded-3xl",
        square: "rounded-[2.5rem]",
        semi: "rounded-t-[150px] rounded-b-3xl",
        triangle: "clip-triangle",
    };

    const mouthExpression = showPassword
        ? "w-3 h-3 bg-black/60 rounded-full"
        : focusedField
            ? "w-8 h-2 bg-black/40 rounded-full"
            : "w-6 h-1.5 bg-black/30 rounded-full";

    return (
        <div
            className={`
        ${bodyBase} ${shapeStyles[shape]} ${size} ${bodyTransform} ${shadowIntensity} ${shakeClass}
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
        hover:scale-110 hover:brightness-110
      `}
            style={{
                transform: `translate(${parallaxX}px, ${parallaxY}px)`,
                filter: focusedField || showPassword ? "brightness(1.1)" : "brightness(1)",
            }}
            onClick={() => {
                setIsBouncing(true);
                setTimeout(() => setIsBouncing(false), 300);
            }}
        >
            {/* ROSTO - Agora vira para a esquerda ao mostrar senha */}
            <div
                className="flex flex-col items-center gap-3 relative z-10 transition-all duration-500 ease-out"
                style={{
                    transform: `translate(${faceTranslateX}px, ${faceTranslateY}px) rotate(${faceRotate}deg)`,
                }}
            >
                <div className="flex gap-3">
                    {[1, 2].map((i) => (
                        <div
                            key={i}
                            className="bg-black rounded-full transition-all duration-300"
                            style={{
                                width: `${12 * eyeScale}px`,
                                height: `${12 * eyeScale}px`,
                            }}
                        />
                    ))}
                </div>
                <div className={`${mouthExpression} transition-all duration-500`} />
            </div>

            {/* Partículas e CSS permanecem os mesmos */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .clip-triangle { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px) rotate(-1deg); }
          75% { transform: translateX(4px) rotate(1deg); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out infinite; }
      `}} />
        </div>
    );
};

export default function Login() {
    const [focusedField, setFocusedField] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

    const navigate = useNavigate();

    // Tremor quando mostra senha
    useEffect(() => {
        if (showPassword) {
            setIsShaking(true);
            const timer = setTimeout(() => setIsShaking(false), 500);
            return () => clearTimeout(timer);
        }
    }, [showPassword]);

    // Parallax com mouse
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Validação visual em tempo real
    const isEmailValid = email.includes("@") && email.includes(".");
    const isPasswordStrong = password.length >= 8;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            navigate("/transition");
        }, 2000);
    };


    const family = [
        { shape: "rect", color: "bg-gradient-to-br from-[#5833ff] to-[#7c3aed]", size: "w-40 h-64 z-10" },
        { shape: "semi", color: "bg-gradient-to-br from-[#ff7b31] to-[#ff6b1a]", size: "w-56 h-36 -ml-16 z-30" },
        { shape: "square", color: "bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]", size: "w-44 h-44 -ml-20 z-0" },
        { shape: "triangle", color: "bg-gradient-to-br from-[#fcd34d] to-[#fbbf24]", size: "w-40 h-44 -ml-12 z-20" },
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#f3ece7] via-[#f8f4f1] to-[#fef3e7] flex flex-col lg:flex-row items-center justify-center p-6 lg:p-20 gap-12 lg:gap-24 overflow-x-hidden relative">

            {/* Background decorativo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
            </div>

            {/* AREA DOS PERSONAGENS */}
            <div className="flex items-end justify-center min-h-[350px] w-full lg:w-1/2 scale-75 md:scale-90 lg:scale-100 transition-transform relative z-10">
                {family.map((char, i) => (
                    <GeometricCharacter
                        key={i}
                        {...char}
                        index={i}
                        focusedField={focusedField}
                        showPassword={showPassword}
                        isShaking={isShaking}
                        mousePos={mousePos}
                    />
                ))}
            </div>

            {/* FORMULÁRIO COM GLASSMORPHISM */}
            <div className="w-full max-w-md space-y-10 bg-white/40 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-white/50 relative z-10">
                <div className="space-y-3">
                    <h1
                        className="text-5xl font-black text-gray-900 tracking-tighter cursor-pointer select-none hover:text-[#5833ff] transition-colors"
                    >
                        Bem Vindo!
                    </h1>
                </div>

                <div className="space-y-8">
                    {/* Email com validação visual */}
                    <div className="group space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                            Email
                            {email && <span className="text-xs">{isEmailValid ? <Check /> : <X />}</span>}
                        </label>
                        <input
                            type="email"
                            placeholder="hello@geometric.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`
                w-full bg-white/80 backdrop-blur-sm border-b-4 p-4 outline-none transition-all text-lg rounded-t-2xl
                ${focusedField === "email" ? "border-[#5833ff] scale-[1.02] shadow-lg" : "border-gray-200"}
                ${email && !isEmailValid ? "border-red-300" : ""}
              `}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                        />
                    </div>

                    {/* Password com indicador de força */}
                    <div className="group space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                            Senha
                            {password && <span className="text-xs">{isPasswordStrong ? <BicepsFlexed /> : <LockOpen />}</span>}
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`
                  w-full bg-white/80 backdrop-blur-sm border-b-4 p-4 outline-none transition-all text-lg rounded-t-2xl pr-14
                  ${focusedField === "password" ? "border-[#ff7b31] scale-[1.02] shadow-lg" : "border-gray-200"}
                `}
                                onFocus={() => setFocusedField("password")}
                                onBlur={() => setFocusedField(null)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl grayscale hover:grayscale-0 transition-all hover:scale-110 active:scale-95"
                            >
                                {showPassword ? <Eye /> : <EyeClosed />}
                            </button>
                        </div>
                        {/* Barra de força da senha */}
                        {password && (
                            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-500 ${isPasswordStrong ? "bg-green-500 w-full" : "bg-orange-400 w-1/2"
                                        }`}
                                />
                            </div>
                        )}
                    </div>

                    <div className="space-y-4 pt-4">
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="cursor-pointer w-full bg-gradient-to-r from-black to-gray-800 text-white py-5 rounded-3xl font-black text-xl hover:from-[#5833ff] hover:to-[#7c3aed] transition-all transform active:scale-95 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-3">
                                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                    Loading...
                                </span>
                            ) : (
                                <>
                                    <span className="relative z-10">Entrar</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            className="cursor-pointer w-full flex items-center justify-center gap-3 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-3xl font-bold hover:bg-white hover:shadow-lg hover:scale-[1.02] transition-all active:scale-95"
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" alt="Google" />
                            Logar com o Google
                        </button>
                    </div>
                </div>

                {/* Link esqueceu senha */}
                <div className="text-center">
                    <button className="cursor-pointer text-sm text-gray-500 hover:text-[#5833ff] transition-colors underline decoration-dotted underline-offset-4">
                        Esqueceu sua senha?
                    </button>
                </div>
            </div>
        </main>
    );
}