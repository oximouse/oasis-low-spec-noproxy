let counter = 100;  // Start counter at 100

// Function to generate the provider ID with a prefix
export function generateRandomId(prefix) {
    if (!prefix) {
        return 'Prefix is missing';  // Return a fallback value if prefix is undefined
    }

    // Generate the ID using the provided prefix and ensure two-digit formatting for the counter
    const id = prefix + counter.toString().padStart(2, '0');
    
    // Decrease the counter for the next ID generation
    counter--;

    // Stop generating IDs if counter goes below 1
    if (counter < 1) {
        counter = 100; // Reset counter to 100 after reaching 01 (optional, remove if you don't need it)
    }

    return id;
}

function generateRandomCpuInfo() {
    const cpuModels = [
        "Intel i9-14900",
        "Intel i7-14700"
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
        "ANGLE (NVIDIA, NVIDIA GeForce GTX 1050 (0x00001C81) Direct3D11 vs_5_0 ps_5_0, D3D11-32.0.15.5612)",

    ];
    const vendors = ["NVIDIA"];
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
