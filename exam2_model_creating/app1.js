
function init() {
    var stats = initStats();

    // default setup
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    var axes = new THREE.AxisHelper(200);
    scene.add(axes);
      // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;

    // add the plane to the scene
    scene.add(plane);
    // add subtle ambient lighting
    var ambientLight = new THREE.AmbientLight(0x3c3c3c);
    scene.add(ambientLight);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff, 1.2, 150, 120);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    var cubeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    var Man = new THREE.Object3D();
    function createMan(){
    for(var i=0; i<=11; i++){
        var cubeGeometry = new THREE.CubeGeometry(4,4,4);
        var cubeMaterial = new THREE.MeshPhongMaterial(
        {color: 0xff0000, wireframe: false});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.name = i    
        cube.position.y += i +2
        cube.castShadow = true
        cube.receiveShadow = true
        
        Man.add(cube)
        
    } 
    scene.add(Man)
    var head = scene.getObjectByName(11)
    var neck = scene.getObjectByName(10)

    var upperbody = scene.getObjectByName(9)
    var stomach = scene.getObjectByName(8)

    var arm_left_up = scene.getObjectByName(7)
    var arm_left_down = scene.getObjectByName(6)
    var arm_right_up = scene.getObjectByName(5)
    var arm_right_down = scene.getObjectByName(4)
    
    var leg_left_up = scene.getObjectByName(3)
    var leg_left_down = scene.getObjectByName(2)
    var leg_right_up = scene.getObjectByName(1)
    var leg_right_down = scene.getObjectByName(0)
    
    x = 0.9
    y = x - 0.5
    head.scale.set(x,x,x)
    head.position.y +=10
    neck.position.y = head.position.y - 2.5
    neck.scale.set(y,y,y)

    upperbody.scale.set(1,1,2)
    upperbody.position.y = neck.position.y-2.5
    
    stomach.position.y = upperbody.position.y-2.5
    stomach.scale.set(0.8,-2,1.5)
    
    arm_left_up.position.z = upperbody.position.z - 5
    arm_left_up.scale.set(-0.6,1.5,-0.6    )
    arm_left_up.position.y = upperbody.position.y - 1.5

    arm_left_down.scale.set(-0.5,1.5,-0.5   )
    arm_left_down.position.z = arm_left_up.position.z
    arm_left_down.position.y = arm_left_up.position.y -5

    arm_right_up.position.z = upperbody.position.z + 5
    arm_right_up.scale.set(-0.6,1.5,-0.6    )
    arm_right_up.position.y = upperbody.position.y - 1.5

    arm_right_down.scale.set(-0.5,1.5,-0.5   )
    arm_right_down.position.z = arm_right_up.position.z
    arm_right_down.position.y = arm_right_up.position.y -5

    //
    leg_left_up.position.z = upperbody.position.z - 2
    leg_left_up.scale.set(-0.6,1.5,-0.6    )
    leg_left_up.position.y = upperbody.position.y - 9.5

    leg_left_down.scale.set(-0.5,1.5,-0.5   )
    leg_left_down.position.z = leg_left_up.position.z
    leg_left_down.position.y = leg_left_up.position.y -5

    leg_right_up.position.z = upperbody.position.z + 2
    leg_right_up.scale.set(-0.6,1.5,-0.6    )
    leg_right_up.position.y = upperbody.position.y - 9.5

    leg_right_down.scale.set(-0.5,1.5,-0.5   )
    leg_right_down.position.z = leg_right_up.position.z
    leg_right_down.position.y = leg_right_up.position.y -5
    }
    createMan();
    console.log(Man);
    Man.position.y -= 0.5
    Man.rotation.y += 10
    
    

    var clock = new THREE.Clock();
    var orbitControls = new THREE.OrbitControls(camera,renderer.domElement);
    document.getElementById("webgl-output").appendChild(renderer.domElement);
     

       

        
    renderScene();
    function renderScene() {    
        stats.update();
        orbitControls.update();
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }    
        
    
    
    


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}