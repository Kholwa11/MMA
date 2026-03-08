import React, { useEffect, useRef, useState } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
import { HardHat, Building2, Wrench, ChevronDown, CheckCircle2, Factory, Activity, Truck, Hammer, PenTool, BarChart } from 'https://esm.sh/lucide-react@0.292.0?deps=react@18.2.0';
import gsap from 'https://esm.sh/gsap@3.12.2';
import { motion, useInView } from 'https://esm.sh/framer-motion@10.16.4?deps=react@18.2.0,react-dom@18.2.0';

// Keyword Highlighting Component (Scroll triggered)
const HighlightText = ({ text }) => {
    const keywords = ["1998", "Infrastructure", "Manufacturing", "ABSA", "Precision", "Logistics", "Civil", "Property", "Mechanical", "Management"];
    const words = text.split(/(\s+)/);

    return (
        <>
            {words.map((word, idx) => {
                const cleanWord = word.replace(/[.,]/g, '');
                const isMatch = keywords.some(k => cleanWord.toLowerCase() === k.toLowerCase());

                if (isMatch) {
                    return (
                        <span key={idx} className="relative inline-block group whitespace-nowrap">
                            <span className="relative z-10 text-moss font-bold drop-shadow-[0_0_8px_rgba(78,104,51,0.6)]">
                                {word}
                            </span>
                            <motion.span
                                initial={{ width: "0%" }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="absolute bottom-0 left-0 h-[3px] bg-moss/80 shadow-[0_0_12px_rgba(78,104,51,0.8)] rounded-full"
                            />
                        </span>
                    );
                }
                return <span key={idx}>{word}</span>;
            })}
        </>
    );
};

// Framer Motion Staggered Word Reveal
const StaggerReveal = ({ text, className = "", delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const words = text.split(" ");
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: delay } }
    };
    const childVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 14, stiffness: 120 } }
    };
    return (
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className={className}>
            {words.map((word, idx) => (
                <motion.span key={idx} variants={childVariants} className="inline-block mr-[0.25em]">
                    <HighlightText text={word} />
                </motion.span>
            ))}
        </motion.div>
    );
};

const StaggerLine = ({ children, delay = 0, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut", delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Floating Metric Chips
const FloatingMetricChips = () => {
    const metrics = [
        { text: "EST. 1998", top: "15%", left: "10%" },
        { text: "REG: 2021/486187/07", top: "45%", right: "8%" },
        { text: "HQ: PRETORIA", bottom: "25%", left: "12%" },
        { text: "B-BBEE LEVEL 1", top: "65%", left: "20%" },
        { text: "CIDB: 5CE PE", bottom: "40%", right: "15%" },
    ];

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {metrics.map((m, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: ["-10px", "10px"],
                        x: ["-5px", "5px"],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: i
                    }}
                    className="absolute font-mono text-[10px] tracking-[0.3em] text-moss uppercase whitespace-nowrap mix-blend-multiply"
                    style={{ top: m.top, left: m.left, right: m.right, bottom: m.bottom }}
                >
                    [{m.text}]
                </motion.div>
            ))}
        </div>
    );
};

// GSAP Floating Parallax Icons
const FloatingBackgroundIcons = () => {
    const containerRef = useRef(null);
    useEffect(() => {
        const icons = gsap.utils.toArray('.floating-icon');
        icons.forEach(icon => {
            gsap.to(icon, { y: `random(-40, 40)`, x: `random(-40, 40)`, rotation: `random(-20, 20)`, duration: `random(4, 7)`, repeat: -1, yoyo: true, ease: "sine.inOut" });
            gsap.to(icon, { yPercent: `random(-150, 150)`, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1 } });
        });
    }, []);
    const iconProps = { size: 160, strokeWidth: 0.5, className: "text-moss/5 mix-blend-multiply" };
    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="floating-icon absolute top-[10%] left-[5%]"><HardHat {...iconProps} /></div>
            <div className="floating-icon absolute top-[40%] right-[10%]"><Factory {...iconProps} /></div>
            <div className="floating-icon absolute bottom-[20%] left-[15%]"><Truck {...iconProps} /></div>
            <div className="floating-icon absolute top-[70%] right-[20%]"><Hammer {...iconProps} /></div>
            <div className="floating-icon absolute top-[20%] right-[30%]"><Building2 {...iconProps} /></div>
        </div>
    );
};

