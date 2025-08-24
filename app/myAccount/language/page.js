"use client";  

import { useTranslation } from "react-i18next";
import "../../../i18n";  

export default function LanguageSection() {
    const { i18n } = useTranslation();

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
                        onClick={() => i18n.changeLanguage(code)}
                        className={`w-full text-left px-4 py-2 rounded-md border 
              ${i18n.language === code
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                        aria-pressed={i18n.language === code}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </section>
    );
}
