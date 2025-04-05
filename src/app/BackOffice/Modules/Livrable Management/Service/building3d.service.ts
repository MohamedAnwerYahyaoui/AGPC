import { Injectable, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {Building3DData} from "../Model/building3d-data.model";
import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";
type WireframeMaterial = THREE.MeshStandardMaterial & { wireframe: boolean };


type ExtendedMaterial = THREE.Material & {
  wireframe?: boolean;
  needsUpdate?: boolean;
};

@Injectable({
  providedIn: 'root'
})


export class Building3dService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private buildingMesh!: THREE.Mesh;
  private buildingData!: Building3DData;
  private roomMeshes: THREE.Mesh[] = [];
  private isWireframe = false;




  constructor() { }

  initializeScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);
    this.initializeRenderer(canvas.nativeElement);
    this.setupHelpers();
  }

  private initializeRenderer(canvas: HTMLCanvasElement): void {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.shadowMap.enabled = true;
  }

  private setupHelpers(): void {
    const gridHelper = new THREE.GridHelper(50, 50, 0x888888, 0xcccccc);
    this.scene.add(gridHelper);
  }

  generateBuilding(data: Building3DData): void {
    this.buildingData = data;
    this.clearScene();
    this.setupCamera();
    this.setupLighting();
    this.setupControls();
    this.createMainStructure();
    this.addFloors();
    this.addRooms();
    this.animate();
  }

  private setupCamera(): void {
    const canvas = this.renderer.domElement;
    this.camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.updateCameraPosition();
  }

  private updateCameraPosition(): void {
    const maxDim = Math.max(
      this.buildingData.width,
      this.buildingData.height,
      this.buildingData.length
    );

    this.camera.position.set(
      this.buildingData.width * 0.8,
      this.buildingData.height * 0.7,
      this.buildingData.length * 0.8
    );
    this.camera.lookAt(0, this.buildingData.height * 0.3, 0);

    if (this.controls) {
      this.controls.target.set(0, this.buildingData.height * 0.3, 0);
      this.controls.update();
    }
  }

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    this.scene.add(directionalLight);
  }

  private setupControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 100;
    this.controls.target.set(0, this.buildingData.height * 0.3, 0);
  }

  private createMainStructure(): void {
    const geometry = new THREE.BoxGeometry(
      this.buildingData.width,
      this.buildingData.height,
      this.buildingData.length
    );

    const material = new THREE.MeshStandardMaterial({
      color: 0xdddddd,
      transparent: true,
      opacity: 0.5,
      wireframe: this.isWireframe
    });

    this.buildingMesh = new THREE.Mesh(geometry, material);
    this.buildingMesh.position.y = this.buildingData.height / 2;
    this.scene.add(this.buildingMesh);
  }

  private addFloors(): void {
    const floorHeight = this.buildingData.height / this.buildingData.floorCount;

    for (let i = 1; i <= this.buildingData.floorCount; i++) {
      const floorGeometry = new THREE.PlaneGeometry(
        this.buildingData.width * 1.01,
        this.buildingData.length * 1.01
      );

      const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x888888,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3
      });

      const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
      floorMesh.rotation.x = Math.PI / 2;
      floorMesh.position.y = i * floorHeight;
      this.scene.add(floorMesh);
    }
  }

  private addRooms(): void {
    const defaultColors = [
      0xff5733, 0x33ff57, 0x3357ff, 0xf1c40f,
      0x9b59b6, 0x1abc9c, 0xe74c3c, 0x3498db
    ];
    const colors = this.buildingData.roomColors || defaultColors;

    const floorHeight = this.buildingData.height / this.buildingData.floorCount;
    const roomSize = Math.min(
      this.buildingData.width,
      this.buildingData.length
    ) * 0.15;

    // Clear existing rooms
    this.roomMeshes.forEach(room => this.scene.remove(room));
    this.roomMeshes = [];

    Object.entries(this.buildingData.roomsPerFloor).forEach(([floor, roomCount]) => {
      const floorNumber = parseInt(floor);
      const floorYPos = (floorNumber - 1) * floorHeight + roomSize/2;

      for (let i = 0; i < roomCount; i++) {
        const colorIndex = i % colors.length;
        const roomGeometry = new THREE.BoxGeometry(roomSize, roomSize, roomSize);

        const roomMaterial = new THREE.MeshStandardMaterial({
          color: colors[colorIndex],
          transparent: true,
          opacity: 0.9
        });

        const roomMesh = new THREE.Mesh(roomGeometry, roomMaterial);

        // Position organisée en grille
        const cols = Math.ceil(Math.sqrt(roomCount));
        const col = i % cols;
        const row = Math.floor(i / cols);

        roomMesh.position.set(
          (col - cols/2 + 0.5) * (roomSize + 0.5),
          floorYPos,
          (row - roomCount/cols/2 + 0.5) * (roomSize + 0.5)
        );

        this.scene.add(roomMesh);
        this.roomMeshes.push(roomMesh);
      }
    });
  }

  resetCamera(): void {
    this.updateCameraPosition();
  }

  toggleWireframe(): void {
    this.isWireframe = !this.isWireframe;

    const updateMaterial = (material: ExtendedMaterial) => {
      if ('wireframe' in material) {
        material.wireframe = this.isWireframe;
        if ('needsUpdate' in material) {
          material.needsUpdate = true;
        }
      }
    };

    if (Array.isArray(this.buildingMesh.material)) {
      this.buildingMesh.material.forEach(updateMaterial);
    } else {
      updateMaterial(this.buildingMesh.material as ExtendedMaterial);
    }
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.controls?.update();
    this.renderer.render(this.scene, this.camera);
  }

  clearScene(): void {
    while(this.scene.children.length > 0) {
      const object = this.scene.children[0];
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach(m => m.dispose());
        } else {
          object.material.dispose();
        }
      }
      this.scene.remove(object);
    }
    this.roomMeshes = [];
    this.setupHelpers();
  }

  onResize(canvas: ElementRef<HTMLCanvasElement>): void {
    const canvasEl = canvas.nativeElement;
    this.camera.aspect = canvasEl.clientWidth / canvasEl.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(canvasEl.clientWidth, canvasEl.clientHeight);
  }












  async exportBuilding(): Promise<{ model: Blob, details: string }> {
    return {
      model: await this.exportModel(),
      details: this.exportDetails()
    };
  }

  private async exportModel(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const exporter = new GLTFExporter();
      const options = {
        binary: true,
        trs: false,
        onlyVisible: true,
        truncateDrawRange: true
      };

      exporter.parse(
        this.scene,
        (result) => {
          try {
            let blob: Blob;
            if (result instanceof ArrayBuffer) {
              blob = new Blob([result], { type: 'model/gltf-binary' });
            } else {
              const jsonString = JSON.stringify(result, null, 2);
              blob = new Blob([jsonString], { type: 'application/json' });
            }
            resolve(blob);
          } catch (e) {
            reject(new Error('Erreur de traitement du modèle'));
          }
        },
        (error) => {
          reject(error);
        },
        options
      );
    });
  }

  private exportDetails(): string {
    const exportData = {
      ...this.buildingData,
      metadata: {
        exportedAt: new Date().toISOString(),
        exporterVersion: '1.0',
        coordinateSystem: 'right-handed'
      }
    };
    return JSON.stringify(exportData, null, 2);
  }


}
