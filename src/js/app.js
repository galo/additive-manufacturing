'use strict';

// Application logic will begin once DOM content is loaded
window.onload = () => {
    const app = new main();
};

class main {

    constructor() {
        // Instantiate two viewers for two different views

        const mainViewer = new Communicator.WebViewer({
            containerId: "viewer",
            empty: true
        });
        const overheadViewer = new Communicator.WebViewer({
            containerId: "subviewer",
            empty: true
        });
 
        // Set class properties
        this._viewerList = [mainViewer, overheadViewer];
        this._modelList = [];

        // Start viewers
        this._viewerList.map( (viewer) => viewer.start() );

        // Set up viewers
        this.setViewerCallbacks();
        this.configureOperators();
        this.setEventListeners();

    }  // End Constructor

    setViewerCallbacks() {
        let mainViewer = this._viewerList[0];
        let overheadViewer = this._viewerList[1];

        this._viewerList.map( (viewer) => { 
 
            viewer.setCallbacks({ 
           
              modelStructureReady: () => { 
                // Create Printing Plane 
                // Load Model 
                this.loadModel("microengine", viewer);

              }, 
           
              sceneReady: () => { 
                // Set the cameras for the two viewers
                // Background color for viewers 
              } 
           
            }); // End Callbacks on Both Viewers 
            
          }); // End map


    } // End setting viewer callbacks

    configureOperators() {

    } // End configuring operators 
    
    setEventListeners() {
        // We will use the main viewer to gather scene information
        let mainViewer = this._viewerList[0];

        document.getElementById("handles-button").onclick = () => {
        
        };

        document.getElementById("arrange-button").onclick = () => {
        
        };

        document.getElementById("instance-button").onclick = () => {
        
        };

    } // End setting event handlers

    // Function to load models and translate them so they are loaded 
    // at the origin and above the printing plane
    loadModel(modelName, viewer) { 
        const modelNum = viewer.model.getNodeChildren(viewer.model.getAbsoluteRootNode()).length;
        const nodeName = "Model-" + (modelNum + 1);
        const modelNodeId = viewer.model.createNode(null, nodeName);
        this._modelList.push(modelName);
        viewer.model.loadSubtreeFromScsFile(modelNodeId, "./data/" + modelName + ".scs")
            .then(() => {
                let loadMatrix = viewer.model.getNodeNetMatrix(modelNodeId);
                viewer.model.getNodeRealBounding(modelNodeId)
                    .then((box) => {
                        loadMatrix.setTranslationComponent(box.min.x * -1, box.min.y * -1, box.min.z * -1);
                        viewer.model.setNodeMatrix(modelNodeId, loadMatrix, true);
                });
        });

    }

    setMatrixText(matrix) {

    }

    arrangeOnPlane(boundarySize) {

    }

    _gatherLeavesAndClearMats(node, leafArray, promiseArr) {

    }

} // End main class 