var mesh
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
    //scene.add(axes);
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



    // add the output of the renderer to the html element
    document.getElementById("webgl-output").appendChild(renderer.domElement);
    var mixer = new THREE.AnimationMixer();
    var clipAction
    var animationClip
    
    
 
    
    

    var clock = new THREE.Clock();
    var orbitControls = new THREE.OrbitControls(camera,renderer.domElement);
    x = 0.4
    var speciesList = {
        'cat': './model/cat/cat_red.glb',
        'parrot': './model/parrot/parrot.glb'
        
        };
    var respeciesList = {
        './model/cat/cat_red.glb':'cat',
        './model/parrot/parrot.glb':'parrot'
        
        };

        //Model loaded by default
        params = {
           Species: './model/cat/cat_red.glb'
        };
        var gui = new dat.GUI({hideable: false});    
    gui.add(params, 'Species', speciesList).onChange(function(){
        speciesLoad();
    });
    var controls = new function () {
        this.rotationSpeedX = 0;
        this.rotationSpeedY = 0;
        this.rotationSpeedZ = 0;
        this.scale = 10
        this.numberOfObjects = scene.children.length;
        this.color = "#ffae23";
        
        
       
  
        this.outputObjects = function () {
            console.log(scene.children);
        }
    };
    
    
    // need the name correct
    gui.addColor(controls, 'color').onChange(e =>{
        var catM = new THREE.MeshPhongMaterial({
            color: e
        });
        
    } );
    gui.add(controls, 'rotationSpeedX', -4, 4).listen().onChange(e =>{
        mesh.rotation.x = e; 
    });
    gui.add(controls, 'rotationSpeedY', -4, 4).listen().onChange(e =>{
        mesh.rotation.y = e; 
    });
    gui.add(controls, 'rotationSpeedZ', -4, 4).listen().onChange(e =>{
        mesh.rotation.z = e; 
    });
    gui.add(controls, 'scale', 0.01,30).listen().onChange(e =>{
        mesh.scale.set(e,e,e); 
    });
      
    gui.add(controls, 'outputObjects');
    gui.add(controls, 'numberOfObjects').listen();
    
    dat.GUI.prototype.removeFolder = function(name) {
        var folder = this.__folders[name];
        if (!folder) {
          return;
        }
        folder.close();
        this.__ul.removeChild(folder.domElement.parentNode);
        delete this.__folders[name];
        this.onResize();
      }
    speciesLoad()
    function speciesLoad(){
    if (mesh !== undefined) {
        scene.remove(mesh);
        gui.removeFolder("ClipAction")
        
    };   
    load = ok(params.Species)
    load.then(gltf =>{
        
        //var orginal_mar = gltf.scene.children[0].children[4].material
        
        var cat_scene = gltf.scene
        var cat = gltf

        mesh = cat_scene
        cat_scene.name = respeciesList[params.Species]
        scene.add(cat_scene)
        console.log(mesh)
        
        
        mixer = new THREE.AnimationMixer( cat.scene );
        mixer.timeScale = 0.05;
        animationClip = cat.animations[0];
        clipAction = mixer.clipAction( animationClip ).play();    
        animationClip = clipAction.getClip();
        
        
        if(mesh.name == "cat") {
            mesh.position.y = 0
            mesh.scale.set(20,20,20);
        }
        if(mesh.name == "parrot") {
            mesh.position.y = 5
            mesh.scale.set(10,10,10);
        }
       
        controls2 = addClipActionFolder("ClipAction", gui, clipAction, animationClip);
        
        renderScene();
        function renderScene() {
            var delta = clock.getDelta();
            stats.update();
            mixer.update( delta );
            orbitControls.update();
            scene.traverse(function (e) {
                if (mixer && clipAction && controls) {
                    mixer.update( delta );
                    controls2.time = mixer.time;
                    controls2.effectiveTimeScale = clipAction.getEffectiveTimeScale();
                    controls2.effectiveWeight = clipAction.getEffectiveWeight();
                  }
               
               
                
                
                
            });
            
            requestAnimationFrame(renderScene);
            renderer.render(scene, camera);
        }    
        
    })
    
    


    function ok(url){
        function load(url) {
            let gltfLoader = new THREE.GLTFLoader();
            
            return new Promise((resolve, reject) => {
        
                gltfLoader.load(url, gltf => {
                    resolve(gltf);
                });
            });
        }
        return load(url)
            .then(object => {
            sce = object;
            
            
            return sce; 
        })
    }
    
}
function addClipActionFolder(folderName, gui, clipAction, animationClip) {
    var actionControls = {
        keyframe: 0,
        time: 0,
        timeScale: 0,
        repetitions: Infinity,
        // warp
        warpStartTimeScale: 1,
        warpEndTimeScale: 1,
        warpDurationInSeconds: 2,
        warp: function() {clipAction.warp(actionControls.warpStartTimeScale, actionControls.warpEndTimeScale, actionControls.warpDurationInSeconds)},
        fadeDurationInSeconds: 2,
        fadeIn: function() {clipAction.fadeIn(actionControls.fadeDurationInSeconds)},
        fadeOut: function() {clipAction.fadeOut(actionControls.fadeDurationInSeconds)},
        effectiveWeight: 0,
        effectiveTimeScale: 0
      }
  
      var actionFolder = gui.addFolder(folderName)
      actionFolder.add(clipAction, "clampWhenFinished").listen();
      actionFolder.add(clipAction, "enabled").listen();
      actionFolder.add(clipAction, "paused").listen();
      actionFolder.add(clipAction, "loop", { LoopRepeat: THREE.LoopRepeat, LoopOnce: THREE.LoopOnce, LoopPingPong: THREE.LoopPingPong }).onChange(function(e) {
        if (e == THREE.LoopOnce || e == THREE.LoopPingPong) {
          clipAction.reset();
          clipAction.repetitions = undefined
          clipAction.setLoop(parseInt(e), undefined);
        } else {
          clipAction.setLoop(parseInt(e), actionControls.repetitions);
        }
      });
      actionFolder.add(actionControls, "repetitions", 0, 100).listen().onChange(function(e) {
        if (clipAction.loop == THREE.LoopOnce || clipAction.loop == THREE.LoopPingPong) {
          clipAction.reset();
          clipAction.repetitions = undefined
          clipAction.setLoop(parseInt(clipAction.loop), undefined);
        } else {
          clipAction.setLoop(parseInt(e), actionControls.repetitions);
        }
      });
      actionFolder.add(clipAction, "time", 0, animationClip.duration, 0.001).listen()
      actionFolder.add(clipAction, "timeScale", 0, 2, 0.01).listen()
      actionFolder.add(clipAction, "weight", 0, 2, 0.01).listen()
      actionFolder.add(actionControls, "effectiveWeight", 0, 1, 0.01).listen()
      actionFolder.add(actionControls, "effectiveTimeScale", 0, 2, 0.01).listen()
      actionFolder.add(clipAction, "zeroSlopeAtEnd").listen()
      actionFolder.add(clipAction, "zeroSlopeAtStart").listen()
      actionFolder.add(clipAction, "stop")
      actionFolder.add(clipAction, "play")
      actionFolder.add(clipAction, "reset")
      actionFolder.add(actionControls, "warpStartTimeScale", 0, 10, 0.01)
      actionFolder.add(actionControls, "warpEndTimeScale", 0, 10, 0.01)
      actionFolder.add(actionControls, "warpDurationInSeconds", 0, 10, 0.01)
      actionFolder.add(actionControls, "warp")
      actionFolder.add(actionControls, "fadeDurationInSeconds", 0, 10, 0.01)
      actionFolder.add(actionControls, "fadeIn")
      actionFolder.add(actionControls, "fadeOut")
  
      return actionControls;
  }
}