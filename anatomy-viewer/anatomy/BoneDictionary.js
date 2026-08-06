export const boneDictionary = {

    skull: {
        name: "Crânio",
        english: "Skull",
        latin: "Cranium",
        system: "Sistema esquelético",
        region: "Cabeça",
        description: "Protege o encéfalo e participa da formação das cavidades orbitais, nasais e oral.",
        color: "#22c7a7",
        cameraView: { direction: [0.7, 0.1, 1], distanceMultiplier: 2.2 }
    },

    mandible: {
        name: "Mandíbula",
        english: "Mandible",
        latin: "Mandibula",
        system: "Sistema esquelético",
        region: "Cabeça",
        description: "Forma a porção inferior da mandíbula e participa da mastigação.",
        color: "#4c93ff",
        cameraView: { direction: [0.6, -0.1, 1], distanceMultiplier: 2.0 }
    },

    scapula: {
        name: "Escápula",
        english: "Scapula",
        latin: "Scapula",
        system: "Sistema esquelético",
        region: "Membro torácico",
        description: "Osso plano que conecta o membro torácico ao tronco por meio de músculos.",
        color: "#f5a623",
        cameraView: { direction: [1, 0.15, 0.25], distanceMultiplier: 2.4 }
    },

    humerus: {
        name: "Úmero",
        english: "Humerus",
        latin: "Humerus",
        system: "Sistema esquelético",
        region: "Membro torácico",
        description: "Osso longo localizado entre a escápula e o rádio e a ulna.",
        color: "#e05c5c",
        cameraView: { direction: [1, 0.1, 0.2], distanceMultiplier: 2.5 }
    },

    radius: {
        name: "Rádio",
        english: "Radius",
        latin: "Radius",
        system: "Sistema esquelético",
        region: "Membro torácico",
        description: "Osso do antebraço que participa das articulações do cotovelo e do carpo.",
        color: "#e07b5c",
        cameraView: { direction: [1, 0.1, 0.2], distanceMultiplier: 2.5 }
    },

    ulna: {
        name: "Ulna",
        english: "Ulna",
        latin: "Ulna",
        system: "Sistema esquelético",
        region: "Membro torácico",
        description: "Osso do antebraço que forma grande parte da articulação do cotovelo.",
        color: "#c45ce0",
        cameraView: { direction: [1, 0.1, 0.2], distanceMultiplier: 2.5 }
    },

    pelvis: {
        name: "Pelve",
        english: "Pelvis",
        latin: "Pelvis",
        system: "Sistema esquelético",
        region: "Cintura pélvica",
        description: "Estrutura óssea que conecta os membros pélvicos ao esqueleto axial.",
        color: "#5ce0b8",
        cameraView: { direction: [-1, 0.2, 0.3], distanceMultiplier: 2.6 }
    },

    femur: {
        name: "Fêmur",
        english: "Femur",
        latin: "Femur",
        system: "Sistema esquelético",
        region: "Membro pélvico",
        description: "Osso longo localizado entre a pelve e a tíbia.",
        color: "#2383E2",
        cameraView: { direction: [1, 0.1, 0.15], distanceMultiplier: 2.5 }
    },

    tibia: {
        name: "Tíbia",
        english: "Tibia",
        latin: "Tibia",
        system: "Sistema esquelético",
        region: "Membro pélvico",
        description: "Principal osso de suporte da porção distal do membro pélvico.",
        color: "#5ca8e0",
        cameraView: { direction: [1, 0.1, 0.15], distanceMultiplier: 2.5 }
    },

    fibula: {
        name: "Fíbula",
        english: "Fibula",
        latin: "Fibula",
        system: "Sistema esquelético",
        region: "Membro pélvico",
        description: "Osso fino localizado lateralmente à tíbia.",
        color: "#22c7e0",
        cameraView: { direction: [1, 0.1, 0.15], distanceMultiplier: 2.5 }
    },

    atlas: {
        name: "Atlas",
        english: "Atlas",
        latin: "Atlas",
        system: "Sistema esquelético",
        region: "Coluna cervical",
        description: "Primeira vértebra cervical, responsável pela articulação com o crânio.",
        color: "#9b7fe0",
        cameraView: { direction: [1, 0.2, 0.3], distanceMultiplier: 2.8 }
    },

    "cervicothoracic-spine": {
        name: "Vértebras cervicais e torácicas",
        english: "Cervical and thoracic vertebrae",
        latin: "Vertebrae cervicales et thoracicae",
        system: "Sistema esquelético",
        region: "Coluna vertebral",
        description: "Segmentos da coluna que sustentam o pescoço e a porção torácica.",
        color: "#b07fe0",
        cameraView: { direction: [1, 0.3, 0.2], distanceMultiplier: 3.0 }
    },

    "lumbar-vertebra": {
        name: "Vértebra lombar",
        english: "Lumbar vertebra",
        latin: "Vertebra lumbalis",
        system: "Sistema esquelético",
        region: "Coluna lombar",
        description: "Vértebra da região lombar, envolvida no suporte do tronco.",
        color: "#c07fe0",
        cameraView: { direction: [1, 0.3, 0.1], distanceMultiplier: 2.8 }
    },

    ribcage: {
        name: "Caixa torácica",
        english: "Rib cage",
        latin: "Cavea thoracis",
        system: "Sistema esquelético",
        region: "Tórax",
        description: "Conjunto de costelas que protege estruturas do tórax.",
        color: "#7fb8e0",
        cameraView: { direction: [1, 0.1, 0.1], distanceMultiplier: 2.8 }
    },

    "rib-4": {
        name: "Quarta costela",
        english: "Fourth rib",
        latin: "Costa quarta",
        system: "Sistema esquelético",
        region: "Tórax",
        description: "Uma das costelas que compõem a parede torácica.",
        color: "#7fd0e0",
        cameraView: { direction: [1, 0.1, 0.1], distanceMultiplier: 2.6 }
    },

    "rib-group-1": {
        name: "Grupo de costelas",
        english: "Rib group",
        latin: "Costae",
        system: "Sistema esquelético",
        region: "Tórax",
        description: "Grupo parcial de costelas incluído no modelo.",
        color: "#7fe0cc",
        cameraView: { direction: [1, 0.1, 0.1], distanceMultiplier: 2.6 }
    },

    "rib-group-2": {
        name: "Grupo de costelas",
        english: "Rib group",
        latin: "Costae",
        system: "Sistema esquelético",
        region: "Tórax",
        description: "Grupo parcial de costelas incluído no modelo.",
        color: "#7fe0b8",
        cameraView: { direction: [1, 0.1, 0.1], distanceMultiplier: 2.6 }
    }

};
