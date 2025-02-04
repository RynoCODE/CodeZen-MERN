import { getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../utils/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const auth = getAuth();
const provider = new GoogleAuthProvider();

auth.languageCode = "it";

export const Signin = () => {
  const auth = getAuth(app);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      15,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/hero.png");
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      const deltaMove = {
        x: event.offsetX - previousMousePosition.x,
        y: event.offsetY - previousMousePosition.y,
      };

      const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          toRadians(deltaMove.y * 1),
          toRadians(deltaMove.x * 1),
          0,
          "XYZ"
        )
      );

      cube.quaternion.multiplyQuaternions(
        deltaRotationQuaternion,
        cube.quaternion
      );

      previousMousePosition = {
        x: event.offsetX,
        y: event.offsetY,
      };
    };

    const onMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMousePosition = {
        x: event.offsetX,
        y: event.offsetY,
      };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const toRadians = (angle: number) => angle * (Math.PI / 180);

    canvasRef.current.addEventListener("mousemove", onMouseMove);
    canvasRef.current.addEventListener("mousedown", onMouseDown);
    canvasRef.current.addEventListener("mouseup", onMouseUp);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      canvasRef.current?.removeEventListener("mousemove", onMouseMove);
      canvasRef.current?.removeEventListener("mousedown", onMouseDown);
      canvasRef.current?.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  async function onSignin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential) {
          return;
        }
        const user = result.user;
        console.log(user);
        localStorage.setItem('userId', user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  }

  return (
    <>
      <div className="hero bg-gray-300 h-screen w-full relative">
        <nav className="flex justify-center items-center h-24">
          <img className="w-auto h-24" src="logo.png" alt="Logo" />
        </nav>
        {/* <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        ></canvas> */}

        <div className="hero-content flex items-center justify-between mx-20">
          <div>
            <h1 className="text-8xl font-bold mb-5 leading-[4.5rem]">
              Welcome to{" "}
              <span className="text-[#228EBD] text-7xl  hover:text-[#2B5A84] ">
                CodeZen
              </span>
            </h1>
            <p className="text-gray-600 ml-2">
              Hone your coding skills with our extensive collection of coding
              challenges. Join a community of passionate developers and take
              your problem-solving abilities to the next level.
            </p>
            <button
              className="px-6 py-2 bg-[#228EBD] text-white hover:bg-[#2B5A84] rounded mt-5 ml-2"
              onClick={() => {
                onSignin();
              }}
            >
              Google Signin
            </button>
          </div>
          <img
            src="/hero.png"
            alt="hero"
            className="h-[42rem] w-auto object-cover"
          />
        </div>
      </div>
    </>
  );
};
