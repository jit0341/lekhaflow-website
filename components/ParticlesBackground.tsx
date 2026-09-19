"use client";

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {

  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  return (

    <div
      className="
      fixed
      inset-0
      z-0
      pointer-events-none
      "
    >

      <Particles
        id="tsparticles"

        init={particlesInit}

        options={{

          fullScreen: false,

          background: {
            color: {
              value: "transparent",
            },
          },

          fpsLimit: 120,

          particles: {

            color: {
              value: [
                "#00ffff",
                "#facc15",
              ],
            },

            links: {
              color: "#00ffff",
              distance: 150,
              enable: true,
              opacity: 0.15,
              width: 1,
            },

            move: {
              enable: true,
              speed: 1,
            },

            number: {
              value: 40,
            },

            opacity: {
              value: 0.3,
            },

            shape: {
              type: "circle",
            },

            size: {
              value: {
                min: 1,
                max: 4,
              },
            },
          },

          detectRetina: true,
        }}
      />

    </div>
  );
}