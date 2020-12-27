exports.ok = ok;
function ok(url){
    function load(url) {
        let gltfLoader = new GLTFLoader();
        
        return new Promise((resolve, reject) => {
    
        gltfLoader.load(url, gltf => {
            resolve(gltf);
        });
        });
    }
    return load(url)
        .then(object => {
        parrot = object.scene;
        parrot.scale.set(w, h, d);  
        
        return parrot; 
    })
    }