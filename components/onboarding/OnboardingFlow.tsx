"use client";

import { useState } from "react";
import StepArrival from "./steps/StepArrival";
import StepIdentity from "./steps/StepIdentity";
import StepPersona from "./steps/StepPersona";
import StepEmotion from "./steps/StepEmotion";
import StepComplete from "./steps/StepComplete";
import { motion, AnimatePresence } from "framer-motion";

export default function OnboardingFlow() {
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-6 bg-black relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] opacity-50" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <StepArrival onNext={() => setStep(2)} />
                        </motion.div>
                    )}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <StepIdentity onNext={() => setStep(3)} />
                        </motion.div>
                    )}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <StepPersona onNext={() => setStep(4)} />
                        </motion.div>
                    )}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <StepEmotion onNext={() => setStep(5)} />
                        </motion.div>
                    )}
                    {step === 5 && (
                        <motion.div
                            key="step5"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <StepComplete />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
