import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { RequireAuth } from "@/components/RequireAuth";
import { useApp } from "@/lib/store";
import { Field } from "./signin";
import { Camera, Save, User as UserIcon, Lock, GraduationCap, History, Trophy } from "lucide-react";
import { STREAM_LABELS } from "@/lib/questions";

export const Route = createFileRoute("/profile")({
  component: () => <RequireAuth><AppShell><Profile /></AppShell></RequireAuth>,
});

function Profile() {
  const { user, updateUser, history } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(user?.name ?? "");
  const [track, setTrack] = useState<string>(user?.track ?? "Scientific");
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const onAvatar = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateUser({ avatar: reader.result as string });
    reader.readAsDataURL(file);
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: name.trim() || user.name, track: track as "Scientific" | "Literary" });
    if (password.length >= 6) {
      const map = JSON.parse(localStorage.getItem("sos_pass_map") || "{}");
      map[user.email.toLowerCase()] = password;
      localStorage.setItem("sos_pass_map", JSON.stringify(map));
      setPassword("");
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 fade-up">
      {/* Avatar / details */}
      <div className="glass rounded-3xl p-6 lg:col-span-1 text-center">
        <div className="relative w-32 h-32 mx-auto mb-4 group">
          <div className="w-full h-full rounded-full gradient-bg p-1 shadow-xl shadow-purple-500/40">
            <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center text-4xl font-bold gradient-text">
              {user.avatar
                ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                : user.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold"
          >
            <Camera className="w-5 h-5 mr-1" /> Change
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={e => onAvatar(e.target.files?.[0])} />
        </div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5 text-[#7c3aed]" /> {user.track} Track
        </div>
      </div>

      {/* Edit form */}
      <div className="glass rounded-3xl p-6 lg:col-span-2">
        <h3 className="text-lg font-bold mb-1">Edit profile</h3>
        <p className="text-sm text-muted-foreground mb-5">Update your account details below.</p>
        <form onSubmit={onSave} className="space-y-4">
          <Field icon={UserIcon} label="Full Name" value={name} onChange={setName} />
          <Field icon={GraduationCap} label="High School Track" value={track} onChange={setTrack}
            options={[
              { value: "Scientific", label: "العلمي — Scientific" },
              { value: "Literary", label: "الأدبي — Literary" },
            ]} />
          <Field icon={Lock} label="New Password (optional)" type="password" value={password}
            onChange={setPassword} placeholder="Leave blank to keep current" />
          <button type="submit" className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-purple-500/40 hover:scale-105 transition-transform">
            <Save className="w-4 h-4" /> {saved ? "Saved!" : "Save changes"}
          </button>
        </form>
      </div>

      {/* History */}
      <div className="glass rounded-3xl p-6 lg:col-span-3">
        <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
          <History className="w-5 h-5 text-[#7c3aed]" /> Assessment History
        </h3>
        <p className="text-sm text-muted-foreground mb-5">Every assessment you've taken and your top recommended stream.</p>

        {history.length === 0 ? (
          <div className="text-sm text-muted-foreground glass rounded-2xl p-6 text-center">
            You haven't completed any assessments yet.
          </div>
        ) : (
          <div className="space-y-2">
            {history.map(h => (
              <div key={h.id} className="glass rounded-2xl p-4 flex flex-wrap items-center gap-3 hover:scale-[1.01] transition-transform">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-[180px]">
                  <div className="font-semibold">{STREAM_LABELS[h.topStream]}</div>
                  <div className="text-xs text-muted-foreground">{new Date(h.date).toLocaleString()}</div>
                </div>
                <div className="text-sm font-bold gradient-text">{h.scores[h.topStream]}% match</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
