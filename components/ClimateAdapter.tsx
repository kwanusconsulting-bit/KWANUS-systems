"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/client/api";

export function ClimateAdapter() {
    const [climate, setClimate] = useState<string>("stillness");

    useEffect(() => {
        // We fetch the full climate object but just need the type (lowercase) for the dataset
        apiGet("/api/climate")
            .then((data: any) => {
                if (data?.climate?.type) {
                    setClimate(data.climate.type.toLowerCase());
                }
            })
            .catch(() => { }); // Silent fail
    }, []);

    useEffect(() => {
        document.body.dataset.climate = climate;

        // Optional: Log purely for debugging for now
        // console.log("Atmosphere set to:", climate);
    }, [climate]);

    return null;
}
