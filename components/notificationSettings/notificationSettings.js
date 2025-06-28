"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function NotificationSettings() {
    const [settings, setSettings] = useState({
        updates: true,
        security: true,
        orders: false,
        save: false,
    });

    const toggleSetting = (key) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const options = [
        { key: "updates", label: "Updates and Promotions" },
        { key: "security", label: "Security Alerts" },
        { key: "orders", label: "Orders and Deliveries" },
        { key: "save", label: "Save Notifications" },
    ];

    return (
        <div className=" space-y-4">
            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>

            {options.map(({ key, label }) => (
                <div
                    key={key}
                    className="flex items-center justify-between border-b pb-3 last:border-none"
                >
                    <span className="text-gray-800">{label}</span>
                    <Switch
                        checked={settings[key]}
                        onCheckedChange={() => toggleSetting(key)}
                    />
                </div>
            ))}
        </div>
    );
}
