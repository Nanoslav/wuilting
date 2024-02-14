"use client"

import React, {useEffect, useMemo, useState} from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type {Container, ISourceOptions} from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import {loadBasic} from "@tsparticles/basic";

const ParticleBackground = ({children} : {children: React.ReactNode}) => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container) => {
        console.log(container);
    };

    const options: ISourceOptions = useMemo(
        () => ({
            fullScreen: true,
            fpsLimit: 15,
            "particles": {
                "number": {
                    "value": 355,
                    "density": {
                        "enable": true,
                        "value_area": 789.1476416322727
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.48927153781200905,
                    "random": false,
                    "anim": {
                        "enable": true,
                        "speed": 0.2,
                        "opacity_min": 0,
                        "sync": false
                    }
                },
                "size": {
                    "value": 2,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 0.2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 83.91608391608392,
                        "size": 1,
                        "duration": 3,
                        "opacity": 1,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        }),
        [],
    );

    if (init) {
        return (
            <>
                <Particles
                    id="tsparticles"
                    particlesLoaded={particlesLoaded}
                    options={options}
                    style={{ width: '100%', height: '100%'}}
                />
                {children}
            </>
        );
    }

    return <></>;
};

export default ParticleBackground;