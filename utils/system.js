export function generateRandomId(length = 26) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
}

function generateRandomCpuInfo() {
    const cpuModels = [
        "Intel i3-2100",
        "Intel i5-3450",
        "Intel i3-4130",
        "Intel i5-4440",
        "Intel i5-4460",
        "Intel i5-4460T",
        "Intel i5-4590",
        "Intel i5-4690",
        "Intel i3-6100",
        "Intel i5-6400",
        "Intel i5-6400T",
        "Intel i5-6500",
        "Intel i5-6600",
        "Intel i3-7100",
        "Intel i5-7400",
        "Intel i5-7400T",
        "Intel i5-7600K",
        "Intel i3-8100",
        "Intel i3-9100F",
        "Intel i5-9400F"
    ];

    const features = ["mmx", "sse", "sse2", "sse3", "ssse3", "sse4_1", "sse4_2", "avx"];
    const numOfProcessors = [2, 4, 8, 16, 32][Math.floor(Math.random() * 4)];

    let processors = [];
    for (let i = 0; i < numOfProcessors; i++) {
        processors.push({
            usage: {
                idle: Math.floor(Math.random() * 2000000000000),
                kernel: Math.floor(Math.random() * 10000000000),
                total: Math.floor(Math.random() * 2000000000000),
                user: Math.floor(Math.random() * 50000000000)
            }
        });
    }

    return {
        archName: "x86_64",
        features: features,
        modelName: cpuModels[Math.floor(Math.random() * cpuModels.length)],
        numOfProcessors: numOfProcessors,
        processors: processors,
        temperatures: []
    };
}

function generateRandomGpuInfo() {
    const renderers = [
        "ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver-5.0.0)",

    ];
    const vendors = ["Google"];
    return {
        renderer: renderers[Math.floor(Math.random() * renderers.length)],
        vendor: vendors[Math.floor(Math.random() * vendors.length)]
    };
}

function generateRandomOperatingSystem() {
    const osList = ["windows"];
    return osList[Math.floor(Math.random() * osList.length)];
}

export function generateRandomSystemData() {
    return {
        id: generateRandomId(26),
        type: "system",
        data: {
            gpuInfo: generateRandomGpuInfo(),
            memoryInfo: {
                availableCapacity: Math.floor(Math.random() * 1000000000) + 1000000000,
                capacity: Math.floor(Math.random() * 1000000000) + 2000000000
            },
            operatingSystem: generateRandomOperatingSystem(), 
            machineId: generateRandomId(32).toLowerCase(),
            cpuInfo: generateRandomCpuInfo()
        }
    };
}
