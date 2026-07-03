"use client";

import React, { createContext, useContext } from "react";

export interface Settings {
  phone_primary: string;
  phone_secondary: string;
  whatsapp: string;
  email: string;
  address_line1: string;
  address_line2: string;
  google_maps_url: string;
  business_hours: string;
  instagram_url: string;
  linkedin_url: string;
}

const DEFAULT_SETTINGS: Settings = {
  phone_primary: "+91 85559 98216",
  phone_secondary: "",
  whatsapp: "918555998216",
  email: "aquaelitesolution@gmail.com",
  address_line1: "Hema Nagar, Boduppal",
  address_line2: "Hyderabad, Telangana 500039",
  google_maps_url: "https://maps.app.goo.gl/ZyP87vtqo5odNARb8?g_st=aw",
  business_hours: "Mon - Sat: 9:00 AM - 7:00 PM",
  instagram_url: "https://instagram.com/aquaelitesolution",
  linkedin_url: "https://linkedin.com/company/aquaelite",
};

const SettingsContext = createContext<Settings>(DEFAULT_SETTINGS);

export function SettingsProvider({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings: Record<string, string>;
}) {
  const mergedSettings = React.useMemo(() => {
    const settings = { ...DEFAULT_SETTINGS };
    Object.entries(initialSettings || {}).forEach(([key, value]) => {
      if (value && value.trim() !== "" && key in settings) {
        settings[key as keyof Settings] = value.trim();
      }
    });
    return settings;
  }, [initialSettings]);

  return (
    <SettingsContext.Provider value={mergedSettings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
