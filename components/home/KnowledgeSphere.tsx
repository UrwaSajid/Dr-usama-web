'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function KnowledgeSphere() {
  const mountRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth
    const H = mount.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
    camera.position.set(0, 0, 5.5)

    const root = new THREE.Group()
    scene.add(root)

    // Core icosahedron — coral wireframe
    const icoGeo  = new THREE.IcosahedronGeometry(1.35, 2)
    const icoMat  = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#D85A30'),
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    })
    const icoMesh = new THREE.Mesh(icoGeo, icoMat)
    root.add(icoMesh)

    // Outer shell — lighter, low-poly wireframe
    const outerGeo = new THREE.IcosahedronGeometry(1.7, 1)
    const outerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#E87550'),
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    })
    const outerMesh = new THREE.Mesh(outerGeo, outerMat)
    root.add(outerMesh)

    // Mouse tracking
    function onMouseMove(e: MouseEvent) {
      const rect = mount!.getBoundingClientRect()
      mouseRef.current = {
        x: ((e.clientX - rect.left)  / rect.width  - 0.5) * 2,
        y: ((e.clientY - rect.top)   / rect.height - 0.5) * 2,
      }
    }
    mount.addEventListener('mousemove', onMouseMove)

    const ro = new ResizeObserver(() => {
      const nw = mount!.clientWidth
      const nh = mount!.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    })
    ro.observe(mount)

    let targetRotX = 0, targetRotY = 0
    let currentRotX = 0, currentRotY = 0
    let raf: number
    const clock = new THREE.Clock()

    function animate() {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      icoMesh.rotation.y   =  t * 0.15
      icoMesh.rotation.x   =  t * 0.08
      outerMesh.rotation.y = -t * 0.07
      outerMesh.rotation.z =  t * 0.04

      // Outer shell breathes
      outerMat.opacity = 0.12 + 0.06 * Math.sin(t * 1.5)

      // Mouse-reactive lean
      targetRotX = mouseRef.current.y * 0.25
      targetRotY = mouseRef.current.x * 0.25
      currentRotX += (targetRotX - currentRotX) * 0.04
      currentRotY += (targetRotY - currentRotY) * 0.04

      root.rotation.x = currentRotX + t * 0.001
      root.rotation.y = currentRotY + t * 0.003

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mount.removeEventListener('mousemove', onMouseMove)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" style={{ minHeight: 480 }} />
}
