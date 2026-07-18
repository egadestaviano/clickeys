import { MaterialIcon } from "@/components/materialIcon";

const switches = [
  {
    icon: "keyboard_double_arrow_up",
    title: "Linear",
    body: "No bump, no noise. Presses glide straight down — built for speed and quiet sessions.",
  },
  {
    icon: "keyboard_tab",
    title: "Tactile",
    body: "A clear bump you feel on every keystroke. The go-to for typing and feedback.",
  },
  {
    icon: "hearing",
    title: "Clicky",
    body: "A sharp bump with a click you can hear. Loud, satisfying, and responsive.",
  },
];

export function ChooseSwitchBand() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-16 md:px-12">
      <div className="mb-10 text-center">
        <p className="font-geist text-xs uppercase tracking-[0.3em] text-brand">
          Switches
        </p>
        <h2 className="mt-2 font-geist text-3xl font-bold uppercase text-on-surface md:text-4xl">
          Choose Your Switch
        </h2>
        <p className="mx-auto mt-3 max-w-2xl font-geist text-sm text-on-surface-variant">
          Not sure which switch to pick? Here's how the three feel and sound.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {switches.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center gap-4 bg-surface-container p-8 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center bg-brand/10">
              <MaterialIcon className="text-[32px] text-brand" name={item.icon} />
            </span>
            <h3 className="font-geist text-xl font-bold uppercase text-on-surface">
              {item.title}
            </h3>
            <p className="font-geist text-sm leading-relaxed text-on-surface-variant">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChooseSwitchBand;
