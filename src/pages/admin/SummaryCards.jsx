import React from "react";
import { Users, Mail, Send, BarChart3 } from "lucide-react";

const cards = [
  {
    title: "Total Users",
    value: "1,245",
    icon: Users,
    color: "from-indigo-500 to-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    title: "Total Contacts",
    value: "8,932",
    icon: Mail,
    color: "from-pink-500 to-pink-600",
    bg: "bg-pink-50",
  },
  {
    title: "Total Campaigns",
    value: "342",
    icon: BarChart3,
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
  },
  {
    title: "Emails Sent Today",
    value: "1,876",
    icon: Send,
    color: "from-green-500 to-green-600",
    bg: "bg-green-50",
  },
];

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className={`relative p-5 rounded-2xl shadow-sm border ${card.bg} hover:shadow-lg transition-all duration-300`}
          >
            <div className="flex justify-between items-center mb-4">
              <div
                className={`w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-white shadow-md`}
              >
                <Icon size={20} />
              </div>

              <span className="text-xs text-green-600 font-semibold bg-white px-2 py-1 rounded-lg shadow-sm">
                +12%
              </span>
            </div>

            <h4 className="text-sm text-slate-500 font-medium">
              {card.title}
            </h4>
            <h2 className="text-2xl font-bold text-slate-800 mt-1">
              {card.value}
            </h2>

            <div className="mt-4 h-1 w-full bg-white rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${card.color} w-3/4`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}