// Marquee Client Wall
const MarqueeWall = () => {
    const clients = ["ABSA GROUP FOUNDATIONAL", "MAMELODI HOSPITAL EXPANSION", "KIT KAT SHOPPING CENTRE", "SOSHANGUVE RESIDENCES", "DIPALESENG MUNICIPALITY", "DEPARTMENT OF PUBLIC WORKS"];
    return (
        <div className="relative overflow-hidden flex w-full h-32 bg-dark text-moss border-y border-white/10 group">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-dark to-transparent z-10"></div>

            <div className="animate-marquee whitespace-nowrap flex items-center group-hover:animate-marquee-fast transition-all duration-500">
                {[...clients, ...clients, ...clients].map((client, idx) => (
                    <span key={idx} className="mx-12 font-heading font-extrabold text-4xl md:text-5xl tracking-tighter opacity-80 hover:opacity-100 transition-opacity">
                        {client}
                    </span>
                ))}
            </div>
        </div>
    );
};

// Spotlight Image Section
const ObsidianSpotlight = () => {
    const [mouse, setMouse] = useState({ x: 50, y: 50 });
    const handleMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMouse({ x, y });
    };
    return (
        <section className="py-32 px-8 bg-[#121212] relative z-40 overflow-hidden" onMouseMove={handleMove}>
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <div className="text-center mb-16 relative z-20">
                    <h3 className="font-mono text-moss text-xs tracking-[0.2em] mb-3 uppercase">Macro Scale</h3>
                    <h4 className="font-heading text-4xl md:text-6xl font-extrabold text-paper tracking-tight">Obsidian <span className="text-earth">Integrity.</span></h4>
                </div>

                <div className="w-full h-[60vh] rounded-2xl relative overflow-hidden ring-1 ring-white/10 shadow-2xl group cursor-crosshair">
                    <div
                        className="absolute inset-0 z-10 transition-opacity duration-300 opacity-90 group-hover:opacity-100 pointer-events-none"
                        style={{ background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, transparent 10%, #121212 80%)` }}
                    />

                    <div className="flex w-full h-full gap-8 p-8 relative z-0">
                        {/* Image 1 */}
                        <div className="flex-1 relative rounded-xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center">
                            <img src="./assets/absa.png" alt="ABSA Project" className="w-full h-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 transition-all duration-1000" />
                            <div className="absolute bottom-4 left-4 z-20 text-paper font-mono text-[10px] tracking-widest bg-dark/80 px-3 py-1.5 backdrop-blur-md rounded border border-white/10">
                                // PROJECT_01_ABSA.DAT
                            </div>
                        </div>

                        {/* Image 2 */}
                        <div className="flex-1 relative rounded-xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center">
                            <img src="./assets/student-res.png" alt="Student Res Project" className="w-full h-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 transition-all duration-1000" />
                            <div className="absolute bottom-4 left-4 z-20 text-paper font-mono text-[10px] tracking-widest bg-dark/80 px-3 py-1.5 backdrop-blur-md rounded border border-white/10">
                                // PROJECT_02_SOSHANGUVE_RES.DAT
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 text-paper/70 font-body font-light relative z-20">
                    <motion.div className="bg-white/5 p-6 rounded-xl border border-white/10" whileHover={{ y: -5, borderColor: "rgba(78,104,51,0.5)" }}>
                        <StaggerReveal text="Our structural framing dictates urban footprints." />
                        <StaggerReveal text="We execute aggressive concrete pours requiring extreme logistical coordination and massive curing footprints." />
                    </motion.div>
                    <motion.div className="bg-white/5 p-6 rounded-xl border border-white/10" whileHover={{ y: -5, borderColor: "rgba(78,104,51,0.5)" }}>
                        <StaggerReveal text="Every massive foundational trench requires clinical geological foresight." />
                        <StaggerReveal text="We orchestrate towering cranes and multi-ton steel rigging to forge impossible geometries." />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const App = () => {
    const navRef = useRef(null);

    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setHasScrolled(isScrolled);
            if (isScrolled) {
                navRef.current.classList.add('glass-nav');
                navRef.current.classList.remove('bg-transparent', 'py-8');
                navRef.current.classList.add('py-4');
            } else {
                navRef.current.classList.remove('glass-nav');
                navRef.current.classList.add('bg-transparent', 'py-8');
                navRef.current.classList.remove('py-4');
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="min-h-screen relative font-body text-dark overflow-x-hidden selection:bg-moss/30 selection:text-dark">

            {/* Global Fixed Architectural Blueprint Grid */}
            <div className="fixed inset-0 z-[-1] blueprint-bg opacity-[0.3] pointer-events-none" />

            <style dangerouslySetInnerHTML={{
                __html: `
                .glass-nav { backdrop-filter: blur(16px); background: rgba(249, 249, 249, 0.75); border-bottom: 1px solid rgba(0, 0, 0, 0.05); }
                .blueprint-bg {
                    background-image: linear-gradient(rgba(78, 104, 51, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(78, 104, 51, 0.07) 1px, transparent 1px);
                    background-size: 60px 60px;
                }
                .logo-container { position: relative; overflow: hidden; display: inline-block; }
                .logo-container::after {
                    content: ''; position: absolute; top: 0; left: -100%; w: 50%; h: 100%;
                    background: linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent);
                    transform: skewX(-20deg); animation: shine 5s infinite;
                }
                @keyframes shine { 0% { left: -100%; opacity: 0; } 10% { left: 200%; opacity: 1; } 100% { left: 200%; opacity: 0; } }
                @keyframes breathe { 0%, 100% { background-color: rgba(78, 104, 51, 0.02); } 50% { background-color: rgba(78, 104, 51, 0.06); } }
                .breathing-bg { animation: breathe 8s ease-in-out infinite; }
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
                .animate-marquee { animation: marquee 30s linear infinite; width: max-content; }
                .animate-marquee-fast { animation: marquee 15s linear infinite; width: max-content; }
            `}} />

            {/* Navigation */}
            <nav ref={navRef} className={`fixed w-full z-50 top-0 transition-all duration-500 py-8 px-8 flex justify-between items-center overflow-visible ${hasScrolled ? 'bg-transparent' : 'bg-transparent pointer-events-none'}`}>
                <div className="flex items-center gap-4 group">
                    <div className="relative w-[78px] md:w-[88px] h-[78px] md:h-[88px] flex items-center shrink-0">
                        {hasScrolled && (
                            <motion.div
                                layoutId="main-logo"
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="logo-container absolute bottom-0 left-0 w-full pointer-events-auto"
                            >
                                <img src="./assets/logo.png" alt="MMA" className="h-[78px] md:h-[88px] w-auto drop-shadow-lg mix-blend-multiply transition-transform duration-500 group-hover:scale-105 relative -bottom-2" />
                            </motion.div>
                        )}
                    </div>
                    <div className={`hidden md:block border-l border-moss/40 pl-4 h-full relative -bottom-2 transition-opacity duration-700 pointer-events-auto ${hasScrolled ? 'opacity-100' : 'opacity-0'}`}>
                        <h1 className="font-heading font-extrabold text-sm tracking-widest text-dark">MMA</h1>
                        <p className="text-[10px] text-moss font-mono tracking-widest">EST. 1998</p>
                    </div>
                </div>
                <button className={`bg-dark text-paper px-6 py-2.5 font-mono text-xs tracking-[0.2em] hover:bg-moss transition-all duration-700 pointer-events-auto ${hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    ENGAGE
                </button>
            </nav>

            {/* Black Background Overlay */}
            <div className={`fixed inset-0 z-[55] pointer-events-none transition-colors duration-1000 ${hasScrolled ? 'bg-transparent' : 'bg-[#050505]'}`} />

            {!hasScrolled && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
                    <motion.div
                        layoutId="main-logo"
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="logo-container pointer-events-auto relative rounded-[2rem] p-4 bg-white/5 backdrop-blur-sm border border-moss/20 shadow-[0_0_80px_rgba(78,104,51,0.8)]"
                        style={{ width: '40vw', maxWidth: '32rem' }}
                    >
                        {/* Dynamic Green Glow Behind Video */}
                        <div className="absolute inset-0 bg-moss/50 blur-[80px] rounded-[3rem] z-[-1] animate-pulse"></div>

                        <video
                            src="./assets/video_logo.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-auto object-contain relative z-10 rounded-[1.5rem] mix-blend-normal"
                        />
                    </motion.div>
                </div>
            )}

            {/* Large spacer to avoid immediate text cut-off on scroll */}
            <div className="h-[70vh] w-full relative z-10" />

            {/* Hero (Solid Paper White) */}
            <section className="relative min-h-[75vh] flex items-center justify-center bg-transparent z-10">
                <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-12">
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-moss font-mono tracking-[0.3em] mb-6 text-xs bg-dark/5 inline-block px-4 py-1.5 uppercase rounded">
                        25+ Years Excellence
                    </motion.p>
                    <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, type: "spring" }} className="font-heading text-6xl md:text-8xl font-extrabold text-dark mb-6 tracking-tight leading-none mix-blend-multiply">
                        Legacy Meets <br /><span className="text-moss">Precision.</span>
                    </motion.h2>
                    <div className="max-w-xl mx-auto mb-16 font-light leading-relaxed text-dark/80 text-lg md:text-xl">
                        <StaggerReveal text="Founded in 1998, MMA Building Construction and Logistics stands as a beacon of clinical execution." delay={0.6} />
                        <StaggerReveal text="We bridge heavy-duty civil engineering and elite property operations seamlessly." delay={1.2} />
                    </div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="mt-12">
                        <ChevronDown className="mx-auto text-moss opacity-70 animate-bounce" size={28} />
                    </motion.div>
                </div>
            </section>

            {/* Marquee Institutional Track Record */}
            <section className="py-24 bg-paper breathing-bg relative z-30">
                <div className="max-w-7xl mx-auto px-8 mb-16 text-center">
                    <h3 className="font-mono text-moss text-xs tracking-[0.2em] mb-3 uppercase">Macro Log</h3>
                    <h4 className="font-heading text-4xl md:text-5xl font-extrabold text-dark tracking-tight">Institutional <span className="text-moss">Track Record.</span></h4>
                </div>

                <StaggerLine>
                    <MarqueeWall />
                </StaggerLine>

                <div className="max-w-7xl mx-auto px-8 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-body text-sm font-light text-center text-dark/60">
                    <StaggerLine delay={0.1}><HighlightText text="ABSA Group (1998): Foundational commercial infrastructure." /></StaggerLine>
                    <StaggerLine delay={0.2}><HighlightText text="Mamelodi Hospital (2005): Heavy-duty healthcare expansion." /></StaggerLine>
                    <StaggerLine delay={0.3}><HighlightText text="Kit Kat Centre (2021): Large-scale retail property development." /></StaggerLine>
                </div>
            </section>

            {/* GSAP Parallax Layer & Background Content Container */}
            <div className="relative z-20 bg-paper/90 backdrop-blur-sm border-t border-moss/10">
                <FloatingBackgroundIcons />
                <FloatingMetricChips />

                {/* The 1998 Heritage with Founder Insert */}
                <section className="py-32 px-8 relative z-30">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="font-mono text-moss text-xs tracking-[0.2em] mb-4 uppercase">The 1998 Heritage</h3>
                            <h4 className="font-heading text-4xl md:text-6xl font-extrabold text-dark tracking-tight mb-10">Specialists Turned <span className="text-earth">Industry Leaders.</span></h4>

                            <div className="space-y-6 font-body text-dark/80 text-lg md:text-xl leading-relaxed font-light text-justify md:text-left">
                                <StaggerLine><StaggerReveal text="The genesis of MMA was rooted in a distinct vision: delivering uncompromising structural integrity." /></StaggerLine>
                                <StaggerLine><StaggerReveal text="Beginning in 1998 with the landmark ABSA Group project, Mr. Malerotho Makgatje Abram established our reputation for perfect precision." /></StaggerLine>
                                <StaggerLine>
                                    <motion.div whileHover={{ y: -4 }} className="p-6 bg-white border border-moss/10 rounded-2xl shadow-xl my-6 inline-block w-full text-left">
                                        <StaggerReveal text="Today, under Mr. Malerotho Mokgaudi Isaac, our contracting heritage has aggressively evolved into a full-scale property powerhouse." />
                                    </motion.div>
                                </StaggerLine>
                                <StaggerLine><StaggerReveal text="Longevity is only achieved through obsessive customer satisfaction and irrefutable professional integrity across all operating sectors." /></StaggerLine>
                            </div>
                        </div>

                        {/* High-End Founder Insert */}
                        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full max-w-[300px] md:max-w-[380px] shrink-0 relative mt-12 md:mt-0">
                            <div className="absolute -inset-3 border border-moss/30 rounded-2xl pointer-events-none"></div>
                            <img src="./assets/founder.jpg" alt="Founder" className="w-full h-auto rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] sepia-[0.1] border-2 border-white relative z-10" />
                            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-dark/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-moss/40 shadow-lg">
                                <div className="w-2 h-2 rounded-full bg-moss animate-pulse shadow-[0_0_8px_#4E6833]"></div>
                                <span className="text-[9px] text-white font-mono uppercase tracking-[0.2em] font-bold">System Active</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Protocol / Services Expanded */}
                <section className="py-24 px-8 relative z-30">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-20 text-center md:text-left">
                            <h3 className="font-mono text-moss text-xs tracking-[0.2em] mb-3 uppercase">Protocol Axis</h3>
                            <h4 className="font-heading text-4xl md:text-6xl font-extrabold text-dark tracking-tight mb-8">Deep Core <span className="text-earth">Capabilities.</span></h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <StaggerLine delay={0.1} className="h-full">
                                <div className="bg-white p-12 border border-black/5 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative group h-full">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-moss/5 blur-3xl rounded-full"></div>
                                    <HardHat className="text-moss mb-8 relative z-10" size={40} strokeWidth={1} />
                                    <h5 className="font-heading font-extrabold text-3xl mb-6 text-dark relative z-10">Civil Engineering</h5>
                                    <div className="space-y-4 font-body text-base text-dark/70 font-light relative z-10">
                                        <StaggerReveal text="We orchestrate massive infrastructure mechanics." />
                                        <StaggerReveal text="Aggressive earthworks, bulk water pipeline installations, and rigid concrete structures." />
                                        <StaggerReveal text="Sewer reticulation, heavy paving, road surface kerbing, and advanced plumbing systems." />
                                        <StaggerReveal text="We execute with unforgiving accuracy, ensuring generational longevity." />
                                    </div>
                                </div>
                            </StaggerLine>

                            <StaggerLine delay={0.2} className="h-full">
                                <div className="bg-white p-12 border border-black/5 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative group h-full">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-moss/5 blur-3xl rounded-full"></div>
                                    <Building2 className="text-moss mb-8 relative z-10" size={40} strokeWidth={1} />
                                    <h5 className="font-heading font-extrabold text-3xl mb-6 text-dark relative z-10">Property Ops</h5>
                                    <div className="space-y-4 font-body text-base text-dark/70 font-light relative z-10">
                                        <StaggerReveal text="We dominate end-to-end real estate and housing project lifecycles." />
                                        <StaggerReveal text="Complex commercial development, deep building renovations, structural alterations, ceiling, and partitioning mechanics." />
                                        <StaggerReveal text="From raw plot acquisition to final hyper-scalable structural turnover." />
                                    </div>
                                </div>
                            </StaggerLine>

                            <StaggerLine delay={0.3} className="md:col-span-2">
                                <div className="bg-dark text-paper p-12 border border-dark rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative group h-full">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-moss/20 blur-3xl rounded-full mix-blend-screen pointer-events-none"></div>
                                    <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                                        <div className="md:w-1/3 shrink-0 text-center md:text-left">
                                            <Activity className="text-moss mb-8 mx-auto md:mx-0" size={48} strokeWidth={1} />
                                            <h5 className="font-heading font-extrabold text-3xl md:text-4xl mb-4">Consulting &<br />Supply</h5>
                                        </div>
                                        <div className="flex-1 space-y-4 font-body text-lg text-paper/80 font-light md:border-l md:border-paper/20 md:pl-12 text-center md:text-left">
                                            <StaggerReveal text="Elite project management and oversight driving strict budget enforcement." />
                                            <StaggerReveal text="Precise architectural design generation and rigorous structural CAD drafting." />
                                            <StaggerReveal text="Quantity surveying deployed to lock in financial metrics." />
                                            <StaggerReveal text="General supply chain management ensuring raw material flows remain uninterrupted." />
                                        </div>
                                    </div>
                                </div>
                            </StaggerLine>
                        </div>
                    </div>
                </section>

                {/* Industrial Manufacturing Full Width Section (Breathing Background) */}
                <section className="py-32 px-8 relative z-30 breathing-bg border-y border-moss/10 overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-white/90 backdrop-blur-xl p-12 border border-moss/20 rounded-[2.5rem] relative z-10 shadow-[0_20px_50px_rgba(78,104,51,0.1)]">
                            <div className="flex flex-col lg:flex-row items-start gap-16">
                                <div className="p-8 bg-dark rounded-[2rem] shrink-0 text-moss shadow-2xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-moss/10 blur-xl"></div>
                                    <Factory size={64} strokeWidth={1} className="relative z-10" />
                                </div>
                                <div className="space-y-8 flex-1">
                                    <div>
                                        <h3 className="font-mono text-moss text-xs tracking-[0.2em] mb-3 uppercase">Systems Extension</h3>
                                        <h5 className="font-heading font-extrabold text-4xl md:text-5xl mb-6 text-dark tracking-tight">Manufacturing Logistics</h5>
                                    </div>

                                    <div className="font-body text-lg text-dark/80 leading-relaxed font-light space-y-6">
                                        <StaggerLine><StaggerReveal text="Our mechanical division represents the absolute pinnacle of strategic vertical integration." /></StaggerLine>
                                        <StaggerLine>
                                            <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-paper border border-moss/10 rounded-2xl shadow-sm text-base">
                                                <StaggerReveal text="We do not simply build massive structures; we manufacture the critical components that ensure their long-term structural viability." />
                                            </motion.div>
                                        </StaggerLine>

                                        {/* Technical Specifications List */}
                                        <div className="pt-6">
                                            <h6 className="font-mono text-xs text-earth tracking-widest uppercase mb-6">Technical Specifications Axis</h6>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {[
                                                    "Aggressive fabrication of high-grade interlocking concrete pavers.",
                                                    "Manufacturing of rigid, load-bearing structural road kerbs.",
                                                    "Complex HVAC installations across vast commercial footprints.",
                                                    "Raw brick production bypassing third-party supply bottlenecks."
                                                ].map((spec, idx) => (
                                                    <StaggerLine delay={idx * 0.1} key={idx}>
                                                        <motion.div
                                                            whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,1)" }}
                                                            className="flex items-start gap-4 bg-white/50 border border-moss/5 p-5 rounded-2xl backdrop-blur-sm transition-colors"
                                                        >
                                                            <div className="bg-moss/10 p-2 rounded-full mt-[-2px]">
                                                                <CheckCircle2 className="text-moss" size={20} strokeWidth={2} />
                                                            </div>
                                                            <span className="font-body text-sm text-dark/80">{spec}</span>
                                                        </motion.div>
                                                    </StaggerLine>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <ObsidianSpotlight />

            {/* Footer */}
            <footer className="py-16 px-8 bg-paper text-center border-t border-dark/5 relative z-40 overflow-hidden">
                <div className="absolute inset-0 blueprint-bg opacity-[0.2] pointer-events-none"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <p className="font-mono text-[10px] text-dark/40 tracking-[0.2em] mb-4 uppercase">REG 2021/486187/07 / 33575 N. Mokhehle Str, Pretoria / 0818432771</p>
                    <p className="font-body text-dark/70 italic text-base mb-8 line-clamp-2 max-w-xl mx-auto">
                        <HighlightText text="Longevity through uncompromising precision, heavy infrastructure execution, and profound community value." />
                    </p>

                    <div className="inline-flex items-center gap-3 border border-moss/30 bg-moss/10 px-5 py-2.5 rounded-full shadow-[0_0_15px_rgba(78,104,51,0.2)]">
                        <Activity size={16} className="text-moss animate-pulse" />
                        <span className="font-mono text-xs text-moss uppercase tracking-[0.3em] font-bold">System Active</span>
                    </div>
                </div>
            </footer>
        </main>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
