// Local ambient types so the project builds before @types/three is installed.
// Safe to delete after running: npm i -D @types/three
declare module "three" {
  export class Scene {
    add(obj: unknown): void;
    remove(obj: unknown): void;
    background: null | { setHex(hex: number): void };
  }
  export class PerspectiveCamera {
    constructor(fov?: number, aspect?: number, near?: number, far?: number);
    position: { x: number; y: number; z: number; set(x: number, y: number, z: number): void };
    lookAt(x: number, y: number, z: number): void;
    fov: number;
    aspect: number;
    updateProjectionMatrix(): void;
  }
  export class WebGLRenderer {
    constructor(opts?: Record<string, unknown>);
    domElement: HTMLCanvasElement;
    setPixelRatio(v: number): void;
    setSize(w: number, h: number, updateStyle?: boolean): void;
    render(scene: Scene, camera: PerspectiveCamera): void;
    dispose(): void;
  }
  export class Color { constructor(v?: number | string); setHex(hex: number): Color; }
  export class IcosahedronGeometry { constructor(radius?: number, detail?: number); dispose(): void; }
  export class SphereGeometry { constructor(r?: number, a?: number, b?: number); dispose(): void; }
  export class PointsGeometry { dispose(): void; }
  export class BufferGeometry {
    setAttribute(name: string, attr: BufferAttribute): void;
    dispose(): void;
  }
  export class BufferAttribute { constructor(array: ArrayLike<number>, itemSize: number); }
  export class Float32BufferAttribute { constructor(array: ArrayLike<number>, itemSize: number); }
  export class MeshBasicMaterial {
    constructor(opts?: Record<string, unknown>);
    color: Color;
    wireframe: boolean;
    transparent: boolean;
    opacity: number;
    dispose(): void;
  }
  export class PointsMaterial {
    constructor(opts?: Record<string, unknown>);
    size: number;
    color: Color;
    transparent: boolean;
    opacity: number;
    dispose(): void;
  }
  export class Mesh {
    constructor(geometry: unknown, material: unknown);
    rotation: { x: number; y: number; z: number };
    position: { x: number; y: number; z: number; set(x: number, y: number, z: number): void };
    scale: { x: number; y: number; z: number; set(x: number, y: number, z: number): void };
  }
  export class Points {
    constructor(geometry: unknown, material: unknown);
    rotation: { x: number; y: number; z: number };
  }
  export class Group {
    add(obj: unknown): void;
    rotation: { x: number; y: number; z: number };
    position: { x: number; y: number; z: number; set(x: number, y: number, z: number): void };
  }
  export class Vector2 { constructor(x?: number, y?: number); x: number; y: number; }
  export const SRGBColorSpace: string;
}
