import { Suspense, useEffect ,useState } from "react";
// import service from "../appwrite/config";
// import { Container,Postcard} from "../components";
// import { useSelector } from "react-redux";
import * as THREE from 'three'
import { useRef } from 'react';


import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from "@react-three/drei";


const Model = () => {
  const modelRef = useRef();
  const { scene } = useGLTF('/scene.gltf');

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.add(scene);
    }
  }, [scene]);

  return (
    <primitive ref={modelRef} object={new THREE.Group()} />
  );
};

const Home = () => {
  return (
    <div className="relative h-screen ">
      <Canvas className="h-full w-full">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <div className="absolute top-10 right-4 m-3 z-1 text-violet-950 line-through -rotate-12 hover:animate-bounce sm:text-8xl text-4xl  ">
         TrektoTech
      </div>
    </div>
  );
};

export default Home;












// function Home(){

//     const refContainer = useRef(null);
//     useEffect(() => {
//       // === THREE.JS CODE START ===
//       var scene = new THREE.Scene();
//       var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//       var renderer = new THREE.WebGLRenderer();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       // document.body.appendChild( renderer.domElement );
//       // use ref as a mount point of the Three.js scene instead of the document.body
//     //   const gltf = useLoader(GLTFLoader, '/scene.gltf')
//     //   return <primitive object={gltf.scene} />

//       refContainer.current && refContainer.current.appendChild( renderer.domElement );
//       var geometry = new THREE.BoxGeometry(1, 1, 1);
//       var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//       var cube = new THREE.Mesh(geometry, material);
//       scene.add(cube);
//       camera.position.z = 5;
//       var animate = function () {
//         requestAnimationFrame(animate);
//         cube.rotation.x += 0.01;
//         cube.rotation.y += 0.01;
//         renderer.render(scene, camera);
//       };
//       animate();
//     }, []);
//     return (
//       <div ref={refContainer}></div>
  
    // );
    // const [posts , setPosts] = useState([])
    // const status  = useSelector((state)=>state.auth.status)

    // useEffect(()=>{
    //     service.getPosts().then((posts)=>{
    //         if(posts){
    //             setPosts(posts.documents)
    //         }
    //     })
    // })

    // if(posts.length == 0){
    //     return (
    //         <div className="w-full py-8 mt-4 text-center">
    //         <Container>
    //             <div className="flex flex-wrap">
    //                 <div className="p-2 w-full">
    //                     <h1 className="text-2xl font-bold hover:text-gray-500">
    //                       { status ?" There is Not Any Posts" :  "Login to read posts"}
    //                     </h1>
    //                 </div>
    //             </div>
    //         </Container>
    //     </div>
    //     )
    // }
    // return (
    //     <div className='w-full py-8'>
    //         <Container>
    //             <div className='flex flex-wrap'>
    //                 {posts.map((post) => (
    //                     <div key={post.$id} className='p-2 w-1/4'>
    //                         <Postcard {...post} />
    //                     </div>
    //                 ))}
    //             </div>
    //         </Container>
    //     </div>
    // )
    
// }

// export default Home;/