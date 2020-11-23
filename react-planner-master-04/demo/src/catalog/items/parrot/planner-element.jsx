import React from 'react';
import * as Three from 'three';
import { LoadingManager, BoxGeometry, MeshBasicMaterial, Mesh, BoxHelper, Group, BufferGeometryUtils, BufferGeometry, MeshStandardMaterial, Object3D } from 'three';
import { ReactPlannerSharedStyle } from 'react-planner';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
//import { ok } from './birds.js';

let parrot = null;

export default {
  name: 'ok',
  prototype: 'items',

  info: {
    title: 'ok',
    tag: ['demo'],
    description: 'Demo item',
    image: require('./cube.png')
  },

  properties: {
    color: {
      label: 'Color',
      type: 'color',
      defaultValue: ReactPlannerSharedStyle.AREA_MESH_COLOR.unselected
    },
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    },
    depth: {
      label: 'Depth',
      type: 'length-measure',
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    },
  },

  render2D: (element, layer, scene) => {
    let style = {
      stroke: '#000',
      strokeWidth: element.selected ? '2px' : '0px',
      fill: element.properties.get('color')
    };

    return (
      <g transform="translate(-50, -50)">
        <rect x="0" y="0" width="100" height="100" style={style} />
      </g>
    );
  },

  render3D: (element, layer, scene) => {



   

    let w = element.properties.getIn(['width', 'length']);
    let h = element.properties.getIn(['height', 'length']);
    let d = element.properties.getIn(['depth', 'length']);
    let geometry = new BoxGeometry(w, h, d);
    let material = new MeshBasicMaterial({
      color: element.properties.get('color')
    });

    var mesh1 = new Mesh(geometry, material);

    let box = new BoxHelper(mesh1, !element.selected ? ReactPlannerSharedStyle.LINE_MESH_COLOR.unselected : ReactPlannerSharedStyle.MESH_SELECTED);
    box.material.linewidth = 2;
    box.renderOrder = 1000;
    //mesh1.add(box);

    mesh1.position.y = (h / 2);

    //print("Er");

    var model;

    var go = new Group;
    function createMesh(insertedMeshes) {
      console.log(insertedMeshes)
      var materials = [],
        geometries = [],
        mergedGeometry = new BufferGeometry(),
        meshMaterial,
        mergedMesh;

      insertedMeshes.traverse(function (mesh, index) {
        mesh.updateMatrix();
        geometries.push(mesh.geometry);
        meshMaterial = new MeshStandardMaterial(mesh.material);
        materials.push(meshMaterial);
      });

      mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, true);
      mergedGeometry.groupsNeedUpdate = true;

      mergedMesh = new Mesh(mergedGeometry, materials);

      return mergedMesh;
    }



   
    function load(url) {
      let gltfLoader = new GLTFLoader();
      
        return new Promise((resolve, reject) => {
    
        gltfLoader.load(url, gltf => {
          resolve(gltf);
        });
      });
    }
    return load('./models/Parrot.glb')
      .then(object => {
        parrot = object.scene;
        parrot.scale.set(w, h, d);  
      
        return parrot; 
    })
  }


};

