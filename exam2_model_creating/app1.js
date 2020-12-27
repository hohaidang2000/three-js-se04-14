
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
    var head , neck ,upperbody ,stomach ,arm_left_up, arm_left_down , 
        arm_right_up ,arm_right_down,leg_left_up,leg_left_down ,
        leg_right_up, leg_right_down
    
    let INTERSECTED;
    let theta = 0;

    const mouse = new THREE.Vector2();
    const radius = 100;
    raycaster = new THREE.Raycaster();
    var selected
    function onDocumentMouseMove( event ) {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );
        const intersects = raycaster.intersectObjects( [
            head ,         
            neck ,         
            upperbody ,    
            stomach  ,     
            arm_left_up   ,
            arm_left_down ,
            arm_right_up  ,
            arm_right_down,
            leg_left_up   ,
            leg_left_down ,
            leg_right_up  ,
            leg_right_down] );
        if ( intersects.length > 0 ) {      
            if ( INTERSECTED != intersects[ 0 ].object ) {
                if ( INTERSECTED ) INTERSECTED.material.transparent = false;  
        		INTERSECTED = intersects[ 0 ].object;
        		INTERSECTED.material.transparent = true;     
                INTERSECTED.material.opacity = 0.3;
            }
        }
        else{
            if(INTERSECTED) INTERSECTED.material.transparent = false;     
            INTERSECTED = null;
   
        }
    }
    function onDocumentMouseDown( event ) {
       
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );
        const intersects = raycaster.intersectObjects( [
            head ,         
            neck ,         
            upperbody ,    
            stomach  ,     
            arm_left_up   ,
            arm_left_down ,
            arm_right_up  ,
            arm_right_down,
            leg_left_up   ,
            leg_left_down ,
            leg_right_up  ,
            leg_right_down] );
        if (selected) selected.material.transparent = false;
        selected = INTERSECTED  
        
        console.log(selected)
    }

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
    head            = scene.getObjectByName(11)
    neck            = scene.getObjectByName(10)

    upperbody       = scene.getObjectByName(9)
    stomach         = scene.getObjectByName(8)

    arm_left_up     = scene.getObjectByName(7)
    arm_left_down   = scene.getObjectByName(6)
    arm_right_up    = scene.getObjectByName(5)
    arm_right_down  = scene.getObjectByName(4)

    leg_left_up     = scene.getObjectByName(3)
    leg_left_down   = scene.getObjectByName(2)
    leg_right_up    = scene.getObjectByName(1)
    leg_right_down  = scene.getObjectByName(0)

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
    
    
    
    var controls = new function () {
        this.totalwireframe = function(){
            
            for (i of Man.children){
                if (i.material.wireframe){
                    i.material.wireframe = false    
                }
                else i.material.wireframe = true
            }    
        }
        this.nowireframe = function(){
            for (i of Man.children){
                i.material.wireframe = false   
            }
        }
        this.reset = function(){
            Man.position.x = 0
            Man.position.y = 0
            Man.position.z = 0
            Man.rotation.x = 0
            Man.rotation.y = 0
            Man.rotation.z = 0
            this.nowireframe()
        }
        
    }
    var clock = new THREE.Clock();
    var orbitControls = new THREE.OrbitControls(camera,renderer.domElement);
    document.getElementById("webgl-output").appendChild(renderer.domElement);
    window.addEventListener( 'resize', onWindowResize, false );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener('pointerdown', onDocumentMouseDown, false );

    const gui = new dat.GUI()
    const rotateFolder = gui.addFolder("rotate")
    rotateFolder.add(Man.rotation, "x", -Math.PI , Math.PI , 0.001).listen();
    rotateFolder.add(Man.rotation, "y", -Math.PI , Math.PI , 0.001).listen();
    rotateFolder.add(Man.rotation, "z", -Math.PI , Math.PI , 0.001).listen();

    const positionFolder = gui.addFolder("position")
    positionFolder.add(Man.position, "x", -30 , 30 , 0.001).listen();
    positionFolder.add(Man.position, "y", -20 , 20 , 0.001).listen();
    positionFolder.add(Man.position, "z", -20 , 20 , 0.001).listen();
    

    gui.add(controls,"totalwireframe").listen();
    gui.add(controls,"reset").listen();
    


    var pre;    
    renderScene();
    function renderScene() {    
        stats.update();
        orbitControls.update();
        camera.updateMatrixWorld();
        if (selected){
           
            selected.material.transparent = true
            selected.material.opacity = 0.3;
        }

       
        requestAnimationFrame(renderScene);
        
        renderer.render(scene, camera);
    }
    function addGeometry(scene, geom, name, texture, gui, controls) {
        var mat = new THREE.MeshStandardMaterial(
          {
            map: texture,
            metalness: 0.2,
            roughness: 0.07
        });
        var mesh = new THREE.Mesh(geom, mat);
        mesh.castShadow = true;
        
        scene.add(mesh);
        addBasicMaterialSettings(gui, controls, mat, name + '-THREE.Material');
        addSpecificMaterialSettings(gui, controls, mat, name + '-THREE.MeshStandardMaterial');
      
        return mesh;
      };
    function addBasicMaterialSettings(gui, controls, material, name) {

        var folderName = (name !== undefined) ? name : 'THREE.Material';
    
        controls.material = material;
    
        var folder = gui.addFolder(folderName);
        folder.add(controls.material, 'id');
        folder.add(controls.material, 'uuid');
        folder.add(controls.material, 'name');
        folder.add(controls.material, 'opacity', 0, 1, 0.01);
        folder.add(controls.material, 'transparent');
        folder.add(controls.material, 'overdraw', 0, 1, 0.01);
        folder.add(controls.material, 'visible');
        folder.add(controls.material, 'side', {FrontSide: 0, BackSide: 1, BothSides: 2}).onChange(function (side) {
            controls.material.side = parseInt(side)
        });
    
        folder.add(controls.material, 'colorWrite');
        folder.add(controls.material, 'flatShading').onChange(function(shading) {
            controls.material.flatShading = shading;
            controls.material.needsUpdate = true;
        });
        folder.add(controls.material, 'premultipliedAlpha');
        folder.add(controls.material, 'dithering');
        folder.add(controls.material, 'shadowSide', {FrontSide: 0, BackSide: 1, BothSides: 2});
        folder.add(controls.material, 'vertexColors', {NoColors: THREE.NoColors, FaceColors: THREE.FaceColors, VertexColors: THREE.VertexColors}).onChange(function (vertexColors) {
            material.vertexColors = parseInt(vertexColors);
        });
        folder.add(controls.material, 'fog');
    
        return folder;
    }
    function addSpecificMaterialSettings(gui, controls, material, name) {
        controls.material = material;
        
        var folderName = (name !== undefined) ? name : 'THREE.' + material.type;
        var folder = gui.addFolder(folderName);
        switch (material.type) {
            case "MeshNormalMaterial":
                folder.add(controls.material,'wireframe');
                return folder;
    
            case "MeshPhongMaterial":
                controls.specular = material.specular.getStyle();
                folder.addColor(controls, 'specular').onChange(function (e) {
                    material.specular.setStyle(e)
                });
                folder.add(material, 'shininess', 0, 100, 0.01);
                return folder;            
                
            case "MeshStandardMaterial":
                controls.color = material.color.getStyle();
                folder.addColor(controls, 'color').onChange(function (e) {
                    material.color.setStyle(e)
                });
                controls.emissive = material.emissive.getStyle();
                folder.addColor(controls, 'emissive').onChange(function (e) {
                    material.emissive.setStyle(e)                
                });
                folder.add(material, 'metalness', 0, 1, 0.01);
                folder.add(material, 'roughness', 0, 1, 0.01);
                folder.add(material, 'wireframe');
    
                return folder;
        }
    }    
        
    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }
    
    


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}