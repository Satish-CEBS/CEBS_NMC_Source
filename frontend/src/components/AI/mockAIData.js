// src/components/AI/mockAIData.js

const mockData = {
    suggestions: [
        {
            type: "Clearance Optimization",
            suggestion: "High customs processing time detected at Dubai Port. Consider adjusting workflow.",
            urgency: "High",
            emirate: "Dubai",
            agency: "Customs"
        },
        {
            type: "Congestion Prediction",
            suggestion: "Predicted vessel congestion at Abu Dhabi Port in next 24 hours.",
            urgency: "Medium",
            emirate: "Abu Dhabi",
            agency: "Port Authority"
        },
        {
            type: "Berthing Suggestion",
            suggestion: "Alternate berthing slot available at Sharjah Port for vessel 'MV Al Faris'.",
            urgency: "Low",
            emirate: "Sharjah",
            agency: "Port Operations"
        }
    ],
    chatResponses: {
        "why was vessel flagged": "Vessel was flagged due to high-risk port of origin and crew watchlist match.",
        "how to reduce clearance delay": "AI recommends optimizing document verification workflows and automating FAL Form 2 checks.",
        "show risk reasons": "High risk score due to cargo sensitivity, origin history, and recent flag state violations."
    },
    explanations: {
        "risk-targeting": "The vessel was flagged due to a high-risk cargo type and recent history from sanctioned ports.",
        "fal-analytics": "FAL Form 2 had delayed processing due to manual customs intervention and document mismatch.",
        "ai-insights": "Unusual crew rotation patterns were detected compared to the vessel's historical logs."
    },
    drilldowns: {
        "MV Al Faris": {
            vessel: "MV Al Faris",
            issue: "Alternate berthing required due to ETA conflict.",
            logs: [
                { time: "08:00", event: "ETA registered" },
                { time: "09:45", event: "Berth 3 occupied" },
                { time: "10:30", event: "AI suggested Sharjah alternate berth" }
            ]
        },
        "SHIP123": {
            vessel: "SHIP123",
            issue: "High risk cargo - reefer container from flagged country.",
            logs: [
                { time: "07:00", event: "Arrived from Port Sudan" },
                { time: "08:10", event: "Cargo flagged: Category 1" },
                { time: "08:45", event: "Risk score: 87/100" }
            ]
        }
    }
};

export default mockData;
