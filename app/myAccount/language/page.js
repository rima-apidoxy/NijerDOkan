"use client";

import { useState } from "react";

export default function LanguageSection() {
    const [language, setLanguage] = useState("en");

    const languages = [
        { code: "en", label: "English (United States)" },
        { code: "bn", label: "বাংলা (বাংলাদেশ)" },
    ];

    return (
        <section>
            <h2 className="text-lg font-semibold mb-4">Select Language</h2>
            <div className="flex flex-col space-y-3">
                {languages.map(({ code, label }) => (
                    <button
                        key={code}
                        type="button"
                        onClick={() => setLanguage(code)}
                        className={`w-full text-left px-4 py-2 rounded-md border 
              ${language === code
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                        aria-pressed={language === code}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </section>
    );
}
