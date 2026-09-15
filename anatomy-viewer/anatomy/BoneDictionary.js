export const boneDictionary = {

    skull: {
        name: "Skull",
        english: "Skull",
        latin: "Cranium",
        system: "Skeletal system",
        region: "Head",
        description: "Protects the brain and forms the orbital, nasal, and oral cavities.",
        color: "#22c7a7",
        cameraView: { direction: [0.7, 0.1, 1], distanceMultiplier: 2.2 }
    },

    mandible: {
        name: "Mandible",
        english: "Mandible",
        latin: "Mandibula",
        system: "Skeletal system",
        region: "Head",
        description: "Forms the lower jaw and plays a key role in mastication.",
        color: "#4c93ff",
        cameraView: { direction: [0.6, -0.1, 1], distanceMultiplier: 2.0 }
    },

    scapula: {
        name: "Scapula",
        english: "Scapula",
        latin: "Scapula",
        system: "Skeletal system",
        region: "Thoracic limb",
        description: "Flat bone that connects the thoracic limb to the trunk via muscles.",
        color: "#f5a623",
        cameraView: { direction: [1, 0.15, 0.25], distanceMultiplier: 2.4 }
    },

    humerus: {
        name: "Humerus",
        english: "Humerus",
        latin: "Humerus",
        system: "Skeletal system",
        region: "Thoracic limb",
        description: "Long bone located between the scapula and the radius and ulna.",
        color: "#e05c5c",
        cameraView: { direction: [1, 0.1, 0.2], distanceMultiplier: 2.5 }
    },

    radius: {
        name: "Radius",
        english: "Radius",
        latin: "Radius",
        system: "Skeletal system",
        region: "Thoracic limb",
        description: "Forearm bone that participates in the elbow and carpal joints.",
        color: "#e07b5c",
        cameraView: { direction: [1, 0.1, 0.2], distanceMultiplier: 2.5 }
    },

    ulna: {
        name: "Ulna",
        english: "Ulna",
        latin: "Ulna",
        system: "Skeletal system",
        region: "Thoracic limb",
        description: "Forearm bone that forms the greater part of the elbow joint.",
        color: "#c45ce0",
        cameraView: { direction: [1, 0.1, 0.2], distanceMultiplier: 2.5 }
    },

    pelvis: {
        name: "Pelvis",
        english: "Pelvis",
        latin: "Pelvis",
        system: "Skeletal system",
        region: "Pelvic girdle",
        description: "Bony structure that connects the pelvic limbs to the axial skeleton.",
        color: "#5ce0b8",
        cameraView: { direction: [-1, 0.2, 0.3], distanceMultiplier: 2.6 }
    },

    femur: {
        name: "Femur",
        english: "Femur",
        latin: "Femur",
        system: "Skeletal system",
        region: "Pelvic limb",
        description: "Long bone located between the pelvis and the tibia.",
        color: "#2383E2",
        cameraView: { direction: [1, 0.1, 0.15], distanceMultiplier: 2.5 }
    },

    tibia: {
        name: "Tibia",
        english: "Tibia",
        latin: "Tibia",
        system: "Skeletal system",
        region: "Pelvic limb",
        description: "Primary weight-bearing bone of the distal pelvic limb.",
        color: "#5ca8e0",
        cameraView: { direction: [1, 0.1, 0.15], distanceMultiplier: 2.5 }
    },

    fibula: {
        name: "Fibula",
        english: "Fibula",
        latin: "Fibula",
        system: "Skeletal system",
        region: "Pelvic limb",
        description: "Slender bone located lateral to the tibia.",
        color: "#22c7e0",
        cameraView: { direction: [1, 0.1, 0.15], distanceMultiplier: 2.5 }
    },

    atlas: {
        name: "Atlas",
        english: "Atlas",
        latin: "Atlas",
        system: "Skeletal system",
        region: "Cervical spine",
        description: "First cervical vertebra, responsible for articulation with the skull.",
        color: "#9b7fe0",
        cameraView: { direction: [1, 0.2, 0.3], distanceMultiplier: 2.8 }
    },

    "cervicothoracic-spine": {
        name: "Cervical & thoracic vertebrae",
        english: "Cervical and thoracic vertebrae",
        latin: "Vertebrae cervicales et thoracicae",
        system: "Skeletal system",
        region: "Vertebral column",
        description: "Spinal segments that support the neck and thoracic region.",
        color: "#b07fe0",
        cameraView: { direction: [1, 0.3, 0.2], distanceMultiplier: 3.0 }
    },

    "lumbar-vertebra": {
        name: "Lumbar vertebra",
        english: "Lumbar vertebra",
        latin: "Vertebra lumbalis",
        system: "Skeletal system",
        region: "Lumbar spine",
        description: "Vertebra of the lumbar region, involved in trunk support.",
        color: "#c07fe0",
        cameraView: { direction: [1, 0.3, 0.1], distanceMultiplier: 2.8 }
    },

    ribcage: {
        name: "Rib cage",
        english: "Rib cage",
        latin: "Cavea thoracis",
        system: "Skeletal system",
        region: "Thorax",
        description: "Set of ribs that protects the thoracic organs.",
        color: "#7fb8e0",
        cameraView: { direction: [1, 0.1, 0.1], distanceMultiplier: 2.8 }
    },

    "rib-4": {
        name: "Fourth rib",
        english: "Fourth rib",
        latin: "Costa quarta",
        system: "Skeletal system",
        region: "Thorax",
        description: "One of the ribs forming the thoracic wall.",
        color: "#7fd0e0",
        cameraView: { direction: [1, 0.1, 0.1], distanceMultiplier: 2.6 }
    },

    "rib-group-1": {
        name: "Rib group",
        english: "Rib group",
        latin: "Costae",
        system: "Skeletal system",
        region: "Thorax",
        description: "Partial group of ribs included in the model.",
        color: "#7fe0cc",
        cameraView: { direction: [1, 0.1, 0.1], distanceMultiplier: 2.6 }
    },

    "rib-group-2": {
        name: "Rib group",
        english: "Rib group",
        latin: "Costae",
        system: "Skeletal system",
        region: "Thorax",
        description: "Partial group of ribs included in the model.",
        color: "#7fe0b8",
        cameraView: { direction: [1, 0.1, 0.1], distanceMultiplier: 2.6 }
    }

};
