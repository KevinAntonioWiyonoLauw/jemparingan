import Image from "next/image"

interface BottomNavProps {
  activeTab?: "explore" | "history" | "updates"
  icons?: {
    explore: string
    history: string
    updates: string
  }
}

const labels = [
  { key: "explore", text: "Explore" },
  { key: "history", text: "History" },
  { key: "updates", text: "Updates" },
] as const

export default function BottomNav({
  activeTab = "explore",
  icons = {
    explore: "/icons/explore.webp",
    history: "/icons/history.webp",
    updates: "/icons/updates.webp",
  },
}: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-avocado-600 rounded-t-[2vh] z-50">
      <div className="max-w-[428px] mx-auto grid grid-cols-3 font-abhaya text-white">
        {labels.map(({ key, text }) => (
          <button
            key={key}
            className="flex flex-col items-center pt-[1vh]"
          >
            <span
              className={`relative w-[6vh] h-[6vh] rounded-full flex items-center justify-center ${
                activeTab === key ? "bg-twine-900/80 shadow-[0_0_30px_rgba(255,153,0,1)]" : ""
              }`}
            >
              <Image
                src={icons[key]}
                alt={text}
                fill
                className="object-contain"
                sizes="48px"
              />
            </span>
            <span
              className={`text-[1.8vh] ${
                activeTab === key ? "font-bold" : "font-medium opacity-70"
              }`}
            >
              {text}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}