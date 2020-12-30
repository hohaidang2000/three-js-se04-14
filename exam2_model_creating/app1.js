
function init() {
    const gui = new dat.GUI()
    var controls2 = {}
    dat.GUI.prototype.removeFolder = function (name) {
        var folder = this.__folders[name];
        if (!folder) {
            return;
        }
        folder.close();
        this.__ul.removeChild(folder.domElement.parentNode);
        delete this.__folders[name];
        this.onResize();
    }
    var boxHelper
    var stats = initStats();

    var textureLoader = new THREE.TextureLoader();
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
    var head, neck, upperbody, stomach, arm_left_up, arm_left_down,
        arm_right_up, arm_right_down, leg_left_up, leg_left_down,
        leg_right_up, leg_right_down

    let INTERSECTED;


    const mouse = new THREE.Vector2();

    raycaster = new THREE.Raycaster();
    var selected
    function onDocumentMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects([
            head,
            neck,
            upperbody,
            stomach,
            arm_left_up,
            arm_left_down,
            arm_right_up,
            arm_right_down,
            leg_left_up,
            leg_left_down,
            leg_right_up,
            leg_right_down]);
        if (intersects.length > 0) {
            if (INTERSECTED != intersects[0].object) {
                if (INTERSECTED) INTERSECTED.material.transparent = false;
                INTERSECTED = intersects[0].object;
                INTERSECTED.material.transparent = true;
                INTERSECTED.material.opacity = 0.3;
            }
        }
        else {
            if (INTERSECTED) INTERSECTED.material.transparent = false;
            INTERSECTED = null;

        }
    }
    function onDocumentMouseDown(event) {

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects([
            head,
            neck,
            upperbody,
            stomach,
            arm_left_up,
            arm_left_down,
            arm_right_up,
            arm_right_down,
            leg_left_up,
            leg_left_down,
            leg_right_up,
            leg_right_down]);
        if (selected) selected.material.transparent = false;
        selected = INTERSECTED

        console.log(selected)
    }
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        // up
        if (keyCode == 81){
            
            scene.remove(boxHelper)

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects([
                head,
                neck,
                upperbody,
                stomach,
                arm_left_up,
                arm_left_down,
                arm_right_up,
                arm_right_down,
                leg_left_up,
                leg_left_down,
                leg_right_up,
                leg_right_down]);
            if (selected) selected.material.transparent = false;
            selected = INTERSECTED
            Man.selected = selected
            Man.name = selected.name

            boxHelper = new THREE.BoxHelper(Man.selected);
            boxHelper.material.color.set(0x33FFFF);
            scene.add(boxHelper);
            gui.removeFolder(controls2.name)    
            var mat = MatLoad(params.Mat)
            Man.selected.material = mat
            controls.new()
            console.log(Man.selected)           
        }
        if (keyCode == 69) {
            
            scene.remove(boxHelper)

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects([
                head,
                neck,
                upperbody,
                stomach,
                arm_left_up,
                arm_left_down,
                arm_right_up,
                arm_right_down,
                leg_left_up,
                leg_left_down,
                leg_right_up,
                leg_right_down]);
            if (selected) selected.material.transparent = false;
            selected = INTERSECTED
            Man.selected = selected
            Man.name = selected.name

            boxHelper = new THREE.BoxHelper(Man.selected);
            boxHelper.material.color.set(0x33FFFF);
            scene.add(boxHelper);

            controls.new()
            console.log(Man.selected)
        }
    }

    function createMan() {
        var texture = textureLoader.load('general/brick-wall.jpg')
        for (var i = 0; i <= 11; i++) {
            var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);

            var cubeMaterial = new THREE.MeshStandardMaterial(
                {
                    map: texture,
                    metalness: 0.2,
                    roughness: 0.07
                });
            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.name = i
            cube.position.y += i + 2
            cube.castShadow = true
            cube.receiveShadow = true
            cube.px = 0
            cube.py = 0
            cube.pz = 0

            Man.add(cube)

        }


        scene.add(Man)
        head = scene.getObjectByName(11)
        neck = scene.getObjectByName(10)

        upperbody = scene.getObjectByName(9)
        stomach = scene.getObjectByName(8)

        arm_left_up = scene.getObjectByName(7)
        arm_left_down = scene.getObjectByName(6)
        arm_right_up = scene.getObjectByName(5)
        arm_right_down = scene.getObjectByName(4)

        leg_left_up = scene.getObjectByName(3)
        leg_left_down = scene.getObjectByName(2)
        leg_right_up = scene.getObjectByName(1)
        leg_right_down = scene.getObjectByName(0)

        head.name = "head          "
        neck.name = "neck          "
        upperbody.name = "upperbody     "
        stomach.name = "stomach       "
        arm_left_up.name = "arm_left_up   "
        arm_left_down.name = "arm_left_down "
        arm_right_up.name = "arm_right_up  "
        arm_right_down.name = "arm_right_down"
        leg_left_up.name = "leg_left_up   "
        leg_left_down.name = "leg_left_down "
        leg_right_up.name = "leg_right_up  "
        leg_right_down.name = "leg_right_down"


        Man.selected = head
        Man.name = head.name

        boxHelper = new THREE.BoxHelper(Man.selected);
        boxHelper.material.color.set(0x33FFFF);
        scene.add(boxHelper);

        x = 0.9
        y = x - 0.5
        head.scale.set(x, x, x)
        head.position.y += 10
        neck.position.y = head.position.y - 2.5
        neck.scale.set(y, y, y)

        upperbody.scale.set(1, 1, 2)
        upperbody.position.y = neck.position.y - 2.5

        stomach.position.y = upperbody.position.y - 2.5
        stomach.scale.set(0.8, -2, 1.5)

        arm_left_up.position.z = upperbody.position.z - 5
        arm_left_up.scale.set(-0.6, 1.5, -0.6)
        arm_left_up.position.y = upperbody.position.y - 1.5

        arm_left_down.scale.set(-0.5, 1.5, -0.5)
        arm_left_down.position.z = arm_left_up.position.z
        arm_left_down.position.y = arm_left_up.position.y - 5

        arm_right_up.position.z = upperbody.position.z + 5
        arm_right_up.scale.set(-0.6, 1.5, -0.6)
        arm_right_up.position.y = upperbody.position.y - 1.5

        arm_right_down.scale.set(-0.5, 1.5, -0.5)
        arm_right_down.position.z = arm_right_up.position.z
        arm_right_down.position.y = arm_right_up.position.y - 5

        //
        leg_left_up.position.z = upperbody.position.z - 2
        leg_left_up.scale.set(-0.6, 1.5, -0.6)
        leg_left_up.position.y = upperbody.position.y - 9.5

        leg_left_down.scale.set(-0.5, 1.5, -0.5)
        leg_left_down.position.z = leg_left_up.position.z
        leg_left_down.position.y = leg_left_up.position.y - 5

        leg_right_up.position.z = upperbody.position.z + 2
        leg_right_up.scale.set(-0.6, 1.5, -0.6)
        leg_right_up.position.y = upperbody.position.y - 9.5

        leg_right_down.scale.set(-0.5, 1.5, -0.5)
        leg_right_down.position.z = leg_right_up.position.z
        leg_right_down.position.y = leg_right_up.position.y - 5

    }
    createMan();

    console.log(Man);
    Man.position.y -= 0.5


    var controls = new function () {

        this.totalwireframe = function () {

            for (i of Man.children) {
                if (i.material.wireframe) {
                    i.material.wireframe = false
                }
                else i.material.wireframe = true
            }
        }
        this.nowireframe = function () {
            for (i of Man.children) {
                i.material.wireframe = false
            }
        }
        this.reset = function () {
            if (Man.selected)
                Man.selected.material.transparent = false
            for (i of Man.children) {
                i.rotation.x = 0
                i.rotation.y = 0
                i.rotation.z = 0
                i.position.y = 0
                i.position.x = 0
                i.position.z = 0
            }
            head.position.y = 23

            neck.position.y = head.position.y - 2.5

            upperbody.position.y = neck.position.y - 2.5

            stomach.position.y = upperbody.position.y - 2.5


            arm_left_up.position.z = upperbody.position.z - 5

            arm_left_up.position.y = upperbody.position.y - 1.5

            arm_left_down.position.z = arm_left_up.position.z
            arm_left_down.position.y = arm_left_up.position.y - 5
            arm_right_up.position.z = upperbody.position.z + 5

            arm_right_up.position.y = upperbody.position.y - 1.5

            arm_right_down.position.z = arm_right_up.position.z
            arm_right_down.position.y = arm_right_up.position.y - 5
            //
            leg_left_up.position.z = upperbody.position.z - 2

            leg_left_up.position.y = upperbody.position.y - 9.5

            leg_left_down.position.z = leg_left_up.position.z
            leg_left_down.position.y = leg_left_up.position.y - 5
            leg_right_up.position.z = upperbody.position.z + 2

            leg_right_up.position.y = upperbody.position.y - 9.5

            leg_right_down.position.z = leg_right_up.position.z
            leg_right_down.position.y = leg_right_up.position.y - 5

            selected = head
            Man.selected = head
            Man.name = head.name
            var texture = textureLoader.load('general/brick-wall.jpg')

            for (i of Man.children) {
                if (i instanceof THREE.Mesh) {
                    var cubeMaterial = new THREE.MeshStandardMaterial(
                        {
                            map: texture,
                            metalness: 0.2,
                            roughness: 0.07
                        });
                    i.material = cubeMaterial
                    i.material.transparent = false
                }
            }
            Man.position.x = 0
            Man.position.y = -0.5
            Man.position.z = 0
            Man.rotation.x = 0
            Man.rotation.y = 0
            Man.rotation.z = 0

            this.r_X = 0
            this.r_Y = 0
            this.r_Z = 0

            this.p_X = 0
            this.p_Y = 0
            this.p_Z = 0
            this.rp_X = Man.selected.position.x
            this.rp_Y = Man.selected.position.y
            this.rp_Z = Man.selected.position.z

        }
        this.r_X = 0
        this.r_Y = 0
        this.r_Z = 0

        this.p_X = 0
        this.p_Y = 0
        this.p_Z = 0

        this.rp_X = Man.selected.position.x
        this.rp_Y = Man.selected.position.y
        this.rp_Z = Man.selected.position.z


        this.wireframe = false
        this.new = function () {
            this.r_X = Man.selected.rotation.x
            this.r_Y = Man.selected.rotation.y
            this.r_Z = Man.selected.rotation.z

            this.rp_X = Man.selected.position.x
            this.rp_Y = Man.selected.position.y
            this.rp_Z = Man.selected.position.z

            this.p_X = Man.selected.px
            this.p_Y = Man.selected.py
            this.p_Z = Man.selected.pz

            this.wireframe = Man.selected.material.wireframe
        }


    }
    var clock = new THREE.Clock();
    var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    document.getElementById("webgl-output").appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    //document.addEventListener('pointerdown', onDocumentMouseDown, false );
    document.addEventListener('keydown', onDocumentKeyDown, false);


    const rotateFolder = gui.addFolder("rotate")
    rotateFolder.add(Man.rotation, "x", -Math.PI, Math.PI, 0.001).listen();
    rotateFolder.add(Man.rotation, "y", -Math.PI, Math.PI, 0.001).listen();
    rotateFolder.add(Man.rotation, "z", -Math.PI, Math.PI, 0.001).listen();

    const positionFolder = gui.addFolder("position")
    positionFolder.add(Man.position, "x", -30, 30, 0.001).listen();
    positionFolder.add(Man.position, "y", -30, 30, 0.001).listen();
    positionFolder.add(Man.position, "z", -30, 30, 0.001).listen();

    gui.add(controls, "totalwireframe").listen();
    gui.add(controls, "reset").listen();
    //gui.add(text).listen();
    var dis = 15
    const selectedFolder = gui.addFolder("selected")
    selectedFolder.add(controls, "r_X", -Math.PI, Math.PI, 0.001).listen().onChange(function (e) {
        Man.selected.rotation.x = controls.r_X

    });
    selectedFolder.add(controls, "r_Y", -Math.PI, Math.PI, 0.001).listen().onChange(function (e) {
        Man.selected.rotation.y = controls.r_Y
    });
    selectedFolder.add(controls, "r_Z", -Math.PI, Math.PI, 0.001).listen().onChange(function (e) {
        Man.selected.rotation.z = controls.r_Z
    });

    selectedFolder.add(controls, "p_X", -dis, dis, 0.001).listen().onChange(function (e) {
        Man.selected.px = e
        Man.selected.position.x = e + controls.rp_X
    });
    selectedFolder.add(controls, "p_Y", -dis, dis, 0.001).listen().onChange(function (e) {
        Man.selected.px = e
        Man.selected.position.y = e + controls.rp_Y
    });
    selectedFolder.add(controls, "p_Z", -dis, dis, 0.001).listen().onChange(function (e) {
        Man.selected.px = e
        Man.selected.position.z = e + controls.rp_Z
    });
    selectedFolder.add(controls, "wireframe").listen().onChange(function (e) {
        Man.selected.material.wireframe = controls.wireframe
    })
    gui.add(Man, "name").listen();

    var speciesList = {

        'brick': 'textures/general/brick-wall.jpg',
        'weave': 'textures/general/weave.jpg',
        'metal': 'textures/general/metal-floor.jpg',
        'plaster': 'textures/general/plaster.jpg',
        'bathroom': 'textures/general/bathroom.jpg',
        'lava': 'textures/w_c.jpg'
    };


    //Model loaded by default
    params ={
        Mat:'textures/general/brick-wall.jpg'
        

    }


    gui.add(params, 'Mat', speciesList).listen().onChange(e => {
        console.log(e)
        
        gui.removeFolder(controls2.name)
        var mat = MatLoad(e)


        Man.selected.material = mat
        console.log(mat)
    });

    pose = {
        'default': 'default',
        'hi': 'hi',
        'hello': 'hello'
    }
    defaultPose = {
        Pose: 'default'
    }
    gui.add(defaultPose, 'Pose', pose).listen().onChange(function (e) {
        if(e == 'default'){
            controls.reset()
        }
        if (e == 'hi') {
            leg_right_down.position.set(0, 3.5, 3.347,)
            leg_right_up.position.set(0, 8.5, 2,)
            leg_left_down.position.set(-4.609, 3.854, -4.6,)
            leg_left_up.position.set(-1.608, 8.854, -3.277,)
            arm_right_down.position.set(0.023, 26.5, 3.723,)
            arm_right_up.position.set(0, 21.155, 5,)
            arm_left_down.position.set(0, 11.5, -6.631,)
            arm_left_up.position.set(0, 16.5, -5,)
            stomach.position.set(0.023, 15.192, -0.308,)
            upperbody.position.set(0, 18, 0,)
            neck.position.set(0, 20.5, 0,)
            head.position.set(0, 23, 0,)
            ROTATE(leg_right_down, 0, 0, 0)
            ROTATE(leg_right_up, -0.549, 0, 0)
            ROTATE(leg_left_down, 0.213, 0, 0)
            ROTATE(leg_left_up, 0.28200000000000003, 0, -0.48)
            ROTATE(arm_right_down, -0.549, 0, 0)
            ROTATE(arm_right_up, 0.074, 0, 0)
            ROTATE(arm_left_down, 0, 0, 0)
            ROTATE(arm_left_up, 0.906, 0, 0)
            ROTATE(stomach, 0.213, 0, 0)
            ROTATE(upperbody, 0.213, 0, 0)
            ROTATE(neck, 0, 0, 0)
            ROTATE(head, -0.272, 0, 0)

        }
        if (e == 'hello') {
            leg_right_down.position.set(0, 3.5, 2)
            leg_right_up.position.set(0, 8.316, 2)
            leg_left_down.position.set(-4.898, 3.5, -4.052)
            leg_left_up.position.set(-1.868, 8.132, -3.194)
            arm_right_down.position.set(0, 11.5, 5)
            arm_right_up.position.set(0, 16.5, 5)
            arm_left_down.position.set(0, 11.5, -5)
            arm_left_up.position.set(0, 16.5, -5)
            stomach.position.set(-1.378, 14.642, -0.184)
            upperbody.position.set(0, 18, 0)
            neck.position.set(1.499, 20.5, 0)
            head.position.set(1.836, 23, 0)
            ROTATE(leg_right_down, 0, 0, 0,)
            ROTATE(leg_right_up, 0, 0, 0,)
            ROTATE(leg_left_down, 0, 0, 0,)
            ROTATE(leg_left_up, 0, -0.532, -0.603,)
            ROTATE(arm_right_down, 0, 0, 0,)
            ROTATE(arm_right_up, 0, 0, 0,)
            ROTATE(arm_left_down, -0.744, 0, 0,)
            ROTATE(arm_left_up, 0.9490000000000001, 0, 0,)
            ROTATE(stomach, 0.10200000000000001, -0.25, 0.314,)
            ROTATE(upperbody, 0, 0, -0.532,)
            ROTATE(neck, 0, 0, -0.603,)
            ROTATE(head, 0, 0, -0.603,)

        }
    });
    var obj = {
        pos: function () {
            for (i of Man.children) {
                console.log(i.name, i.position.x, i.position.y, i.position.z)


                console.log(i.rotation.x, i.rotation.y, i.rotation.z)
            }
        }
    }
    gui.add(obj, 'pos').listen()
    //console.log(scene.background)
    scene.background = new THREE.Color(0xffffff);
    controls2.background = scene.background.getStyle()
    gui.addColor(controls2, "background").listen().onChange(
        function (e) {


            scene.background.setStyle(e);

        }
    )
    controls2.name = 'brick'

    var actionFolder = gui.addFolder('brick')
    actionFolder.add(Man.selected.material, "metalness", 0, 1, 0.001)
    actionFolder.add(Man.selected.material, "roughness", 0, 1, 0.001)


    controls2.color = Man.selected.material.color.getStyle()
    actionFolder.addColor(controls2, "color").listen().onChange(function (e) {
        Man.selected.material.color.setStyle(e)
    });
    renderScene();
    function renderScene() {
        if (boxHelper)
            boxHelper.update()
        stats.update();
        orbitControls.update();
        camera.updateMatrixWorld();




        requestAnimationFrame(renderScene);

        renderer.render(scene, camera);
    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }
    function ROTATE(mesh, x, y, z) {
        mesh.rotation.x = x
        mesh.rotation.y = y
        mesh.rotation.z = z

    }
    function MatLoad(e) {
        texture = textureLoader.load(e)
        if (e == 'textures/general/brick-wall.jpg') {

            var mat = new THREE.MeshStandardMaterial(
                {
                    map: texture,
                    metalness: 0.2,
                    roughness: 0.07
                });
            var actionFolder = gui.addFolder('brick')
            actionFolder.add(mat, "metalness", 0, 1, 0.001).listen()
            actionFolder.add(mat, "roughness", 0, 1, 0.001).listen()
            controls2.color = mat.color.getStyle();

            actionFolder.addColor(controls2, "color").listen().onChange(function (e) {
                mat.color.setStyle(e)
            });

            controls2.name = 'brick'

        }
        if (e == 'textures/general/metal-floor.jpg') {
            var mat = new THREE.MeshStandardMaterial(
                {
                    map: texture,
                    metalness: 0.2,
                    roughness: 0.07,
                    normalMap: textureLoader.load('textures/general/metal-floor-normal.jpg')
                });
            var actionFolder = gui.addFolder('metal')
            actionFolder.add(mat, "metalness", 0, 1, 0.001).listen()
            actionFolder.add(mat, "roughness", 0, 1, 0.001).listen()
            controls2.color = mat.color.getStyle();

            actionFolder.addColor(controls2, "color").listen().onChange(function (e) {
                mat.color.setStyle(e)
            });

            controls2.name = 'metal'


        }
        if (e == 'textures/general/weave.jpg') {
            var mat = new THREE.MeshStandardMaterial(
                {
                    map: texture,
                    metalness: 0.2,
                    roughness: 0.07,
                    bumpMap: textureLoader.load('textures/general/weave-bump.jpg')
                });
            var actionFolder = gui.addFolder('weave')
            actionFolder.add(mat, "metalness", 0, 1, 0.001).listen()
            actionFolder.add(mat, "roughness", 0, 1, 0.001).listen()
            controls2.color = mat.color.getStyle();

            actionFolder.addColor(controls2, "color").listen().onChange(function (e) {
                mat.color.setStyle(e)
            });

            controls2.name = 'weave'


        }
        if (e == 'textures/general/plaster.jpg') {
            var mat = new THREE.MeshStandardMaterial(
                {
                    map: texture,
                    metalness: 0.2,
                    roughness: 0.07,
                    normalMap: textureLoader.load('textures/general/plaster-normal.jpg')
                });
            var actionFolder = gui.addFolder('plaster')
            actionFolder.add(mat, "metalness", 0, 1, 0.001).listen()
            actionFolder.add(mat, "roughness", 0, 1, 0.001).listen()
            controls2.color = mat.color.getStyle();

            actionFolder.addColor(controls2, "color").listen().onChange(function (e) {
                mat.color.setStyle(e)
            });

            controls2.name = 'plaster'



        }
        if (e == 'textures/general/bathroom.jpg') {
            var mat = new THREE.MeshStandardMaterial(
                {
                    map: texture,
                    metalness: 0.2,
                    roughness: 0.07,
                    bumpMap: textureLoader.load('textures/general/bathroom-normal.jpg')
                });
            var actionFolder = gui.addFolder('bathroom')
            actionFolder.add(mat, "metalness", 0, 1, 0.001).listen()
            actionFolder.add(mat, "roughness", 0, 1, 0.001).listen()
            controls2.color = mat.color.getStyle();

            actionFolder.addColor(controls2, "color").listen().onChange(function (e) {
                mat.color.setStyle(e)
            });

            controls2.name = 'bathroom'
        }
        if (e == 'textures/w_c.jpg') {
            var mat = new THREE.MeshStandardMaterial(
                {

                    metalness: 0.2,
                    roughness: 1,
                    color: 0x201a1a,
                    emissive: 0xfb1a1a,
                    emissiveMap: textureLoader.load("textures/emissive/lava.png"),
                    normalMap: textureLoader.load("textures/emissive/lava-normals.png"),
                    metalnessMap: textureLoader.load("textures/emissive/lava-smoothness.png"),
                    metalness: 1,
                    roughness: 0.4
                });

            var actionFolder = gui.addFolder('lava')
            actionFolder.add(mat, "metalness", 0, 1, 0.001).listen()
            actionFolder.add(mat, "roughness", 0, 1, 0.001).listen()
            mat.color.getStyle();
            mat.emissive.getStyle();
            controls2.color = mat.color.getStyle();
            controls2.emissive = mat.emissive.getStyle();
            actionFolder.addColor(controls2, "color").listen().onChange(function (e) {
                mat.color.setStyle(e)
            });
            actionFolder.addColor(controls2, "emissive").listen().onChange(function (e) {
                mat.emissive.setStyle(e)
            });


            controls2.name = 'lava'
        }
        return mat
    }

    
}