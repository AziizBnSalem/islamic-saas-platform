"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei"
import { Suspense } from "react"
import { LoadingSpinner } from "./ui/loading-spinner"

function MosqueModel({ scale = 1, position = [0, -1, 0], rotation = [0, 0, 0] }) {
  const groupRef = useRef()
  const { scene } = useGLTF("/mosque.glb")

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-10, 10, 5]} intensity={0.5} color="#22c55e" />
      <spotLight position={[0, 10, 0]} intensity={0.8} castShadow color="#ffffff" />
    </>
  )
}

export function Mosque3D({ className, height = 400 }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Preload the model
    const preloadModel = async () => {
      await useGLTF.preload("/mosque.glb")
      setIsLoaded(true)
    }
    preloadModel()
  }, [])

  return (
    <div className={className} style={{ height }}>
      {!isLoaded ? (
        <div className="flex h-full w-full items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
          <Lights />
          <Suspense fallback={null}>
            <MosqueModel />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            rotateSpeed={0.5}
          />
        </Canvas>
      )}
    </div>
  )
}

// This is a fallback component that will be shown if WebGL is not supported
export function Mosque3DFallback({ className }) {
  return (
    <div className={`${className} flex items-center justify-center bg-islamic-50 dark:bg-gray-800`}>
      <div className="text-center">
        <div className="mb-4 text-islamic-600 dark:text-islamic-400">
          <svg
            width="100"
            height="100"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            <path d="M100 10L120 40H80L100 10Z" fill="currentColor" />
            <path d="M60 40H140V60H60V40Z" fill="currentColor" />
            <path
              d="M50 60H150V150H130V120C130 115.858 126.642 112.5 122.5 112.5H77.5C73.358 112.5 70 115.858 70 120V150H50V60Z"
              fill="currentColor"
            />
            <path d="M70 150H130V180H70V150Z" fill="currentColor" />
            <path d="M40 180H160V190H40V180Z" fill="currentColor" />
            <circle cx="100" cy="85" r="15" fill="currentColor" />
            <rect x="95" y="40" width="10" height="20" fill="currentColor" />
          </svg>
        </div>
        <p className="text-gray-600 dark:text-gray-300">Modèle 3D non disponible sur votre appareil</p>
      </div>
    </div>
  )
}
