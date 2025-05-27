import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen container mx-auto px-4 pt-24 max-w-5xl">
      <div className="space-y-10">
        {/* Theme Section */}
        <section className="space-y-3">
          <div>
            <h2 className="text-2xl font-bold">Interface Theme</h2>
            <p className="text-sm text-base-content/70">
              Select a theme to personalize your chat experience
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`
                  group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300
                  border ${theme === t ? "border-primary" : "border-base-300 hover:shadow-md"}
                  bg-base-100 hover:bg-base-200/40
                `}
              >
                <div className="relative h-10 w-full rounded-md overflow-hidden" data-theme={t}>
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary" />
                    <div className="rounded bg-secondary" />
                    <div className="rounded bg-accent" />
                    <div className="rounded bg-neutral" />
                  </div>
                </div>
                <span className="text-xs font-medium text-center truncate w-full">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Chat Preview */}
        <section>
          <h3 className="text-2xl font-bold mb-4">Live Chat Preview</h3>
          <div className="rounded-2xl overflow-hidden border border-base-300 bg-base-100 shadow-xl">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-base-300 bg-base-100">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content text-sm font-semibold shadow-md">
                J
              </div>
              <div>
                <h4 className="font-semibold text-base">John Doe</h4>
                <p className="text-xs text-base-content/60">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="p-5 space-y-4 bg-base-200 min-h-[220px] max-h-[220px] overflow-y-auto">
              {PREVIEW_MESSAGES.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`
                      max-w-[75%] rounded-xl p-3 text-sm shadow-md
                      ${msg.isSent ? "bg-primary text-primary-content" : "bg-white text-base-content"}
                    `}
                  >
                    <p>{msg.content}</p>
                    <p className={`text-[10px] mt-2 ${msg.isSent ? "text-primary-content/70" : "text-base-content/50"}`}>
                      12:00 PM
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-base-300 bg-base-100">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value="This is a preview"
                  className="input input-bordered text-sm flex-1 h-10 focus:outline-none"
                />
                <button className="btn btn-primary h-10 min-h-0 px-4">
                  <Send size={18} className="stroke-[2]" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
