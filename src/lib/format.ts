/** Zero-pads to two digits: 3 → "03". Used for every index, chapter and step number. */
export const pad2 = (n: number) => String(n).padStart(2, '0')
