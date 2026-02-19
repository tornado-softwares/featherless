export const BASE_URL =  "https://api.featherless.ai/v1"
export const API_KEY =  process.env.FEATHERLESS_AI_API_KEY

export const MODEL_METRICS = {
    // Deepseek 3
        "deepseek-v3-lc":        { context: 32768, cost: 4 },
    
    // Deepseek 3.1
        "deepseek31-685b":       { context: 32768, cost: 4 },
    
    // Deepseek 3.2
        "deepseek-v3.2":         { context: 32768, cost: 4 },

    // Gemma
        "gemma-2b":              { context: 8192,  cost: 1 },
        "gemma-7b":              { context: 8192,  cost: 1 },
        "gemma2-9b":             { context: 16384, cost: 1 },
    
    // Gemma 2
        "gemma2-2b":             { context: 8192,  cost: 1 },
        "gemma2-27b":            { context: 32768, cost: 2 },
    
    // Gemma 3
        "gemma3t-1b":            { context: 32768, cost: 1 },
        "gemma3-4b":             { context: 32768, cost: 1 },
        "gemma3-12b":            { context: 32768, cost: 1 },
        "gemma3t-12b":           { context: 32768, cost: 1 },
        "gemma3-27b":            { context: 32768, cost: 2 },
        "gemma3t-27b":           { context: 32768, cost: 2 },

    // GLM 4
        "glm4-9b":               { context: 32768, cost: 1 },
        "glm4-32b":              { context: 32768, cost: 2 },
    
    // GLM 4.6
        "glm46-357b":            { context: 32768, cost: 4 },
    
    // GLM 4.7
        "glm47-flash":           { context: 32768, cost: 4 },
        "glm47-357b":            { context: 32768, cost: 4 },
    
    // GLM 5
        "glm5-754b":             { context: 32768, cost: 4 },

    // GPT OSS 
        "gpt-oss-20b":           { context: 32768, cost: 2 },
        "gpt-oss-120b":          { context: 32768, cost: 2 },
    
    // GPT SW3
        "gpt-sw3-356m":          { context: 2048,  cost: 1 },
        "gpt-sw3-1b3":           { context: 2048,  cost: 1 },
        "gpt-sw3-20b":           { context: 2048,  cost: 1 },
        "gpt2-sw3-126m":         { context: 2048,  cost: 1 },
        "gpt2-sw3-6b7":          { context: 2048,  cost: 1 },

    // Kimi 2
        "kimi-k2":               { context: 32768, cost: 4 },
    
    // Kimi 2.5
        "kimi-k25":              { context: 32768, cost: 4 },
    
    // Ling 2
        "ling2-1t":              { context: 32768, cost: 4 },

    // LLaMA 2
        "tinyllama-1b1":         { context: 2048,  cost: 1 },
        "llama2-7b":             { context: 4096,  cost: 1 },
        "llama2-solar-10b7":     { context: 4096,  cost: 1 },
        "llama2-13b":            { context: 4096,  cost: 1 },
    
    // LLaMA 3    
        "llama3-8b":             { context: 8192,  cost: 1 },
        "llama3-15b":            { context: 8192,  cost: 1 },
        "llama3-70b":            { context: 8192,  cost: 4 },
    
    // LLaMA 3.1    
        "llama31-8b":            { context: 32768, cost: 1 },
        "llama31-70b":           { context: 32768, cost: 4 },

    // LLaMA 3.2
        "llama32-1b":            { context: 32768, cost: 1 },
        "llama32-3b":            { context: 32768, cost: 1 },
    
    // LLaMA 3.3    
        "llama33-70b":           { context: 32768, cost: 4 },

    // Mellum
        "mellum-4b":             { context: 32768, cost: 1 },
    
    // Mimo
        "mimo2-flash":           { context: 32768, cost: 4 },
    
    // Minimax
        "minimax-m2":            { context: 32768, cost: 4 },

    // Mistral
        "mistral-v01-7b":        { context: 4096,  cost: 1 },
        "mistral-v02-7b":        { context: 8192,  cost: 1 },
        "mistral-nemo":          { context: 32768, cost: 1 },
        "mistral-large":         { context: 32768, cost: 4 },
        "mixtral-8x22b":         { context: 32768, cost: 4 },
    
    // Mistram 3
        "mistral-24b":           { context: 32768, cost: 2 },
    
    // Mistral 3.1
        "mistral-24b-2503":      { context: 32768, cost: 2 },

    // Nanbeige
        "nanbeige41-3b":         { context: 32768, cost: 1 },
    
    // Phi
        "phi-1b4":               { context: 2048,  cost: 1 },
    
    // Phi 2    
        "phi2-3b":               { context: 2048,  cost: 1 },
    
    // Phi 3
        "phi3-4b":               { context: 4096,  cost: 1 },
    
    // Phi 4
        "phi4-3b8":              { context: 32768, cost: 1 },

    // QRWKV
        "qrwkv-32b-32k":         { context: 32768, cost: 1 },
        "qrwkv-72b-32k":         { context: 65536, cost: 1 },

    // Qwen 1.5
        "qwen15-0b5":            { context: 32768, cost: 1 },
        "qwen15-1b8":            { context: 32768, cost: 1 },
        "qwen15-4b":             { context: 32768, cost: 1 },
        "qwen15-7b":             { context: 32768, cost: 1 },
        "qwen15-14b":            { context: 32768, cost: 1 },
        "qwen15-32b":            { context: 32768, cost: 2 },
        "qwen15-72b":            { context: 32768, cost: 4 },
    
    // Qwen 2    
        "qwen2-0b5":             { context: 32768, cost: 1 },
        "qwen2-1b5":             { context: 32768, cost: 1 },
        "qwen2-7b":              { context: 32768, cost: 1 },
        "qwen2-14b-lc":          { context: 32768, cost: 1 },
        "qwen2-32b":             { context: 32768, cost: 2 },
        "qwen2-72b":             { context: 32768, cost: 4 },
    
    // Qwen 2.5    
        "qwen25-0b5":            { context: 32768, cost: 1 },
        "qwen25-1b5":            { context: 32768, cost: 1 },
        "qwen25-3b":             { context: 32768, cost: 1 },
        "qwen25-7b":             { context: 32768, cost: 1 },
        "qwen25-14b":            { context: 32768, cost: 1 },
        "qwen25-32b":            { context: 32768, cost: 2 },
        "qwen25-72b":            { context: 32768, cost: 4 },
    
    // Qwen 3
        "qwen3-0b6":             { context: 32768, cost: 1 },
        "qwen3-1b7":             { context: 32768, cost: 1 },
        "qwen3-4b":              { context: 32768, cost: 1 },
        "qwen3-8b":              { context: 32768, cost: 1 },
        "qwen3-14b":             { context: 32768, cost: 1 },
        "qwen3moe-30b":          { context: 32768, cost: 2 },
        "qwen3-32b":             { context: 32768, cost: 2 },
        "qwen3-coder-480b":      { context: 32768, cost: 4 },
        "qwen3moe-80b":          { context: 32768, cost: 4 },
        "qwen3-235b":            { context: 32768, cost: 4 },
        "qwen3vl-235b":          { context: 32768, cost: 4 },

    // RWKV 5
        "rwkv5-7b":              { context: 16384, cost: 1 },
    
    // RWKV 6    
        "rwkv6-7b":              { context: 16384, cost: 1 },
        "rwkv6-14b":             { context: 16384, cost: 1 },
        "rwkv6moe-37b":          { context: 16384, cost: 1 },
} as const;