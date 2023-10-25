// @ts-nocheck

const Viewer3DModelViewer = ({url }: {url:string}) => {
  return (
    <div style={{ position: 'relative', marginBottom: '12px' }}>
      <div
        className="border flex items-center justify-center w-100"
        style={{ aspectRatio: '1/1',borderRadius: '.25rem !important' }}
        // ref={modelContainerRef}
      >
        {/* url && url.endsWith('usdz') && */
       // @ts-ignore
         <model-viewer
         style={{ width: '100%', height: '100%' }}
         key={url}
         auto-rotate
         camera-controls
         ar
         rotation-per-second="30deg"
         alt="A 3D model"
         src={url}
         ios-src={url}
         ar-modes="webxr scene-viewer quick-look"

         className="Product_options"
       >
       <button
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          zIndex: '1',
        }}
        slot="ar-button"
      >
        AR
      </button>
        {/* @ts-ignore */}
       </model-viewer>
       }
       {url && url.endsWith('glb') &&
       // @ts-ignore
         <model-viewer
         style={{ width: '100%', height: '100%', backgroundColor:'red', position:'relative' }}
         key={url}
         auto-rotate
         camera-controls
         ar
         rotation-per-second="30deg"
         alt="A 3D model"
         src={url}
         ar-modes="webxr scene-viewer quick-look"
        //  ios-src={url}
         className="Product_options"
         >
       <button
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width:'20px',
          height:'20px',
          backgroundColor:'green',
          zIndex: '1',
        }}
        slot="ar-button"
      >
        AR
      </button>
        {/* @ts-ignore */}
       </model-viewer>

      /// EXAMPLE FROM MODEL-VIEWER SITE ///////////
//       <model-viewer 
//       ar 
//       camera-controls 
//       touch-action="pan-y" 
//       src={url} 
//       alt="A 3D model of an astronaut"
//       >
//   <button 
//   slot="ar-button" 
//   style={{backgroundColor: 'white', borderRadius: '4px', border: 'none', position: 'absolute', top: '16px', right: '16px' }}>
//       👋 Activate AR
//   </button>
// </model-viewer>
       }
      </div>    
    </div>
  );
};
export default Viewer3DModelViewer;
