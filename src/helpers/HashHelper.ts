function MurmurHash3(str: string, seed = 0): number {
  let h1 = seed ^ str.length;
  let k1: number;

  for (let i = 0; i < str.length; i++) {
    k1 = str.charCodeAt(i);
    k1 = Math.imul(k1, 0xcc9e2d51);
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 = Math.imul(k1, 0x1b873593);

    h1 ^= k1;
    h1 = (h1 << 13) | (h1 >>> 19);
    h1 = Math.imul(h1, 5) + 0xe6546b64;
  }

  h1 ^= str.length;
  h1 ^= h1 >>> 16;
  h1 = Math.imul(h1, 0x85ebca6b);
  h1 ^= h1 >>> 13;
  h1 = Math.imul(h1, 0xc2b2ae35);
  h1 ^= h1 >>> 16;

  return h1 >>> 0; 
}

function StableStringify(obj: any): string {
  if (obj === null) return 'null';
  if (typeof obj !== 'object') return JSON.stringify(obj);

  if (Array.isArray(obj)) {
    return '[' + obj.map((v) => StableStringify(v)).join(',') + ']';
  }

  const keys = Object.keys(obj).sort();
  const props = keys.map((k) => JSON.stringify(k) + ':' + StableStringify(obj[k]));
  return '{' + props.join(',') + '}';
}

export default function GetHash<T>(item: T): number {
  if (typeof item === 'number') return item >>> 0;
  if (typeof item === 'string') return MurmurHash3(item);
  if (typeof item === 'object' && item !== null) {
    if ('GetHash' in item && typeof (item as any).GetHash === 'function') {
      return (item as any).GetHash();
    }
    return MurmurHash3(StableStringify(item));
  }
  return 0;
}