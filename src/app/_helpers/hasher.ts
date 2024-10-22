function rotateLeft(value: number, amount: number): number {
    return (value << amount) | (value >>> (32 - amount))
}

function toUnsigned32(n: number): number {
    return n >>> 0
}

export function hasher(input: string): string {
    const state: number[] = [
        0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476,
    ]
    const bytes = new TextEncoder().encode(input)
    let originalLength = bytes.length * 8
    const padding = (originalLength % 512 < 448) ? 448 - (originalLength % 512) : 960 - (originalLength % 512)
    const paddedLength = originalLength + padding + 64
    const paddedBytes = new Uint8Array(Math.ceil(paddedLength / 8))
    paddedBytes.set(bytes);
    paddedBytes[bytes.length] = 0x80
    for (let i = 0; i < 8; i++) {
        paddedBytes[paddedBytes.length - 8 + i] = (originalLength >>> (i * 8)) & 0xFF
    }
    for (let offset = 0; offset < paddedBytes.length; offset += 64) {
        const words: number[] = new Array(16);
        for (let i = 0; i < 16; i++) {
            words[i] = (
                (paddedBytes[offset + (i * 4)] << 24) |
                (paddedBytes[offset + (i * 4) + 1] << 16) |
                (paddedBytes[offset + (i * 4) + 2] << 8) |
                (paddedBytes[offset + (i * 4) + 3])
            ) >>> 0
        }
        let [a, b, c, d] = state
        // Main hash computation (simplified)
        for (let i = 0; i < 64; i++) {
            let f: number, g: number
            if (i < 16) {
                f = (b & c) | (~b & d)
                g = i
            } else if (i < 32) {
                f = (d & b) | (~d & c)
                g = (5 * i + 1) % 16
            } else if (i < 48) {
                f = b ^ c ^ d
                g = (3 * i + 5) % 16
            } else {
                f = c ^ (b | ~d)
                g = (7 * i) % 16
            }

            const temp = d
            d = c
            c = b
            b = toUnsigned32(b + rotateLeft(toUnsigned32(a + f + 0xD76AA478 + words[g]), 7))
            a = temp
        }
        // Update the state
        state[0] = toUnsigned32(state[0] + a)
        state[1] = toUnsigned32(state[1] + b)
        state[2] = toUnsigned32(state[2] + c)
        state[3] = toUnsigned32(state[3] + d)
    }
    return state.map(num => num.toString(16).padStart(8, '0')).join('')
}

